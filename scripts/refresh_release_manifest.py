"""Refresh public manifest after documentary changes; approved media hashes never change."""
import hashlib,json
from pathlib import Path
R=Path(__file__).resolve().parent.parent;D=R/'deliverables/v2'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
media={'out/v2/diplomado-ia-v2-optimizado.mp4':'06665a81e4968434acac12cb9c319d71d1787b42fceb1b8e207076fdcf4d8be5','out/v2/base-revision-90/diplomado-ia-v2-final.mp4':'7e5ab7c12955be6efb273f1cf1d8ba34fd37fd36c75669e39ee00be450a511bc'}
for p,h in media.items():assert sha(R/p)==h,p
records={**media}
for base in [D,R/'docs/media/v2']:
 for p in sorted(base.iterdir()):
  if p.is_file() and p.name!='MANIFEST.json':records[str(p.relative_to(R))]=sha(p)
# This intentionally excludes private paths and obsolete intermediate captures.
(D/'MANIFEST.json').write_text(json.dumps(dict(version='2.0.0',algorithm='SHA-256',approvedMediaNotDistributed=True,files=records),ensure_ascii=False,indent=2)+'\n')
print('Manifest verified:',len(records),'entries; private masters referenced by hash only')
