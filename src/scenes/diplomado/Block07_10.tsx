import React from 'react';
import {AbsoluteFill} from 'remotion';
import {BriefcaseBusiness, GraduationCap, Landmark, BrainCircuit, ShieldCheck, ChartNoAxesCombined, ArrowLeftRight, ServerCog} from 'lucide-react';
import {Background, Doc, Glass, Grad, Title, Sfx} from '../../fx';
import {InstitutionalIcon} from '../../fx/InstitutionalIcon';
import {prog, useT} from '../../lib';
import {cueAt} from '../../sync';
import {scenePre} from '../../timeline';
import {C, INTER, OUTFIT} from '../../theme';

const at=(s:number,w:string,n=0)=>scenePre(`s${s}`)+cueAt(`v${s}`,[w,n]);
const Label:React.FC<{children:React.ReactNode}>=({children})=><div style={{position:'absolute',left:110,top:64,fontFamily:OUTFIT,fontSize:22,letterSpacing:3,color:C.blue}}>{children}</div>;
const Text:React.FC<{children:React.ReactNode;size?:number;color?:string}>=({children,size=29,color=C.slate200})=><div style={{fontFamily:INTER,fontSize:size,lineHeight:1.4,color,whiteSpace:'pre-line'}}>{children}</div>;

export const S7:React.FC=()=>{
 const t=useT(), end=prog(t,at(7,'fortalecer'),1.1);
 const actors=[{name:'PSICOSERVICIOS',detail:'Consultoría multidisciplinaria\ny acompañamiento',word:'PSICOSERVICIOS',color:C.blue},
 {name:'Escuela Nacional de\nAdministración y Hacienda Pública IUT',detail:'Componente académico',word:'Escuela',color:C.green},
 {name:'El banco',detail:'Prioridades · talento\nDirección de sus decisiones',word:'protagonista',color:C.orange}];
 return <AbsoluteFill><Background hue={C.blue}/><Label>ALIANZA ACADÉMICA Y ORGANIZACIONAL</Label>
 <Title p={prog(t,.1,.7)*(1-end)} y={145} size={65}>Tres actores.<br/><Grad>Una capacidad compartida.</Grad></Title>
 <svg width={1920} height={1080} style={{position:'absolute',opacity:1-end}}>{actors.map((a,i)=><path key={i} d={`M ${370+i*590} 730 Q ${370+i*590} 870 960 870`} fill="none" stroke={a.color} strokeWidth={3} strokeDasharray="8 12" strokeDashoffset={-t*25} opacity={prog(t,at(7,a.word),.8)*.5}/>)}</svg>
 {actors.map((a,i)=>{const p=prog(t,at(7,a.word),.7);return <div key={a.name} style={{opacity:p*(1-end),transform:`translateY(${(1-p)*70}px)`}}>
 <Glass tint={a.color} rainbow={.4} style={{left:110+i*590,top:365,width:520,height:440,padding:30,boxSizing:'border-box',textAlign:'center'}}>
 <InstitutionalIcon Icon={[BriefcaseBusiness,GraduationCap,Landmark][i]} label={a.name} x={260} y={115} scale={.62} color={a.color} glow={.35}/>
 <div style={{position:'absolute',top:225,left:22,right:22,fontFamily:OUTFIT,fontSize:i===1?27:35,fontWeight:600,color:C.yellow,whiteSpace:'pre-line',lineHeight:1.2}}>{a.name}</div>
 <div style={{position:'absolute',top:330,left:20,right:20}}><Text size={25}>{a.detail}</Text></div></Glass>
 <Sfx at={at(7,a.word)} name="pop" vol={.13}/></div>;})}
 <Title p={end} y={145} size={65}>Fortalecer las capacidades<br/><Grad>desde adentro.</Grad></Title>
 <div style={{opacity:end}}><InstitutionalIcon Icon={Landmark} label="Capacidades del banco" x={580} y={610} scale={1.2} color={C.orange} glow={.6}/><Doc x={1090} y={590} w={170} glow={.6}/><div style={{position:'absolute',left:850,top:770,width:690,textAlign:'center'}}><Text size={34}>Conocimiento del banco<br/>y dirección de sus decisiones</Text></div></div>
 </AbsoluteFill>;
};

