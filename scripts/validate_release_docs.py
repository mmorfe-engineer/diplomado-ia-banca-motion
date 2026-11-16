"""Check repository Markdown links/images and Mermaid block structure; no private media needed."""
import json,re,subprocess,sys
from pathlib import Path
from urllib.parse import unquote,urlsplit
R=Path(__file__).resolve().parent.parent
names=subprocess.check_output(['git','ls-files','--cached','--others','--exclude-standard'],cwd=R,text=True).splitlines()
files=sorted({R/n for n in names if n.endswith('.md') and (R/n).is_file()})
errors=[];external=set();images=[];mermaids=[];links=0
for p in files:
 text=p.read_text()
 if text.count('```')%2:errors.append(f'{p.relative_to(R)}: unbalanced code fences')
 for i,code in enumerate(re.findall(r'```mermaid\s*\n(.*?)```',text,re.S)):
  if not re.match(r'\s*(flowchart|graph|sequenceDiagram|stateDiagram|classDiagram|gantt|pie|erDiagram|journey|mindmap)',code):errors.append(f'{p}: unknown Mermaid diagram')
  mermaids.append(dict(file=str(p.relative_to(R)),index=i,source=code))
 for raw in re.findall(r'\]\(([^)]+)\)',text):
  raw=raw.strip().strip('<>');target=raw.split(' "')[0];parts=urlsplit(target)
  if parts.scheme in ['https','http']:external.add(target);continue
  if parts.scheme in ['mailto','tel']:continue
  if parts.scheme:errors.append(f'{p.relative_to(R)}: unsupported link {target}');continue
  if not parts.path:continue
  resolved=(p.parent/unquote(parts.path)).resolve();links+=1
  if not resolved.exists():errors.append(f'{p.relative_to(R)}: missing {target}')
 for raw in re.findall(r'!\[[^\]]*\]\(([^)]+)\)',text):
  if raw.startswith('http'):continue
  q=(p.parent/unquote(raw.strip('<>'))).resolve()
  if q.exists() and q.stat().st_size:images.append(str(q.relative_to(R)))
  else:errors.append(f'{p}: invalid image {raw}')
report=dict(status='PASS' if not errors else 'FAIL',markdownFiles=len(files),internalLinksChecked=links,imagesChecked=len(images),mermaidDiagrams=len(mermaids),mermaidMethod='Structural check here; actual Mermaid CLI parsing recorded in closure validation',errors=errors,externalLinks=sorted(external))
if '--export' in sys.argv:
 out=R/'out/closure-v2';out.mkdir(parents=True,exist_ok=True);(out/'docs-check.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));(out/'mermaid-blocks.json').write_text(json.dumps(mermaids,ensure_ascii=False,indent=2))
print(json.dumps({k:v for k,v in report.items() if k!='externalLinks'},ensure_ascii=False,indent=2));sys.exit(bool(errors))
