import React from 'react';
import {AbsoluteFill} from 'remotion';
import {ShieldCheck, Code2, Check, Lightbulb, FileCheck2} from 'lucide-react';
import {Background, Person, Glass, Doc, Title, Grad, Sfx} from '../fx';
import {keys, prog, useSpring, useT} from '../lib';
import {cueAt} from '../sync';
import {scenePre} from '../timeline';
import {C, INTER, OUTFIT} from '../theme';

const v = (word: string,n=0) => scenePre('s2')+cueAt('v2',[word,n]);

export const S2: React.FC = () => {
  const t=useT();
  const intro=useSpring(0.1,{damping:13,mass:0.9});
  const work=v('procedimientos');
  const recognize=v('reconoce');
  const opportunity=v('oportunidad');
  const method=v('método');
  const proposal=v('propuesta');
  const shift=prog(t,work-0.6,1.2);
  const x=960-shift*510;
  const success=prog(t,opportunity,0.7);
  return <AbsoluteFill>
    <Background hue={C.orange}/>
    <div style={{position:'absolute',left:110,top:64,fontFamily:OUTFIT,fontSize:22,letterSpacing:3,color:C.blue}}>INTELIGENCIA ARTIFICIAL APLICADA A LA BANCA</div>
    <Title p={prog(t,0.1,0.6)*(1-prog(t,work-0.8,0.6))} y={145} size={76}>Conoce a <Grad from={C.orange} to={C.yellow}>Isabel</Grad></Title>
    <Title p={prog(t,work-0.5,0.6)*(1-prog(t,recognize-0.4,0.6))} y={145} size={64}>Conoce su trabajo. <Grad>Reconoce necesidades.</Grad></Title>
    <Title p={prog(t,recognize,0.6)*(1-prog(t,method-0.4,0.6))} y={145} size={66}>Un trámite.<br/><Grad from={C.green} to={C.blue}>Una oportunidad de mejora.</Grad></Title>
    <Title p={prog(t,method,0.6)} y={145} size={66}>Un método para formular<br/><Grad from={C.green} to={C.blue}>una propuesta viable.</Grad></Title>
    <div style={{position:'absolute',left:x-440,top:-80,width:880,height:1000,opacity:0.3*Math.min(1,intro),background:`linear-gradient(180deg,${C.orange}66,transparent 90%)`,clipPath:'polygon(44% 0,56% 0,100% 100%,0 100%)',filter:'blur(20px)'}}/>
    <div style={{position:'absolute',left:x-210,top:784,width:420,height:52,borderRadius:'50%',background:C.orange,filter:'blur(28px)',opacity:0.19}}/>
    <Person x={x} y={570+(1-intro)*160+Math.sin(t*1.6)*5} scale={1.32} color={C.orange} mood={keys(t,[[0,0.15],[recognize,0.1],[opportunity,0.7],[proposal,0.95]])} look={shift*0.8+Math.sin(t*1.2)*0.15} opacity={Math.min(1,intro)} glow={0.4+success*0.3}/>
    <div style={{position:'absolute',left:x-210,top:765,width:420,textAlign:'center',fontFamily:OUTFIT,fontSize:42,fontWeight:600,color:'#F7FAFF',opacity:prog(t,v('Isabel'),0.5)}}>Isabel</div>
    <Glass tint={C.orange} rainbow={0.55} style={{left:x-285,top:835,width:570,height:68,display:'flex',alignItems:'center',justifyContent:'center',gap:14,opacity:prog(t,v('seguridad'),0.5)}}><ShieldCheck color={C.orange} size={32}/><span style={{fontFamily:INTER,fontSize:29,color:'#F7FAFF',fontWeight:600}}>Seguridad Bancaria</span></Glass>
    <Glass style={{left:1320,top:400,width:380,height:160,opacity:prog(t,v('programadora'),0.4)*(1-shift),transform:`translateY(${(1-prog(t,v('programadora'),0.4))*30}px)`}}><Code2 size={40} color={C.blue} style={{position:'absolute',left:165,top:25}}/><div style={{position:'absolute',top:85,width:'100%',textAlign:'center',fontFamily:INTER,fontSize:26,color:C.slate200}}>No es programadora</div></Glass>
    {/* Same original Doc flight technique; no new character anatomy. */}
    {['Procedimientos','Necesidades','Trámites'].map((text,i)=>{
      const at=[work,v('necesidades'),v('trámites')][i];
      const p=prog(t,at,0.7);
      const out=prog(t,opportunity,0.9);
      return <Doc key={text} x={850+i*330+(1-p)*130} y={550+Math.sin(t+i)*8} w={105} label={text} color={i===2?C.green:C.blue} opacity={p*(1-out)} glow={p*0.7} rot={(1-p)*(i-1)*20}/>;
    })}
    <svg width={1920} height={1080} style={{position:'absolute',opacity:prog(t,v('trámites'),0.5)*(1-prog(t,method,0.5))}}>
      <path d="M 830 700 C 1030 810 1270 810 1530 630" fill="none" stroke={C.green} strokeWidth={4} strokeDasharray="10 12" strokeDashoffset={-t*35}/>
    </svg>
    <Glass tint={C.green} rainbow={0.6} style={{left:850,top:390,width:860,height:440,opacity:success,transform:`translateY(${(1-success)*100}px)`}}>
      <div style={{padding:'35px 45px',fontFamily:INTER,color:'#F7FAFF'}}>
        <div style={{display:'flex',alignItems:'center',gap:20}}>{t<proposal?<Lightbulb size={46} color={C.green}/>:<FileCheck2 size={46} color={C.green}/>}<span style={{fontFamily:OUTFIT,fontSize:39,fontWeight:600}}>{t<method?'La oportunidad existe':t<proposal?'Dar forma a la idea':'Propuesta viable'}</span></div>
        <div style={{height:1,background:`${C.green}55`,margin:'25px 0'}}/>
        {['Conocimiento del procedimiento','Método de formulación','Impacto esperado en el banco'].map((text,i)=>{
          const at=[opportunity,method,proposal][i];const p=prog(t,at,0.6);
          return <div key={text} style={{display:'flex',alignItems:'center',gap:18,marginTop:25,opacity:p,transform:`translateX(${(1-p)*45}px)`,fontSize:29}}><Check size={30} color={C.green}/>{text}</div>;
        })}
      </div>
    </Glass>
    <Sfx at={v('Isabel')} name="pop" vol={0.18}/><Sfx at={work} name="whoosh" vol={0.15}/><Sfx at={opportunity} name="ding" vol={0.18}/><Sfx at={proposal} name="shimmer" vol={0.16}/>
  </AbsoluteFill>;
};
