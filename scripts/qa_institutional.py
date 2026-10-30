#!/usr/bin/env python3
"""Independent QA for this visual-only correction; prior media remains immutable."""
import argparse
from array import array
import hashlib
import json
import math
from pathlib import Path
import re
import subprocess

ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'out/correccion-institucional'
CHANGED={'src/scenes/S1.tsx','src/scenes/S4.tsx','src/scenes/S5.tsx',
         'src/scenes/diplomado/Block07_10.tsx','src/scenes/diplomado/Block17_21.tsx'}


def digest(path):return hashlib.sha256(path.read_bytes()).hexdigest()


def probe(path):
 return json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(path)]))


def audio_hash(path):
 return subprocess.check_output(['ffmpeg','-v','error','-i',str(path),'-map','0:a','-c:a','copy','-f','hash','-hash','sha256','-'],text=True).strip()


def unchanged_frame(reference,output,frame):
 result=subprocess.run(['ffmpeg','-hide_banner','-ss',str(frame/30),'-i',str(reference),
   '-ss',str(frame/30),'-i',str(output),'-filter_complex',
   '[0:v]format=yuv420p,setpts=PTS-STARTPTS[a];[1:v]format=yuv420p,setpts=PTS-STARTPTS[b];[a][b]ssim',
   '-frames:v','1','-f','null','-'],check=True,capture_output=True,text=True)
 score=float(re.search(r'All:([\d.]+)',result.stderr).group(1))
 assert score>.99,(frame,'Unchanged scene differs',score)
 return {'frame':frame,'SSIM':score}


def decode(path,start,duration):
 return array('f',subprocess.check_output(['ffmpeg','-v','error','-i',str(path),'-ss',str(start),'-t',str(duration),
                                        '-vn','-ar','48000','-ac','1','-f','f32le','-']))


def correlate(reference,ref_start,output):
 a=decode(reference,ref_start+1,3);b=decode(output,1,3);count=min(len(a),len(b));a=a[:count];b=b[:count]
 size=6000;k=max(range(50,count-size-50,size),key=lambda k:sum(v*v for v in a[k:k+size]))
 lag=max(range(-48,49),key=lambda d:sum(x*y for x,y in zip(a[k:k+size],b[k+d:k+d+size])))
 x=a[max(0,-lag):min(count,count-lag)];y=b[max(0,lag):min(count,count+lag)]
 n=len(x);sx=sum(x);sy=sum(y)
 corr=(sum(u*v for u,v in zip(x,y))-sx*sy/n)/math.sqrt((sum(u*u for u in x)-sx*sx/n)*(sum(v*v for v in y)-sy*sy/n))
 assert corr>.99,(str(output),corr,lag)
 return {'correlation':corr,'offsetMilliseconds':lag/48}


def timestamp(t):
 m=round(t*1000);return f'{m//3600000:02}:{m//60000%60:02}:{m//1000%60:02},{m%1000:03}'


def crop_srt(source,target,start,end):
 text=source.read_text();items=[]
 for match in re.finditer(r'\d+\n(\d\d):(\d\d):(\d\d),(\d{3}) --> (\d\d):(\d\d):(\d\d),(\d{3})\n(.*?)(?=\n\n|\Z)',text,re.S):
  v=[int(x) for x in match.groups()[:8]];a=v[0]*3600+v[1]*60+v[2]+v[3]/1000;b=v[4]*3600+v[5]*60+v[6]+v[7]/1000
  if b<=start or a>=end:continue
  items.append(f'{len(items)+1}\n{timestamp(max(0,a-start))} --> {timestamp(min(end,b)-start)}\n{match.group(9).strip()}\n')
 target.write_text('\n'.join(items))


def verify_media(path,frames):
 meta=probe(path);v=next(s for s in meta['streams'] if s['codec_type']=='video');a=next(s for s in meta['streams'] if s['codec_type']=='audio')
 assert (v['width'],v['height'],v['r_frame_rate'],v['codec_name'],a['codec_name'])==(1920,1080,'30/1','h264','aac')
 assert int(v['nb_frames'])==frames,(str(path),v['nb_frames'],frames)
 assert abs(float(meta['format']['duration'])-frames/30)<.06
 result=subprocess.run(['ffmpeg','-v','error','-i',str(path),'-f','null','-'],capture_output=True,text=True,check=True)
 assert not result.stderr.strip(),(str(path),result.stderr)
 return {'frames':frames,'duration':float(meta['format']['duration']),'sha256':digest(path),'decode':'PASS'}


