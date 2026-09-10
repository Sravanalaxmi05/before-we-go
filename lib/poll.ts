import type {CallResult} from './domain.ts';
export async function savePoll(database:D1Database,id:string,token:string,state:string,result:CallResult|null,recipientHash:string){
 const statements=[database.prepare('UPDATE calls SET state=?,result=? WHERE id=? AND poll_token=? AND result IS NULL').bind(state,result?JSON.stringify(result):null,id,token)];
 if(result){if(result.permission==='refused')statements.push(database.prepare('INSERT OR IGNORE INTO suppression(recipient_hash,reason,created) SELECT ?,?,? FROM calls WHERE id=? AND poll_token=? AND result IS NOT NULL').bind(recipientHash,'Recipient refused',Date.now(),id,token));statements.push(database.prepare('DELETE FROM mutex WHERE call_id=? AND EXISTS(SELECT 1 FROM calls WHERE id=? AND poll_token=? AND result IS NOT NULL)').bind(id,id,token));}
 await database.batch(statements);
}
