import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Background,Person,Glass,Sfx} from '../fx';
import {InstitutionalIcon} from '../fx/InstitutionalIcon';
import {BriefcaseBusiness,FileCheck2,Network,Workflow,ChartNoAxesCombined,Landmark} from 'lucide-react';
import {C,INTER,OUTFIT} from '../theme';
import {SemanticFlow,PlanningOpening,OperationalNetwork,OperationsPanel,PlanningGraph,InstitutionalClose} from './Refinements';
import soundEvents from './sfx.json';
import data from './data.json';
export const cases=data;
const norm=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/gi,'').toLowerCase();
export const cue=(i:number,w:string,n=0)=>{const a=data[i].words.filter(x=>norm(String(x[0]))===norm(w));if(!a[n])throw new Error(`Cue ausente: ${i} ${w} ${n}`);return Number(a[n][1])+.6;};
const p=(t:number,a:number,d=.8)=>Math.max(0,Math.min(1,(t-a)/d));
export const specs=[
 {name:'Alejandro',unit:'Vicepresidencia de Negocios',title:'Radar de Inteligencia Comercial',problem:'Oportunidades ocultas en la cartera',proposal:'De los patrones a servicios pertinentes',close:'Nuevas posibilidades de negocio',decision:'Evaluación del ejecutivo comercial',beats:['cartera','radar','priorizadas','Transformar'],Icon:BriefcaseBusiness},
 {name:'Valentina',unit:'Vicepresidencia de Crédito',title:'Inteligencia Crediticia',problem:'Expedientes complejos y dispersos',proposal:'Evidencias organizadas para el análisis',close:'Mayor capacidad de análisis',decision:'Decisión de las instancias autorizadas',beats:['expedientes','documentos','estructurado','capacidad'],Icon:FileCheck2},
 {name:'Carlos',unit:'Vicepresidencia de Operaciones',title:'Torre de Control Bancario',problem:'Anticipar desviaciones en la red',proposal:'Indicadores conectados para investigar',close:'Anticipación operativa',decision:'Alerta para evaluación',beats:['red','torre','anomalías','perspectiva'],Icon:Network},
 {name:'Gabriela',unit:'Gerencia de Planificación',title:'Simulador de Impacto Estratégico',problem:'¿Cómo impactaría una iniciativa?',proposal:'Documentos y dependencias conectados',close:'Inteligencia estratégica',decision:'Propuesta para revisión institucional',beats:['evaluar','simulador','escenarios','Convertir'],Icon:Workflow},
 {name:'Daniel',unit:'Vicepresidencia de Finanzas',title:'Radar de Inteligencia Financiera',problem:'Anticipar cambios en la liquidez',proposal:'Flujos, activos y vencimientos',close:'Banco de proyectos',decision:'PROPUESTAS DE ALTO VALOR ESTRATÉGICO',beats:['liquidez','predictivo','escenarios','Cinco'],Icon:ChartNoAxesCombined},
];
export function lines(i:number){const result:{words:(string|number)[][],s:number,e:number}[]=[];let cur:(string|number)[][]=[];const flush=()=>{if(cur.length)result.push({words:cur,s:Number(cur[0][1])+.6,e:Number(cur[cur.length-1][2])+.6});cur=[];};for(const w of data[i].words){cur.push(w);if((/[.,?;:]$/.test(String(w[0]))&&cur.length>=3)||cur.length>=7)flush();}flush();result.forEach((l,j)=>l.e=Math.min(l.e+.6,result[j+1]?.s??l.e+.6));return result;}
const Caption:React.FC<{i:number;t:number}>=({i,t})=>{const l=lines(i).find(l=>t>=l.s-.05&&t<l.e);return l?<div style={{position:'absolute',bottom:54,left:160,right:160,textAlign:'center',zIndex:100}}><span style={{display:'inline-block',padding:'14px 30px',borderRadius:18,background:'rgba(2,6,23,.75)',border:'1px solid #ffffff22',fontSize:40,fontWeight:600}}>{l.words.map((w,j)=><span key={j} style={{color:t>=Number(w[1])+.6&&t<Number(w[2])+.65?C.orange:C.yellow}}>{String(w[0])}{j<l.words.length-1?' ':''}</span>)}</span></div>:null;};
const txt={fill:C.slate200,fontFamily:INTER,fontSize:27};
const Grid:React.FC<{labels:string[];values?:string[];q?:number}>=({labels,values,q=1})=><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,padding:34}}>{labels.map((s,j)=><div key={s} style={{opacity:p(q,j*.12,.5),transform:`translateY(${(1-p(q,j*.12,.5))*20}px)`,background:'#06162faa',border:'1px solid #56B3F344',borderRadius:18,padding:25,minHeight:125}}>{values&&<div style={{fontFamily:OUTFIT,fontSize:values[j].length>10?34:62,color:j%2?C.green:C.blue}}>{values[j]}</div>}<div style={{fontSize:29,lineHeight:1.3}}>{s}</div></div>)}</div>;
const Bars:React.FC<{q:number}>=({q})=><svg viewBox="0 0 1080 440" width="100%" height="440"><text x="50" y="40" {...txt}>Oportunidades para evaluación comercial</text>{[0,10,20,30,40].map(v=><g key={v}><path d={`M${350+v*15} 75V350`} stroke="#ffffff22"/><text x={350+v*15} y="390" textAnchor="middle" {...txt}>{v}</text></g>)}{[['Servicios de pago',32],['Servicios de nómina',24],['Gestión de cobros',18]].map(([s,v],j)=><g key={s}><text x="35" y={120+j*95} {...txt}>{s}</text><rect x="350" y={88+j*95} width={Number(v)*15*p(q,j*.12,.65)} height="48" rx="9" fill={j===1?C.green:C.blue}/><text x={370+Number(v)*15} y={123+j*95} {...txt}>{v}</text></g>)}<text x="1020" y="430" textAnchor="end" {...txt}>Total: 74 oportunidades</text></svg>;
const Chart:React.FC<{financial?:boolean;q:number;compact?:boolean}>=({financial=false,q,compact=false})=>{const chartText={...txt,fontSize:compact?36:27};const a=financial?[1200,1150,1050,980,850,760,650,550]:[45,50,62,78,90],b=financial?[1200,1000,850,620,450,250,100,-300]:[65,65,65,65,65];const labels=financial?['Hoy','+1','+2','+3','+4','+5','+6','+7']:['Lun','Mar','Mié','Jue','Vie'];const min=financial?-400:0,max=financial?1400:100;const x=(j:number)=>110+j*850/(a.length-1),y=(v:number)=>365-(v-min)/(max-min)*300;const points=(vals:number[])=>vals.map((v,j)=>`${x(j)},${y(v)}`).join(' ');return <svg viewBox="0 0 1080 480" width="100%" height={compact?350:430}><text x="40" y="35" {...chartText} fontSize={compact?30:27}>{financial?'Liquidez proyectada · miles de USD · siete días':'Demanda y capacidad · operaciones/hora'}</text>{(financial?[-300,0,600,1200]:[0,25,50,65,100]).map(v=><g key={v}><path d={`M110 ${y(v)}H960`} stroke={v===0?'#ffffff99':'#ffffff22'} strokeWidth={v===0?2:1}/><text x="90" y={y(v)+9} textAnchor="end" {...chartText}>{v.toLocaleString('es-VE')}</text></g>)}<g style={{clipPath:`inset(0 ${Math.max(0,1-q)*100}% 0 0)`}}><polyline points={points(a)} fill="none" stroke={C.blue} strokeWidth="6"/><polyline points={points(b)} fill="none" stroke={C.orange} strokeWidth="6" strokeDasharray="13 9"/>{a.map((v,j)=><circle key={j} cx={x(j)} cy={y(v)} r="6" fill={C.blue}/>)}</g>{labels.map((s,j)=><text key={s} x={x(j)} y="405" textAnchor="middle" {...chartText}>{s}</text>)}<path d="M115 450H170" stroke={C.blue} strokeWidth="5"/><text x="185" y="459" {...chartText}>{financial?'Escenario base':'Demanda estimada'}</text><path d="M590 450H645" stroke={C.orange} strokeWidth="5" strokeDasharray="12 8"/><text x="660" y="459" {...chartText}>{financial?'Escenario adverso':'Capacidad'}</text></svg>;};
// Refinements are local to V2. Approved charts, voice data and captions stay unchanged.
export const StrategicCase:React.FC<{index:number}>=({index:i})=>{
 const t=useCurrentFrame()/30,d=data[i],s=specs[i],at=(w:string)=>cue(i,w);
 const beats=s.beats.map((w,j)=>cue(i,w,i===1&&j===3?1:0));
 const stage=t<beats[0]?0:t<beats[1]?1:t<beats[2]?2:t<beats[3]?3:4;
 const ending=stage===4,general=i===4&&ending,expanded=stage>=3||(i===2&&stage>=2);
 const q=p(t,beats[Math.min(stage-1,3)]||0,1.1);
 const shift=p(t,beats[0],1.2),entry=p(t,.1,.8),toward=p(t,beats[1],1.1);
 const exit=p(t,beats[i===2?1:2]-.6,.6);
 const personX=385-shift*65-exit*30,personY=535+(1-entry)*70+Math.sin(t*1.6)*5-exit*15;
 const left=expanded?190:650,width=expanded?1540:1100;
 const credit=<Grid q={ending?1:q} labels={['Requisitos verificados','Pendientes de verificación','Capacidad de pago · Base / adverso','Informe en borrador · Documento simulado']} values={['8/10','2/10','Dos escenarios','Evidencias vinculadas']}/>;
 const product=i===0?<Bars q={ending?1:q}/>:i===1?credit:i===2?<Chart q={ending?1:q}/>:i===3?<Grid q={q} labels={['Objetivos relacionados','Procesos afectados','Procedimientos por revisar','Áreas involucradas']} values={['3','6','4','5']}/>:<Chart financial q={q}/>;
 const panelHeading=ending?i===0?'Oportunidades comerciales identificadas':i===1?'Expediente estructurado para evaluación':i===2?'Red monitorizada · Evaluación operativa':'Evaluación del impacto estratégico':i===2?(stage>=3?'Demanda, capacidad e incidencias':'Monitoreo de variables operativas'):stage<=1?s.problem:stage===2?s.proposal:i===4?'Anticipación de escenarios financieros':'Demostración para evaluación';
 return <AbsoluteFill style={{fontFamily:INTER,color:C.yellow,opacity:Math.min(p(t,0,.5),p(d.frames/30-t,0,.5))}}>
 <Background hue={i%2?C.green:C.blue}/>
 <div style={{position:'absolute',left:130,top:65,fontFamily:OUTFIT,fontSize:26,letterSpacing:2,color:C.blue}}>{general?'CINCO ÁREAS MEDULARES':s.unit.toUpperCase()}</div>
 <div style={{position:'absolute',left:130,top:132,right:130,fontFamily:OUTFIT,fontSize:64,fontWeight:600,lineHeight:1.15}}>{ending?s.close:s.title}</div>
 {!expanded&&<><Person x={personX} y={personY} scale={1.48-toward*.1-exit*.12} color={[C.orange,C.blue,C.green,C.orange,C.blue][i]} mood={.15+shift*.4+toward*.25} look={.35+toward*.4+Math.sin(t*1.2)*.1} glow={.35+toward*.2} opacity={entry*(1-exit)}/><div style={{position:'absolute',left:personX-205,top:765,width:410,textAlign:'center',fontFamily:OUTFIT,fontSize:42,opacity:entry*(1-exit)}}>{s.name}</div></>}
 {general?<><div style={{position:'absolute',left:200,right:200,top:305,textAlign:'center',fontSize:38,color:C.green}}>{s.decision}</div><InstitutionalClose t={t} at={at}/></>:<>
 <Glass tint={ending?C.green:C.blue} style={{left,top:ending?305:300,width,height:ending?555:555,padding:20}}>
 <div style={{fontFamily:OUTFIT,fontSize:34,color:C.green,padding:'5px 24px 15px'}}>{panelHeading}</div>
 {i===2?<OperationsPanel t={t} at={at} closing={ending}>{stage>=3&&!ending?<Chart q={q} compact/>:undefined}</OperationsPanel>:
 ending?i===3?<PlanningGraph t={t} at={at} closing/>:product:
 stage<=1?i===3?<PlanningOpening t={t} at={.4}/>:<><SemanticFlow index={i} t={t} at={.4} width={width}/><div style={{position:'absolute',top:400,left:60,right:60,fontSize:30,textAlign:'center',lineHeight:1.4}}>{['Cartera de clientes · Patrones por descubrir','Expediente · Requisitos por verificar','','Iniciativa: digitalización de un servicio','Posición actual · Horizonte futuro'][i]}</div></>:
 stage===2?i===3?<PlanningGraph t={t} at={at}/>:<Grid q={q} labels={i===0?['Patrones transaccionales','Necesidades','Servicios pertinentes','Recomendaciones explicadas']:i===1?['Estados financieros','Capacidad de pago','Garantías','Inconsistencias por verificar']:['Flujos','Activos','Vencimientos','Posiciones en moneda extranjera · USD']}/>:
 product}
 {i===4&&stage===3&&<div style={{fontSize:25,position:'absolute',bottom:12,left:50,color:C.orange}}>Adverso +7: brecha de 300 mil USD · −300 mil USD</div>}
 </Glass>
 {i===2&&stage===3&&<div style={{fontSize:27,position:'absolute',top:880,left:230,color:C.orange}}>Cruce de capacidad: jueves · Rechazos: evento por investigar</div>}
 {ending&&<div style={{position:'absolute',top:880,left:200,right:200,textAlign:'center',fontSize:27,color:C.slate200}}>{s.decision}</div>}
 </>}
 <Caption i={i} t={t}/>
 <Sequence from={18}><Audio src={staticFile(`voice/v2/${d.key}.wav`)}/></Sequence>
 {soundEvents.filter(e=>e.case===i).map((e,j)=><Sfx key={j} at={e.localFrame/30} name={e.name} vol={e.volume}/>)}
 </AbsoluteFill>;
};
export const StrategicBlock:React.FC=()=>{let cursor=0;return <AbsoluteFill>{data.map((d,i)=>{const from=cursor;cursor+=d.frames;return <Sequence key={d.key} from={from} durationInFrames={d.frames}><StrategicCase index={i}/></Sequence>})}</AbsoluteFill>};
