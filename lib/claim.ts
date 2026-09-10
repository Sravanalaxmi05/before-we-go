export async function claimWithDb(database:D1Database,id:string,owner:string,recipientHash:string,limit:number){
 const now=Date.now();
 // D1 batches are transactional. The two INSERTs select only the single newly
 // claimed call. Unique constraints roll back the entire claim on a conflict.
 const result=await database.batch([
 database.prepare(`INSERT INTO calls(id,owner,state,created) SELECT id,owner,'claimed',? FROM plans WHERE id=? AND owner=? AND recipient_hash=? AND expires>? AND NOT EXISTS(SELECT 1 FROM suppression WHERE recipient_hash=?) AND (SELECT COUNT(*) FROM reservations)<?`).bind(now,id,owner,recipientHash,now,recipientHash,limit),
 database.prepare(`INSERT INTO reservations(id,recipient_hash,created) SELECT id,?,? FROM calls WHERE id=? AND state='claimed' AND created=?`).bind(recipientHash,now,id,now),
 database.prepare(`INSERT INTO mutex(recipient_hash,call_id) SELECT ?,id FROM calls WHERE id=? AND state='claimed' AND created=?`).bind(recipientHash,id,now),
 ]);
 return result[0].meta.changes===1;
}
