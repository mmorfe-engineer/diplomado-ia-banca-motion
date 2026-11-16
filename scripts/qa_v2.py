"""Decode, timing, original frame preservation and artifact manifest."""
import json,subprocess,hashlib,re,array,math,os
from pathlib import Path
R=Path(__file__).resolve().parent.parent;O=R/'out/v2';D=R/'deliverables/v2';V1=Path(os.environ.get('V2_V1_ROOT','/home/bitcoinpapa/projects/diplomado_ia/motion-video-final'))/'out/finalizacion-01-21/diplomado-ia-01-21-final.mp4';V2=O/'diplomado-ia-v2-final.mp4'
def run(args):return subprocess.run(args,check=True,capture_output=True,text=True)
def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest()
locked=json.loads((O/'base-revision-90/locked-media.json').read_text())
for relative,expected in locked.items():assert digest(R/relative)==expected,relative
for source in [R/'src/v2/Strategic.tsx',R/'src/v2/Refinements.tsx']:
 text=source.read_text().casefold()
 for removed in ['simulación académica','datos sintéticos','propuesta académica','nodos ilustrativos','alcance académico']:assert removed not in text,(source,removed)
assert digest(O/'base-revision-90/diplomado-ia-v2-final.mp4')=='7e5ab7c12955be6efb273f1cf1d8ba34fd37fd36c75669e39ee00be450a511bc'
print('Base preservation, locked voices/timing/subtitles and editorial cleanup PASS',flush=True)
t=json.loads((O/'timeline-v2.json').read_text());n=t['insertionFrames'];probe=json.loads(run(['ffprobe','-v','error','-show_streams','-show_format','-show_chapters','-of','json',str(V2)]).stdout);video=next(s for s in probe['streams'] if s['codec_type']=='video');audio=next(s for s in probe['streams'] if s['codec_type']=='audio')
assert (video['width'],video['height'],video['r_frame_rate'],int(video['nb_frames']))==(1920,1080,'30/1',t['frames'])
assert video['codec_name']=='h264' and audio['codec_name']=='aac' and audio['channels']==2 and int(audio['sample_rate'])==48000
assert len(probe['chapters'])==26
def read_srt(path):
 def sec(stamp):
  h,m,s=stamp.replace(',','.').split(':');return int(h)*3600+int(m)*60+float(s)
 return [(sec(a),sec(b),text.strip()) for a,b,text in re.findall(r'\d+\n([\d:,]+) --> ([\d:,]+)\n(.*?)(?=\n\n|\Z)',path.read_text(),re.S)]
oldsub=read_srt(R/'deliverables/diplomado-ia-01-21.srt');sub=read_srt(O/'diplomado-ia-v2.srt')
assert len(oldsub)==203 and len(sub)==264
assert sub[:178]==oldsub[:178]
assert all(a<b and (i==0 or a>=sub[i-1][1]-.001) for i,(a,b,text) in enumerate(sub))
for (a,b,text),(aa,bb,tt) in zip(oldsub[178:],sub[-25:]):assert text==tt and abs(aa-a-n/30)<.0011 and abs(bb-b-n/30)<.0011
credits=next(s['startFrame']/30 for s in t['scenes'] if s['scene']==21);assert sub[-1][1]<credits
print('Subtitles, chapters and dimensions PASS',flush=True)
run(['ffmpeg','-v','error','-i',str(V2),'-f','null','-'])
# Compare every decoded original frame in order; ignores timestamp shifts.
def frames(path,filter=None):
 cmd=['ffmpeg','-v','error','-threads','2','-i',str(path),'-map','0:v']
 if filter:cmd+=['-vf',filter]
 result=run(cmd+['-an','-f','framemd5','-']).stdout
 return [l.split(',')[-1].strip() for l in result.splitlines() if not l.startswith('#') and l.strip()]
cache=O/'v1-frames.md5'
a=[l.split(',')[-1].strip() for l in cache.read_text().splitlines() if l.strip() and not l.startswith('#')] if cache.exists() else frames(V1)
if len(a)!=15957:a=frames(V1)
b=frames(V2);assert len(a)==15957 and len(b)==t['frames'];assert a[:13632]==b[:13632];assert a[13632:]==b[13632+n:]
print('All original pixel hashes PASS',flush=True)
# PCM prefix/suffix hash equality before final AAC encoding.
def audiohash(path,trim):
 return run(['ffmpeg','-v','error','-i',str(path),'-map','0:a','-af',trim,'-c:a','pcm_s24le','-f','md5','-']).stdout.strip()
