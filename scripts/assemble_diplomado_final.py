#!/usr/bin/env python3
"""Reuse approved video; assemble remaining blocks and a frame-accurate 01–21 master."""
import argparse
import json
from pathlib import Path
import re
import subprocess

ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'out/finalizacion-01-21'
BLOCKS=[
 ('01-02',1606,'out/correccion-institucional/bloque-01-02/diplomado-ia-01-02-iconos.mp4'),
 ('03-06',3530,'out/correccion-institucional/bloque-03-06/diplomado-ia-03-06-iconos.mp4'),
 ('07-10',3494,'out/correccion-institucional/bloque-07-10/diplomado-ia-07-10-iconos.mp4'),
 ('11-16',5002,'out/finalizacion-01-21/bloque-11-16.mp4'),
 ('17-21',2325,'out/finalizacion-01-21/bloque-17-21.mp4')]


def probe(path):
 return json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(path)]))


def frame_count(path):
 return int(next(s for s in probe(path)['streams'] if s['codec_type']=='video')['nb_frames'])


def ffmpeg(args):
 result=subprocess.run(['ffmpeg','-n','-v','error',*args],check=True,capture_output=True,text=True)
 if result.stderr.strip():raise RuntimeError(result.stderr)


def listing(path,files):
 path.write_text(''.join(f"file '{p.resolve()}'\nduration {frames/30:.12f}\n" for p,frames in files))


def assemble_block(block):
 total=5002 if block=='11-16' else 2325
 target=OUT/f'bloque-{block}.mp4'
 if target.exists():
  assert frame_count(target)==total
  print(f'Preserved completed block {block}');return
 if block=='11-16':
  parts=[(ROOT/f'out/revision-11-16/chunks/{a:06}-{min(a+299,5001):06}.mp4',min(300,5002-a)) for a in range(0,5002,300)]
 else:
  parts=[(ROOT/'out/revision-17-21/chunks/000000-000299.mp4',300),
   (OUT/'complementos-17-21/000300-000492.mp4',193),
   (ROOT/'out/correccion-institucional/bloque-17-21/intervalo-corregido-sin-audio.mp4',1547),
   (OUT/'complementos-17-21/002040-002324.mp4',285)]
 for p,n in parts:assert frame_count(p)==n,(str(p),n)
 inputs=OUT/f'concat-{block}.txt';listing(inputs,parts)
 ffmpeg(['-f','concat','-safe','0','-i',str(inputs),'-i',str(ROOT/f'out/revision-{block}/mezcla.wav'),
  '-map','0:v','-map','1:a','-vf','scale=in_range=auto:out_range=tv,setsar=1','-pix_fmt','yuv420p',
  '-c:v','libx264','-preset','fast','-crf','18','-threads','4','-color_range','tv','-colorspace','bt470bg',
  '-c:a','aac','-b:a','320k','-t',str(total/30),'-movflags','+faststart',str(target)])
 assert frame_count(target)==total
 print(f'Assembled {block}: {total} frames',flush=True)


def parse_srt(path):
 text=path.read_text()
 for m in re.finditer(r'\d+\n(\d\d):(\d\d):(\d\d),(\d{3}) --> (\d\d):(\d\d):(\d\d),(\d{3})\n(.*?)(?=\n\n|\Z)',text,re.S):
  v=[int(x) for x in m.groups()[:8]]
  yield (v[0]*3600+v[1]*60+v[2]+v[3]/1000,v[4]*3600+v[5]*60+v[6]+v[7]/1000,m.group(9).strip())


def stamp(t):
 m=round(t*1000);return f'{m//3600000:02}:{m//60000%60:02}:{m//1000%60:02},{m%1000:03}'


