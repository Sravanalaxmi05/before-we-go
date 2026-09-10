import {env} from 'cloudflare:workers';
import {claimWithDb} from './claim';
export const db=()=>env.DB;
export async function claim(id:string,owner:string,recipientHash:string,limit:number){return claimWithDb(db(),id,owner,recipientHash,limit)}