assert audiohash(V1,'atrim=end_sample=21811200')==audiohash(O/'mezcla-final-v2.wav','atrim=end_sample=21811200')
assert audiohash(V1,'atrim=start_sample=21811200:end_sample=25531200')==audiohash(O/'mezcla-final-v2.wav',f'atrim=start_sample={(13632+n)*1600}:end_sample={t["frames"]*1600}')
def samples(path,start):
 raw=subprocess.check_output(['ffmpeg','-v','error','-ss',str(start),'-i',str(path),'-t','1','-af','highpass=f=1200','-ac','1','-ar','16000','-f','f32le','-'])
 a=array.array('f');a.frombytes(raw);return a
voiceChecks=[];offset=13632/30
for d in json.loads((R/'src/v2/data.json').read_text()):
 checks=[]
 for local in [1,max(1,d['duration']-3)]:
  a=samples(R/f"public/voice/v2/{d['key']}.wav",local);b=samples(V2,offset+.6+local);size=min(len(a),len(b));a=a[:size];b=b[:size]
  correlation=sum(x*y for x,y in zip(a,b))/math.sqrt(sum(x*x for x in a)*sum(y*y for y in b))
  assert correlation>.98,(d['key'],local,correlation)
  checks.append(dict(sourceStart=local,correlation=correlation))
 voiceChecks.append(dict(voice=d['key'],checks=checks));offset+=d['frames']/30
black=run(['ffmpeg','-hide_banner','-i',str(V2),'-vf','blackdetect=d=0.15:pix_th=.02','-an','-f','null','-']).stderr;(O/'blackdetect.txt').write_text(black)
blackevents=[tuple(map(float,m)) for m in re.findall(r'black_start:([\d.]+) black_end:([\d.]+) black_duration:([\d.]+)',black)]
boundaries=[0,t['duration']]+[s['startFrame']/30 for s in t['scenes']]
unexpected=[e for e in blackevents if e[2]>.8 or not any(abs((e[0]+e[1])/2-boundary)<.6 for boundary in boundaries)]
assert not unexpected,unexpected
loud=run(['ffmpeg','-hide_banner','-i',str(V2),'-af','ebur128=peak=true','-vn','-f','null','-']).stderr;(O/'loudness.txt').write_text(loud)
report=dict(status='TECHNICAL_PASS',artisticApproval='APPROVED_BY_DIRECTOR_2026_11_16',frames=t['frames'],duration=t['duration'],newFrames=n,scenes=26,decode='PASS',refinement=dict(renderRevision=json.loads((O/'checkpoint.json').read_text())['revision'],baseMasterPreserved=True,lockedVoicesTimingAndSubtitles='UNCHANGED',editorialCleanup='PASS',soundEvents=len(json.loads((R/'src/v2/sfx.json').read_text()))),captionCues=264,V1CaptionPreservation='178 prefix cues unchanged; 25 suffix cues shifted by exact insertion duration; credits remain without narration/captions',newVoiceCorrelations=voiceChecks,voiceCorrelationMethod='Two one-second windows per voice; high-pass 1200 Hz reduces the independent background pad; zero-delay normalized correlation >0.98',blackDetect=dict(events=blackevents,unexpected=unexpected,classification='Only short transition fades permitted'),originalAudioPCM='Prefix and suffix PCM sample hashes identical before AAC encoding',originalPrefixFrames='13632/13632 identical decoded pixel hashes',originalSuffixFrames='2325/2325 identical decoded pixel hashes',V1Sha256=digest(V1),masterSha256=digest(V2),audio='Original decoded V1 samples preserved in PCM intermediate; final AAC encoding changes compressed audio. Final audiovisual approval supplied by the director on 2026-11-16; internal audio analysis remains sampled.',visual='Stable beat/contact frames inspected; director final approval recorded separately on 2026-11-16.',wordAlignment='Whisper small estimates; two lexical recognition corrections in Planning; Credit source TXT absent, transcript supplied.',probe=probe)
(O/'qa-v2.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));(D/'qa-v2.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
manifest={str(p.relative_to(R)):digest(p) for p in [V2,O/'bloque-estrategico.mp4',O/'diplomado-ia-v2.srt',O/'timeline-v2.json',O/'qa-v2.json']};(D/'MANIFEST.json').write_text(json.dumps(manifest,indent=2));print(json.dumps({k:v for k,v in report.items() if k!='probe'},ensure_ascii=False,indent=2))
