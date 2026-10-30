import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Background, Person, Doc, Glass, Grad, Title, Prism, Sfx} from '../../fx';
import {UsersRound, GraduationCap, Workflow, ServerCog, ShieldCheck} from 'lucide-react';
import {InstitutionalIcon} from '../../fx/InstitutionalIcon';
import {prog, useT, FPS} from '../../lib';
import {cueAt} from '../../sync';
import {scenePre} from '../../timeline';
import {C, INTER, OUTFIT} from '../../theme';

// Visual transition only: the original 17_18 recording plays once, continuously.
export const SPLIT_17_18 = 493; // includes 18-frame pre-roll; before “Y cuya iniciativa”.
const Label:React.FC<{children:React.ReactNode}>=({children})=><div style={{position:'absolute',left:110,top:64,fontFamily:OUTFIT,fontSize:22,letterSpacing:3,color:C.blue}}>{children}</div>;
const at=(s:number,w:string)=>scenePre(`s${s}`)+cueAt(`v${s}`,w);

const S17:React.FC=()=>{
 const t=useT(), people=prog(t,.6+cueAt('v17_18','profesionales'),1),projects=prog(t,.6+cueAt('v17_18','defendieron'),1);
 return <AbsoluteFill><Background hue={C.blue}/><Label>EXPERIENCIA FORMATIVA EN VENEZUELA</Label><Title p={prog(t,.1,.7)} y={145} size={62}>Una experiencia aplicada<br/><Grad>en una institución financiera.</Grad></Title>
 <div style={{position:'absolute',left:160,top:345,right:160,fontFamily:INTER,fontSize:28,textAlign:'center',color:C.slate200}}>Institución ubicada entre los diez primeros lugares del ranking bancario nacional</div>
 <Glass tint={C.blue} rainbow={.4} style={{left:150,top:430,width:790,height:410,opacity:people}}><div style={{position:'absolute',left:35,right:35,top:35,textAlign:'center',fontFamily:OUTFIT,fontSize:26,color:C.blue}}>MÁS DE</div><div style={{position:'absolute',left:30,right:30,top:65,textAlign:'center',fontFamily:OUTFIT,fontSize:150,fontWeight:600,color:C.yellow}}>{Math.round(60*people)}</div><div style={{position:'absolute',left:30,right:30,top:265,textAlign:'center',fontFamily:INTER,fontSize:30,color:C.slate200}}>profesionales participantes</div></Glass>
 <Glass tint={C.green} rainbow={.4} style={{left:980,top:430,width:790,height:410,opacity:projects}}><div style={{position:'absolute',left:30,right:30,top:65,textAlign:'center',fontFamily:OUTFIT,fontSize:150,fontWeight:600,color:C.yellow}}>{Math.round(21*projects)}</div><div style={{position:'absolute',left:35,right:35,top:265,textAlign:'center',fontFamily:INTER,fontSize:29,color:C.slate200}}>proyectos factibles<br/>desarrollados y defendidos</div></Glass>
 <Sfx at={.6+cueAt('v17_18','profesionales')} name="pop" vol={.13}/><Sfx at={.6+cueAt('v17_18','defendieron')} name="ding" vol={.13}/>
 </AbsoluteFill>;
};

