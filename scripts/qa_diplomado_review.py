#!/usr/bin/env python3
"""Read-only QA of the authorized review blocks and immutable original audio."""
import argparse
import hashlib
import json
import math
import re
import subprocess
from pathlib import Path
from array import array

ROOT = Path(__file__).resolve().parent.parent
parser = argparse.ArgumentParser()
parser.add_argument('--block', choices=['01-02', '03-06'], default='01-02')
args = parser.parse_args()
BLOCK = args.block
OUTPUT = ROOT / ('out/revision' if BLOCK == '01-02' else 'out/revision-03-06')
VIDEO = OUTPUT / f'diplomado-ia-escenas-{BLOCK}.mp4'
if BLOCK == '03-06':
    timing = json.loads((OUTPUT / 'timeline.json').read_text())
    expected_frames = timing['frames']
    tracks = [(s['voice'], s['voiceStart']) for s in timing['scenes']]
    scene_numbers = [3, 4, 5, 6]
else:
    expected_frames = 1606
    tracks = [('v1', .6), ('v2', 874/30)]
    scene_numbers = [1, 2]


def probe(path):
    return json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', str(path)]))

def decode(path, start=None, duration=None):
    cmd = ['ffmpeg', '-v', 'error', '-i', str(path)]
    if start is not None:
        cmd += ['-ss', str(start)]
    if duration is not None:
        cmd += ['-t', str(duration)]
    return array('f', subprocess.check_output(cmd + ['-vn', '-f', 'f32le', '-ar', '48000', '-ac', '1', '-']))

manifest = json.loads((ROOT / 'inputs/voiceover/diplomado-manifest.json').read_text())
assert len(manifest) == 19
assert sorted(s for b in manifest for s in b['scenes']) == list(range(1, 21))
for block in manifest:
    assert hashlib.sha256(Path(block['source']).read_bytes()).hexdigest() == block['sha256']
words = json.loads((ROOT / 'src/locales/diplomado/words.json').read_text())
voices = json.loads((ROOT / 'src/locales/diplomado/voices.json').read_text())
for key, _ in tracks:
    data = words[key]
    assert all(0 <= s <= e <= voices[key] for _, s, e in data)
    assert all(a[1] <= b[1] for a, b in zip(data, data[1:]))
for source in [f'src/scenes/S{i}.tsx' for i in scene_numbers] + ['src/locales/diplomado/words.json']:
    assert not re.search(r'BNC|NuevaMente|nuevamente\.app|carné|carnét', (ROOT / source).read_text())
