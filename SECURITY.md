# Security and deployment boundaries

## Public sample

Use deployment/sample-guard.mjs and the generated wrangler.public.json configuration. This deployment rejects mutations, live API routes and authentication routes, removes incoming oai-* identity headers and passes no credentials or database bindings to the application. It is a synthetic demonstration, not a public calling service.

## Private live tools

The base application reads trusted identity headers supplied by the Sites authentication gateway. Those headers are not cryptographically verified by the application. Do not expose the base Worker directly with live credentials: arbitrary clients must never be able to supply trusted identity headers. A different host needs independently verified authentication before enabling private routes.

Keep LIVE_CALLS_ENABLED=false by default. Live operation requires server-only credentials, an authorized owner, a fixed consenting recipient and a bounded reservation budget. Do not remove reservations or retry ambiguous calls to bypass provider limits.

## Data

.env.local, .dev.vars, .wrangler, build outputs and local databases are not public artifacts. Never upload the entire workspace as a ZIP. Only publish audited Git content. If a real secret is found in Git, stop publication, revoke it and assess all historical copies; deletion in the latest commit is insufficient.

The credential pasted into the development conversation should be rotated separately. No evidence of that credential in audited Git history was found. Rotation has not been performed as part of repository preparation.

Do not post credentials, personal information or raw call records in public issues. This prototype has not undergone a comprehensive penetration test or production readiness certification.