export const S8:React.FC=()=>{
 const t=useT(), second=prog(t,at(8,'segundo'),.9), end=prog(t,at(8,'Antes'),.9);
 const items=[['Gobernanza','Ética','Privacidad','Riesgos','Gestión del cambio'],['Inteligencia artificial','Cultura de datos','Aplicaciones','Limitaciones','Regulaciones']];
 return <AbsoluteFill><Background hue={C.green}/><Label>BASE COMPARTIDA · MÓDULOS 1 Y 2</Label>
 <Title p={prog(t,.1,.7)*(1-end)} y={145} size={65}>Comprender el potencial.<br/><Grad>Asumir la responsabilidad.</Grad></Title>
 {[0,1].map(i=><Glass key={i} tint={i?C.green:C.blue} rainbow={.45} style={{left:130+i*850,top:365,width:810,height:485,padding:40,boxSizing:'border-box',opacity:prog(t,at(8,i?'segundo':'primer'),.7)*(1-end),transform:`translateY(${(1-prog(t,at(8,i?'segundo':'primer'),.7))*70}px)`}}>
 <div style={{fontFamily:OUTFIT,fontSize:28,color:i?C.green:C.blue}}>MÓDULO {i+1}</div><div style={{marginTop:20,fontFamily:OUTFIT,fontSize:39,color:C.yellow,fontWeight:600}}>{i?'Fundamentos de IA':'Gobernanza y cambio'}</div>
 {items[i].map((x,j)=><div key={x} style={{marginTop:19,display:'flex',alignItems:'center',gap:17,opacity:prog(t,at(8,i?'segundo':'primer')+.18*j,.5)}}><div style={{width:8,height:8,borderRadius:8,background:i?C.green:C.blue}}/><Text size={29}>{x}</Text></div>)}
 </Glass>)}
 <Title p={end} y={145} size={64}>Antes de formular proyectos,<br/><Grad>una base común.</Grad></Title>
 <div style={{opacity:end}}><svg width={1920} height={1080} style={{position:'absolute'}}><path d="M 540 530 Q 960 850 1380 530" stroke={C.green} strokeWidth={4} fill="none" strokeDasharray="9 12" strokeDashoffset={-t*25}/></svg><InstitutionalIcon Icon={BrainCircuit} label="Potencial tecnológico" x={540} y={530} color={C.blue}/><InstitutionalIcon Icon={ShieldCheck} label="Responsabilidad y gobernanza" x={1380} y={530} color={C.green}/><Doc x={960} y={640} w={150} glow={.6}/><div style={{position:'absolute',top:820,left:400,right:400,textAlign:'center'}}><Text size={34}>Potencial tecnológico + responsabilidad</Text></div></div>
 <Sfx at={at(8,'primer')} name="pop" vol={.12}/><Sfx at={at(8,'segundo')} name="whoosh" vol={.13}/><Sfx at={at(8,'Antes')} name="ding" vol={.14}/>
 </AbsoluteFill>;
};

