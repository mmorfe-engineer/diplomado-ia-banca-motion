import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Background, Person, Doc, Glass, Grad, Title, Sfx} from '../../fx';
import {prog, useT} from '../../lib';
import {cueAt} from '../../sync';
import {scenePre} from '../../timeline';
import {C, INTER, OUTFIT} from '../../theme';

const at=(s:number,w:string,n=0)=>scenePre(`s${s}`)+cueAt(`v${s}`,[w,n]);
const Label:React.FC<{children:React.ReactNode}>=({children})=><div style={{position:'absolute',left:110,top:64,fontFamily:OUTFIT,fontSize:22,letterSpacing:3,color:C.blue}}>{children}</div>;
const Copy:React.FC<{children:React.ReactNode;size?:number;color?:string}>=({children,size=30,color=C.slate200})=><div style={{fontFamily:INTER,fontSize:size,color,lineHeight:1.4,whiteSpace:'pre-line'}}>{children}</div>;

export const S11:React.FC=()=>{
 const t=useT(), end=prog(t,at(11,'entornos'),.9);
 const parts=[{hours:20,title:'Inmersión presencial',detail:'Escuela Nacional de Administración\ny Hacienda Pública',word:'inmersión',color:C.blue},
 {hours:60,title:'Formación y acompañamiento',detail:'Moodle',word:'Moodle',color:C.green},{hours:40,title:'Proyecto integrador',detail:'Aplicación del aprendizaje',word:'dedicadas',color:C.orange}];
 return <AbsoluteFill><Background hue={C.blue}/><Label>PRIMER CICLO · 120 HORAS ACADÉMICAS PREVISTAS</Label>
 <Title p={prog(t,.1,.7)*(1-end)} y={145} size={63}>Inmersión, acompañamiento<br/><Grad>y proyecto.</Grad></Title>
 <svg width={1920} height={1080} style={{position:'absolute',opacity:1-end}}><path d="M 370 770 Q 960 910 1550 770" fill="none" stroke={C.blue} strokeOpacity={.35} strokeWidth={3} strokeDasharray="9 12" strokeDashoffset={-t*25}/></svg>
 {parts.map((p,i)=>{const q=prog(t,at(11,p.word),.8);return <Glass key={p.title} tint={p.color} rainbow={.4} style={{left:110+i*590,top:375,width:520,height:435,padding:32,boxSizing:'border-box',opacity:q*(1-end),transform:`translateY(${(1-q)*70}px)`}}><div style={{fontFamily:OUTFIT,fontSize:110,fontWeight:600,color:p.color}}>{Math.round(p.hours*q)}<span style={{fontSize:34}}> h</span></div><div style={{fontFamily:OUTFIT,fontSize:32,color:C.yellow,lineHeight:1.25,minHeight:90}}>{p.title}</div><Copy size={25}>{p.detail}</Copy><Sfx at={at(11,p.word)} name="pop" vol={.12}/></Glass>;})}
 <Title p={end} y={145} size={62}>Entornos de enseñanza<br/><Grad>externos a la plataforma bancaria.</Grad></Title>
 <Glass tint={C.green} rainbow={.45} style={{left:300,top:395,width:1320,height:435,opacity:end}}><Doc x={200} y={210} w={150} glow={.55}/><div style={{position:'absolute',left:360,top:90,right:70}}><Copy size={35}>Seguridad de la información<br/>y logística</Copy><div style={{marginTop:50}}><Copy size={30} color={C.green}>Condiciones por definir previamente</Copy></div></div></Glass>
 </AbsoluteFill>;
};

