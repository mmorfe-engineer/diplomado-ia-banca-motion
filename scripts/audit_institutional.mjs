import ts from 'typescript';
import {readFileSync,writeFileSync} from 'node:fs';

const files=['src/scenes/S1.tsx','src/scenes/S2.tsx','src/scenes/S3.tsx','src/scenes/S4.tsx','src/scenes/S5.tsx','src/scenes/S6.tsx',
 'src/scenes/diplomado/Block07_10.tsx','src/scenes/diplomado/Block11_16.tsx','src/scenes/diplomado/Block17_21.tsx'];
const human=new Set(['S2','S3','S6','S12','S13','S14','S15','S16','S20']);
const report=[];
for(const file of files) {
 const source=ts.createSourceFile(file,readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 function walk(node) {
  if(ts.isVariableDeclaration(node)&&/^S(?:\d+|17_18)$/.test(node.name.getText(source))&&node.initializer) {
   const scene=node.name.getText(source);const people=[];const icons=[];
   function jsx(n) {
    if(ts.isJsxSelfClosingElement(n)||ts.isJsxOpeningElement(n)) {
     const name=n.tagName.getText(source);
     if(name==='Person')people.push(n.getText(source));
     if(name==='InstitutionalIcon')icons.push(n.getText(source));
    }
    ts.forEachChild(n,jsx);
   }
   jsx(node.initializer);
   if(people.length&&!human.has(scene))throw new Error(`Institutional scene contains Person: ${scene}`);
   if(scene==='S20'&&(people.length!==1||!node.getText(source).includes('i===2?<Person')))throw new Error('S20 must retain only the central Isabel');
   report.push({scene,file,personNodes:people.length,institutionalIconNodes:icons.length,
    disposition:people.length?'Human narrative, individual case or Isabel':'No individualized characters'});
  }
  ts.forEachChild(node,walk);
 }
 walk(source);
}
writeFileSync('out/correccion-institucional/auditoria-personajes.json',JSON.stringify({status:'PASS',activeFilesOnly:true,
 note:'S17_18 contains the separate S17/S18 visual scenes; original unused S7/S8 are not mounted by Video',scenes:report},null,2)+'\n');
console.log(`Representation audit PASS: ${report.length} components checked; Person confined to documented human scenes.`);
