import test from 'node:test';
import assert from 'node:assert/strict';
import {sampleWorker} from './sample-guard.mjs';
test('public deployment rejects live APIs and all mutations without invoking app',async()=>{
 let calls=0;const worker=sampleWorker({fetch(){calls++;return new Response('app')}});
 for(const [path,method] of [['/api/start','POST'],['/api/calls/private','GET'],['/','POST'],['/signin-with-chatgpt','GET']]){
  const response=await worker.fetch(new Request('https://demo.test'+path,{method}),{CALLE_API_KEY:'fake-test-secret'},{});
  assert.ok(response.status>=400);
 }
 const caps=await (await worker.fetch(new Request('https://demo.test/api/capabilities'),{},{})).json();
 assert.equal(caps.sampleOnly,true);assert.equal(caps.liveReady,false);assert.equal(calls,0);
});
test('public page cannot inherit injected identity or environment secrets',async()=>{
 const worker=sampleWorker({fetch(request,env){assert.equal(request.headers.get('oai-authenticated-user-id'),null);assert.deepEqual(env,{});return new Response('ok')}});
 const res=await worker.fetch(new Request('https://demo.test/',{headers:{'oai-authenticated-user-id':'spoof'}}),{CALLE_API_KEY:'fake'},{});
 assert.equal(await res.text(),'ok');
});