const S18:React.FC=()=>{
 const local=useT(), t=local+SPLIT_17_18/FPS, review=prog(t,.6+cueAt('v17_18','revisión'),.8),end=prog(t,.6+cueAt('v17_18','Hablamos'),1);
 return <AbsoluteFill><Background hue={C.green}/><Label>BANCO DE PROYECTOS DE DIGITALIZACIÓN</Label><Title p={prog(local,0,.65)*(1-end)} y={145} size={63}>Propuestas organizadas.<br/><Grad>Proyectos en revisión.</Grad></Title>
 <div style={{opacity:1-end}}>{Array.from({length:7},(_,i)=><Doc key={i} x={420+i*175} y={580+Math.sin(local*.7+i)*30} w={90} glow={.4} opacity={prog(local,i*.1,.8)}/>)}<Glass tint={C.green} style={{left:650,top:745,width:620,height:95,opacity:review,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{fontFamily:OUTFIT,fontSize:35,color:C.green}}>Actualmente en revisión</div></Glass></div>
 <Title p={end} y={145} size={63}>Resultados formativos.<br/><Grad>Talento motivado.</Grad></Title><div style={{opacity:end}}>{[C.blue,C.orange,C.green].map((color,i)=><InstitutionalIcon key={color} Icon={[GraduationCap,UsersRound,Workflow][i]} label={["Resultados formativos","Talento colectivo","Digitalización de procesos"][i]} x={580+i*380} y={590+Math.sin(local+i)*8} scale={i===1?1.05:.85} color={color} glow={.4}/>)}<div style={{position:'absolute',left:300,right:300,top:815,fontFamily:INTER,fontSize:31,color:C.slate200,textAlign:'center'}}>Propuestas para la digitalización de sus procesos</div></div>
 </AbsoluteFill>;
};

export const S17_18:React.FC=()=> <AbsoluteFill><Sequence durationInFrames={SPLIT_17_18+15} name="Escena 17 · resultados formativos"><S17/></Sequence><Sequence from={SPLIT_17_18} name="Escena 18 · proyectos en revisión"><FadeIn><S18/></FadeIn></Sequence></AbsoluteFill>;
const FadeIn:React.FC<{children:React.ReactNode}>=({children})=><AbsoluteFill style={{opacity:prog(useT(),0,.5)}}>{children}</AbsoluteFill>;

export const S19:React.FC=()=>{
 const t=useT(),limit=prog(t,at(19,'sustituyen'),.9),end=prog(t,at(19,'principal'),.9);
 return <AbsoluteFill><Background hue={C.blue}/><Label>EMBAJADORES DIGITALES · CONTRIBUCIÓN PROFESIONAL</Label><Title p={prog(t,.1,.7)*(1-end)} y={145} size={62}>Reconocer oportunidades.<br/><Grad>Formularlas con criterio.</Grad></Title>
 <div style={{opacity:1-end}}><InstitutionalIcon Icon={UsersRound} label="Profesionales y embajadores digitales" x={370} y={590} scale={.95} color={C.orange} glow={.5}/><Doc x={850} y={585} w={150} glow={.5}/><svg width={1920} height={1080} style={{position:'absolute'}}><path d="M 1030 585 Q 1170 585 1270 480 M 1030 585 Q 1170 585 1270 710" stroke={C.blue} strokeWidth={3} fill="none" strokeDasharray="8 12" strokeDashoffset={-t*20}/></svg><InstitutionalIcon Icon={ServerCog} label="Áreas técnicas" x={1430} y={475} scale={.7} color={C.blue}/><InstitutionalIcon Icon={ShieldCheck} label="Áreas de control" x={1430} y={710} scale={.7} color={C.green}/><div style={{position:'absolute',left:1220,top:335,width:500,textAlign:'center',fontFamily:INTER,fontSize:25,color:C.blue}}>Áreas técnicas</div><div style={{position:'absolute',left:1220,top:835,width:500,textAlign:'center',fontFamily:INTER,fontSize:25,color:C.green}}>Áreas de control</div><Glass tint={C.green} style={{left:235,top:790,width:800,height:95,opacity:limit,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{fontFamily:INTER,fontSize:28,color:C.slate200}}>Roles y atribuciones se conservan</div></Glass></div>
 <Title p={end} y={145} size={63}>Conocimiento del proceso.<br/><Grad>Propuestas bien estructuradas.</Grad></Title><div style={{opacity:end}}><InstitutionalIcon Icon={UsersRound} label="Conocimiento de los profesionales" x={580} y={610} scale={1.1} color={C.orange} glow={.6}/><Doc x={1190} y={600} w={180} glow={.65}/></div><Sfx at={at(19,'principal')} name="ding" vol={.14}/>
 </AbsoluteFill>;
};

export const S20:React.FC=()=>{
 const t=useT(),people=prog(t,at(20,'gente'),.9);
 return <AbsoluteFill><Background hue={C.blue}/><Label>DIPLOMADO EN INTELIGENCIA ARTIFICIAL APLICADA A LA BANCA</Label><Title p={prog(t,.1,.7)*(1-people)} y={170} size={70}>La tecnología<br/><Grad>abre posibilidades.</Grad></Title><Title p={people} y={170} size={70}>Su gente<br/><Grad>transforma el banco.</Grad></Title><div style={{opacity:1-people}}><Doc x={960} y={650} w={180} glow={.6}/></div>{[C.blue,C.green,C.orange,C.blue,C.green].map((color,i)=>i===2?<Person key={i} x={420+i*270} y={650+Math.sin(t*.8+i)*7} scale={1} color={color} mood={.8} glow={.4} opacity={people}/>:<InstitutionalIcon key={i} Icon={UsersRound} label="Talento humano del banco" x={420+i*270} y={650+Math.sin(t*.8+i)*7} scale={.75} color={color} glow={.4} opacity={people}/>)}<Sfx at={at(20,'gente')} name="ding" vol={.14}/></AbsoluteFill>;
};

export const S21:React.FC=()=>{
 const t=useT(),p=prog(t,.3,1.2);
 return <AbsoluteFill><Background hue={C.blue}/><Prism cx={960} cy={315} size={150} inP={p} outP={p} outLen={520} spread={25} inAngle={-20} pulse={Math.sin(t)*.5+.5}/><div style={{position:'absolute',left:200,right:200,top:485,textAlign:'center',opacity:prog(t,1.1,1),transform:`translateY(${(1-prog(t,1.1,1))*35}px)`}}><div style={{fontFamily:INTER,fontSize:30,color:C.slate200}}>Dirección Creativa y Realización Audiovisual</div><div style={{marginTop:32,fontFamily:OUTFIT,fontSize:65,fontWeight:600,color:C.yellow}}>Martin Morfe .°.</div><div style={{marginTop:27,fontFamily:INTER,fontSize:31,color:C.blue}}>morfe.studio</div><div style={{marginTop:18,fontFamily:INTER,fontSize:28,color:C.slate200}}>eskol@protonmail.com</div><div style={{marginTop:38,fontFamily:INTER,fontSize:26,color:C.slate400}}>Octubre 2026</div></div></AbsoluteFill>;
};
