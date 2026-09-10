import {getChatGPTUser} from '@/app/chatgpt-auth';
import {config,json} from '@/lib/server';
export async function GET(){const user=await getChatGPTUser();const c=config();const operator=!!user&&!!c.owner&&user.userId===c.owner;return json({signedIn:!!user,operator,liveReady:operator&&c.enabled&&!!c.key&&!!c.phone&&!!c.consent,reason:'Live calls require an authorized operator and a configured consenting test recipient.'})}
