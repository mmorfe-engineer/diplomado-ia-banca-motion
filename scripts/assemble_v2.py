"""Frame-exact insertion using approved V1 video tracks; V1 sources read-only."""
import json,subprocess,hashlib,re,shutil,os
from pathlib import Path
R=Path(__file__).resolve().parent.parent;O=R/'out/v2';D=R/'deliverables/v2';BASE=Path(os.environ.get('V2_V1_ROOT','/home/bitcoinpapa/projects/diplomado_ia/motion-video-final'));F=BASE/'out/finalizacion-01-21'
data=json.loads((R/'src/v2/data.json').read_text());N=sum(d['frames'] for d in data);CUT=13632;TOTAL=15957+N
EXPECTED='0f9d610c65a5663a3ae0ab380c309fcf256339997ee4f6d4c5f6c07b1b7c9b19'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def run(args):subprocess.run(['ffmpeg','-y','-v','error',*map(str,args)],check=True)
def count(p):return int(subprocess.check_output(['ffprobe','-v','error','-select_streams','v:0','-show_entries','stream=nb_frames','-of','csv=p=0',str(p)]).decode().split(',')[0])
master=F/'diplomado-ia-01-21-final.mp4';assert sha(master)==EXPECTED
tracks=[(F/'pistas-video'/f'{b}.mp4',n) for b,n in [('01-02',1606),('03-06',3530),('07-10',3494),('11-16',5002),('17-21',2325)]]
for path,n in tracks:assert count(path)==n
import sys
AUDIO_ONLY='--audio-only' in sys.argv
if not AUDIO_ONLY:assert count(O/'estrategico-video.mp4')==N
# New audio: complete original voice copies, existing quiet pad.
args=['-i',BASE/'public/sfx/pad.wav'];filters=[f'[0:a]aresample=48000,aformat=channel_layouts=stereo,atrim=end_sample={N*1600},apad=whole_len={N*1600},volume=0.55,afade=t=in:d=0.5,afade=t=out:st={N/30-.5}:d=0.5[a0]'];offset=0
for i,d in enumerate(data,1):
 args+=['-i',R/f"public/voice/v2/{d['key']}.wav"]
 filters.append(f'[{i}:a]adelay={(offset+18)*1600}S:all=1[a{i}]');offset+=d['frames']
events=json.loads((R/'src/v2/sfx.json').read_text())
for index,event in enumerate(events,6):
 args+=['-i',R/f"public/sfx/{event['name']}.wav"]
 filters.append(f"[{index}:a]aresample=48000,aformat=channel_layouts=stereo,atrim=duration=3,volume={event['volume']},adelay={event['frame']*1600}S:all=1[a{index}]")
inputs=6+len(events)
filters.append(''.join(f'[a{i}]' for i in range(inputs))+f'amix=inputs={inputs}:normalize=0,volume=1.6dB,apad=whole_len={N*1600},atrim=end_sample={N*1600}[mix]')
(O/'audio-events.json').write_text(json.dumps(events,ensure_ascii=False,indent=2))
run(args+['-filter_complex',';'.join(filters),'-map','[mix]','-c:a','pcm_s24le',O/'estrategico-mezcla.wav'])
# Preserve original decoded V1 audio sample-for-sample in the intermediate PCM.
run(['-i',master,'-i',O/'estrategico-mezcla.wav','-filter_complex',f'[0:a]aresample=48000,aformat=channel_layouts=stereo,asplit=2[p][s];[p]atrim=end_sample={CUT*1600},asetpts=PTS-STARTPTS[pre];[s]atrim=start_sample={CUT*1600}:end_sample={15957*1600},asetpts=PTS-STARTPTS[suf];[1:a]atrim=end_sample={N*1600},asetpts=PTS-STARTPTS[new];[pre][new][suf]concat=n=3:v=0:a=1[all]','-map','[all]','-c:a','pcm_s24le',O/'mezcla-final-v2.wav'])
if AUDIO_ONLY:sys.exit(0)
# Renderer v4 default uses BT.601 coefficients. Harmonize SPS/container tags
# with approved V1 BT.470BG metadata, without changing encoded picture samples.
run(['-i',O/'estrategico-video.mp4','-map','0:v','-an','-c:v','copy','-bsf:v','h264_metadata=video_full_range_flag=0:matrix_coefficients=5:colour_primaries=2:transfer_characteristics=2','-colorspace','bt470bg','-color_range','tv','-video_track_timescale','90000',O/'estrategico-compatible.mp4'])
assert count(O/'estrategico-compatible.mp4')==N
run(['-i',O/'estrategico-compatible.mp4','-i',O/'estrategico-mezcla.wav','-map','0:v','-map','1:a','-c:v','copy','-c:a','aac','-b:a','320k','-movflags','+faststart',O/'bloque-estrategico.mp4'])
# Captions share exact data and segmentation with Strategic.tsx.
def lines(d):
 out=[];cur=[]
 for w in d['words']:
  cur.append(w)
  if (re.search(r'[.,?;:]$',w[0]) and len(cur)>=3) or len(cur)>=7:out.append(cur);cur=[]
 if cur:out.append(cur)
 return [(x[0][1]+.6,min(x[-1][2]+1.2,out[j+1][0][1]+.6 if j+1<len(out) else x[-1][2]+1.2),' '.join(w[0] for w in x)) for j,x in enumerate(out)]
