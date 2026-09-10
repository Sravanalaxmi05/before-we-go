import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Miniflare} from '../node_modules/.pnpm/miniflare@4.20260515.0/node_modules/miniflare/dist/src/index.js';
import {savePoll} from '../lib/poll.ts';
import {sample} from '../lib/fixtures.ts';
import {claimWithDb} from '../lib/claim.ts';
test('real D1 atomic claim: concurrent recipient mutex rollback, duplicate, suppression, budget, expiry',async()=>{
 const mf=new Miniflare({modules:true,script:'export default {fetch(){return new Response("ok")}}',d1Databases:['DB'],compatibilityDate:'2026-05-15'});
 try{const d=await mf.getD1Database('DB');for(const sql of readFileSync(new URL('../drizzle/0000_colossal_shotgun.sql',import.meta.url),'utf8').split('--> statement-breakpoint'))await d.prepare(sql).run();
 const seed=async(id:string,recipient='recipient',expires=Date.now()+100000)=>d.prepare('INSERT INTO plans VALUES(?,?,?,?,?,?,?)').bind(id,'owner','venue','{}',recipient,expires,Date.now()).run();
 await seed('one');await seed('two');
 const both=await Promise.allSettled([claimWithDb(d as any,'one','owner','recipient',2),claimWithDb(d as any,'two','owner','recipient',2)]);assert.equal(both.filter(x=>x.status==='fulfilled'&&x.value).length,1);
 assert.equal((await d.prepare('SELECT COUNT(*) n FROM reservations').first<any>()).n,1);assert.equal((await d.prepare('SELECT COUNT(*) n FROM calls').first<any>()).n,1);
 const winner=await d.prepare('SELECT id FROM calls').first<any>();await assert.rejects(claimWithDb(d as any,winner.id,'owner','recipient',2));
 await seed('budget','other');assert.equal(await claimWithDb(d as any,'budget','owner','other',1),false);
 await seed('expired','expired',0);assert.equal(await claimWithDb(d as any,'expired','owner','expired',2),false);
 await seed('blocked','blocked');await d.prepare('INSERT INTO suppression VALUES(?,?,?)').bind('blocked','refused',Date.now()).run();assert.equal(await claimWithDb(d as any,'blocked','owner','blocked',2),false);
 assert.equal(await claimWithDb(d as any,'budget','intruder','other',2),false);
 await d.prepare("UPDATE calls SET state='in_progress',poll_token='newer' WHERE id=?").bind(winner.id).run();
 await savePoll(d as any,winner.id,'older','completed',sample('refusal'),'recipient');
 assert.equal((await d.prepare('SELECT COUNT(*) n FROM mutex').first<any>()).n,1);assert.equal((await d.prepare("SELECT COUNT(*) n FROM suppression WHERE recipient_hash='recipient'").first<any>()).n,0);
 await savePoll(d as any,winner.id,'newer','completed',sample('refusal'),'recipient');
 assert.equal((await d.prepare('SELECT COUNT(*) n FROM mutex').first<any>()).n,0);assert.equal((await d.prepare("SELECT COUNT(*) n FROM suppression WHERE recipient_hash='recipient'").first<any>()).n,1);
 await savePoll(d as any,winner.id,'older','in_progress',null,'recipient');
 assert.equal((await d.prepare('SELECT state FROM calls WHERE id=?').bind(winner.id).first<any>()).state,'completed');

 }finally{await mf.dispose()}
});
