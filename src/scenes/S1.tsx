import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Layers, Workflow, UsersRound, ShieldCheck, Lightbulb, FileCheck2} from 'lucide-react';
import {Background, Glass, Title, Prism, Grad, Sfx} from '../fx';
import {InstitutionalIcon} from '../fx/InstitutionalIcon';
import {keys, prog, useT} from '../lib';
import {cueAt} from '../sync';
import {scenePre} from '../timeline';
import {C, INTER, OUTFIT} from '../theme';

const v = (word: string, n = 0) => scenePre('s1') + cueAt('v1', [word,n]);

// Original engine: glass, vector people, light cones, prism dispersion and word cues.
export const S1: React.FC = () => {
  const t = useT();
  const human = v('conocimiento');
  const organize = v('convertir');
  const opportunity = v('oportunidades');
  const project = v('proyectos');
  const first = 1-prog(t,human,0.9);
  const people = prog(t,human,0.8);
  const move = prog(t,organize,1.3);
  const last = prog(t,project,0.8);
  return <AbsoluteFill>
    <Background hue={C.blue}/>
    <div style={{position:'absolute',left:110,top:64,fontFamily:OUTFIT,fontSize:22,letterSpacing:3,color:C.blue,opacity:prog(t,0,0.5)}}>INTELIGENCIA ARTIFICIAL APLICADA A LA BANCA</div>
    <Title p={prog(t,0.2,0.8)*first} y={150} size={76}>La transformación <Grad>digital</Grad></Title>
    {[{text:'Plataformas',Icon:Layers,at:v('plataformas'),x:500},{text:'Automatización',Icon:Workflow,at:v('automatización'),x:1130}].map(({text,Icon,at,x})=>{
      const p=prog(t,at-0.2,0.7);
      return <Glass key={text} tint={C.blue} rainbow={0.4} style={{left:x-180,top:365,width:470,height:340,opacity:p*first,transform:`translateY(${(1-p)*100}px) rotateY(${(1-p)*20}deg)`}}>
        <Icon size={84} color={C.blue} style={{position:'absolute',left:190,top:58}}/>
        <div style={{position:'absolute',top:185,width:'100%',textAlign:'center',fontFamily:INTER,fontSize:34,fontWeight:600,color:'#F7FAFF'}}>{text}</div>
        {[0,1,2].map(i=><div key={i} style={{position:'absolute',left:50,top:250+i*18,height:4,width:110+prog(t,at+i*0.25,0.8)*210,background:C.blue,opacity:0.25+i*0.1,borderRadius:4}}/>)}
      </Glass>;
    })}
    <Title p={people*(1-prog(t,organize,0.6))} y={150} size={68}>El conocimiento más valioso<br/>está en <Grad from={C.orange} to={C.yellow}>las personas</Grad></Title>
    <Title p={prog(t,organize,0.7)*(1-last)} y={150} size={66}>Del conocimiento a <Grad>la oportunidad</Grad></Title>
    <Title p={last} y={150} size={66}>Conocimiento humano.<br/><Grad from={C.green} to={C.blue}>Proyectos de digitalización.</Grad></Title>
    <svg width={1920} height={1080} style={{position:'absolute',opacity:people*(1-last)}}>
      {[0,1,2].map(i=><path key={i} d={`M ${[500,960,1420][i]} 560 Q 960 330 960 610`} fill="none" stroke={[C.blue,C.orange,C.green][i]} strokeWidth={3} strokeDasharray="10 12" strokeDashoffset={-t*28} opacity={move*0.65}/>)}
    </svg>
    {[{x:500,label:'Operaciones',at:v('operaciones'),color:C.blue},{x:960,label:'Clientes',at:v('clientes'),color:C.orange},{x:1420,label:'Responsabilidades',at:v('responsabilidades'),color:C.green}].map((r,i)=>{
      const p=prog(t,human+i*0.18,0.8);
      const x=keys(t,[[organize,r.x],[organize+1.4,290+i*160]]);
      const y=keys(t,[[organize,560],[organize+1.4,590]]);
      const scale=1.05-move*0.4;
      return <React.Fragment key={r.label}>
        <InstitutionalIcon Icon={[Workflow,UsersRound,ShieldCheck][i]} label={r.label} x={x} y={y+Math.sin(t*1.5+i)*5+(1-p)*90} scale={scale} color={r.color} opacity={p*people} glow={0.25+prog(t,r.at,0.7)*0.5}/>
        <Glass tint={r.color} style={{left:r.x-190,top:750,width:380,height:66,display:'flex',alignItems:'center',justifyContent:'center',opacity:prog(t,r.at,0.45)*(1-move),transform:`translateY(${(1-prog(t,r.at,0.45))*20}px)`}}><span style={{fontFamily:INTER,fontSize:28,color:'#F7FAFF',fontWeight:600}}>{r.label}</span></Glass>
      </React.Fragment>;
    })}
    <Prism cx={940} cy={590} size={200} inP={prog(t,organize,1.4)} outP={prog(t,opportunity,1.1)} outLen={650} spread={34} inAngle={-18} opacity={move} colors={[C.blue,C.green,C.orange]}/>
    <div style={{position:'absolute',left:760,top:755,width:360,textAlign:'center',fontFamily:OUTFIT,fontSize:30,color:C.blue,opacity:move}}>Capacidad organizada</div>
    <Glass rainbow={0.7} tint={C.green} style={{left:1220,top:410,width:540,height:370,opacity:prog(t,opportunity,0.7),transform:`translateX(${(1-prog(t,opportunity,0.7))*180}px) scale(${0.94+0.06*last})`}}>
      <div style={{padding:'34px 40px',fontFamily:INTER,color:'#F7FAFF'}}>
        {last ? <FileCheck2 size={52} color={C.green}/> : <Lightbulb size={52} color={C.green}/>}
        <div style={{fontFamily:OUTFIT,fontSize:40,fontWeight:600,marginTop:16}}>{last?'Proyecto':'Oportunidad'}</div>
        <div style={{fontSize:26,color:C.slate300,marginTop:18,lineHeight:1.5}}>{last?'Inteligencia artificial aplicada':'Conocimiento de los procesos'}</div>
        {[0,1,2].map(i=><div key={i} style={{marginTop:15,height:7,width:`${[91,72,83][i]*prog(t,project+i*0.3,0.8)}%`,background:i===0?C.green:C.blue,opacity:0.6,borderRadius:6}}/>)}
      </div>
    </Glass>
    <Sfx at={v('plataformas')} name="pop" vol={0.15}/><Sfx at={human} name="whoosh" vol={0.18}/><Sfx at={organize} name="shimmer" vol={0.14}/><Sfx at={project} name="ding" vol={0.17}/>
  </AbsoluteFill>;
};
