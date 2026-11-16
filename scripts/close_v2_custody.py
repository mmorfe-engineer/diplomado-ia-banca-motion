"""Verify approved private media and write the redistributable approval record."""
import hashlib,json,subprocess
from pathlib import Path
R=Path(__file__).resolve().parent.parent
master=R/'out/v2/diplomado-ia-v2-optimizado.mp4'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(master)=='06665a81e4968434acac12cb9c319d71d1787b42fceb1b8e207076fdcf4d8be5'
probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-show_chapters','-of','json',str(master)]))
v=next(s for s in probe['streams'] if s['codec_type']=='video');a=next(s for s in probe['streams'] if s['codec_type']=='audio')
assert int(v['nb_frames'])==20963 and v['r_frame_rate']=='30/1' and (v['width'],v['height'])==(1920,1080)
assert v['codec_name']=='h264' and a['codec_name']=='aac' and a['channels']==2
record=dict(version='2.0.0',approvalDate='2026-11-16',approvedBy='Martin Morfe · morfe.studio',approvalSource='Explicit final audiovisual approval in the project closure instruction',status='APPROVED',master='out/v2/diplomado-ia-v2-optimizado.mp4',sha256=sha(master),sizeBytes=master.stat().st_size,frames=20963,fps=30,durationExact='20963/30 seconds',durationSeconds=20963/30,width=1920,height=1080,videoCodec='h264',audioCodec='aac',audioChannels=2,audioSampleRate=48000,scenes=26,recordings=24,newScenes=5,newRecordings=5,captionCues=264,vimeoV2=None,redistribution='No audiovisual binaries included in the public Git repository or release assets',v1MasterSHA256='0f9d610c65a5663a3ae0ab380c309fcf256339997ee4f6d4c5f6c07b1b7c9b19',baseReviewSHA256='7e5ab7c12955be6efb273f1cf1d8ba34fd37fd36c75669e39ee00be450a511bc')
(R/'deliverables/v2/approval.json').write_text(json.dumps(record,ensure_ascii=False,indent=2)+'\n');print(json.dumps(record,ensure_ascii=False,indent=2))
