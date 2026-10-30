#!/usr/bin/env python3
"""Assemble corrected intervals, preserving original blocks and their AAC tracks."""
import json
from pathlib import Path
import subprocess
import argparse

ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'out/correccion-institucional'


def probe(path):
 return json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(path)]))


def run(cmd):
 subprocess.run(['ffmpeg','-n','-v','error',*cmd],check=True)


def main():
 p=argparse.ArgumentParser();p.add_argument('--block');args=p.parse_args()
 plan=json.loads((OUT/'plan.json').read_text())
 if args.block:plan=[job for job in plan if job['block']==args.block]
 deliveries=json.loads((OUT/'entregas.json').read_text()) if (OUT/'entregas.json').exists() else []
 for job in plan:
  block=job['block'];folder=OUT/f'bloque-{block}';first,last=job['range'];length=last-first+1
  chunks=sorted((folder/'chunks').glob('*.mp4'))
  expected=[(a,min(a+299,last)) for a in range(first,last+1,300)]
  assert [p.name for p in chunks]==[f'{a:06}-{b:06}.mp4' for a,b in expected],f'Incomplete corrected interval: {block}'
  for path,(a,b) in zip(chunks,expected):
   assert int(probe(path)['streams'][0]['nb_frames'])==b-a+1
  listing=folder/'concat.txt';listing.write_text(''.join(f"file '{p}'\n" for p in chunks))
  patch=folder/'intervalo-corregido-sin-audio.mp4'
  if not patch.exists():run(['-f','concat','-safe','0','-i',str(listing),'-c:v','copy',str(patch)])
  assert int(probe(patch)['streams'][0]['nb_frames'])==length
  if job['base']:
   base=ROOT/job['base'];target=folder/f'diplomado-ia-{block}-iconos.mp4'
   if not target.exists():
    filters=[];segments=[]
    normalize='scale=1920:1080:in_range=auto:out_range=tv,format=yuv420p,setsar=1'
    if first:
     filters.append(f'[0:v]trim=start_frame=0:end_frame={first},setpts=PTS-STARTPTS,{normalize}[before]');segments.append('[before]')
    filters.append(f'[1:v]setpts=PTS-STARTPTS,{normalize}[patch]');segments.append('[patch]')
    if last+1<job['frames']:
     filters.append(f"[0:v]trim=start_frame={last+1}:end_frame={job['frames']},setpts=PTS-STARTPTS,{normalize}[after]");segments.append('[after]')
    filters.append(''.join(segments)+f'concat=n={len(segments)}:v=1:a=0[v]')
    run(['-i',str(base),'-i',str(patch),'-filter_complex',';'.join(filters),'-map','[v]','-map','0:a',
         '-c:v','libx264','-preset','fast','-crf','18','-color_range','tv','-colorspace','bt470bg',
         '-c:a','copy','-movflags','+faststart',str(target)])
   origin=0;expected_frames=job['frames']
   srt=ROOT/('out/revision' if block=='01-02' else f'out/revision-{block}')/f'subtitulos-{block}.srt'
   (folder/f'subtitulos-{block}.srt').write_bytes(srt.read_bytes())
  else:
   target=folder/'diplomado-ia-escenas-18-20-iconos.mp4'
   if not target.exists():
    run(['-i',str(patch),'-ss',str(first/30),'-i',str(ROOT/job['audio']),'-map','0:v','-map','1:a',
         '-t',str(length/30),'-c:v','copy','-c:a','aac','-b:a','320k','-movflags','+faststart',str(target)])
   origin=first;expected_frames=length
  meta=probe(target);v=next(s for s in meta['streams'] if s['codec_type']=='video')
  assert int(v['nb_frames'])==expected_frames,(block,v['nb_frames'],expected_frames)
  for scene,a,b in job['scenes']:
   output=OUT/f'escena-{scene:02}-iconos.mp4'
   if not output.exists():
    run(['-ss',str((a-origin)/30),'-i',str(target),'-t',str((b-a+1)/30),'-map','0:v','-map','0:a',
         '-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p','-c:a','aac','-b:a','320k','-movflags','+faststart',str(output)])
   assert int(next(s for s in probe(output)['streams'] if s['codec_type']=='video')['nb_frames'])==b-a+1
  job['output']=str(target.relative_to(ROOT));job['outputOriginFrame']=origin
  deliveries=[j for j in deliveries if j['block']!=block]+[job]
  (OUT/'entregas.json').write_text(json.dumps(deliveries,ensure_ascii=False,indent=2)+'\n')
  print(f'Assembled {block}; scene clips saved',flush=True)


if __name__=='__main__':main()
