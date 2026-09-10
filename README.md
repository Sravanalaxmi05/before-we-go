# Before We Go

A customer enquiry triggers a callback from a disclosed restaurant AI representative. It explains a versioned fictional fact sheet, captures customer preferences and unresolved questions, and prepares a reviewed report for staff. It does not book tables, contact staff or claim live inventory.

**Current status:** working synthetic evidence/review UI and server integration implementation. API authentication verified. First application call test in progress; judging access is not verified. Fictional examples are labeled and never dial a number.

## Run locally

Node 24+ and pnpm are required. Run `pnpm install`, then `pnpm dev`. The application uses the Sites/Vinext Worker runtime and D1. Generated schema migrations are in `drizzle/`. `pnpm build` creates the deployable Worker.

Copy `.env.example` to `.env.local` and configure server-only values to enable live tests. Leave `LIVE_CALLS_ENABLED=false` until the owner identity, fixed consenting recipient, region/language and reservation budget are verified. Never commit keys or real phone numbers. The browser cannot choose an arbitrary recipient.

## Test

`node --experimental-strip-types --test tests/domain.test.ts tests/claim.test.ts tests/provider.test.ts`

The D1 claim test uses the installed Miniflare runtime to verify concurrent starts and transactional rollback. Domain tests cover provenance, wrong-speaker evidence, missing transcript and refusal. `pnpm exec tsc --noEmit` checks types.

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

Sample transcripts are synthetic. A live test, when enabled, calls a consenting person role-playing a fictional restaurant. Such a test proves the workflow and integration, not actual venue accessibility or customer impact.
