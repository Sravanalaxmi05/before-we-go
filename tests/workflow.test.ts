import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,globSync} from 'node:fs';
import {resolve} from 'node:path';
import {Miniflare,createFetchMock} from '../node_modules/.pnpm/miniflare@4.20260515.0/node_modules/miniflare/dist/src/index.js';
import {fixtureExtraction,fixtureTurns} from '../lib/fixtures.ts';

test('built Worker: authorized preview, single dispatch, persisted result and reviewed export',async()=>{
 const mock=createFetchMock();mock.disableNetConnect();
 const api=mock.get('https://api.heycall-e.com');
 api.intercept({path:'/v1/calls',method:'POST'}).reply(201,{id:'call_workflow',status:'queued'});
 api.intercept({path:'/v1/calls/call_workflow',method:'GET'}).reply(200,{id:'call_workflow',status:'completed',recipients:[{structured_result:fixtureExtraction,attempts:[{transcript_turns:fixtureTurns.map(t=>({speaker:t.speaker==='agent'?'bot':'user',text:t.text}))}]}]});
 const mf=new Miniflare({modules:[{type:'ESModule',path:resolve('dist/server/index.js')},...globSync('dist/server/**/*.js').filter(p=>p!=='dist/server/index.js').map(p=>({type:'ESModule' as const,path:resolve(p)}))],compatibilityDate:'2026-05-15',compatibilityFlags:['nodejs_compat'],d1Databases:['DB'],fetchMock:mock,bindings:{CALLE_API_KEY:'fixture-key-not-real',LIVE_CALLS_ENABLED:'true',OWNER_USER_ID:'workflow-owner',TEST_RECIPIENT:'+12025550123',TEST_REGION:'US',TEST_LOCALE:'en-US',TEST_CONSENT_REFERENCE:'Synthetic isolated test; network disabled',CALL_RESERVATION_LIMIT:'1'}});
 try{
 const db=await mf.getD1Database('DB');for(const sql of readFileSync('drizzle/0000_colossal_shotgun.sql','utf8').split('--> statement-breakpoint'))await db.prepare(sql).run();
 const headers={'oai-authenticated-user-id':'workflow-owner','oai-authenticated-user-email':'fixture@example.test','Origin':'http://localhost','Content-Type':'application/json'};
 const request=(path:string,body?:unknown,extra={})=>mf.dispatchFetch('http://localhost'+path,{method:body===undefined?'GET':'POST',headers:{...headers,...extra},body:body===undefined?undefined:JSON.stringify(body)});
 assert.equal((await mf.dispatchFetch('http://localhost/api/preview',{method:'POST',body:'{}'})).status,401);
 assert.equal((await request('/api/preview',{context:'Family visit'},{Origin:'https://untrusted.example'})).status,403);
 const preview=await request('/api/preview',{context:'A family lunch with a step-free table and toilet questions.',venue:'An unapproved restaurant'});assert.equal(preview.status,200);const plan:any=await preview.json();assert.ok(plan.recipient.includes('0123'));assert.ok(!JSON.stringify(plan).includes('+12025550123'));assert.ok(!plan.venue.includes('unapproved'));
 const saved:any=await db.prepare('SELECT payload FROM plans WHERE id=?').bind(plan.id).first();assert.ok(JSON.parse(saved.payload).metadata.knowledge_snapshot);
 assert.equal((await request('/api/start',{planId:plan.id,approved:false})).status,400);
 const start=await request('/api/start',{planId:plan.id,approved:true});assert.equal(start.status,200);assert.equal((await start.json() as any).state,'queued');
 assert.equal((await request('/api/start',{planId:plan.id,approved:true})).status,409);
 const poll=await request('/api/calls/'+plan.id);assert.equal(poll.status,200);const call:any=await poll.json();assert.equal(call.state,'completed');assert.equal(call.result.permission,'allowed');assert.ok(call.result.openQuestions.length>0);
 assert.equal((await request('/api/calls/'+plan.id,undefined,{'oai-authenticated-user-id':'someone-else'})).status,403);
 assert.equal((await request('/api/calls/'+plan.id+'/review',{action:'seek_confirmation',reviewed:false})).status,400);
 const review=await request('/api/calls/'+plan.id+'/review',{action:'seek_confirmation',reviewed:true});assert.equal(review.status,200);const exported=await review.json();const stored:any=await db.prepare('SELECT review FROM calls WHERE id=?').bind(plan.id).first();assert.deepEqual(JSON.parse(stored.review),exported);
 assert.equal((await db.prepare('SELECT COUNT(*) n FROM reservations').first<any>()).n,1);assert.equal((await db.prepare('SELECT COUNT(*) n FROM mutex').first<any>()).n,0);
 mock.assertNoPendingInterceptors();
 }finally{await mf.dispose();await mock.close()}
});
