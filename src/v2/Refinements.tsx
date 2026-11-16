import React from 'react';
import {ArrowRight,UsersRound,ArrowLeftRight,PackageSearch,Target,FolderOpen,FileChartColumn,ShieldCheck,Wallet,MapPin,CreditCard,Activity,TrendingUp,Gauge,ChartNoAxesCombined,Wifi,TriangleAlert,Network,BookOpen,Goal,ChartColumn,Building2,GitBranch,Coins,CalendarClock,Landmark,FolderKanban,Lightbulb,ClipboardCheck,type LucideIcon} from 'lucide-react';
import {geoMercator,geoPath} from 'd3-geo';
import {feature} from 'topojson-client';
import atlas from 'world-atlas/countries-110m.json';
import {C,INTER,OUTFIT} from '../theme';
import {Glass} from '../fx';
const prog=(t:number,a:number,d=.7)=>Math.max(0,Math.min(1,(t-a)/d));
export const semantic:[LucideIcon,string][][]=[
 [[UsersRound,'Cartera de clientes'],[ArrowLeftRight,'Transacciones'],[PackageSearch,'Productos y servicios'],[Target,'Oportunidades']],
 [[FolderOpen,'Expediente'],[FileChartColumn,'Documentos financieros'],[ShieldCheck,'Validación'],[Wallet,'Capacidad de pago']],
 [[Building2,'Red de agencias'],[MapPin,'Geolocalización'],[CreditCard,'Medios de pago'],[Activity,'Monitoreo']],
 [[BookOpen,'Plan de Negocios Anual'],[Goal,'Objetivos'],[ChartColumn,'Indicadores'],[Network,'Estructura organizacional'],[GitBranch,'Procesos y manuales']],
 [[Landmark,'Activos'],[ArrowLeftRight,'Flujos financieros'],[Coins,'Monedas'],[CalendarClock,'Vencimientos'],[TrendingUp,'Proyecciones']],
];
export const SemanticFlow:React.FC<{index:number;t:number;at:number;width:number}>=({index,t,at,width})=>{
 const list=semantic[index];const gap=(width-120)/list.length;
 return <div style={{position:'absolute',left:60,right:60,top:100,height:300}}>
 <svg width="100%" height="250" style={{position:'absolute',overflow:'visible'}}><path d={`M${gap/2-60} 90H${width-180-gap/2}`} stroke={C.blue} strokeWidth={3} strokeDasharray="7 10" strokeDashoffset={-t*25} opacity={prog(t,at+.5)}/></svg>
 {list.map(([Icon,label],j)=>{const q=prog(t,at+j*.22);return <div key={label} style={{position:'absolute',left:j*gap,width:gap-20,top:(1-q)*45,opacity:q,textAlign:'center'}}><Icon size={74} color={j===list.length-1?C.green:C.blue} strokeWidth={1.7} style={{background:C.bg2,padding:15,borderRadius:22,boxSizing:'content-box',filter:`drop-shadow(0 0 12px ${C.blue}22)`}}/><div style={{fontFamily:INTER,fontSize:27,lineHeight:1.3,marginTop:22}}>{label}</div></div>})}
 </div>;
};
export const PlanningOpening:React.FC<{t:number;at:number}>=({t,at})=><div style={{position:'absolute',left:45,right:45,top:145,display:'flex',alignItems:'center',justifyContent:'space-between'}}>{[[BookOpen,'Plan de Negocios Anual'],[Lightbulb,'Iniciativa'],[Target,'Evaluación de impacto']].map(([I,label],j)=>{const Icon=I as LucideIcon;const q=prog(t,at+j*.35);return <React.Fragment key={j}>{j>0&&<ArrowRight size={40} color={C.green} style={{opacity:q}}/>}<div style={{width:250,textAlign:'center',opacity:q,transform:`translateY(${(1-q)*30}px)`}}><Icon size={82} color={j===2?C.green:C.blue}/><div style={{marginTop:20,fontSize:30,lineHeight:1.25}}>{String(label)}</div></div></React.Fragment>})}</div>;
const country=(feature(atlas as any,(atlas as any).objects.countries) as any).features.find((f:any)=>String(f.id)==='862');
const opItems:[LucideIcon,string,string][]=[
 [Building2,'Red nacional de agencias','Conexión territorial'],[CreditCard,'Medios de pago y tarjetas','Seguimiento de transacciones'],[TrendingUp,'Rentabilidad','Lectura por agencia'],[Gauge,'Productividad','Actividad frente a capacidad'],[ChartNoAxesCombined,'Demanda operativa','Demanda frente a capacidad'],[Wifi,'Disponibilidad de servicios','Continuidad del servicio'],[TriangleAlert,'Incidencias y desviaciones','Patrón para investigar'],
];
export const OperationalNetwork:React.FC<{t:number;active:number;start?:number;compact?:boolean}>=({t,active,start=0,compact=false})=>{
 const pr=geoMercator().fitExtent([[35,28],[600,342]],country);const coords=[[-67,10],[-70,8],[-64,8],[-66,6],[-62.5,9]].map(c=>pr(c as [number,number])!);const selected=active%coords.length;
 const Icon=opItems[active][0];const nameLines=[['Red nacional','de agencias'],['Medios de pago','y tarjetas'],['Rentabilidad'],['Productividad'],['Demanda operativa'],['Disponibilidad','de servicios'],['Incidencias y','desviaciones']][active];
 return <svg viewBox={compact?"0 0 660 390":"0 0 1080 430"} width="100%" height={compact?350:360} style={{overflow:'visible'}}>
 <path d={geoPath(pr)(country)||''} fill="#56B3F316" stroke={C.blue} strokeWidth={3}/>
 {coords.map(([x,y],j)=>{const visible=prog(t,start+j*.3);const color=j===selected?(active===6?C.orange:C.green):C.blue;const pulse=(Math.sin(t*3+j)+1)/2;return <g key={j} opacity={visible}>
 <path d={`M${x} ${y}V365H650V120H700`} stroke={color} strokeWidth={j===selected?3:1.5} strokeOpacity={j===selected?.8:.25} fill="none" strokeDasharray="7 11" strokeDashoffset={-t*(j===selected?30:15)}/>
 <circle cx={x} cy={y-12} r={17+pulse*10} fill="none" stroke={color} opacity={.2+pulse*.15}/>
 <g transform={`translate(${x-14},${y-34-(1-visible)*22})`} style={{filter:`drop-shadow(0 0 6px ${color}88)`}}><MapPin size={28} fill={C.bg} color={color} strokeWidth={2.3}/></g>
 </g>})}
 {!compact&&<><rect x="700" y="48" width="350" height="245" rx="20" fill={C.bg} stroke={active===6?C.orange:C.blue} strokeOpacity={.6}/>
 <foreignObject x="730" y="72" width="70" height="70"><Icon size={60} color={active===6?C.orange:C.green}/></foreignObject>
 <text x="725" y="185" fill={C.yellow} fontFamily={OUTFIT} fontSize={29}>{nameLines[0]}</text>
 {nameLines[1]&&<text x="725" y="222" fill={C.yellow} fontFamily={OUTFIT} fontSize={29}>{nameLines[1]}</text>}
 </>}{!compact&&<text x="45" y="410" fill={C.slate200} fontFamily={INTER} fontSize={27}>Venezuela</text>}
 {!compact&&<text x="725" y="340" fill={active===6?C.orange:C.green} fontFamily={INTER} fontSize={26}>{active===6?'Alerta temprana':active===4?'Cruce de capacidad: jueves':'Indicador seleccionado'}</text>}
 </svg>;
};
export const OperationsPanel:React.FC<{t:number;at:(w:string)=>number;closing?:boolean;children?:React.ReactNode}>=({t,at,closing=false,children})=>{
 const cues=[at('red'),at('medios'),at('rentabilidad'),at('productividad'),at('demanda'),at('disponibilidad'),at('anomalías')];let active=0;cues.forEach((a,j)=>{if(t>=a)active=j;});
 if(closing)active=6;
 return <><div style={{display:'flex',gap:12,padding:'0 22px 5px',alignItems:'center'}}>{opItems.map(([Icon,label],j)=><div key={label} style={{flex:1,borderBottom:`3px solid ${j===active?C.green:'#ffffff22'}`,padding:'9px 3px',textAlign:'center',color:j===active?C.green:C.slate300,opacity:j===active?1:.55}}><Icon size={32}/><div style={{fontSize:25,marginTop:8,lineHeight:1.15}}>{['Agencias','Pagos','Rentabilidad','Productividad','Demanda','Servicios','Incidencias'][j]}</div></div>)}</div>
 {closing?<div style={{display:'flex',alignItems:'center'}}><div style={{width:'64%'}}><OperationalNetwork t={t} active={6} start={cues[0]} compact/></div><div style={{width:'32%',padding:20,fontSize:30,lineHeight:1.4}}>{['Red monitorizada','Desviación identificada','Alerta temprana','Evaluación operativa'].map((s,j)=><div key={s} style={{color:j===1?C.orange:j===3?C.green:C.yellow,marginBottom:17,opacity:prog(t,at('perspectiva')+j*.32)}}>{s}</div>)}</div></div>:children?<div style={{display:'flex',alignItems:'center'}}><div style={{width:'35%'}}><OperationalNetwork t={t} active={active} start={cues[0]} compact/></div><div style={{width:'65%'}}>{children}</div></div>:<OperationalNetwork t={t} active={active} start={cues[0]}/>}
 </>;
};
export const PlanningGraph:React.FC<{t:number;at:(w:string)=>number;closing?:boolean}>=({t,at,closing=false})=>{
 const cards=[['Objetivos e','indicadores',Goal,at('objetivos')],['Estructura','organizacional',Network,at('estructura')],['Organización','y Métodos',Building2,at('estructura')+.4],['Procesos y','procedimientos',GitBranch,at('procedimientos')],['Manuales, cargos y','responsabilidades',BookOpen,at('procedimientos')+.4],['Evaluación del','impacto estratégico',Target,at('escenarios')]] as const;
 return <svg viewBox="0 0 1080 460" width="100%" height="445">
 {/* Edge anchors and orthogonal corridors stay behind opaque cards. */}
 {cards.map(([, , ,time],j)=>{const left=j<3,y=40+(j%3)*140;const q=closing?1:prog(t,time);return <path key={j} d={left?`M450 230H405V${y+42}H365`:`M630 230H675V${y+42}H715`} stroke={closing?C.green:C.blue} strokeWidth={3} strokeDasharray="8 9" strokeDashoffset={-t*22} fill="none" opacity={q}/>})}
 <rect x="450" y="170" width="180" height="120" rx="20" fill={C.bg} stroke={C.orange} strokeWidth={2}/><foreignObject x="515" y="185" width="50" height="50"><BookOpen size={44} color={C.orange}/></foreignObject><text x="540" y="260" textAnchor="middle" fill={C.yellow} fontFamily={OUTFIT} fontSize={27}>Plan Anual</text>
 {cards.map(([a,b,Icon,time],j)=>{const x=j<3?30:715,y=40+(j%3)*140;const q=closing?1:prog(t,time);return <g key={a} opacity={q} transform={`translate(0,${(1-q)*14})`}><rect x={x} y={y} width="335" height="84" rx="15" fill={C.bg2} stroke={closing?C.green:C.blue} strokeOpacity={.7}/><foreignObject x={x+14} y={y+24} width="45" height="45"><Icon size={35} color={closing?C.green:C.blue}/></foreignObject><text x={x+72} y={y+35} fill={C.yellow} fontFamily={INTER} fontSize={25}>{a}</text><text x={x+72} y={y+66} fill={C.slate200} fontFamily={INTER} fontSize={25}>{b}</text></g>})}
 {closing&&<text x="540" y="450" textAnchor="middle" fill={C.green} fontFamily={INTER} fontSize={27}>Relaciones identificadas · Dependencias afectadas</text>}
 </svg>;
};
export const InstitutionalClose:React.FC<{t:number;at:(w:string)=>number}>=({t,at})=>{
 const move=prog(t,at('convertir'),1.7);const labels=['Negocios','Crédito','Operaciones','Planificación','Finanzas'];const icons=[UsersRound,FolderOpen,Network,Target,ChartNoAxesCombined];
 return <><svg width={1920} height={1080} style={{position:'absolute'}}>{labels.map((_,j)=><path key={j} d={`M${300+j*330} 685V715Q${300+j*330} 760 960 760`} fill="none" stroke={j%2?C.green:C.blue} strokeWidth={3} opacity={.35+move*.5} strokeDasharray="8 12" strokeDashoffset={-t*35}/>)}</svg>
 {icons.map((Icon,j)=>{const x=(300+j*330)*(1-move)+(820+j*70)*move,y=530+move*160;return <div key={j} style={{position:'absolute',left:x-90,top:y-75,width:180,textAlign:'center',transform:`scale(${1-move*.6})`,opacity:1-move*.3}}><Icon size={116} color={j%2?C.green:C.blue}/></div>})}
 {labels.map((s,j)=><div key={s} style={{position:'absolute',left:200+j*330,top:625,width:200,textAlign:'center',fontSize:30,opacity:1-prog(t,at('convertir')-.3,.3),fontFamily:OUTFIT}}>{s}</div>)}
 <Glass tint={C.green} style={{left:580,top:770,width:760,height:110,display:'flex',alignItems:'center',justifyContent:'center',gap:25,opacity:prog(t,at('convertir')+.5)}}><FolderKanban size={50} color={C.green}/><div style={{fontFamily:OUTFIT,fontSize:42}}>Banco de Proyectos</div></Glass></>;
};
