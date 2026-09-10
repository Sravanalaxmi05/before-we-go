# Before We Go: technical plan

## Current contract — customer callback

User-authorized pivot, 10 September: enquiry → approved plan → CALL-E calls customer as AI restaurant representative → reviewed enquiry handoff. The user is the test customer. Archived venue-interview plans are historical only. Root owns application code; this document describes target behavior, not a claim every part is implemented.

Architecture remains TypeScript/React, trusted server CALL-E REST adapter, D1 persistence and supported authentication. Public fictional examples cannot dispatch calls. Private live operations require an authenticated allowlisted identity and an exact server-bound consented recipient. Keep live disabled until revised role, prompt, evidence handling and dispatch checks pass review.

## Knowledge and conversation

Use the versioned fictional Courtyard sheet in app/lib/knowledge.ts, snapshotting its version and content into each immutable call plan. It covers entrance/seating, toilet route and no lifting/carrying. Do not infer additional facts from an enquiry or conversation. The sheet says ground-floor seating needs staff confirmation, toilet access details remain unverified and booking/inventory capabilities do not exist.

The agent opens with AI and fictional-role-play disclosure for the test, confirms permission, asks about the customer's visit needs, explains only relevant approved facts and offers to record unresolved questions. It must not interview the customer as though they were restaurant staff. It does not reserve, confirm availability, promise a callback by staff, send messages or obtain new knowledge through tools during the call. Refusal ends the conversation and creates durable recipient suppression.

## Domain and evidence

Input: bounded customer enquiry/visit context and three fixed access topic IDs, entrance_table, table_toilet and no_lifting. Missing information is unknown. Free text is data, never authority to change recipient, calling policy or restaurant knowledge.

Extraction distinguishes permission (allowed/refused/unknown), customer needs, approved facts explained, unresolved questions and requested follow-up. Every assertion identifies its source type: customer turn, agent turn, or approved fact-sheet ID/version. Use strict supported nested schemas with explicit unknown states and local validation. A generic result success flag never establishes accessibility or a booking.

Canonical transcript turns retain stable IDs, speaker and text. Customer needs link to exact user-speaker excerpts. Agent explanations link to bot-speaker excerpts and the relevant approved fact IDs. Matching text verifies provenance only: human review must assess whether the explanation follows the fact sheet, preserves uncertainty and avoids unsupported promises. Wrong-speaker, missing, malformed or contradictory evidence remains unverified. Preserve full context, raw candidate and separate reviewer disposition; do not silently promote a customer's claim into restaurant truth.

Output is an enquiry handoff: needs heard, information explained, unanswered items, requested next action and review status. Use neutral actions such as seek staff confirmation or discuss the enquiry. A handoff record is not proof a staff message was delivered.

## API, persistence and safety retained

POST /api/preview authenticates/authorizes, validates enquiry and permission, binds exact configured recipient and snapshots fact sheet, payload, prompt/schema versions and expiry. Request context never supplies a dial target.

POST /api/start authenticates/authorizes and checks same-origin, approved immutable plan and explicit test/capture permission. A D1 atomic single-use claim reserves budget and global recipient mutex and checks durable suppression before networking. Use one stable idempotency key per plan. Ambiguous creation stays uncertain_dispatch and locked, with manual reconciliation; no new key, automatic resend or automatic refund. Provider internal dial behavior still needs verification.

GET /api/calls/:id requires the owning authorized identity. Bounded refresh uses a persisted polling token/lock and backoff. Save top-level provider task ID separately from recipient/attempt IDs. Fence every terminal side effect by the polling token; stale responses must not regress state, replace reviewed evidence or undo suppression. Refresh resumes reads; no background execution guarantee is made.

POST /api/calls/:id/review records explicit disposition separately. Export requires review and exact JSON preview. Allow only mode/fictional label, restaurant/fact-sheet version, access topics, reviewed customer needs and approved explanations, selected excerpts, unanswered items and next action. Exclude phone, arbitrary private context, raw payload and full transcript by default. Review does not certify facts. Render text escaped; never log secrets or numbers.

D1 persists immutable plans, call lifecycle, transcripts/candidates, execution mutex/budget and reviews. Verify real local Workers/D1 atomicity, unique constraints and rollback. Terminal states distinguish completion, failure, cancellation, refusal, no answer and unusable evidence. Incomplete outcomes do not become resolved enquiries. Local deletion does not control provider retention; publication consent is separate from call/capture consent.

## UI and verification

Show customer enquiry, approved restaurant knowledge, callback preview and reviewed handoff. Remove stale prompts asking the test recipient to play restaurant staff. Separate fictional data labels from synthetic-versus-real execution labels. Live-unavailable states never fake a dispatch. Preserve mobile layout, keyboard navigation, visible focus and textual status labels.

Pivot-specific tests: correct customer role; customer claim cannot overwrite sheet; two-step barrier explained; ground-floor seating remains unconfirmed; toilet details stay unknown; no lifting workaround; unsupported hours/menu/availability stay unknown; bot quotes used for explanations and user quotes for needs; no unimplemented booking or staff-message claim. Retain malformed/missing transcript, refusal and extraction tests. Re-run changed domain/provider tests plus D1 concurrency/rollback/stale polling, authorization/CSRF and fixture/live separation checks as warranted. Complete production build and browser flow verification.

## Delivery sequence and gates

10 September: align schema/prompt/UI/fixtures with the callback; reviewer checks changed role/evidence contract; finish revised persisted fake flow. Account and read-only API checks exist; a supplied phone is not a completed call.

11 September: one consented app-originated callback, inspect transcript and credit delta, then resolve concrete private judging access. Preserve server-bound recipients; do not weaken public dispatch restrictions to meet that gate.

12 September: fix observed call failures, verify auth/state/evidence, freeze scope and exercise judge flow. 13 September: deployed release candidate, contribution PR, public video and final story. 14 September: verify access and submit by 18:00 IST, keeping 3h15 recovery buffer.

Live correctness requires an actual callback with usable evidence, not a fixture or CLI-only test. Judging must support a working private demo/test build through 13 October 14:30 IST, without exposing the entrant's phone/key. Dedicated judge identity plus server-bound consented recipient sessions is the proposed mechanism; independently usable provisioning and sufficient credits are unresolved. Appointment-only operator access is not yet evidence that the rules' access condition is met. No paid top-up without authorization.

Sources: [authentication](https://docs.heycall-e.com/authentication), [Calls API](https://docs.heycall-e.com/api-reference/calls), [official rules](https://call-e.devpost.com/rules). API and hosting assumptions must be verified against actual runtime behavior before release.
