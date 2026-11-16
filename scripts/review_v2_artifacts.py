"""Create five lightweight reviews and real-frame contact sheet from the finished block."""
import json,subprocess,shutil
from pathlib import Path
R=Path(__file__).resolve().parent.parent;O=R/'out/v2';M=R/'docs/media/v2';data=json.loads((R/'src/v2/data.json').read_text());M.mkdir(parents=True,exist_ok=True)
def ff(args):subprocess.run(['ffmpeg','-y','-v','error',*map(str,args)],check=True)
source=O/'bloque-estrategico.mp4';cursor=0
needles=[['cartera','radar','priorizadas','Transformar'],['expedientes','documentos','estructurado','Mayor'],['red','torre','anomalías','perspectiva'],['evaluar','simulador','escenarios','Convertir'],['liquidez','predictivo','escenarios','Cinco']]
images=[]
for i,d in enumerate(data):
 ff(['-ss',cursor/30,'-i',source,'-t',d['frames']/30,'-frames:v',d['frames'],'-vf','scale=960:540','-c:v','libx264','-preset','fast','-crf','23','-c:a','aac','-b:a','192k',O/f"preview-{d['key']}.mp4"])
 times=[2]+[next(float(w[1]) for w in d['words'] if w[0].strip('.,:').lower()==s.lower())+1.7 for s in needles[i]]
 for j,t in enumerate(times):
  image=O/f"review-{i}-{j}.png";ff(['-ss',cursor/30+t,'-i',source,'-frames:v','1',image]);images.append(image)
  if j==3:ff(['-i',image,'-quality','90',M/f"{d['key']}.webp"])
 cursor+=d['frames']
# Supplementary executive-review captures, including the corrected graph and final convergence.
starts=[];frame=0
for d in data:starts.append(frame/30);frame+=d['frames']
for label,i,local in [('planificacion-grafo',3,20),('operaciones-mapa',2,15),('operaciones-cierre',2,29),('cinco-areas',4,25),('convergencia',4,31)]:
 ff(['-ss',starts[i]+local,'-i',source,'-frames:v','1','-quality','90',M/f'{label}.webp'])
# Filename order is narrative order, not alphabetic case order.
ff(['-pattern_type','glob','-i',O/'review-*-*.png','-vf','scale=480:270,tile=5x5','-frames:v','1',O/'hoja-de-contacto.png'])
shutil.copy2(O/'hoja-de-contacto.png',M/'hoja-de-contacto.png')
for d in data:
 probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-select_streams','v','-show_entries','stream=nb_frames','-of','json',str(O/f"preview-{d['key']}.mp4")]))
 assert int(probe['streams'][0]['nb_frames'])==d['frames'],d['key']
print('Five previews and 25 actual review frames created; exact preview frame counts PASS.')
