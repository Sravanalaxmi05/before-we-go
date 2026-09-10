import {env} from 'cloudflare:workers';
import {getChatGPTUser} from '@/app/chatgpt-auth';
export class HttpError extends Error{status:number;constructor(status:number,message:string){super(message);this.status=status}}
export function config(){const e=env as unknown as Record<string,string>;return {key:e.CALLE_API_KEY??process.env.CALLE_API_KEY??'',enabled:(e.LIVE_CALLS_ENABLED??process.env.LIVE_CALLS_ENABLED)==='true',owner:e.OWNER_USER_ID??process.env.OWNER_USER_ID??'',phone:e.TEST_RECIPIENT??process.env.TEST_RECIPIENT??'',region:e.TEST_REGION??process.env.TEST_REGION??'',locale:e.TEST_LOCALE??process.env.TEST_LOCALE??'',consent:e.TEST_CONSENT_REFERENCE??process.env.TEST_CONSENT_REFERENCE??'',limit:Number(e.CALL_RESERVATION_LIMIT??process.env.CALL_RESERVATION_LIMIT??'2')}}
export async function authorize(request:Request,mutation=false){
 const user=await getChatGPTUser();if(!user)throw new HttpError(401,'Sign in to use private call tools.');
 const c=config();if(!c.owner||user.userId!==c.owner)throw new HttpError(403,'This account is not an authorized test operator.');
 if(mutation&&request.headers.get('origin')!==new URL(request.url).origin)throw new HttpError(403,'Same-origin request required.');
 return user;
}
export function requireLive(){const c=config();if(!c.enabled||!c.key||!/^\+[1-9]\d{7,14}$/.test(c.phone)||!c.region||!c.locale||!c.consent||!Number.isInteger(c.limit)||c.limit<1||c.limit>20)throw new HttpError(409,'Live calling is not configured. Test recipient, consent, language, credits and operator access must be set first.');return c}
export async function body(req:Request){if(Number(req.headers.get('content-length')??0)>8000)throw new HttpError(413,'Request too large');const t=await req.text();if(t.length>8000)throw new HttpError(413,'Request too large');try{return JSON.parse(t)}catch{throw new HttpError(400,'Invalid JSON')}}
export function textField(v:unknown,name:string,max:number){if(typeof v!=='string'||!v.trim()||v.length>max)throw new HttpError(400,'Invalid '+name);return v.trim()}
export async function hash(s:string){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)))).map(x=>x.toString(16).padStart(2,'0')).join('')}
export function json(x:unknown,status=200){return Response.json(x,{status,headers:{'Cache-Control':'no-store'}})}
export function failure(e:unknown){if(!(e instanceof HttpError))console.error("Application operation failed",e instanceof Error?e.name+": "+e.message:"unknown");return json({error:e instanceof HttpError?e.message:'The operation could not be completed. No automatic retry was started.'},e instanceof HttpError?e.status:503)}