def final():
 tracks=OUT/'pistas-video';tracks.mkdir(exist_ok=True)
 media=[];global_scenes=[];global_words=[];subtitles=[];cursor=0
 words=json.loads((ROOT/'src/locales/diplomado/words.json').read_text())
 for block,frames,relative in BLOCKS:
  source=ROOT/relative;assert frame_count(source)==frames
  remux=tracks/f'{block}.mp4'
  if not remux.exists():ffmpeg(['-i',str(source),'-map','0:v','-an','-c:v','copy','-video_track_timescale','90000',str(remux)])
  assert frame_count(remux)==frames;media.append((remux,frames))
  if block=='01-02':
   timing={'scenes':[{'voice':'v1','startFrame':0,'frames':856,'voiceStart':.6},
                      {'voice':'v2','startFrame':856,'frames':750,'voiceStart':874/30}]}
  else:timing=json.loads((ROOT/f'out/revision-{block}/timeline.json').read_text())
  for s in timing['scenes']:
   voice=s['voice'];start=cursor+s['startFrame']
   ids=[17,18] if voice=='v17_18' else [21 if voice=='silence' else int(voice[1:])]
   for i,scene in enumerate(ids):
    a=start+(493 if i else 0);n=s['frames']-(493 if i else 0)
    if len(ids)==2 and i==0:n=493
    global_scenes.append({'scene':scene,'startFrame':a,'frames':n,'block':block})
   for text,a,b in words[voice]:global_words.append([text,a+cursor/30+s['voiceStart'],b+cursor/30+s['voiceStart']])
  srt=ROOT/('out/revision' if block=='01-02' else f'out/revision-{block}')/f'subtitulos-{block}.srt'
  subtitles += [(a+cursor/30,b+cursor/30,text) for a,b,text in parse_srt(srt)]
  cursor+=frames
 assert cursor==15957 and [s['scene'] for s in global_scenes]==list(range(1,22))
 (OUT/'timeline-final.json').write_text(json.dumps({'frames':cursor,'fps':30,'duration':cursor/30,'scenes':global_scenes,'words':global_words},ensure_ascii=False,indent=2)+'\n')
 (OUT/'diplomado-ia-01-21.srt').write_text('\n'.join(f'{i+1}\n{stamp(a)} --> {stamp(b)}\n{text}\n' for i,(a,b,text) in enumerate(subtitles)))
 chapters=';FFMETADATA1\ntitle=Diplomado en Inteligencia Artificial Aplicada a la Banca\n'
 for s in global_scenes:chapters+=f"\n[CHAPTER]\nTIMEBASE=1/30\nSTART={s['startFrame']}\nEND={s['startFrame']+s['frames']}\ntitle=Escena {s['scene']:02}\n"
 metadata=OUT/'capitulos.ffmetadata';metadata.write_text(chapters)
 concat=OUT/'concat-final-video.txt';listing(concat,media)
 mix=OUT/'mezcla-final.wav'
 if not mix.exists():
  audio_inputs=[ROOT/p for _,_,p in BLOCKS[:3]]+[ROOT/'out/revision-11-16/mezcla.wav',ROOT/'out/revision-17-21/mezcla.wav']
  args=[];filters=[]
  for i,(path,(_,frames,_)) in enumerate(zip(audio_inputs,BLOCKS)):
   args+=['-i',str(path)];samples=frames*1600
   filters.append(f'[{i}:a]aresample=48000,aformat=channel_layouts=stereo,atrim=end_sample={samples},apad=whole_len={samples},asetpts=PTS-STARTPTS[a{i}]')
  filters.append(''.join(f'[a{i}]' for i in range(5))+'concat=n=5:v=0:a=1[mix]')
  ffmpeg(args+['-filter_complex',';'.join(filters),'-map','[mix]','-c:a','pcm_s24le',str(mix)])
 target=OUT/'diplomado-ia-01-21-final.mp4'
 if not target.exists():ffmpeg(['-f','concat','-safe','0','-i',str(concat),'-i',str(mix),'-i',str(metadata),
  '-map','0:v','-map','1:a','-map_metadata','2','-map_chapters','2','-c:v','copy','-c:a','aac','-b:a','320k','-movflags','+faststart',str(target)])
 assert frame_count(target)==cursor
 print(f'Final master assembled without rerendering: {cursor/30:.3f}s',flush=True)


if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--block',choices=['11-16','17-21']);p.add_argument('--final',action='store_true');args=p.parse_args()
 if args.block:assemble_block(args.block)
 if args.final:final()
