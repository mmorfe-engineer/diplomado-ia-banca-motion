#!/usr/bin/env python3
"""Durable, resumable exports. Completed chunks and approved blocks are never replaced.

Each invocation renders at most one missing chunk (about ten seconds of video).
Repeat until a block is assembled; failed/incomplete chunks are retained for inspection.
"""
import argparse
import json
from pathlib import Path
import subprocess
import time
import os
import signal

ROOT=Path(__file__).resolve().parent.parent
CHROME='/home/bitcoinpapa/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell'


def probe(path):
    try:
        q=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-of','json',str(path)],stderr=subprocess.DEVNULL))
        return next(s for s in q['streams'] if s['codec_type']=='video')
    except (subprocess.CalledProcessError,StopIteration):return None


def main():
    p=argparse.ArgumentParser()
    p.add_argument('--block',choices=['07-10','11-16','17-21'],required=True)
    p.add_argument('--stop-legacy-audio',action='store_true')
    p.add_argument('--concurrency',type=int,default=4)
    p.add_argument('--launch-queue',action='store_true')
    p.add_argument('--stop-production',action='store_true')
    args=p.parse_args();block=args.block
    folder=ROOT/f'out/revision-{block}'
    if args.stop_production:
        rows=subprocess.check_output(['ps','-eo','pid,ppid,args'],text=True).splitlines()[1:]
        processes={}
        for row in rows:
            parts=row.strip().split(None,2)
            if len(parts)==3:processes[int(parts[0])]=(int(parts[1]),parts[2])
        roots={pid for pid,(_,cmd) in processes.items() if pid!=os.getpid() and
               (cmd.startswith('python3 scripts/diplomado_queue.py') or
                cmd.startswith('python3 scripts/render_diplomado_blocks.py --block'))}
        targets=set(roots)
        while True:
            children={pid for pid,(parent,_) in processes.items() if parent in targets}
            if children<=targets:break
            targets|=children
        for pid in roots:
            try:os.kill(pid,signal.SIGSTOP)
            except ProcessLookupError:pass
        for pid in targets-roots:
            try:os.kill(pid,signal.SIGTERM)
            except ProcessLookupError:pass
        for pid in roots:
            try:
                os.kill(pid,signal.SIGTERM)
                os.kill(pid,signal.SIGCONT)
            except ProcessLookupError:pass
        (ROOT/'out/cola-produccion.json').write_text(json.dumps({'status':'STOPPED_FOR_VISUAL_CORRECTION',
            'reason':'User requests institutional icons and review before further production',
            'stoppedPids':sorted(targets)},indent=2)+'\n')
        print(f'Stopped production processes: {sorted(targets)}')
        return
    if args.launch_queue:
        current=[]
        for row in subprocess.check_output(['ps','-eo','pid,args'],text=True).splitlines():
            pid,_,command=row.strip().partition(' ')
            if 'python3 scripts/diplomado_queue.py' in command and int(pid)!=os.getpid():
                print(f'Production queue already running: {pid}');return
            if command.startswith('python3 scripts/render_diplomado_blocks.py --block') and int(pid)!=os.getpid():
                current.append(pid)
        with (ROOT/'out/cola-produccion.log').open('a') as log:
            child=subprocess.Popen(['python3','scripts/diplomado_queue.py','--wait-pids',','.join(current)],cwd=ROOT,
                                   stdout=log,stderr=subprocess.STDOUT,stdin=subprocess.DEVNULL,start_new_session=True)
        print(f'Queue started: PID {child.pid}; waiting for current exports: {current}')
        return
    if args.stop_legacy_audio:
        # Only stop the obsolete audio-only Chromium export for this exact block.
        for row in subprocess.check_output(['ps','-eo','pid,args'],text=True).splitlines():
            pid,_,command=row.strip().partition(' ')
            if 'remotion render src/index.ts' in command and f'out/revision-{block}/mezcla.wav' in command and '--codec=wav' in command:
                os.kill(int(pid),signal.SIGTERM)
        return
    timing=json.loads((folder/'timeline.json').read_text());total=timing['frames']
    chunks=folder/'chunks';chunks.mkdir(exist_ok=True)
    prefix=folder/'recuperacion/frames-000000-001169-normalizado.mp4'
    start=1170 if block=='07-10' and probe(prefix) else 0
    ranges=[(i,min(total-1,i+299)) for i in range(start,total,300)]
    base=['npx','remotion','render','src/index.ts',f'DiplomadoIA-Revision{block}']
    opts=['--props',json.dumps({'block':block}),'--browser-executable',CHROME,f'--concurrency={args.concurrency}','--log=error']
    state=folder/'produccion.json'
    for first,last in ranges:
        output=chunks/f'{first:06}-{last:06}.mp4'
        meta=probe(output) if output.exists() else None
        if meta and int(meta['nb_frames'])==last-first+1:continue
        if output.exists():
            output.rename(output.with_suffix(f'.incomplete-{time.time_ns()}.mp4'))
        state.write_text(json.dumps({'status':'RENDERING','block':block,'range':[first,last],'output':str(output)},indent=2)+'\n')
        subprocess.run(base+[str(output)]+opts+['--codec=h264','--crf=18','--muted',f'--frames={first}-{last}'],cwd=ROOT,check=True)
        assert int(probe(output)['nb_frames'])==last-first+1
        state.write_text(json.dumps({'status':'CHUNK_COMPLETE','block':block,'range':[first,last],'nextFrame':last+1},indent=2)+'\n')
        print(f'{block}: saved frames {first}–{last}; rerun to continue',flush=True)
        return
    audio=folder/'mezcla.wav'
    if not audio.exists():
        subprocess.run(['python3','scripts/mix_diplomado_audio.py','--block',block],cwd=ROOT,check=True)
    video=folder/f'diplomado-ia-escenas-{block}.mp4'
    if not video.exists():
        files=([prefix] if start else [])+[chunks/f'{a:06}-{b:06}.mp4' for a,b in ranges]
        listing=chunks/'concat.txt'
        listing.write_text(''.join(f"file '{f}'\n" for f in files))
        subprocess.run(['ffmpeg','-n','-v','error','-f','concat','-safe','0','-i',str(listing),'-i',str(audio),
                        '-map','0:v','-map','1:a','-c:v','libx264','-preset','fast','-crf','18',
                        '-vf','scale=in_range=pc:out_range=tv,setsar=1','-pix_fmt','yuv420p',
                        '-color_range','tv','-colorspace','bt470bg','-c:a','aac','-b:a','320k','-movflags','+faststart',str(video)],check=True)
    assert int(probe(video)['nb_frames'])==total
    subprocess.run(['python3','scripts/qa_diplomado_continuation.py','--block',block],cwd=ROOT,check=True)
    state.write_text(json.dumps({'status':'TECHNICAL_PASS','block':block,'frames':total,'visualReview':'Final MP4 frames pending'},indent=2)+'\n')


if __name__=='__main__':main()
