import {readFile,writeFile,copyFile} from 'node:fs/promises';
await copyFile('deployment/sample-guard.mjs','dist/server/sample-guard.mjs');
await writeFile('dist/server/public-entry.mjs',"import app from './index.js';\nimport {sampleWorker} from './sample-guard.mjs';\nexport default sampleWorker(app);\n");
const current=JSON.parse(await readFile('dist/server/wrangler.json','utf8'));
const config={name:'before-we-go-demo',main:'public-entry.mjs',compatibility_date:current.compatibility_date,compatibility_flags:['nodejs_compat'],no_bundle:true,rules:current.rules,assets:{directory:'../client',run_worker_first:['/api/*','/signin*','/signout*','/callback']},workers_dev:true};
await writeFile('dist/server/wrangler.public.json',JSON.stringify(config,null,2));
console.log('Prepared public sample config with no secrets or database bindings.');