export const S12:React.FC=()=>{
 const t=useT(), defend=prog(t,at(12,'Finalmente'),1);
 const steps=[{title:'Oportunidad',word:'oportunidad'},{title:'Problema y requisitos',word:'problema'},{title:'Factibilidad',word:'factibilidad'},{title:'Riesgos y controles',word:'riesgos'},{title:'Propuesta académica',word:'propuesta'}];
 return <AbsoluteFill><Background hue={C.green}/><Label>SEGUNDO CICLO · DE LA OPORTUNIDAD A LA PROPUESTA</Label><Title p={prog(t,.1,.7)*(1-defend)} y={145} size={64}>El aprendizaje se convierte<br/><Grad>en una iniciativa concreta.</Grad></Title>
 <div style={{opacity:1-defend}}><Person x={255} y={585} scale={.9} color={C.orange} mood={.6} glow={.4}/><svg width={1920} height={1080} style={{position:'absolute'}}><path d="M 390 580 H 1690" stroke={C.blue} strokeWidth={3} strokeOpacity={.3} fill="none" strokeDasharray="8 12" strokeDashoffset={-t*35}/></svg>
 {steps.map((s,i)=>{const p=prog(t,at(12,s.word),.7);return <div key={s.title} style={{opacity:p}}><Glass tint={i===4?C.orange:C.blue} rainbow={.35} style={{left:450+i*268,top:420,width:240,height:310,transform:`translateY(${(1-p)*70}px)`}}><Doc x={120} y={100} w={75} glow={.4}/><div style={{position:'absolute',left:15,right:15,top:195,textAlign:'center',fontFamily:OUTFIT,fontSize:28,color:C.yellow,lineHeight:1.3}}>{s.title}</div></Glass><Sfx at={at(12,s.word)} name="pop" vol={.11}/></div>;})}</div>
 <Title p={defend} y={145} size={64}>Defender la pertinencia.<br/><Grad>Argumentar las condiciones.</Grad></Title>
 <div style={{opacity:defend}}><Person x={380} y={605} scale={1.1} color={C.orange} mood={.8} glow={.5}/><Doc x={900} y={580} w={170} glow={.6}/><Person x={1400} y={555} scale={.8} color={C.blue} mood={.45} look={-.7}/><Person x={1640} y={650} scale={.7} color={C.green} mood={.45} look={-.7}/><div style={{position:'absolute',left:690,top:800,width:650,textAlign:'center'}}><Copy size={32}>Defensa ante especialistas</Copy></div></div><Sfx at={at(12,'Finalmente')} name="whoosh" vol={.15}/>
 </AbsoluteFill>;
};

export const S13:React.FC=()=>{
 const t=useT(), question=prog(t,at(13,'pregunta'),.9);
 const steps=[{label:'Requisitos',word:'requisitos'},{label:'Motivo',word:'motivo'},{label:'Validaciones',word:'validaciones'}];
 return <AbsoluteFill><Background hue={C.blue}/><Label>ISABEL · SEGURIDAD BANCARIA</Label><Title p={prog(t,.1,.7)*(1-question)} y={145} size={64}>Un trámite cotidiano.<br/><Grad>Una oportunidad de mejora.</Grad></Title>
 <Person x={345} y={610} scale={1.08} color={C.orange} mood={.1+question*.6} look={.7} glow={.5}/>
 <Glass tint={C.blue} rainbow={.45} style={{left:720,top:365,width:1020,height:470,opacity:1-question}}><div style={{position:'absolute',left:55,top:45,fontFamily:OUTFIT,fontSize:38,color:C.yellow}}>Reposición de carnet</div><div style={{position:'absolute',left:55,top:125,width:205,height:260,borderRadius:22,border:`2px solid ${C.blue}88`,background:'#56b3f312'}}><Person x={102} y={95} scale={.42} color={C.blue}/><div style={{position:'absolute',left:35,right:35,bottom:40,height:7,background:C.blue,borderRadius:8}}/></div>
 {steps.map((s,i)=>{const p=prog(t,at(13,s.word),.6);return <div key={s.label} style={{position:'absolute',left:340,top:145+i*85,opacity:p,transform:`translateX(${(1-p)*40}px)`}}><Copy size={32}>{`${i+1}. ${s.label}`}</Copy><Sfx at={at(13,s.word)} name="pop" vol={.12}/></div>;})}</Glass>
 <Title p={question} y={145} size={60}>¿Orientación más ágil<br/><Grad>con los controles necesarios?</Grad></Title><Glass tint={C.green} rainbow={.4} style={{left:720,top:400,width:1020,height:380,opacity:question,padding:60,boxSizing:'border-box'}}><Copy size={36}>Seguridad Bancaria</Copy><div style={{marginTop:45}}><Copy size={36}>Seguridad de la Información</Copy></div><div style={{marginTop:35}}><Copy size={27} color={C.green}>Controles y validaciones</Copy></div></Glass>
 </AbsoluteFill>;
};