meta = probe(VIDEO)
video = next(s for s in meta['streams'] if s['codec_type'] == 'video')
audio = next(s for s in meta['streams'] if s['codec_type'] == 'audio')
assert (video['width'], video['height'], video['r_frame_rate'], video['codec_name']) == (1920, 1080, '30/1', 'h264')
assert int(video['nb_frames']) == expected_frames
assert abs(float(meta['format']['duration']) - expected_frames/30) < 0.05
assert audio['codec_name'] == 'aac'
# Correlate 8 s of each actual WAV with the encoded mix at its exact scene offset.
# This detects wrong source/order, restart and drift independently of captions.
correlations = {}
conversion_samples = {}
for key, start in tracks:
    original = next(b for b in manifest if b['id'] == f'{int(key[1:]):02}')
    source_samples = len(decode(original['source']))
    wav_samples = len(decode(ROOT / f'public/voice/diplomado/{key}.wav'))
    # loudnorm and direct MP3 decoding can round the final resampling boundary
    # differently by one sample (20.8 microseconds), never by a speech interval.
    assert abs(wav_samples - source_samples) <= 1
    assert abs(wav_samples/48000 - voices[key]) < 1e-6
    conversion_samples[key] = {'sourceSamples48k': source_samples, 'wavSamples48k': wav_samples,
                               'deltaSamples': wav_samples-source_samples}
    correlations[key] = []
    for source_at in [2, voices[key]-5]:
        ref = decode(ROOT / f'public/voice/diplomado/{key}.wav', source_at, 8)
        rendered = decode(VIDEO, start + source_at, 8)
        count = min(len(ref), len(rendered))
        ref, rendered = ref[:count], rendered[:count]
        # Find the strongest 250 ms region, then measure its actual sample offset.
        # Pure stdlib keeps QA independent of external Python environments.
        window = 12000
        anchor = max(range(48, count-window-48, window),
                     key=lambda offset: sum(x*x for x in ref[offset:offset+window]))
        sample = ref[anchor:anchor+window]
        lag = max(range(-48, 49), key=lambda delta: sum(
            a*b for a, b in zip(sample, rendered[anchor+delta:anchor+delta+window])))
        # Remotion rounds audio offsets to milliseconds; verify the actual offset
        # before measuring waveform agreement at the native 48 kHz sample rate.
        assert abs(lag) <= 48, (key, 'audio offset exceeds 1 ms', lag)
        aligned_ref = ref[max(0, -lag):min(count, count-lag)]
        aligned_mix = rendered[max(0, lag):min(count, count+lag)]
        size = len(aligned_ref)
        a_sum, b_sum = sum(aligned_ref), sum(aligned_mix)
        covariance = sum(a*b for a,b in zip(aligned_ref, aligned_mix)) - a_sum*b_sum/size
        a_var = sum(a*a for a in aligned_ref) - a_sum*a_sum/size
        b_var = sum(b*b for b in aligned_mix) - b_sum*b_sum/size
        correlation = covariance / math.sqrt(a_var*b_var)
        assert correlation > 0.94, (key, correlation)
        correlations[key].append({'sourceStart': source_at, 'correlation': correlation, 'offsetMilliseconds': lag/48})
# Force complete decoding: a valid header alone does not establish a usable MP4.
subprocess.run(['ffmpeg', '-v', 'error', '-i', str(VIDEO), '-f', 'null', '-'], check=True)
report = {'status': 'PASS', 'video': str(VIDEO), 'duration': float(meta['format']['duration']),
          'frames': int(video['nb_frames']), 'resolution': '1920x1080', 'fps': 30,
          'codecs': ['h264', 'aac'], 'originalSourceHashes': '19/19 unchanged',
          'wordTimestamps': {k:len(words[k]) for k, _ in tracks},
          'conversionSamples': conversion_samples, 'voiceMixCorrelations': correlations, 'decode': 'complete, no errors',
          'scope': f'Scenes {BLOCK} only; no production beyond 06; 17_18 unsplit'}
# Validate only the explicitly approved editorial changes and preserve approvals
# when rerunning this technical report.
normalize = lambda text: re.findall(r'\w+', text.lower())
blocks = json.loads((ROOT / 'docs/dialogos_banca.json').read_text())
for i in scene_numbers:
    assert normalize(blocks[i-1]['text']) == normalize(' '.join(w[0] for w in words[f'v{i}']))
prior = json.loads((ROOT / 'docs/editorial/version-anterior-01-02/dialogos_banca.json').read_text())
for before, after in zip(prior, blocks):
    if before['id'] not in ['01', '02', '05', '07', '08']:
        assert before == after
approval = json.loads((ROOT / 'docs/editorial/aprobaciones-01-02.json').read_text())
assert hashlib.sha256((ROOT / 'out/revision/diplomado-ia-escenas-01-02.mp4').read_bytes()).hexdigest() == approval['approvedVideoSHA256']
report['approvedReview01_02'] = 'MP4 SHA-256 unchanged; no new render'
report['captionText'] = 'Literal words match approved working script; timestamps monotonic and within source duration'
report['editorialStatus'] = 'RESUELTAS Y APROBADAS'
report['editorialObservations'] = approval['observations'] + [json.loads((ROOT / 'docs/editorial/aprobacion-05.json').read_text())]
report_path = OUTPUT / 'qa.json'
previous = json.loads(report_path.read_text()) if report_path.exists() else {}
previous.update(report)
report_path.write_text(json.dumps(previous, ensure_ascii=False, indent=2) + '\n')
print(json.dumps(report, ensure_ascii=False, indent=2))
