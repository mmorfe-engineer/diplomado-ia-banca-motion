import React from 'react';
import type {LucideIcon} from 'lucide-react';

// Same Lucide line icons already used by the approved Glass cards and pipelines.
// Coordinates and opacity are supplied by each scene's existing choreography.
export const InstitutionalIcon:React.FC<{
 Icon:LucideIcon; label:string; x:number; y:number; scale?:number;
 color:string; opacity?:number; glow?:number;
}>=({Icon,label,x,y,scale=1,color,opacity=1,glow=.4})=>{
 const size=180*scale;
 return <div role="img" aria-label={label} data-representation="institutional-icon"
  style={{position:'absolute',left:x-size/2,top:y-size/2,width:size,height:size,
   color,opacity,filter:`drop-shadow(0 0 ${22*glow}px ${color}66)`}}>
  <Icon width="100%" height="100%" strokeWidth={1.8} aria-hidden="true"/>
 </div>;
};
