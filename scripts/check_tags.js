const fs=require('fs');
const path=require('path');
const file=path.join(__dirname,'..','app','about-us','page.tsx');
const s=fs.readFileSync(file,'utf8');
const tagRegex=/<(\/)?([a-zA-Z0-9_-]+)([^>]*)>/g;
let m; const stack=[]; const lines=s.split('\n');
function getLine(pos){let acc=0;for(let i=0;i<lines.length;i++){acc+=lines[i].length+1; if(pos<acc) return i+1;}return lines.length;}
while((m=tagRegex.exec(s))){const closing=!!m[1]; const tag=m[2]; const attrs=m[3]; const pos=m.index; const ln=getLine(pos);
 const selfClosing = /\/\s*$/.test(attrs.trim()) || ['br','img','input','hr','meta','link','path','source'].includes(tag);
 if(!closing && !selfClosing){stack.push({tag,ln});}
 else if(closing){
   if(stack.length===0){console.log('Unmatched closing',tag,'at',ln);} else{const top=stack[stack.length-1]; if(top.tag===tag){stack.pop();} else{console.log('Mismatch at',ln,'closing',tag,'but top is',top.tag,'opened at',top.ln);stack.pop();}}
 }
}
if(stack.length) {console.log('Unclosed tags:'); stack.slice(0,50).forEach(x=>console.log(x.tag,'opened at line',x.ln));}
else console.log('All tags matched');
