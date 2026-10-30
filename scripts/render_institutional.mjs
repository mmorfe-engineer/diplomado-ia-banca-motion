import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import {existsSync,mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';

const dir=resolve('out/correccion-institucional');
const plan=JSON.parse(readFileSync(resolve(dir,'plan.json'),'utf8'));
const mode=process.argv[2]??'preview';
const maxChunks=Number(process.argv[3]??2);
let savedChunks=0;
if(!['preview','render'].includes(mode)) throw new Error('Expected preview or render');
const sources=['src/fx/InstitutionalIcon.tsx','src/scenes/S1.tsx','src/scenes/S4.tsx','src/scenes/S5.tsx',
 'src/scenes/diplomado/Block07_10.tsx','src/scenes/diplomado/Block17_21.tsx'];
const revision=createHash('sha256').update(sources.map(p=>readFileSync(p)).join('\n')).digest('hex');
const frozen=resolve(dir,'revision-render.json');
if(existsSync(frozen)) {
 if(JSON.parse(readFileSync(frozen)).revision!==revision)throw new Error('Sources differ from frozen export; preserve outputs before starting a new revision');
} else writeFileSync(frozen,JSON.stringify({revision,sources},null,2)+'\n');
const bundleDir=resolve(dir,'bundle');
const serveUrl=existsSync(resolve(bundleDir,'index.html'))?bundleDir:await bundle({entryPoint:resolve('src/index.ts'),outDir:bundleDir,symlinkPublicDir:true});
const browser=await openBrowser('chrome',{browserExecutable:'/home/bitcoinpapa/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell',logLevel:'error'});
const countFrames=p=>Number(JSON.parse(execFileSync('ffprobe',['-v','error','-show_entries','stream=nb_frames','-of','json',p])).streams[0].nb_frames);
try {
 for(const job of plan) {
  const inputProps={block:job.block};
  const composition=await selectComposition({serveUrl,id:`DiplomadoIA-Revision${job.block}`,inputProps,puppeteerInstance:browser,logLevel:'error'});
  if(composition.durationInFrames!==job.frames)throw new Error(`Duration changed: ${job.block}`);
  if(mode==='preview') {
   for(const [scene,frame] of job.previews) {
    const output=resolve(dir,`preview-${String(scene).padStart(2,'0')}-${frame}.png`);
    if(!existsSync(output))await renderStill({serveUrl,composition,inputProps,puppeteerInstance:browser,output,frame,scale:.5,imageFormat:'png',logLevel:'error'});
    console.log(`Preview ${scene} at ${frame}`);
   }
  } else {
   const folder=resolve(dir,`bloque-${job.block}`,'chunks');mkdirSync(folder,{recursive:true});
   for(let first=job.range[0];first<=job.range[1];first+=300) {
    const last=Math.min(first+299,job.range[1]);
    const outputLocation=resolve(folder,`${String(first).padStart(6,'0')}-${String(last).padStart(6,'0')}.mp4`);
    if(existsSync(outputLocation)) {
     if(countFrames(outputLocation)!==last-first+1)throw new Error(`Incomplete chunk retained: ${outputLocation}`);
     console.log(`Preserved ${job.block} ${first}-${last}`);continue;
    }
    writeFileSync(resolve(dir,'estado.json'),JSON.stringify({status:'RENDERING_CORRECTIONS',block:job.block,range:[first,last],revision},null,2)+'\n');
    await renderMedia({serveUrl,composition,inputProps,puppeteerInstance:browser,outputLocation,
     frameRange:[first,last],codec:'h264',crf:18,x264Preset:'fast',muted:true,concurrency:4,logLevel:'error',overwrite:false});
    if(countFrames(outputLocation)!==last-first+1)throw new Error('Unexpected frame count');
    console.log(`Saved ${job.block} ${first}-${last}`);
    savedChunks++;
    if(savedChunks>=maxChunks) {
     writeFileSync(resolve(dir,'estado.json'),JSON.stringify({status:'CHECKPOINT_COMPLETE',block:job.block,nextFrame:last+1,revision},null,2)+'\n');
     await browser.close({silent:true});
     process.exit(0);
    }
   }
  }
 }
 writeFileSync(resolve(dir,`estado-${mode}.json`),JSON.stringify({status:mode==='render'?'CORRECTED_FRAMES_COMPLETE':'PREVIEWS_COMPLETE',revision},null,2)+'\n');
} finally {await browser.close({silent:true});}
