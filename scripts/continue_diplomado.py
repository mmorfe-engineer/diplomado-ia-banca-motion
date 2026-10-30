#!/usr/bin/env python3
"""Incremental audio preparation and local transcription; existing assets are preserved.

Usage: python scripts/continue_diplomado.py 07 08 09 10
Transcriptions remain separate candidates until editorial comparison is complete.
"""
import argparse
import hashlib
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('ids', nargs='+')
    parser.add_argument('--transcribe', action='store_true')
    args = parser.parse_args()
    manifest = json.loads((ROOT / 'inputs/voiceover/diplomado-manifest.json').read_text())
    durations_path = ROOT / 'src/locales/diplomado/voices.json'
    durations = json.loads(durations_path.read_text())
    model = None
    for block_id in args.ids:
        spec = next(b for b in manifest if b['id'] == block_id)
        source = Path(spec['source'])
        assert hashlib.sha256(source.read_bytes()).hexdigest() == spec['sha256']
        voice = 'v' + str(int(block_id)) if block_id != '17_18' else 'v17_18'
        dest = ROOT / f'public/voice/diplomado/{voice}.wav'
        if not dest.exists():
            subprocess.run(['ffmpeg', '-n', '-v', 'error', '-i', str(source), '-af',
                            'loudnorm=I=-16:TP=-1.5:LRA=11', '-ar', '48000', '-ac', '1', str(dest)], check=True)
        duration = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries',
                          'format=duration', '-of', 'csv=p=0', str(dest)]))
        if voice in durations:
            assert abs(durations[voice] - duration) < 1e-6
        else:
            durations[voice] = duration
            durations_path.write_text(json.dumps(durations, indent=2) + '\n')
        print(f'{block_id}: {duration:.6f}s; original verified', flush=True)
        if not args.transcribe:
            continue
        output = ROOT / f'out/transcripcion-{block_id}-candidata.json'
        if output.exists():
            print(f'Preserving {output.name}', flush=True)
            continue
        if model is None:
            from faster_whisper import WhisperModel
            model = WhisperModel('small', device='cpu', compute_type='int8', local_files_only=True, cpu_threads=4)
        # Decode with the same ffmpeg used for production; avoids PyAV API drift.
        import numpy as np
        pcm = subprocess.check_output(['ffmpeg', '-v', 'error', '-i', str(dest),
                                       '-ar', '16000', '-ac', '1', '-f', 'f32le', '-'])
        segments, info = model.transcribe(np.frombuffer(pcm, dtype=np.float32), language='es', word_timestamps=True, beam_size=5)
        words = [[w.word.strip(), round(w.start, 3), round(w.end, 3)] for s in segments for w in s.words]
        output.write_text(json.dumps({'voice': voice, 'sourceSHA256': spec['sha256'],
                          'duration': duration, 'words': words, 'status': 'PENDING_EDITORIAL_REVIEW'}, ensure_ascii=False, indent=2) + '\n')
        print(f'{block_id}: {len(words)} timestamped words; pending review', flush=True)


if __name__ == '__main__':
    main()
