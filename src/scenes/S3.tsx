import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Lightbulb, CircleHelp, Database, SearchCheck, ShieldCheck, KeyRound, Check} from 'lucide-react';
import {Background, Person, Doc, Glass, Grad, Title, Sfx} from '../fx';
import {keys, prog, useT} from '../lib';
import {cueAt} from '../sync';
import {scenePre} from '../timeline';
import {C, INTER, OUTFIT} from '../theme';

const v=(word:string,n=0)=>scenePre('s3')+cueAt('v3',[word,n]);
// Adaptation of the original S3 pipeline: sequential nodes, travelling light,
// structured output and camera pullback, now driven by the banking narration.
export const S3:React.FC=()=>{
 const t=useT();
 const begin=v('definir'), transition=v('transición'), end=v('competencia');
 const pipeline=prog(t,begin,0.8), out=prog(t,transition,1.2);
 const nodes=[{label:'Qué resolver',Icon:CircleHelp,at:v('resolver'),color:C.orange},
  {label:'Información',Icon:Database,at:v('información'),color:C.blue},
  {label:'Viabilidad',Icon:SearchCheck,at:v('viable'),color:C.green},
  {label:'Riesgos',Icon:ShieldCheck,at:v('riesgos'),color:C.orange},
  {label:'Autorización',Icon:KeyRound,at:v('autorizarla'),color:C.blue}];
 const travel=prog(t,v('autorizarla')+0.3,1.9,x=>x);
 return <AbsoluteFill>
  <Background hue={C.blue}/>
  <div style={{position:'absolute',left:110,top:64,fontFamily:OUTFIT,fontSize:22,letterSpacing:3,color:C.blue}}>INTELIGENCIA ARTIFICIAL APLICADA A LA BANCA</div>
  <Title p={prog(t,0.1,0.6)*(1-pipeline)} y={150} size={70}>Una buena <Grad from={C.orange} to={C.yellow}>idea</Grad><br/><span style={{opacity:prog(t,v('proyecto'),0.6)}}>es el comienzo de un proyecto.</span></Title>
  <div style={{position:'absolute',inset:0,opacity:1-pipeline}}>
   <Person x={500} y={620+Math.sin(t*1.5)*5} scale={1.12} color={C.orange} mood={0.45} look={0.8} glow={0.45}/>
   <Glass tint={C.orange} rainbow={0.5} style={{left:850,top:405,width:230,height:230,opacity:prog(t,v('idea'),0.6),transform:`translateY(${(1-prog(t,v('idea'),0.6))*65}px)`}}><Lightbulb size={96} color={C.orange} style={{position:'absolute',left:67,top:65}}/></Glass>
   <svg width={1920} height={1080} style={{position:'absolute',opacity:prog(t,v('Convertirla'),0.7)}}><path d="M 1100 520 Q 1270 400 1440 520" fill="none" stroke={C.blue} strokeWidth={3} strokeDasharray="9 12" strokeDashoffset={-t*28}/></svg>
   <Doc x={1460} y={545} w={150} label="Proyecto" glow={0.8} opacity={prog(t,v('proyecto'),0.7)} rot={(1-prog(t,v('proyecto'),0.7))*12}/>
   <div style={{position:'absolute',left:830,top:735,width:700,textAlign:'center',fontFamily:INTER,fontSize:34,color:C.slate200,opacity:prog(t,v('requiere'),0.6)}}>Formularlo requiere mucho más.</div>
  </div>
  <Title p={pipeline*(1-out)} y={150} size={64}>De la idea a <Grad>la formulación responsable</Grad></Title>
  <div style={{position:'absolute',inset:0,opacity:pipeline*(1-out),transform:`translateY(${-out*100}px) scale(${1-out*.1})`,transformOrigin:'960px 550px'}}>
   <svg width={1920} height={1080} style={{position:'absolute'}}>
    {nodes.slice(0,-1).map((_,i)=>{const p=prog(t,nodes[i+1].at-.2,.6);return <line key={i} x1={365+i*330} y1={530} x2={365+i*330+65*p} y2={530} stroke={C.blue} strokeWidth={3} strokeDasharray="8 10" strokeDashoffset={-t*30}/>;})}
    {travel>0&&travel<1&&<circle cx={230+1320*travel} cy={530} r={13} fill={C.yellow}/>}
   </svg>
   {nodes.map((node,i)=>{const p=prog(t,node.at-.1,.6),Icon=node.Icon;return <Glass key={node.label} tint={node.color} rainbow={travel>i/5?.55:0} style={{left:105+i*330,top:405,width:265,height:260,opacity:p,transform:`translateY(${(1-p)*70}px)`}}>
    <Icon size={62} color={node.color} style={{position:'absolute',left:101,top:42}}/>
    <div style={{position:'absolute',top:145,width:'100%',textAlign:'center',fontFamily:INTER,fontSize:29,fontWeight:600,color:C.yellow}}>{node.label}</div>
    <div style={{position:'absolute',left:30,right:30,top:212,height:4,background:node.color,transform:`scaleX(${prog(t,node.at+.2,.8)})`,transformOrigin:'left',borderRadius:4}}/>
   </Glass>;})}
  </div>
  <Title p={out} y={150} size={66}>De la intuición operativa<br/>a <Grad>la formulación responsable</Grad></Title>
  <div style={{position:'absolute',inset:0,opacity:out,transform:`translateY(${(1-out)*100}px)`}}>
   <Person x={420} y={615+Math.sin(t*1.4)*5} scale={1.15} color={C.orange} mood={prog(t,end,.8)*.8} look={.8} glow={.5}/>
   <Glass tint={C.green} rainbow={.6} style={{left:820,top:400,width:840,height:425}}>
    <Doc x={140} y={175} w={100} glow={.6}/>
    <div style={{position:'absolute',left:255,top:90,right:35,fontFamily:INTER,fontSize:34,fontWeight:600,color:C.yellow,lineHeight:1.35}}>Nueva competencia<br/>profesional</div>
    <div style={{position:'absolute',left:255,top:235,display:'flex',alignItems:'center',gap:15,fontFamily:INTER,fontSize:29,color:C.green,opacity:prog(t,end,.6)}}><Check size={32}/>Formulación responsable</div>
   </Glass>
  </div>
  <Sfx at={v('idea')} name="pop" vol={.15}/>{nodes.map(n=><Sfx key={n.label} at={n.at} name="click" vol={.13}/>)}<Sfx at={transition} name="whoosh" vol={.16}/><Sfx at={end} name="ding" vol={.15}/>
 </AbsoluteFill>;
};
