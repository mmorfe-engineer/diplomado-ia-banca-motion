"""Extract publication images only from the hash-verified approved V2 master."""
import hashlib,json,subprocess,shutil
from pathlib import Path
R=Path(__file__).resolve().parent.parent;master=R/'out/v2/diplomado-ia-v2-optimizado.mp4';M=R/'docs/media/v2';M.mkdir(parents=True,exist_ok=True)
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();approved='06665a81e4968434acac12cb9c319d71d1787b42fceb1b8e207076fdcf4d8be5';assert sha(master)==approved
frames={'negocios':14421,'credito':15308,'operaciones':16304,'planificacion':17452,'finanzas':18197,'cinco-areas':18353,'convergencia':18533,'planificacion-grafo':17182,'operaciones-mapa':16064,'operaciones-cierre':16484,'hero':16304}
records=[]
for name,frame in frames.items():
 p=M/f'{name}.webp';subprocess.run(['ffmpeg','-y','-v','error','-ss',f'{frame/30:.9f}','-i',str(master),'-frames:v','1','-vf','scale=1600:900','-quality','88',str(p)],check=True);records.append(dict(file=p.name,frame=frame,seconds=frame/30,width=1600,height=900,sha256=sha(p)))
# Keep large historical proof images in local custody, not the public gallery.
for p in M.glob('*.png'):
 dest=R/'out/closure-v2/historical-gallery'/p.name;dest.parent.mkdir(parents=True,exist_ok=True)
 if not dest.exists():shutil.copy2(p,dest)
 assert sha(p)==sha(dest);p.unlink()
(M/'frames.json').write_text(json.dumps(dict(masterSHA256=approved,source='approved master, not intermediate block',images=records),ensure_ascii=False,indent=2)+'\n');print('Approved-master gallery:',len(records),'images')
