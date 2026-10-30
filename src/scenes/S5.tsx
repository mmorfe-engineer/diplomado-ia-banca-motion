import React from 'react';
import {AbsoluteFill} from 'remotion';
import {GraduationCap, UsersRound, Code2, LockKeyhole, Compass, ShieldCheck, Lightbulb, FileCheck2} from 'lucide-react';
import {Background, Glass, Grad, Title, Sfx} from '../fx';
import {InstitutionalIcon} from '../fx/InstitutionalIcon';
import {keys, prog, useT} from '../lib';
import {cueAt} from '../sync';
import {scenePre} from '../timeline';
import {C, INTER, OUTFIT} from '../theme';
const v=(word:string,n=0)=>scenePre('s5')+cueAt('v5',[word,n]);
// The original S5's camera staging, progressive interface states and typed output
// are repurposed to explain the programme. No commercial application is mounted.
export const S5:React.FC=()=>{
 const t=useT(), explain=prog(t,v('No'),.8), ambassadors=prog(t,v('embajadores'),1), cohort=prog(t,v('programa',1),.8);
 const skills=[{text:'Posibilidades',Icon:Compass,at:v('posibilidades'),color:C.blue},
  {text:'Límites de la IA',Icon:ShieldCheck,at:v('límites'),color:C.orange},
  {text:'Oportunidades',Icon:Lightbulb,at:v('oportunidades'),color:C.green},
  {text:'Iniciativas para evaluación',Icon:FileCheck2,at:v('iniciativas'),color:C.blue}];
 return <AbsoluteFill>
  <Background hue={C.blue}/>
  <div style={{position:'absolute',left:110,top:64,fontFamily:OUTFIT,fontSize:22,letterSpacing:3,color:C.blue}}>INTELIGENCIA ARTIFICIAL APLICADA A LA BANCA</div>
  <div style={{position:'absolute',inset:0,opacity:1-explain,transform:`scale(${1+explain*.15})`}}>
   <GraduationCap size={105} color={C.blue} style={{position:'absolute',left:907,top:270,opacity:prog(t,v('Diplomado'),.6),transform:`translateY(${(1-prog(t,v('Diplomado'),.6))*55}px)`}}/>
   <Title p={prog(t,v('Diplomado'),.8)} y={445} size={70}>Diplomado en<br/><Grad>Inteligencia Artificial</Grad><br/>Aplicada a la Banca</Title>
  </div>
  <Title p={explain*(1-ambassadors)} y={150} size={63}>No busca convertir participantes<br/>en programadores.</Title>
  <div style={{position:'absolute',inset:0,opacity:explain*(1-ambassadors)}}>
   <InstitutionalIcon Icon={UsersRound} label="Participantes del diplomado" x={420} y={610} scale={1.1} color={C.orange} glow={.45}/>
   {[{text:'Programadores',Icon:Code2,at:v('programadores'),y:415},{text:'Despliegues independientes',Icon:LockKeyhole,at:v('despliegues'),y:635}].map(r=>{const p=prog(t,r.at,.6),Icon=r.Icon;return <Glass key={r.text} tint={C.blue} style={{left:850,top:r.y,width:820,height:170,opacity:p,transform:`translateX(${(1-p)*110}px)`}}><Icon size={54} color={C.blue} style={{position:'absolute',left:42,top:55}}/><div style={{position:'absolute',left:125,top:62,fontFamily:INTER,fontSize:32,color:C.slate200}}>{r.text}</div><svg width={820} height={170} style={{position:'absolute'}}><path d={`M 35 130 L ${35+750*prog(t,r.at+.35,.6)} ${130-90*prog(t,r.at+.35,.6)}`} stroke={C.orange} strokeWidth={4} opacity={.85}/></svg></Glass>;})}
  </div>
  <Title p={ambassadors*(1-cohort)} y={145} size={66}><Grad from={C.orange} to={C.yellow}>Embajadores digitales</Grad><br/><span style={{fontSize:38,color:C.slate300,opacity:prog(t,v('sector'),.6)}}>Sector financiero nacional</span></Title>
  <div style={{position:'absolute',inset:0,opacity:ambassadors*(1-cohort)}}>
   {[{x:270,color:C.blue,s:.63},{x:470,color:C.orange,s:1.12},{x:670,color:C.green,s:.63}].map((r,i)=><InstitutionalIcon key={i} Icon={UsersRound} label="Profesionales de sus áreas" x={r.x} y={620+Math.sin(t*1.2+i)*5} scale={r.s} color={r.color} glow={.45} opacity={prog(t,v('embajadores')+i*.15,.7)}/>)}
   <div style={{position:'absolute',left:190,top:820,width:560,textAlign:'center',fontFamily:OUTFIT,fontSize:30,color:C.orange}}>Profesionales de sus áreas</div>
   {skills.map((r,i)=>{const p=prog(t,r.at,.65),Icon=r.Icon;return <Glass key={r.text} tint={r.color} rainbow={p*.45} style={{left:900+(i%2)*430,top:365+Math.floor(i/2)*240,width:395,height:205,opacity:p,transform:`translateY(${(1-p)*60}px)`}}><Icon size={45} color={r.color} style={{position:'absolute',left:32,top:30}}/><div style={{position:'absolute',left:30,right:25,top:103,fontFamily:INTER,fontSize:29,fontWeight:600,color:C.yellow,lineHeight:1.3}}>{r.text}</div></Glass>;})}
  </div>
  <Title p={cohort} y={145} size={65}>Formar <Grad from={C.orange} to={C.yellow}>embajadores digitales</Grad></Title>
  <Glass tint={C.green} rainbow={.6} style={{left:770,top:365,width:850,height:450,opacity:cohort,transform:`translateY(${(1-cohort)*110}px)`}}>
   <div style={{position:'absolute',left:0,right:0,top:35,fontFamily:OUTFIT,fontSize:146,fontWeight:600,textAlign:'center',color:C.green,opacity:prog(t,v('cuarenta'),.6),transform:`scale(${.85+.15*prog(t,v('cuarenta'),.6)})`}}>40+</div>
   <div style={{position:'absolute',left:0,right:0,top:215,fontFamily:INTER,fontSize:40,textAlign:'center',color:C.yellow,opacity:prog(t,v('participantes',1),.5)}}>participantes</div>
   <div style={{position:'absolute',left:75,right:75,top:315,display:'flex',justifyContent:'space-between'}}>{Array.from({length:9}).map((_,i)=><div key={i} style={{width:45,height:5,borderRadius:4,background:[C.blue,C.green,C.orange][i%3],opacity:prog(t,v('cuarenta')+i*.055,.3)}}/>)}</div>
  </Glass>
  <InstitutionalIcon Icon={UsersRound} label="Cohortes de participantes" x={430} y={605+Math.sin(t*1.4)*5} scale={1.15} color={C.orange} glow={.55} opacity={cohort}/>
  <Sfx at={v('Diplomado')} name="shimmer" vol={.15}/><Sfx at={v('embajadores')} name="whoosh" vol={.16}/>{skills.map(r=><Sfx key={r.text} at={r.at} name="pop" vol={.12}/>)}<Sfx at={v('cuarenta')} name="ding" vol={.15}/>
 </AbsoluteFill>;
};
