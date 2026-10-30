import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Handshake, Landmark, ArrowLeftRight, ShieldCheck, FileCheck2} from 'lucide-react';
import {Background, Doc, Glass, Grad, Title, Sfx} from '../fx';
import {InstitutionalIcon} from '../fx/InstitutionalIcon';
import {keys, prog, useT} from '../lib';
import {cueAt} from '../sync';
import {scenePre} from '../timeline';
import {C, INTER, OUTFIT} from '../theme';
const v=(word:string,n=0)=>scenePre('s4')+cueAt('v4',[word,n]);
// Existing light cones and cards now converge as functional icons for bank areas.
// Original S6: the distributed cards converge while preserving each role's identity.
export const S4:React.FC=()=>{
 const t=useT(), merge=prog(t,v('transformación'),1.2), common=prog(t,v('lenguaje'),.8);
 const roles=[{name:'Negocios',detail:'Necesidades del cliente',Icon:Handshake,color:C.blue,at:v('Negocios')},
  {name:'Crédito',detail:'Análisis financiero\ny financiamiento',Icon:Landmark,color:C.green,at:v('Crédito')},
  {name:'Operaciones',detail:'Ejecución y control\nde transacciones',Icon:ArrowLeftRight,color:C.yellow,at:v('Operaciones')}];
 return <AbsoluteFill>
  <Background hue={C.blue}/>
  <div style={{position:'absolute',left:110,top:64,fontFamily:OUTFIT,fontSize:22,letterSpacing:3,color:C.blue}}>INTELIGENCIA ARTIFICIAL APLICADA A LA BANCA</div>
  <Title p={prog(t,.1,.6)*(1-merge)} y={145} size={64}>Distintas áreas.<br/><Grad>Conocimientos y oportunidades.</Grad></Title>
  <Doc x={960} y={355} w={70} glow={.6} opacity={prog(t,.3,.7)*(1-merge)}/>
  <svg width={1920} height={1080} style={{position:'absolute',opacity:1-merge}}>
   <defs>{roles.map((r,i)=><linearGradient key={i} id={`bank4-light-${i}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={r.color} stopOpacity={.3}/><stop offset="1" stopColor={r.color} stopOpacity={0}/></linearGradient>)}</defs>
   {roles.map((r,i)=><polygon key={r.name} points={`950,380 970,380 ${[380,960,1540][i]+200},725 ${[380,960,1540][i]-200},725`} fill={`url(#bank4-light-${i})`} opacity={prog(t,r.at,.8)}/>)}
  </svg>
  {roles.map((r,i)=>{const p=prog(t,r.at,.7),x=keys(t,[[v('transformación'),[380,960,1540][i]],[v('transformación')+1.2,290+i*170]]),Icon=r.Icon;return <React.Fragment key={r.name}>
   <Glass tint={r.color} rainbow={p*.5} style={{left:[130,710,1290][i],top:440,width:500,height:430,opacity:p*(1-merge),transform:`translateY(${(1-p)*80}px)`}}>
    <div style={{position:'absolute',left:30,right:30,top:25,display:'flex',justifyContent:'center',alignItems:'center',gap:16,fontFamily:INTER,fontWeight:700,fontSize:33,color:C.yellow}}><Icon size={34} color={r.color}/>{r.name}</div>
    <div style={{position:'absolute',left:25,right:25,top:322,textAlign:'center',fontFamily:INTER,fontSize:27,lineHeight:1.35,color:C.slate200,whiteSpace:'pre-line'}}>{r.detail.slice(0,Math.floor(r.detail.length*prog(t,r.at+.3,1.7,x=>x)))}</div>
   </Glass>
   <InstitutionalIcon Icon={Icon} label={r.name} x={x} y={keys(t,[[v('transformación'),640],[v('transformación')+1.2,550]])+Math.sin(t*1.2+i)*4} scale={.7-merge*.08} color={r.color} opacity={p} glow={.4}/>
   <div style={{position:'absolute',left:x-120,top:690,width:240,textAlign:'center',fontFamily:INTER,fontSize:25,fontWeight:600,color:r.color,opacity:merge}}>{r.name}</div>
  </React.Fragment>;})}
  <Title p={merge} y={145} size={65}>Un <Grad>lenguaje común</Grad><br/>con atribuciones y controles claros.</Title>
  <svg width={1920} height={1080} style={{position:'absolute',opacity:merge}}>{roles.map((r,i)=><path key={r.name} d={`M ${290+i*170} 735 Q 870 820 1030 565`} fill="none" stroke={r.color} strokeWidth={2.5} strokeDasharray="9 12" strokeDashoffset={-t*27}/>)}</svg>
  <Glass tint={C.blue} rainbow={.5} style={{left:1000,top:400,width:740,height:440,opacity:common,transform:`translateX(${(1-common)*130}px)`}}>
   <div style={{padding:'32px 40px',fontFamily:INTER,color:C.yellow}}>
    <div style={{display:'flex',alignItems:'center',gap:18,fontFamily:OUTFIT,fontSize:36,fontWeight:600}}><FileCheck2 size={44} color={C.blue}/>Lenguaje común</div>
    <div style={{height:1,background:`${C.blue}55`,margin:'25px 0'}}/>
    <div style={{fontSize:28,lineHeight:1.5,opacity:prog(t,v('atribuciones'),.6)}}>Sin confundir atribuciones</div>
    <div style={{display:'flex',alignItems:'center',gap:17,marginTop:24,fontSize:28,lineHeight:1.35,opacity:prog(t,v('controles'),.7)}}><ShieldCheck size={42} color={C.green}/><span>Controles de seguridad<br/>de la información</span></div>
   </div>
  </Glass>
  {roles.map(r=><Sfx key={r.name} at={r.at} name="pop" vol={.14}/>)}<Sfx at={v('transformación')} name="whoosh" vol={.16}/><Sfx at={v('lenguaje')} name="shimmer" vol={.13}/><Sfx at={v('controles')} name="click" vol={.13}/>
 </AbsoluteFill>;
};
