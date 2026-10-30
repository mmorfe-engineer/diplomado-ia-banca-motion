#!/usr/bin/env python3
"""Prepare only the six authorized review tracks; never trim/modify the originals.

Explicit mapping is stored in inputs/voiceover/diplomado-manifest.json.
The 17_18 recording remains a single source; its scene split is intentionally pending.
"""
import hashlib
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
manifest = json.loads((ROOT / 'inputs/voiceover/diplomado-manifest.json').read_text())
durations = json.loads((ROOT / "src/locales/diplomado/voices.json").read_text())
for block_id, voice in [(f'{i:02}', f'v{i}') for i in range(1, 7)]:
    spec = next(item for item in manifest if item['id'] == block_id)
    source = Path(spec['source'])
    assert hashlib.sha256(source.read_bytes()).hexdigest() == spec['sha256'], f'Source changed: {block_id}'
    dest = ROOT / 'public/voice/diplomado' / f'{voice}.wav'
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists():
        continue  # Preserve every approved working WAV as well as its MP3 source.
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', str(source), '-af',
                    'loudnorm=I=-16:TP=-1.5:LRA=11', '-ar', '48000', '-ac', '1', str(dest)], check=True)
    durations[voice] = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries',
                            'format=duration', '-of', 'csv=p=0', str(dest)]))
(ROOT / 'src/locales/diplomado/voices.json').write_text(json.dumps(durations, indent=2) + '\n')
print(durations)