export const S14:React.FC=()=>{
 const t=useT(), beyond=prog(t,at(14,'más'),1), norm=prog(t,at(14,'normativa'),.8);
 const steps=[{label:'Informar requisitos',word:'requisitos'},{label:'Orientar solicitudes',word:'registro'},{label:'Facilitar seguimiento',word:'seguimiento'}];
 return <AbsoluteFill><Background hue={C.blue}/><Label>PROPUESTA DE ESTUDIO · ALCANCE ACADÉMICO</Label><Title p={prog(t,.1,.7)*(1-beyond)} y={145} size={64}>Estudiar un chatbot.<br/><Grad>Comprender el proceso.</Grad></Title>
 <Person x={330} y={610} scale={1.05} color={C.orange} mood={.65} look={.8} glow={.5}/>
 <Glass tint={C.blue} rainbow={.4} style={{left:720,top:380,width:1040,height:440,opacity:1-beyond}}><div style={{position:'absolute',left:50,top:40,fontFamily:OUTFIT,fontSize:27,color:C.blue}}>HIPÓTESIS DE SOLUCIÓN</div>{steps.map((s,i)=><div key={s.label} style={{position:'absolute',left:60,top:115+i*90,opacity:prog(t,at(14,s.word),.6)}}><Copy size={34}>{s.label}</Copy><Sfx at={at(14,s.word)} name="pop" vol={.12}/></div>)}</Glass>
 <Title p={beyond} y={145} size={62}>Mirar más allá<br/><Grad>de la herramienta.</Grad></Title><Glass tint={norm?C.green:C.blue} rainbow={.5} style={{left:720,top:380,width:1040,height:440,opacity:beyond}}><Doc x={180} y={220} w={150} glow={.6}/><div style={{position:'absolute',left:350,top:95,right:45}}><Copy size={36}>Automatizar y digitalizar tareas</Copy><div style={{marginTop:45,opacity:prog(t,at(14,'beneficio'),.7)}}><Copy size={29}>Impacto en beneficio del banco</Copy></div><div style={{marginTop:40,opacity:norm}}><Copy size={29} color={C.green}>Respeto a la normativa financiera</Copy></div></div></Glass>
 </AbsoluteFill>;
};

