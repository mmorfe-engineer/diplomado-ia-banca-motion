import json,difflib,re,unicodedata
from pathlib import Path
R=Path(__file__).resolve().parent.parent
p=R/'src/v2/data.json';data=json.loads(p.read_text());changes=[]
def norm(w):return re.sub(r'\W','',unicodedata.normalize('NFKD',w).encode('ascii','ignore').decode()).lower().replace('5','cinco')
for d in data:
 words=d['words'];script=R/f"docs/v2/{d['key']}.txt"
 if not script.exists():
  script.write_text('En la Vicepresidencia de Crédito, Valentina enfrenta otro desafío: analizar expedientes complejos con oportunidad y rigor.\n\nSu proyecto propone un sistema de inteligencia artificial que examina documentos financieros, identifica inconsistencias y simula escenarios de capacidad de pago.\n\nEl resultado es un expediente estructurado, con alertas y evidencias para sustentar la evaluación de los especialistas.\n\nMayor capacidad de análisis, preservando los controles y las atribuciones de decisión.\n')
 target=script.read_text().split();review=[]
 for tag,a,b,c,e in difflib.SequenceMatcher(None,[norm(w[0]) for w in words],[norm(w) for w in target],autojunk=False).get_opcodes():
  if tag=='equal':review.extend([[target[c+j],w[1],w[2]] for j,w in enumerate(words[a:b])]);continue
  changes.append(dict(key=d['key'],tag=tag,heard=words[a:b],script=target[c:e]))
  if e>c:
   start=words[a][1] if a<len(words) else words[-1][2];end=words[b-1][2] if b>a else start
   for j,w in enumerate(target[c:e]):review.append([w,round(start+(end-start)*j/(e-c),3),round(start+(end-start)*(j+1)/(e-c),3)])
 d['words']=review
p.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
(R/'out/v2/transcription-differences.json').write_text(json.dumps(changes,ensure_ascii=False,indent=2))
print(json.dumps(changes,ensure_ascii=False,indent=2))
