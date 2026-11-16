"""Checkpointed V2-only rendering. Never renders V1 scenes."""
import argparse,json,hashlib,subprocess,os
from pathlib import Path
R=Path(__file__).resolve().parent.parent;O=R/'out/v2'
B=os.environ.get('V2_BROWSER','/home/bitcoinpapa/projects/diplomado_ia/motion-video/node_modules/.remotion/chrome-headless-shell/linux64/chrome-headless-shell-linux64/chrome-headless-shell')
data=json.loads((R/'src/v2/data.json').read_text())
def run(args):subprocess.run(args,cwd=R,check=True)
def count(p):return int(subprocess.check_output(['ffprobe','-v','error','-select_streams','v:0','-show_entries','stream=nb_frames','-of','csv=p=0',str(p)]).decode().split(',')[0])
def cli(args):run(['node','node_modules/@remotion/cli/remotion-cli.js',*args,f'--browser-executable={B}','--log=error'])
def revision():
 h=hashlib.sha256()
 for p in sorted(list((R/'src').rglob('*'))+[R/'package-lock.json',Path(__file__),*list((R/'public/voice/v2').glob('*.wav'))]):
  if p.is_file():h.update(str(p.relative_to(R)).encode());h.update(p.read_bytes())
 h.update(b'1080p30-h264-crf18-yuv420p-concurrency2-chunk300')
 return h.hexdigest()
parser=argparse.ArgumentParser();parser.add_argument('mode',choices=['previews','stills','controls','full']);a=parser.parse_args();rev=revision()
cp=O/'checkpoint.json';state=json.loads(cp.read_text()) if cp.exists() else {'revision':rev,'chunks':{}}
if state['revision']!=rev:state={'revision':rev,'chunks':{}}
if a.mode=='controls':
 controls=[(0,12,'iconos'),(0,30,'cierre'),(1,8,'iconos'),(1,28,'cierre'),(2,8,'mapa'),(2,15,'selector'),(2,23,'producto'),(2,29,'cierre'),(3,4,'apertura'),(3,20,'grafo'),(3,29,'cierre'),(4,14,'iconos'),(4,20,'producto'),(4,25,'cinco-areas'),(4,31,'convergencia')]
 for i,t,label in controls:
  cli(['still','src/index.ts',f"V2-{data[i]['key']}",str(O/f"control-{i}-{label}.png"),f'--frame={round(t*30)}'])
  print('CONTROL',i,label,flush=True)
elif a.mode=='stills':
 for i,d in enumerate(data):
  # stable frames for persona, challenge, intelligence, product and closure
  from_words=[('cartera','radar','priorizadas','Transformar'),('expedientes','documentos','estructurado','Mayor'),('red','torre','anomalías','perspectiva'),('evaluar','simulador','escenarios','Convertir'),('liquidez','predictivo','escenarios','Cinco')][i]
  times=[2]+[next(float(w[1]) for w in d['words'] if w[0].lower().strip('.,:')==s.lower())+1.7 for s in from_words]
  for j,t in enumerate(times):cli(['still','src/index.ts',f"V2-{d['key']}",str(O/f"{d['key']}-beat{j}.png"),f'--frame={round(t*30)}'])
elif a.mode=='previews':
 for d in data:
  cli(['render','src/index.ts',f"V2-{d['key']}",str(O/f"preview-{d['key']}.mp4"),'--scale=.5','--codec=h264','--crf=23','--concurrency=2'])
else:
 dest=O/'chunks'/rev[:12];dest.mkdir(parents=True,exist_ok=True);total=sum(d['frames'] for d in data)
 for start in range(0,total,300):
  end=min(start+299,total-1);key=f'{start:06}-{end:06}';p=dest/f'{key}.mp4'
  if state['chunks'].get(key)==end-start+1 and p.exists() and count(p)==end-start+1:continue
  cli(['render','src/index.ts','DiplomadoIA-V2-Estrategico',str(p),f'--frames={start}-{end}','--codec=h264','--crf=18','--pixel-format=yuv420p','--concurrency=2','--muted'])
  assert count(p)==end-start+1
  state['chunks'][key]=end-start+1;state['totalFrames']=total;cp.write_text(json.dumps(state,indent=2))
  print('CHUNK PASS',key,flush=True)
 listing=O/'concat-v2-chunks.txt';listing.write_text(''.join(f"file '{p.resolve()}'\n" for p in sorted(dest.glob('*.mp4'))))
 run(['ffmpeg','-y','-v','error','-f','concat','-safe','0','-i',str(listing),'-an','-c:v','copy','-video_track_timescale','90000',str(O/'estrategico-video.mp4')])
 assert count(O/'estrategico-video.mp4')==total
