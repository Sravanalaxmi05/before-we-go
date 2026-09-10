import {authorize,config,json,failure,HttpError} from '@/lib/server';
import {db} from '@/lib/store';
import {savePoll} from '@/lib/poll';
import {fetchCall,normalizeProvider,terminal} from '@/lib/provider';
export async function GET(req:Request,{params}:{params:Promise<{id:string}>}){try{
 const user=await authorize(req);const {id}=await params;
 let row=await db().prepare('SELECT calls.*,plans.venue,plans.payload,plans.recipient_hash FROM calls JOIN plans USING(id) WHERE calls.id=? AND calls.owner=?').bind(id,user.userId).first<any>();if(!row)throw new HttpError(404,'Call not found.');
 const now=Date.now();
 if(row.provider_id&&!row.result&&row.state!=='uncertain_dispatch'&&row.poll_after<=now){
 const token=crypto.randomUUID();const lock=await db().prepare('UPDATE calls SET poll_after=?,poll_token=? WHERE id=? AND poll_after<=? AND result IS NULL').bind(now+15000,token,id,now).run();
 if(lock.meta.changes){try{const remote=await fetchCall(config().key,row.provider_id);const result=terminal(remote.status)?normalizeProvider(remote,row.venue,JSON.parse(row.payload).metadata.knowledge_snapshot):null;
 await savePoll(db(),id,token,remote.status,result,row.recipient_hash);
 }catch{/* Persisted backoff retains prior state; user may refresh later. */}}
 row=await db().prepare('SELECT * FROM calls WHERE id=? AND owner=?').bind(id,user.userId).first<any>();
 }
 return json({id,state:row.state,result:row.result?JSON.parse(row.result):null,review:row.review?JSON.parse(row.review):null,nextRefreshAfter:row.poll_after});
 }catch(e){return failure(e)}}