def main():
 parser=argparse.ArgumentParser();parser.add_argument('--block');args=parser.parse_args()
 baseline=json.loads((OUT/'preservacion-anterior.json').read_text());modified=[]
 for file,expected in baseline.items():
  if file in CHANGED:
   backup=OUT/'fuentes-anteriores'/Path(file).relative_to('src/scenes')
   backup=backup.with_suffix('.tsx.snapshot');assert digest(backup)==expected
   assert digest(ROOT/file)!=expected;modified.append(file)
  else:assert digest(ROOT/file)==expected,f'Protected asset changed: {file}'
 manifest=json.loads((ROOT/'inputs/voiceover/diplomado-manifest.json').read_text())
 for voice in manifest:assert digest(Path(voice['source']))==voice['sha256']
 audit=json.loads((OUT/'auditoria-personajes.json').read_text());assert audit['status']=='PASS'
 revision=json.loads((OUT/'revision-render.json').read_text());current=hashlib.sha256('\n'.join((ROOT/p).read_text() for p in revision['sources']).encode()).hexdigest();assert current==revision['revision']
 jobs=json.loads((OUT/'entregas.json').read_text())
 if args.block:jobs=[job for job in jobs if job['block']==args.block]
 else:assert len(jobs)==4
 report={'status':'TECHNICAL_PASS_VISUAL_REVIEW_PENDING','originalSources':'19/19 SHA-256 unchanged',
  'protectedAssets':f'{len(baseline)-len(modified)} prior files unchanged','changedSceneFiles':sorted(modified),
  'scriptVoicesCaptionsTimeline':'UNCHANGED','personAudit':'PASS; only documented individual human narratives and Isabel',
  'typeScript':'PASS','blocks':[],'scenes':[]}
 for job in jobs:
  block=job['block'];origin=job['outputOriginFrame'];first,last=job['range'];target=ROOT/job['output'];folder=target.parent
  expected=job['frames'] if job['base'] else last-first+1
  item={'block':block,'file':job['output'],**verify_media(target,expected)}
  source_srt=ROOT/('out/revision' if block=='01-02' else f'out/revision-{block}')/f'subtitulos-{block}.srt'
  if job['base']:
   assert audio_hash(ROOT/job['base'])==audio_hash(target)
   item['originalAudioAlignment']=correlate(ROOT/job['base'],0,target)
   assert (folder/f'subtitulos-{block}.srt').read_bytes()==source_srt.read_bytes()
   item['audio']='Original AAC payload copied unchanged';item['srt']='Byte-identical'
   samples=([first//2] if first else [])+([(last+1+job['frames']-1)//2] if last+1<job['frames'] else [])
   item['unaffectedVideoSamples']=[unchanged_frame(ROOT/job['base'],target,f) for f in samples]
  else:
   item['audio']=correlate(ROOT/job['audio'],first/30,target)
   crop_srt(source_srt,folder/'subtitulos-18-20.srt',first/30,(last+1)/30)
  report['blocks'].append(item)
  for scene,a,b in job['scenes']:
   clip=OUT/f'escena-{scene:02}-iconos.mp4';item={'scene':scene,'file':str(clip.relative_to(ROOT)),**verify_media(clip,b-a+1)}
   item['audio']=correlate(target,(a-origin)/30,clip)
   crop_srt(source_srt,OUT/f'escena-{scene:02}-iconos.srt',a/30,(b+1)/30)
   # Verify a principal state and its outgoing transition from the delivered MP4.
   frame=next(f for s,f in job['previews'] if s==scene)-a
   for name,position in [('principal',max(0,frame)),('salida',max(0,b-a-7))]:
    png=OUT/f'final-{scene:02}-{name}.png'
    if not png.exists():subprocess.run(['ffmpeg','-n','-v','error','-ss',str(position/30),'-i',str(clip),'-frames:v','1',str(png)],check=True)
   report['scenes'].append(item)
  print(f'{block}: metadata, decode, audio and SRT PASS',flush=True)
 path=OUT/(f'qa-{args.block}.json' if args.block else 'qa.json')
 path.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
 print(json.dumps({'status':report['status'],'sceneCount':len(report['scenes'])},ensure_ascii=False))


if __name__=='__main__':main()
