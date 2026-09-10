import {authorize,requireLive,body,textField,hash,json,failure,HttpError} from '@/lib/server';
import {db,claim} from '@/lib/store';
import {requestCall} from '@/lib/provider';
export async function POST(req:Request){try{const user=await authorize(req,true);const c=requireLive();const b=await body(req);const id=textField(b.planId,'plan',100);if(b.approved!==true)throw new HttpError(400,'Explicit plan approval is required.');
 const p=await db().prepare('SELECT payload FROM plans WHERE id=? AND owner=?').bind(id,user.userId).first<{payload:string}>();if(!p)throw new HttpError(404,'Plan not found.');
 let claimed=false;try{claimed=await claim(id,user.userId,await hash(c.phone),c.limit)}catch{throw new HttpError(409,'Plan already started, recipient busy, or budget unavailable. Do not create a replacement call.')}
 if(!claimed)throw new HttpError(409,'Plan expired, suppressed recipient, or reservation budget reached.');
 try{const response=await requestCall(c.key,JSON.parse(p.payload),'bwg-'+id);await db().prepare("UPDATE calls SET state=?,provider_id=? WHERE id=? AND state='claimed'").bind(response.status,response.id,id).run();return json({id,state:response.status});}
 catch{await db().prepare("UPDATE calls SET state='uncertain_dispatch' WHERE id=? AND state='claimed'").bind(id).run();return json({id,state:'uncertain_dispatch',notice:'Dispatch could not be confirmed. Locked for operator reconciliation; do not retry.'},202)}
 }catch(e){return failure(e)}}
