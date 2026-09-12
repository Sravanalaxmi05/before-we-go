# Public sample deployment

The public Cloudflare Worker uses `sample-guard.mjs` in front of the existing application. It accepts read-only page requests and returns fixed sample capabilities. Live API, authentication and mutation requests are rejected before the application is invoked. No secrets, D1 database or owner identity is configured. The regular private deployment is unchanged.

After `pnpm build`, run `node deployment/prepare-public.mjs`, then deploy `dist/server/wrangler.public.json` with Wrangler to the project owner's Cloudflare account. Do not deploy the regular generated wrangler.json to this public Worker. Verify the public capabilities, disabled live routes and browser sample/export workflow after deployment.

Public URL: https://before-we-go-demo.sravanalaxmi05.workers.dev

This deployment demonstrates synthetic examples only. It does not resolve the CALL-E live-calling blocker. Keep it available through the end of judging, October 13, 2026, 17:00 SGT.
