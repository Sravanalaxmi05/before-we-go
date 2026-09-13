# Before We Go

A customer enquiry triggers a callback from a disclosed restaurant AI representative. It explains a versioned fictional fact sheet, captures customer preferences and unresolved questions, and prepares a reviewed report for staff. It does not book tables, contact staff or claim live inventory.

**Status — 14 September 2026:** submitted to the CALL-E hackathon (Devpost confirmation received). The [public sample app](https://before-we-go-demo.sravanalaxmi05.workers.dev) works without login and uses labelled synthetic examples. Real API requests were accepted during development, but no successful phone conversation or transcript has been demonstrated. Later requests encountered account concurrency errors; [issue #124](https://github.com/CALLE-AI/call-e-integrations/issues/124) tracks the unresolved investigation. Source availability does not establish successful calling.

- [Main product video](https://youtu.be/0ED70rKmPJc)
- [Functional walkthrough](https://youtu.be/uPr4UWisoTQ)
- [Community contribution, merged PR #430](https://github.com/CALLE-AI/awesome-phone-call-agents/pull/430)

See [current judging instructions](docs/submission/judging-instructions-draft.md), [security boundaries](SECURITY.md) and [reuse policy](RIGHTS.md). Earlier planning documents are historical records, not current operating instructions.

## Run locally

Node 24+ and pnpm are required. Run `pnpm install`, then `pnpm dev`. The application uses the Sites/Vinext Worker runtime and D1. Generated schema migrations are in `drizzle/`. `pnpm build` creates the deployable Worker.

Copy `.env.example` to `.env.local` and configure server-only values to enable live tests. Leave `LIVE_CALLS_ENABLED=false` until the owner identity, fixed consenting recipient, region/language and reservation budget are verified. Never commit keys or real phone numbers. The browser cannot choose an arbitrary recipient.

## Test

Run `pnpm build`, then `node --experimental-strip-types --test tests/*.test.ts`. The built-Worker test requires the current production output. All 15 application checks run without live credentials or outbound calls.

The D1 claim test uses the installed Miniflare runtime to verify concurrent starts and transactional rollback. Domain tests cover provenance, wrong-speaker evidence, missing transcript and refusal. The built-Worker test runs the HTTP workflow through preview, approval, mocked CALL-E dispatch, result retrieval and persisted reviewed export, using isolated D1 state and disabled external networking. `pnpm exec tsc --noEmit` checks types.

## Workflow

1. Explore fictional cases without any API call.
2. An authorized operator previews the exact outgoing live instructions.
3. Explicit approval reserves a budget slot and recipient lock before dispatch.
4. Refresh the saved call URL to retrieve CALL-E's structured results and transcript.
5. Review customer quotes and AI explanations against the snapshotted business facts, select a report disposition and inspect the exact export before downloading.

Network ambiguity locks the call for operator reconciliation; no automatic resend or refund occurs. Provider-side retry behavior remains unverified. A reported refusal suppresses further dispatch to that recipient. No bookings, price quotes, medical records or accessibility certification.

## Integration references

- https://docs.heycall-e.com/authentication
- https://docs.heycall-e.com/api-reference/calls
- https://docs.heycall-e.com/regions
- https://github.com/CALLE-AI/call-e-integrations

## Demo honesty

Sample transcripts are synthetic. A live test, when enabled, calls a consenting person playing the CUSTOMER; CALL-E plays the fictional restaurant’s disclosed AI representative. A successful test would demonstrate the workflow, not actual venue accessibility or customer impact. No successful live conversation is currently claimed.

Community contribution: [PR #430](https://github.com/CALLE-AI/awesome-phone-call-agents/pull/430).

## Public judging demo

https://before-we-go-demo.sravanalaxmi05.workers.dev — no login, sample-only. Live call endpoints are disabled. See deployment/README.md for the separate public deployment configuration and its two additional guard tests.

## Public deployment boundary

Use only the guarded sample deployment described in [deployment/README.md](deployment/README.md) for the public demo. The private live routes depend on a trusted authentication gateway. Never expose those routes directly with real credentials or accept identity headers from arbitrary clients. Public source code does not give visitors access to private keys or recipient data.

Run `node --test deployment/sample-guard.test.mjs` for the two additional public guard checks. Run `python3 scripts/audit-publication.py` before publishing any further commits.
