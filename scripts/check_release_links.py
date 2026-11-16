"""Read-only external-link audit. Run after docs validation; defer release URL until publication."""
import concurrent.futures,json,urllib.request,urllib.error
from pathlib import Path
R=Path(__file__).resolve().parent.parent;urls=json.loads((R/'out/closure-v2/docs-check.json').read_text())['externalLinks']
def check(url):
 try:
  req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 ProjectClosureLinkAudit/2.0'})
  with urllib.request.urlopen(req,timeout=20) as response:return dict(url=url,status=response.status,finalURL=response.geturl())
 except urllib.error.HTTPError as e:return dict(url=url,status=e.code,error=str(e))
 except Exception as e:return dict(url=url,status=None,error=str(e))
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:results=list(pool.map(check,urls))
(R/'out/closure-v2/external-links.json').write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n')
for r in results:
 if r['status']!=200:print(r)
print('Checked',len(results),'URLs;',sum(r['status']==200 for r in results),'HTTP 200')
