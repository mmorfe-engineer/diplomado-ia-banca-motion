#!/usr/bin/env python3
"""Mix original voices, pad and the scene's frame-quantized SFX with ffmpeg."""
import argparse
import json
from pathlib import Path
import subprocess

ROOT=Path(__file__).resolve().parent.parent
EVENTS={
 'v7':[('PSICOSERVICIOS',0,'pop',.13),('Escuela',0,'pop',.13),('protagonista',0,'pop',.13)],
 'v8':[('primer',0,'pop',.12),('segundo',0,'whoosh',.13),('Antes',0,'ding',.14)],
 'v9':[(w,0,'pop',.12) for w in ['Riesgo','Planificación','Operaciones','Tecnología']],
 'v10':[('veinte',0,'pop',.13),('veinte',1,'pop',.13),('sesenta',0,'pop',.13),('Aprobar',0,'ding',.15)],
 'v11':[(w,0,'pop',.12) for w in ['inmersión','Moodle','dedicadas']],
 'v12':[(w,0,'pop',.11) for w in ['oportunidad','problema','factibilidad','riesgos','propuesta']]+[('Finalmente',0,'whoosh',.15)],
 'v13':[(w,0,'pop',.12) for w in ['requisitos','motivo','validaciones']],
 'v14':[(w,0,'pop',.12) for w in ['requisitos','registro','seguimiento']],
 'v15':[('opciones',0,'pop',.12),('paradigma',0,'whoosh',.15)],
 'v16':[(w,0,'pop',.1) for w in ['problema','hipótesis','requisitos','factibilidad','privacidad','mejora']],
 'v17_18':[('profesionales',0,'pop',.13),('defendieron',0,'ding',.13)],
 'v19':[('principal',0,'ding',.14)],'v20':[('gente',0,'ding',.14)]}


def main():
 p=argparse.ArgumentParser();p.add_argument('--block',required=True,choices=['07-10','11-16','17-21']);args=p.parse_args()
 folder=ROOT/f'out/revision-{args.block}';dest=folder/'mezcla.wav'
 if dest.exists():print('Preserving existing mix');return
 timing=json.loads((folder/'timeline.json').read_text());words=json.loads((ROOT/'src/locales/diplomado/words.json').read_text())
 total=timing['frames']/30
 sources=[(ROOT/'public/sfx/pad.wav',0,.55,'pad')]
 events=[]
 for scene in timing['scenes']:
  voice=scene['voice']
  if voice=='silence':continue
  sources.append((ROOT/f'public/voice/diplomado/{voice}.wav',scene['voiceStart'],1,'voice'))
  pre=scene['voiceStart']-scene['startFrame']/30
  for needle,nth,name,volume in EVENTS[voice]:
   hits=[s for text,s,e in words[voice] if needle.lower() in text.lower()]
   local=pre+hits[nth];frame=int(local*30+.5)+scene['startFrame'];offset=frame/30
   sources.append((ROOT/f'public/sfx/{name}.wav',offset,volume,'sfx'))
   events.append({'voice':voice,'cue':needle,'occurrence':nth,'name':name,'frame':frame,'volume':volume})
 cmd=['ffmpeg','-n','-v','error']
 filters=[]
 for i,(path,offset,volume,kind) in enumerate(sources):
  cmd+=['-i',str(path)]
  effect=f'atrim=duration={total},afade=t=out:st={total-4}:d=4,' if kind=='pad' else ('atrim=duration=3,' if kind=='sfx' else '')
  filters.append(f'[{i}:a]aresample=48000,aformat=channel_layouts=stereo,{effect}volume={volume},adelay={round(offset*48000)}S:all=1[a{i}]')
 filters.append(''.join(f'[a{i}]' for i in range(len(sources)))+f'amix=inputs={len(sources)}:duration=longest:normalize=0,atrim=duration={total}[mix]')
 cmd+=['-filter_complex',';'.join(filters),'-map','[mix]','-c:a','pcm_s24le',str(dest)]
 subprocess.run(cmd,check=True)
 (folder/'audio-events.json').write_text(json.dumps({'events':events,'duration':total,'voicePlayback':'Original complete WAVs; continuous v17_18; no voice synthesis'},ensure_ascii=False,indent=2)+'\n')
 print(f'{args.block}: mix saved; {len(events)} original SFX events')


if __name__=='__main__':main()
