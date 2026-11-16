import json,subprocess,hashlib,math,os
from pathlib import Path
from faster_whisper import WhisperModel
R=Path(__file__).resolve().parent.parent
P=Path(os.environ.get('V2_PACKAGE','/home/bitcoinpapa/Descargas/diplomado-v2-produccion'))
model=WhisperModel('small',device='cpu',compute_type='int8',local_files_only=True,cpu_threads=6)
items=[]
for folder,key in zip(sorted((P/'locuciones').iterdir()),['negocios','credito','operaciones','planificacion','finanzas']):
 src=next(folder.glob('*.mp3')); dest=R/f'public/voice/v2/{key}.wav'; cache=R/f'out/v2/{key}-transcription.json'
 subprocess.run(['ffmpeg','-v','error','-y','-i',str(src),'-ar','48000','-ac','2','-c:a','pcm_s24le',str(dest)],check=True)
 duration=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',str(dest)]))
 if cache.exists(): words=json.loads(cache.read_text())
 else:
  segments,_=model.transcribe(str(dest),language='es',word_timestamps=True,beam_size=5,condition_on_previous_text=False)
  words=[[w.word.strip(),round(w.start,3),round(w.end,3)] for s in segments for w in s.words]
  cache.write_text(json.dumps(words,ensure_ascii=False,indent=2))
 script=next(folder.glob('*.txt'),None)
 if script:(R/f'docs/v2/{key}.txt').write_text(script.read_text())
 items.append(dict(key=key,duration=duration,frames=math.ceil((duration+1.5)*30),words=words,source=src.name,sha256=hashlib.sha256(src.read_bytes()).hexdigest(),scriptSupplied=bool(script)))
 print(key,duration,' '.join(w[0] for w in words),flush=True)
 (R/'src/v2/data.json').write_text(json.dumps(items,ensure_ascii=False,indent=2))