export const S9:React.FC=()=>{
 const t=useT(), end=prog(t,at(9,'segmentación'),1);
 const routes=[{title:'Riesgo y Cumplimiento',detail:'Responsabilidades de control',word:'Riesgo',color:C.blue},
 {title:'Planificación y Mejora Continua,\nProductos y Servicios',detail:'Pertinencia para cada función',word:'Planificación',color:C.green},
 {title:'Operaciones y Finanzas',detail:'Aplicaciones según necesidades',word:'Operaciones',color:C.blue},
 {title:'Tecnología y Seguridad\nde la información',detail:'Conocimiento especializado',word:'Tecnología',color:C.green}];
 return <AbsoluteFill><Background hue={C.blue}/><Label>CUATRO RUTAS FUNCIONALES</Label><Title p={prog(t,.1,.7)} y={140} size={62}>Una formación transversal.<br/><Grad>Pertinencia funcional.</Grad></Title>
 <svg width={1920} height={1080} style={{position:'absolute'}}>{routes.map((r,i)=><path key={i} d={`M 960 325 Q 960 ${470+i*70} ${i%2?1160:760} ${i<2?490:750}`} fill="none" stroke={r.color} strokeOpacity={.35*prog(t,at(9,r.word),.7)} strokeWidth={3} strokeDasharray="8 12" strokeDashoffset={-t*20}/>)}</svg>
 {routes.map((r,i)=>{const p=prog(t,at(9,r.word),.65);return <Glass key={r.title} tint={r.color} rainbow={.4} style={{left:i%2?1040:110,top:i<2?380:640,width:770,height:220,opacity:p,transform:`translateX(${(1-p)*(i%2?80:-80)}px)`}}><InstitutionalIcon Icon={[ShieldCheck,ChartNoAxesCombined,ArrowLeftRight,ServerCog][i]} label={r.title} x={95} y={110} scale={.46} color={r.color}/><div style={{position:'absolute',left:180,top:40,right:25,fontFamily:OUTFIT,fontSize:31,lineHeight:1.25,fontWeight:600,whiteSpace:'pre-line',color:C.yellow}}>{r.title}</div><div style={{position:'absolute',left:180,top:145,right:20,opacity:end}}><Text size={24}>{r.detail}</Text></div><Sfx at={at(9,r.word)} name="pop" vol={.12}/></Glass>;})}
 </AbsoluteFill>;
};

export const S10:React.FC=()=>{
 const t=useT(), end=prog(t,at(10,'Aprobar'),.9);
 const rows=[{pct:20,label:'Comprensión continua',word:'veinte',n:0,color:C.blue},{pct:20,label:'Actividades y tutorías',word:'veinte',n:1,color:C.green},{pct:60,label:'Proyecto integrador y defensa',word:'sesenta',n:0,color:C.orange}];
 return <AbsoluteFill><Background hue={C.blue}/><Label>EVALUACIÓN DEL APRENDIZAJE</Label>
 <Title p={prog(t,.1,.7)*(1-end)} y={145} size={65}>Formular propuestas,<br/><Grad>el centro de la evaluación.</Grad></Title>
 <div style={{opacity:1-end}}>{rows.map((r,i)=>{const a=at(10,r.word,r.n),p=prog(t,a,.9);return <div key={i} style={{position:'absolute',left:155,top:375+i*165,width:1610,opacity:p}}><div style={{display:'flex',alignItems:'baseline',gap:30,fontFamily:OUTFIT,color:r.color}}><span style={{fontSize:64,fontWeight:600}}>{Math.round(r.pct*p)}%</span><span style={{fontSize:35,color:C.yellow}}>{r.label}</span></div><div style={{marginTop:12,height:17,borderRadius:12,background:'#ffffff12'}}><div style={{height:17,borderRadius:12,width:`${r.pct*p}%`,background:r.color,boxShadow:`0 0 28px ${r.color}55`}}/></div><Sfx at={a} name="pop" vol={.13}/></div>;})}</div>
 <Title p={end} y={145} size={64}>Aprobar demuestra<br/><Grad>aprendizaje y criterio.</Grad></Title>
 <Glass tint={C.green} rainbow={.5} style={{left:300,top:390,width:1320,height:440,opacity:end}}><Doc x={210} y={215} w={160} glow={.6}/><div style={{position:'absolute',left:380,top:95,right:55,fontFamily:OUTFIT,fontSize:44,color:C.yellow}}>Proyecto académico aprobado</div><div style={{position:'absolute',left:380,top:220,right:55}}><Text size={32}>La implementación requiere<br/>su propia autorización.</Text></div></Glass><Sfx at={at(10,'Aprobar')} name="ding" vol={.15}/>
 </AbsoluteFill>;
};
