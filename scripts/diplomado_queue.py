#!/usr/bin/env python3
"""Serial production queue; persists state and never marks visual QA as complete."""
import argparse
import json
import os
from pathlib import Path
import subprocess
import time

ROOT=Path(__file__).resolve().parent.parent


def alive(pid):
    try:
        os.kill(pid,0)
        return Path(f'/proc/{pid}/stat').read_text().split()[2]!='Z'
    except (ProcessLookupError,FileNotFoundError):return False


def main():
    p=argparse.ArgumentParser();p.add_argument('--wait-pids',default='');args=p.parse_args()
    state=ROOT/'out/cola-produccion.json'
    def save(**data):
        state.write_text(json.dumps({'pid':os.getpid(),**data},ensure_ascii=False,indent=2)+'\n')
    waiting=[int(x) for x in args.wait_pids.split(',') if x]
    save(status='WAITING_FOR_EXISTING_EXPORTS',waiting=waiting)
    while any(alive(pid) for pid in waiting):time.sleep(10)
    try:
        for block in ['07-10','11-16','17-21']:
            folder=ROOT/f'out/revision-{block}'
            while True:
                qa=folder/'qa.json'
                if qa.exists() and json.loads(qa.read_text()).get('status')=='TECHNICAL_PASS':break
                save(status='EXPORTING',block=block,visualQA='PENDING')
                subprocess.run(['python3','scripts/render_diplomado_blocks.py','--block',block],cwd=ROOT,check=True)
        save(status='TECHNICAL_EXPORTS_COMPLETE',visualQA='PENDING: inspect final MP4 frames and transitions')
    except Exception as exc:
        save(status='STOPPED_WITH_ERROR',error=str(exc),visualQA='PENDING')
        raise


if __name__=='__main__':main()
