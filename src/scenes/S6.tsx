import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Users, BriefcaseBusiness, MessagesSquare, FileCheck2, Check} from 'lucide-react';
import {Background, Person, Doc, Glass, Grad, Title, Sfx} from '../fx';
import {keys, prog, useT} from '../lib';
import {cueAt} from '../sync';
import {scenePre} from '../timeline';
import {C, INTER, OUTFIT} from '../theme';
const v=(word:string,n=0)=>scenePre('s6')+cueAt('v6',[word,n]);
// Original S6 orbit → pillar reveals → convergence; same SVG/time-based motion.
export const S6:React.FC=()=>{
 const t=useT(), converge=prog(t,v('Así'),1.3), demonstrate=prog(t,v('demuestre'),.8);
 const pillars=[{title:'Acceso',detail:'Perfiles con distinto\nconocimiento tecnológico',Icon:Users,at:v('Primero'),color:C.blue},
  {title:'Aplicaciones',detail:'Vinculadas con la realidad\nde sus funciones',Icon:BriefcaseBusiness,at:v('Segundo'),color:C.green},
  {title:'Diálogo',detail:'Con especialistas\ny proveedores',Icon:MessagesSquare,at:v('Tercero'),color:C.orange},
  {title:'Proyectos factibles',detail:'Orientación a proyectos\nfactibles',Icon:FileCheck2,at:v('cuarto'),color:C.blue}];
 return <AbsoluteFill>
  <Background hue={C.blue}/>
  <div style={{position:'absolute',left:110,top:64,fontFamily:OUTFIT,fontSize:22,letterSpacing:3,color:C.blue}}>INTELIGENCIA ARTIFICIAL APLICADA A LA BANCA</div>
  <Title p={prog(t,.1,.7)*(1-converge)} y={145} size={66}>Cuatro principios.<br/><Grad>Un diseño académico.</Grad></Title>
  <svg width={1920} height={1080} style={{position:'absolute',opacity:1-converge}}>
   {[100,145].map((r,i)=><circle key={i} cx={960} cy={580} r={r} fill="none" stroke={C.blue} strokeOpacity={.22} strokeWidth={2}/>)}
   {[100,145].map((r,i)=><circle key={i} cx={960+Math.cos(t*(.65+i*.2)+i*2)*r} cy={580+Math.sin(t*(.65+i*.2)+i*2)*r} r={5} fill={[C.blue,C.green][i]} opacity={prog(t,v('cuatro'),.7)}/>)}
   {pillars.map((p,i)=><path key={i} d={`M 960 580 Q ${i%2?1300:620} ${i<2?340:800} ${i%2?1190:730} ${i<2?440:730}`} fill="none" stroke={p.color} strokeOpacity={prog(t,p.at,.6)*.5} strokeWidth={2} strokeDasharray="8 12" strokeDashoffset={-t*20}/>)}
  </svg>
  <div style={{position:'absolute',left:850,top:500,width:220,textAlign:'center',fontFamily:OUTFIT,fontSize:135,fontWeight:600,color:C.yellow,opacity:prog(t,v('cuatro'),.7)*(1-converge)}}>4</div>
  {pillars.map((r,i)=>{const p=prog(t,r.at,.7),Icon=r.Icon,x=i%2?1190:130,y=i<2?345:650;return <Glass key={r.title} tint={r.color} rainbow={p*.5} style={{left:x+(960-x)*converge,top:y+(580-y)*converge,width:600,height:210,opacity:p*(1-converge),transform:`translateY(${(1-p)*60}px) scale(${1-converge*.7})`,transformOrigin:'top left'}}>
   <Icon size={47} color={r.color} style={{position:'absolute',left:30,top:35}}/>
   <div style={{position:'absolute',left:100,top:33,right:20,fontFamily:OUTFIT,fontWeight:600,fontSize:34,color:C.yellow}}>{r.title}</div>
   <div style={{position:'absolute',left:100,top:95,right:25,fontFamily:INTER,fontSize:27,lineHeight:1.35,color:C.slate200,whiteSpace:'pre-line'}}>{r.detail.slice(0,Math.floor(r.detail.length*prog(t,r.at+.35,1.7,x=>x)))}</div>
  </Glass>;})}
  <Title p={converge*(1-demonstrate)} y={145} size={64}>La formación no termina<br/>en <Grad>comprender conceptos.</Grad></Title>
  <Title p={demonstrate} y={145} size={64}>Demostrar qué puede hacer<br/><Grad from={C.green} to={C.blue}>con lo aprendido.</Grad></Title>
  <div style={{position:'absolute',inset:0,opacity:converge,transform:`translateY(${(1-converge)*80}px)`}}>
   <Person x={430} y={605+Math.sin(t*1.5)*5} scale={1.15} color={C.orange} mood={.3+demonstrate*.6} look={.75} glow={.5}/>
   <div style={{position:'absolute',left:220,top:815,width:420,fontFamily:OUTFIT,fontSize:31,textAlign:'center',color:C.orange}}>Aprendizaje demostrado</div>
   <Glass tint={C.green} rainbow={.6} style={{left:850,top:385,width:830,height:445}}>
    <Doc x={165} y={210} w={135} glow={.7}/>
    <div style={{position:'absolute',left:315,top:100,right:35,fontFamily:OUTFIT,fontSize:40,fontWeight:600,color:C.yellow,lineHeight:1.3}}>Proyecto<br/>factible</div>
    <div style={{position:'absolute',left:315,top:270,right:20,display:'flex',alignItems:'center',gap:14,fontFamily:INTER,fontSize:28,color:C.green,opacity:demonstrate}}><Check size={32}/>Qué puede hacer</div>
   </Glass>
  </div>
  {pillars.map(r=><Sfx key={r.title} at={r.at} name="pop" vol={.13}/>)}<Sfx at={v('Así')} name="whoosh" vol={.16}/><Sfx at={v('demuestre')} name="ding" vol={.15}/>
 </AbsoluteFill>;
};
