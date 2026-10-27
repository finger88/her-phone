import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);const JSZip=require('jszip');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
test('single-file presentation has no local or remote runtime dependencies',()=>{
  assert(html.includes('<h1 id="hero-title">她的手机</h1>'));
  assert(!html.includes('/Users/'));assert(!/\{\{(?:icon:|[A-Z_]+\}\})/.test(html));
  assert(!/<script[^>]+src=/i.test(html));assert(!/<link[^>]+rel="stylesheet"/i.test(html));
  for(const [,url]of html.matchAll(/src="([^"]+)"/g))assert(url.startsWith('data:image/'));
  for(const [,url]of html.matchAll(/href="([^"]+)"/g))assert(url.startsWith('#')||url.startsWith('data:')||url.startsWith('https://'));
  assert.equal(fs.readFileSync(path.join(root,'dist/downloads/her-phone-introduction.html'),'utf8'),html);
});
test('all inline JavaScript is valid and four original texts are unchanged',()=>{
  for(const match of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g))if(!match[1].includes('application/json'))new vm.Script(match[2]);
  const payload=JSON.parse(html.match(/<script id="source-data" type="application\/json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(Object.keys(payload).length,4);
  for(const s of Object.values(payload))assert.equal(s.text,fs.readFileSync(path.join(root,'agent-reference',s.path),'utf8'));
});
test('ZIP passes CRC and its 25 source files match both manifest and repository',async()=>{
  const bytes=fs.readFileSync(path.join(root,'dist/downloads/her-phone-source-kit.zip'));
  const zip=await JSZip.loadAsync(bytes,{checkCRC32:true});const prefix='她的手机-源码阅读基础包/';
  const manifest=JSON.parse(await zip.file(prefix+'来源清单.json').async('string'));
  assert.equal(manifest.files.length,25);
  for(const f of manifest.files){
    const b=await zip.file(prefix+f.file).async('nodebuffer');assert.equal(hash(b),f.sha256);
    assert.equal(hash(b),hash(fs.readFileSync(path.join(root,'agent-reference',f.file.replace('Agent参考/','')))));
  }
  const embedded=Buffer.from(html.match(/href="data:application\/zip;base64,([^"]+)"/)[1],'base64');assert.equal(hash(embedded),hash(bytes));
  assert(zip.file(prefix+'从这里读起.md'));assert(zip.file(prefix+'RIGHTS.md'));assert(zip.file(prefix+'第三方许可/JSZip-LICENSE'));
  for(const [name,f]of Object.entries(zip.files)){
    assert(!/(?:^|\/)(?:USER\.md|\.env|.*凭据.*|.*\.(?:sqlite3?|db|pem|key|p12|pfx|log|jsonl)$)/i.test(name));
    if(!f.dir)assert(!/\/Users\/|\/home\/ubuntu\/|[A-Z]:\\Users\\/.test(await f.async('string')));
  }
});
test('known version conflict and product boundaries remain visible',()=>{
  assert(html.includes('metadata 1.6.0 / 身份文件 1.5.0'));assert(html.includes('非实机界面'));
  assert(html.includes('交互情境示意'));assert(html.includes('没有合作关系'));
  assert(html.includes('https://github.com/finger88/her-phone'));
});
