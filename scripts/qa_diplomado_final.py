#!/usr/bin/env python3
"""Independent integrity, frame identity, source-voice sync and subtitle QA."""
from array import array
import hashlib
import json
import math
from pathlib import Path
import re
import subprocess
import wave

from assemble_diplomado_final import BLOCKS, parse_srt, probe

ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'out/finalizacion-01-21'
VIDEO=OUT/'diplomado-ia-01-21-final.mp4'


def run(args):
 p=subprocess.run(args,check=True,capture_output=True,text=True)
 return p


def pcm(path,start,duration,af=None):
 cmd=['ffmpeg','-v','error','-ss',str(start),'-i',str(path),'-t',str(duration),'-vn']
 if af:cmd+=['-af',af]
 return array('f',subprocess.check_output(cmd+['-ar','48000','-ac','1','-f','f32le','-']))


def correlation(a,b):
 n=min(len(a),len(b));a=a[:n];b=b[:n];size=6000
 k=max(range(50,n-size-50,size),key=lambda i:sum(x*x for x in a[i:i+size]))
 lag=max(range(-48,49),key=lambda d:sum(x*y for x,y in zip(a[k:k+size],b[k+d:k+d+size])))
 x=a[max(0,-lag):min(n,n-lag)];y=b[max(0,lag):min(n,n+lag)];n=len(x);sx=sum(x);sy=sum(y)
 c=(sum(u*v for u,v in zip(x,y))-sx*sy/n)/math.sqrt((sum(u*u for u in x)-sx*sx/n)*(sum(v*v for v in y)-sy*sy/n))
 return {'correlation':c,'offsetMilliseconds':lag/48}


def image_hashes(path):
 result=run(['ffmpeg','-v','error','-i',str(path),'-map','0:v','-pix_fmt','yuv420p','-f','framemd5','-'])
 assert not result.stderr.strip(),result.stderr
 return [line.rsplit(',',1)[1].strip() for line in result.stdout.splitlines() if line and not line.startswith('#')]