export const S15:React.FC=()=>{
 const t=useT(), options=prog(t,at(15,'opciones'),.7), synthetic=prog(t,at(15,'sintético'),.8), end=prog(t,at(15,'paradigma'),1);
 return <AbsoluteFill><Background hue={C.blue}/><Label>SIMULACIÓN ACADÉMICA · SIN CONEXIÓN A SISTEMAS BANCARIOS</Label><Title p={prog(t,.1,.7)*(1-end)} y={140} size={61}>Orientación para reponer<br/><Grad>un carnet de identificación.</Grad></Title>
 <div style={{opacity:1-end}}><Person x={285} y={610} scale={.95} color={C.blue} mood={.4} look={.8}/><Glass tint={C.blue} rainbow={.5} style={{left:570,top:345,width:1140,height:510}}><div style={{position:'absolute',left:40,top:25,fontFamily:OUTFIT,fontSize:28,color:C.blue}}>ASISTENTE · DEMOSTRACIÓN SINTÉTICA</div>
 <div style={{position:'absolute',left:300,right:35,top:95,padding:25,borderRadius:22,background:'#56b3f31c',border:`1px solid ${C.blue}55`,opacity:prog(t,at(15,'solicita'),.7)}}><Copy size={28}>Necesito reponer mi carnet.</Copy></div>
 <div style={{position:'absolute',left:35,right:220,top:220,padding:25,borderRadius:22,background:'#45c99a15',border:`1px solid ${C.green}55`,opacity:options}}><Copy size={28}>Puedo orientarte sobre el procedimiento.</Copy><div style={{display:'flex',gap:12,marginTop:25}}>{['Requisitos','Inicio del trámite','Seguimiento'].map(x=><div key={x} style={{padding:'12px 17px',borderRadius:12,border:`1px solid ${C.green}77`,fontFamily:INTER,fontSize:22,color:C.green}}>{x}</div>)}</div></div><div style={{position:'absolute',left:45,bottom:25,fontFamily:INTER,fontSize:25,color:C.green,opacity:synthetic}}>Decisiones y validaciones humanas</div></Glass></div>
 <Title p={end} y={145} size={63}>El cambio está en Isabel<br/><Grad>y en su criterio profesional.</Grad></Title><div style={{opacity:end}}><Person x={550} y={610} scale={1.2} color={C.orange} mood={.85} glow={.65}/><Doc x={1130} y={580} w={180} glow={.7}/><div style={{position:'absolute',left:850,top:800,width:650,textAlign:'center'}}><Copy size={32}>Capacidad de fundamentar su propuesta</Copy></div></div><Sfx at={at(15,'opciones')} name="pop" vol={.12}/><Sfx at={at(15,'paradigma')} name="whoosh" vol={.15}/>
 </AbsoluteFill>;
};

export const S16:React.FC=()=>{
 const t=useT(), result=prog(t,at(16,'ficha'),.9);
 const fields=[{label:'Problema',word:'problema'},{label:'Hipótesis de solución',word:'hipótesis'},{label:'Requisitos',word:'requisitos'},{label:'Factibilidad',word:'factibilidad'},{label:'Privacidad y seguridad',word:'privacidad'},{label:'Mejora esperada y controles',word:'mejora'}];
 return <AbsoluteFill><Background hue={C.green}/><Label>RESULTADO EDUCATIVO · PROPUESTA PARA EVALUACIÓN</Label><Title p={prog(t,.1,.7)*(1-result)} y={145} size={64}>Del trámite observado<br/><Grad>a una propuesta con fundamento.</Grad></Title><Title p={result} y={135} size={62}>Una ficha que los especialistas<br/><Grad>pueden examinar con rigor.</Grad></Title>
 <Person x={330} y={620} scale={1.1} color={C.orange} mood={.8} glow={.6}/><Glass tint={C.green} rainbow={.6} style={{left:690,top:345,width:1100,height:540,opacity:prog(t,at(16,'Isabel'),.7)}}><div style={{position:'absolute',left:40,top:30,fontFamily:OUTFIT,fontSize:28,color:C.green}}>FICHA ACADÉMICA DE PROYECTO</div>{fields.map((s,i)=>{const p=prog(t,at(16,s.word),.6);return <div key={s.label} style={{position:'absolute',left:40+(i%2)*525,top:115+Math.floor(i/2)*125,width:480,opacity:p,transform:`translateY(${(1-p)*25}px)`}}><div style={{fontFamily:OUTFIT,fontSize:27,color:C.yellow}}>{s.label}</div><div style={{height:7,width:380*p,marginTop:22,borderRadius:8,background:`linear-gradient(90deg,${C.green}88,${C.blue}22)`}}/><div style={{height:7,width:250*p,marginTop:12,borderRadius:8,background:'#ffffff12'}}/><Sfx at={at(16,s.word)} name="pop" vol={.1}/></div>;})}</Glass>
 </AbsoluteFill>;
};