def stamp(t):
 m=round(t*1000);return f'{m//3600000:02}:{m//60000%60:02}:{m//1000%60:02},{m%1000:03}'
def srt(items,path):path.write_text('\n'.join(f'{j+1}\n{stamp(a)} --> {stamp(b)}\n{text}\n' for j,(a,b,text) in enumerate(items)))
sub=[];local=[];cursor=0;newscenes=[]
for j,d in enumerate(data):
 local += [(a+cursor/30,b+cursor/30,text) for a,b,text in lines(d)]
 newscenes.append(dict(scene=f'16{chr(97+j)}',startFrame=CUT+cursor,frames=d['frames'],voice=d['key']));cursor+=d['frames']
srt(local,O/'bloque-estrategico.srt')
source=(R/'deliverables/diplomado-ia-01-21.srt').read_text()
def seconds(s):
 h,m,sec=s.replace(',','.').split(':');return int(h)*3600+int(m)*60+float(sec)
for m in re.finditer(r'\d+\n([\d:,]+) --> ([\d:,]+)\n(.*?)(?=\n\n|\Z)',source,re.S):
 a,b=seconds(m[1]),seconds(m[2]);shift=N/30 if a>=CUT/30 else 0
 sub.append((a+shift,b+shift,m[3].strip()))
sub+= [(a+CUT/30,b+CUT/30,text) for a,b,text in local];sub.sort()
assert all(a<b and (j==0 or a>=sub[j-1][1]-.001) for j,(a,b,_) in enumerate(sub))
srt(sub,O/'diplomado-ia-v2.srt');shutil.copy2(O/'diplomado-ia-v2.srt',D/'diplomado-ia-v2.srt')
timeline=json.loads((F/'timeline-final.json').read_text());scenes=timeline['scenes']
for s in scenes:
 if s['startFrame']>=CUT:s['startFrame']+=N
scenes+=newscenes;scenes.sort(key=lambda s:s['startFrame']);assert len(scenes)==26
allwords=[[w,a+(N/30 if a>=CUT/30 else 0),b+(N/30 if a>=CUT/30 else 0)] for w,a,b in timeline['words']]
offset=CUT/30
for d in data:
 allwords += [[w,a+offset+.6,b+offset+.6] for w,a,b in d['words']];offset+=d['frames']/30
allwords.sort(key=lambda w:w[1])
(O/'timeline-v2.json').write_text(json.dumps(dict(frames=TOTAL,fps=30,duration=TOTAL/30,insertionFrames=N,scenes=scenes,words=allwords),ensure_ascii=False,indent=2))
metadata=';FFMETADATA1\ntitle=Diplomado en Inteligencia Artificial Aplicada a la Banca · V2\n'
for s in scenes:metadata+=f"\n[CHAPTER]\nTIMEBASE=1/30\nSTART={s['startFrame']}\nEND={s['startFrame']+s['frames']}\ntitle=Escena {s['scene']}\n"
(O/'capitulos.ffmetadata').write_text(metadata)
paths=[p for p,n in tracks[:4]]+[O/'estrategico-compatible.mp4',tracks[4][0]]
(O/'concat-v2.txt').write_text(''.join(f"file '{p}'\n" for p in paths))
run(['-f','concat','-safe','0','-i',O/'concat-v2.txt','-i',O/'mezcla-final-v2.wav','-i',O/'capitulos.ffmetadata','-map','0:v','-map','1:a','-map_metadata','2','-map_chapters','2','-c:v','copy','-video_track_timescale','90000','-c:a','aac','-b:a','320k','-movflags','+faststart',O/'diplomado-ia-v2-final.mp4'])
assert count(O/'diplomado-ia-v2-final.mp4')==TOTAL
print(json.dumps(dict(frames=TOTAL,duration=TOTAL/30,newFrames=N,sha256=sha(O/'diplomado-ia-v2-final.mp4')),indent=2))
