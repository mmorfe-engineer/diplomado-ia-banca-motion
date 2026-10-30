// Complete only missing frames; use the same frozen bundle as institutional review.
import {openBrowser,selectComposition,renderMedia} from '@remotion/renderer';
import {existsSync,mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';

const root=resolve('out/finalizacion-01-21');
const recovery=JSON.parse(readFileSync(resolve(root,'recuperacion.json')));
const hash=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
for(const [p,h] of Object.entries(recovery.sourceHashes))if(hash(p)!==h)throw new Error(`Source changed: ${p}`);
for(const [p,h] of Object.entries(recovery.mediaHashes))if(hash(p)!==h)throw new Error(`Existing media changed: ${p}`);
const plan=JSON.parse(readFileSync(resolve(root,'plan-render.json')));
const maxChunks=Number(process.argv[2]??2);let saved=0;
const serveUrl=resolve('out/correccion-institucional/bundle');
if(!existsSync(resolve(serveUrl,'index.html')))throw new Error('Existing frozen bundle is unavailable');
const browser=await openBrowser('chrome',{browserExecutable:'/home/bitcoinpapa/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell',logLevel:'error'});
const frames=p=>Number(JSON.parse(execFileSync('ffprobe',['-v','error','-show_entries','stream=nb_frames','-of','json',p])).streams[0].nb_frames);
try {
 for(const job of plan) {
  const inputProps={block:job.block};
  const composition=await selectComposition({serveUrl,id:`DiplomadoIA-Revision${job.block}`,inputProps,puppeteerInstance:browser,logLevel:'error'});
  if(composition.durationInFrames!==job.frames)throw new Error(`Timeline differs: ${job.block}`);
  mkdirSync(resolve(job.folder),{recursive:true});
  for(let first=job.range[0];first<=job.range[1];first+=300) {
   const last=Math.min(first+299,job.range[1]);
   const outputLocation=resolve(job.folder,`${String(first).padStart(6,'0')}-${String(last).padStart(6,'0')}.mp4`);
   if(existsSync(outputLocation)) {
    if(frames(outputLocation)!==last-first+1)throw new Error(`Incomplete segment retained: ${outputLocation}`);
    console.log(`Preserved ${job.block} ${first}-${last}`);continue;
   }
   writeFileSync(resolve(root,'estado.json'),JSON.stringify({status:'RENDERING_MISSING_FRAMES',block:job.block,range:[first,last]},null,2)+'\n');
   await renderMedia({serveUrl,composition,inputProps,puppeteerInstance:browser,outputLocation,
    frameRange:[first,last],codec:'h264',crf:18,x264Preset:'fast',muted:true,concurrency:4,logLevel:'error',overwrite:false});
   if(frames(outputLocation)!==last-first+1)throw new Error('Unexpected frame count');
   console.log(`Saved ${job.block} ${first}-${last}`);
   writeFileSync(resolve(root,'estado.json'),JSON.stringify({status:'CHECKPOINT_COMPLETE',block:job.block,nextFrame:last+1},null,2)+'\n');
   if(++saved>=maxChunks){await browser.close({silent:true});process.exit(0);}
  }
 }
 writeFileSync(resolve(root,'estado.json'),JSON.stringify({status:'ALL_MISSING_FRAMES_COMPLETE',totalFrames:recovery.totalFrames},null,2)+'\n');
} finally {await browser.close({silent:true});}