def main():
 recovery=json.loads((OUT/'recuperacion.json').read_text())
 for section in ['sourceHashes','mediaHashes']:
  for path,expected in recovery[section].items():assert hashlib.sha256((ROOT/path).read_bytes()).hexdigest()==expected,path
 original=json.loads((ROOT/'inputs/voiceover/diplomado-manifest.json').read_text())
 for spec in original:assert hashlib.sha256(Path(spec['source']).read_bytes()).hexdigest()==spec['sha256']
 timing=json.loads((OUT/'timeline-final.json').read_text());meta=probe(VIDEO)
 v=next(s for s in meta['streams'] if s['codec_type']=='video');a=next(s for s in meta['streams'] if s['codec_type']=='audio')
 assert (v['width'],v['height'],v['r_frame_rate'],v['codec_name'],a['codec_name'])==(1920,1080,'30/1','h264','aac')
 assert int(v['nb_frames'])==15957 and abs(float(meta['format']['duration'])-531.9)<.06
 with wave.open(str(OUT/'mezcla-final.wav'),'rb') as audio:
  assert audio.getframerate()==48000 and audio.getnframes()==15957*1600
 expected=[]
 for block,frames,path in BLOCKS:
  data=image_hashes(ROOT/path);assert len(data)==frames;expected+=data
  print(f'Frame reference decoded: {block}, {frames}',flush=True)
 actual=image_hashes(VIDEO)
 assert actual==expected,'Decoded final frames differ from verified source blocks'
 pts=run(['ffprobe','-v','error','-select_streams','v:0','-show_entries','frame=best_effort_timestamp_time','-of','csv=p=0',str(VIDEO)]).stdout
 timestamps=[float(line.split(',')[0]) for line in pts.splitlines() if line.strip() and re.match(r'^\d',line)]
 assert len(timestamps)==15957 and all(abs(t-i/30)<.00002 for i,t in enumerate(timestamps)), 'Video timestamp discontinuity'
 audio_decode=run(['ffmpeg','-v','error','-i',str(VIDEO),'-map','0:a','-f','null','-']);assert not audio_decode.stderr.strip()
 print('Final frame identity, timestamps and complete audio decode PASS',flush=True)
 words=json.loads((ROOT/'src/locales/diplomado/words.json').read_text());durations=json.loads((ROOT/'src/locales/diplomado/voices.json').read_text())
 correlations={};cursor=0
 for block,frames,_ in BLOCKS:
  if block=='01-02':tracks=[('v1',.6),('v2',874/30)]
  else:tracks=[(s['voice'],s['voiceStart']) for s in json.loads((ROOT/f'out/revision-{block}/timeline.json').read_text())['scenes'] if s['voice']!='silence']
  for voice,start in tracks:
   tests=sorted(set([1,max(0,durations[voice]-3)]+([14.8333333333] if voice=='v17_18' else [])))
   correlations[voice]=[]
   for point in tests:
    reference=pcm(ROOT/f'public/voice/diplomado/{voice}.wav',point,3)
    rendered=pcm(VIDEO,cursor/30+start+point,3)
    measured=correlation(reference,rendered)
    if measured['correlation']<=.94:
     # A quiet final phrase can have low raw correlation against a music mix.
     # Require BOTH the unchanged full mix and the isolated original voice to
     # match; never lower the voice threshold or change the production audio.
     mixed=ROOT/f'out/revision-{block}/mezcla.wav'
     assert mixed.exists(),(voice,point,'No original mix for independent check')
     local=start+point
     events=json.loads((ROOT/f'out/revision-{block}/audio-events.json').read_text())['events']
     for event in events:
      event_start=event['frame']/30
      event_end=event_start+min(3,float(probe(ROOT/f"public/sfx/{event['name']}.wav")['format']['duration']))
      assert event_end<=local or event_start>=local+3,(voice,'SFX overlaps pad-isolation window')
     mixed_match=correlation(pcm(mixed,local,3),rendered)
     assert mixed_match['correlation']>.99,mixed_match
     fade=frames/30-4-local
     assert fade>=0,(voice,'Window begins inside final music fade')
     effect='volume=0.55'+(f',afade=t=out:st={fade}:d=4' if fade<3 else '')
     bed=pcm(ROOT/'public/sfx/pad.wav',local,3,effect)
     isolated=correlation(reference,array('f',(x-y for x,y in zip(rendered,bed))))
     assert isolated['correlation']>.99,(voice,point,isolated)
     measured['backgroundCompensation']={'unchangedMix':mixed_match,'originalVoiceAfterKnownPadRemoval':isolated}
    correlations[voice].append({'sourceStart':point,**measured})
  cursor+=frames
 captions=list(parse_srt(OUT/'diplomado-ia-01-21.srt'));expected_captions=[];cursor=0
 for block,frames,_ in BLOCKS:
  path=ROOT/('out/revision' if block=='01-02' else f'out/revision-{block}')/f'subtitulos-{block}.srt'
  expected_captions.extend((x+cursor/30,y+cursor/30,text) for x,y,text in parse_srt(path));cursor+=frames
 assert len(captions)==len(expected_captions)
 assert all(text==wanted and abs(s-a)<.001 and abs(e-b)<.001 for (s,e,text),(a,b,wanted) in zip(captions,expected_captions))
 assert all(0<=s<e<=531.9 for s,e,_ in captions) and all(x[1]<=y[0]+.001 for x,y in zip(captions,captions[1:]))
 credit=next(s for s in timing['scenes'] if s['scene']==21)['startFrame']/30
 assert max(e for _,e,_ in captions)<credit
 # Entire credit track must be the original pad, including the approved final fade.
 music=pcm(ROOT/'public/sfx/pad.wav',67.5,10,'volume=0.55,afade=t=out:st=6:d=4')
 credit_music=correlation(music,pcm(VIDEO,credit,10));assert credit_music['correlation']>.99,credit_music
 loud=run(['ffmpeg','-hide_banner','-i',str(VIDEO),'-map','0:a','-af','loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json','-f','null','-']).stderr
 (OUT/'loudness.txt').write_text(loud);levels=json.JSONDecoder().raw_decode(loud[loud.rfind('{'):])[0];assert float(levels['input_tp'])<0
 black=run(['ffmpeg','-hide_banner','-i',str(VIDEO),'-map','0:v','-vf','blackdetect=d=0.15:pix_th=0.02:pic_th=0.98','-an','-f','null','-']).stderr
 (OUT/'blackdetect.txt').write_text(black)
 intervals=[{'start':float(s),'end':float(e)} for s,e in re.findall(r'black_start:([\d.]+) black_end:([\d.]+)',black)]
 unexpected=[b for b in intervals if b['start']>.5 and b['end']<531.4];assert not unexpected,unexpected
 chapters=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_chapters','-of','json',str(VIDEO)]))['chapters'];assert len(chapters)==21
 for chapter,scene in zip(chapters,timing['scenes']):assert abs(float(chapter['start_time'])-scene['startFrame']/30)<.002
 report={'status':'TECHNICAL_PASS_VISUAL_PENDING','frames':15957,'duration':531.9,'resolution':'1920x1080','fps':30,
  'videoSHA256':hashlib.sha256(VIDEO.read_bytes()).hexdigest(),'originalSources':'19/19 unchanged',
  'recoveredSourceAndMediaHashes':'ALL UNCHANGED','videoFrames':'15957/15957 pixel-identical to reused/completed blocks',
  'timestamps':'Continuous at 30 fps; audio mixed to exact sample counts per block',
  'captionCues':len(captions),'captions':'Original text and timing preserved with exact block offsets; none over credits',
  'voiceMixCorrelations':correlations,'shared17_18':'One complete source, verified across visual split',
  'credit21':{'duration':10,'noNarration':'PASS: pad-only waveform match','musicCorrelation':credit_music},
  'loudnessLUFS':float(levels['input_i']),'truePeakDBFS':float(levels['input_tp']),
  'blackIntervals':intervals,'unexpectedBlackIntervals':unexpected,'chapters':21,'completeDecode':'PASS'}
 (OUT/'qa-tecnico.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
 print('Final technical QA PASS',flush=True)


if __name__=='__main__':main()
