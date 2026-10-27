import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const JSZip=require('jszip');
const lucide=require('lucide');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const config=JSON.parse(fs.readFileSync(path.join(root,'site.config.json'),'utf8'));
const reference=path.join(root,'agent-reference');
const out=path.join(root,'dist');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const stamp=new Date(config.snapshotDate+'T00:00:00Z');
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{
  const p=path.join(dir,e.name);if(e.isSymbolicLink())throw new Error('Symlink not allowed: '+e.name);
  return e.isDirectory()?walk(p):[p];
}).sort();}
function assertSafe(name,text){
  if(/(?:^|\/)(?:USER\.md|\.env(?:\.|$)|.*凭据.*|.*\.(?:sqlite3?|db|pem|key|p12|pfx|log|jsonl)$)/i.test(name))throw new Error('Private file: '+name);
  if(/\/Users\/|\/home\/ubuntu\/|[A-Z]:\\Users\\/.test(text))throw new Error('Private filesystem path: '+name);
  if(/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|\bsk-[A-Za-z0-9_-]{20,}\b|\bgh[pousr]_[A-Za-z0-9]{30,}\b/.test(text))throw new Error('Credential-like content: '+name);
}
const zip=new JSZip();
const files=[];
const prefix='她的手机-源码阅读基础包/';
function zipFile(name,bytes){zip.file(prefix+name,bytes,{date:stamp,unixPermissions:0o644,createFolders:false});}
for(const p of walk(reference)){
  const name=path.relative(reference,p).split(path.sep).join('/');
  if(!name.endsWith('.md')&&name!=='.metadata.json')throw new Error('Unexpected reference file: '+name);
  const b=fs.readFileSync(p);assertSafe(name,b.toString('utf8'));
  zipFile('Agent参考/'+name,b);files.push({file:'Agent参考/'+name,bytes:b.length,sha256:sha(b)});
}
const manifest={captured_on:config.snapshotDate,note:'历史参考文本，metadata 1.6.0 / IDENTITY 1.5.0冲突保留。未附项目开源许可证。',files};
zipFile('从这里读起.md',fs.readFileSync(path.join(root,'docs/reading-guide.md')));
zipFile('来源清单.json',JSON.stringify(manifest,null,2)+'\n');
zipFile('RIGHTS.md',fs.readFileSync(path.join(root,'RIGHTS.md')));
zipFile('第三方许可/JSZip-LICENSE',fs.readFileSync(path.join(root,'assets/JSZip-LICENSE')));
const pack=await zip.generateAsync({type:'nodebuffer',platform:'UNIX',compression:'DEFLATE',compressionOptions:{level:9}});
const hero=fs.readFileSync(path.join(root,'assets/hero.webp'));
const chosen={soul:'SOUL.md',memory:'MEMORY.md',correction:'skills/accept-user-correction/SKILL.md',rendezvous:'skills/schedule-rendezvous/SKILL.md'};
const sourceData=Object.fromEntries(Object.entries(chosen).map(([id,p])=>[id,{name:path.basename(p),path:p,text:fs.readFileSync(path.join(reference,p),'utf8')}]));
let html=fs.readFileSync(path.join(root,'src/index.template.html'),'utf8');
for(const [key,value] of Object.entries({HERO:'data:image/webp;base64,'+hero.toString('base64'),PACK_DATA:pack.toString('base64'),PACK_SIZE:Math.ceil(pack.length/1024)+' KB',SOURCE_DATA:JSON.stringify(sourceData).replace(/</g,String.fromCharCode(92)+'u003c'),SITE_URL:config.siteUrl,REPOSITORY_URL:config.repositoryUrl}))html=html.replaceAll('{{'+key+'}}',value);
html=html.replace(/\{\{icon:(\w+)\}\}/g,(_,name)=>{
  if(!lucide[name])throw new Error('Unknown Lucide icon: '+name);
  const shapes=lucide[name].map(([tag,attrs])=>`<${tag} ${Object.entries(attrs).map(([k,v])=>`${k}="${v}"`).join(' ')}/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes}</svg>`;
});
html=html.replace('</head>','<!-- Icons: Lucide ISC license. '+fs.readFileSync(path.join(root,'assets/Lucide-LICENSE'),'utf8').replaceAll('--','- -')+' -->\n</head>');
if(/\{\{(?:icon:|[A-Z_]+\}\})/.test(html))throw new Error('Unresolved template marker');
assertSafe('index.html',html);
for(const dir of ['','assets','downloads'])fs.mkdirSync(path.join(out,dir),{recursive:true});
fs.writeFileSync(path.join(out,'index.html'),html);
fs.writeFileSync(path.join(out,'downloads/her-phone-introduction.html'),html);
fs.writeFileSync(path.join(out,'downloads/her-phone-source-kit.zip'),pack);
fs.writeFileSync(path.join(out,'assets/hero.webp'),hero);
fs.writeFileSync(path.join(out,'source-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
fs.writeFileSync(path.join(out,'.nojekyll'),'');
console.log(JSON.stringify({html_bytes:Buffer.byteLength(html),pack_bytes:pack.length,source_files:files.length,site:config.siteUrl}));
