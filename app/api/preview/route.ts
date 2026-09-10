import {authorize,requireLive,body,textField,hash,json,failure} from '@/lib/server';
import {restaurant} from '@/lib/knowledge';
import {db} from '@/lib/store';
import {makeTask,extractionSchema} from '@/lib/domain';
export async function POST(req:Request){try{const user=await authorize(req,true);const c=requireLive();const b=await body(req);const venue=restaurant.name,context=textField(b.context,'visit context',500);const id=crypto.randomUUID(),expires=Date.now()+600000;
 const payload={task:makeTask(venue,context),recipients:[{phones:[c.phone],region:c.region,locale:c.locale}],recipient_result_schema:extractionSchema,metadata:{application:'before-we-go',plan_id:id,prompt_version:'2',knowledge_snapshot:restaurant}};
 await db().prepare('INSERT INTO plans(id,owner,venue,payload,recipient_hash,expires,created) VALUES(?,?,?,?,?,?,?)').bind(id,user.userId,venue,JSON.stringify(payload),await hash(c.phone),expires,Date.now()).run();
 return json({id,expires,venue,task:payload.task,recipient:'Configured test recipient ending '+c.phone.slice(-4),notice:'One real AI call. Transcript captured. No automatic retry.'});}catch(e){return failure(e)}}
