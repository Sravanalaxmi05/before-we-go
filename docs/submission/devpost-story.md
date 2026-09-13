> Historical development document. For current status, demo access and limitations, use the repository README. Earlier references to pending submission, private-only judging access or an open contribution PR are superseded.

# Before We Go — Devpost story draft

Current status: see `README.md` for completed evidence and blocked requirements. Devpost is a saved draft at 2/5, not a submitted entry. Public-access and eligibility questions await the user; additional information is not saved.

Draft for the confirmed customer-callback direction. Three accepted tasks failed without transcripts. The user confirmed that neither of the two application-to-mobile attempts rang; ringing for the separate minimal diagnostic is unconfirmed. Alternate-India and official-US requests were rejected with HTTP 429 and did not create accepted tasks. No successful conversation is verified. Check all implementation statements against the final release before submission.

## Inspiration

A customer asks a restaurant about a family visit. A general reassurance can leave practical questions unanswered: can they get a ground-floor table, what is known about the toilet route, and what still needs a staff check? Before We Go turns that enquiry into a bounded conversation and a reviewable staff handoff.

## What it does

The customer submits an enquiry and receives a consented callback from the restaurant’s disclosed AI representative. The representative asks about the customer’s visit requirements, explains only the supplied restaurant information, and captures unanswered questions for staff review.

The current synthetic UI provides four scenarios, transcript evidence, explicit review/disposition and exact JSON export. The handoff separates customer-stated needs from the AI’s explanation excerpts and the versioned business facts. A matched quote shows what was said, not whether it is correct. Staff must review the conversation and outstanding questions before acting.

The fictional restaurant’s entrance and ground-floor dining area are step-free, but ground-floor table availability needs staff confirmation. Its ground-floor toilet exists; its complete route, doorway width and turning space are unverified. The representative must preserve those gaps. It cannot book, promise availability, schedule a staff callback or certify access.

## How we built it

The UI, domain model, knowledge source and fixtures have been rewritten for customer callbacks. A server-side CALL-E adapter and persisted D1 dispatch implementation are built; app verification is recorded in `README.md` at source commit `87b2ba6`. The result contract separates customer excerpts from AI explanation excerpts and includes staff follow-up and the knowledge version in the reviewed export.

The published source includes the React 19 interface, Vinext Worker routes and D1 persistence. Local Worker checks enforce an operator identity and same-origin mutations; local identity headers are a test harness, not proof of deployed judge access. See `README.md` for the current app and contribution validation evidence.

## Demonstration and evidence

The intended live demonstration calls the entrant’s willing mobile. The entrant plays the CUSTOMER with an enquiry; the AI plays the fictional restaurant representative. All business information is fictional, supplied to the AI in advance and bounded. This is not a call to a real restaurant or evidence of venue/customer adoption.

The CALL-E account exists and a read-only API verification returned HTTP 200. The dashboard displays 100 credits; calling capacity is unverified. Three accepted tasks failed without transcripts. The user confirmed that neither of the two application-to-mobile attempts rang; ringing for the separate minimal diagnostic is unconfirmed. Alternate-India and official-US requests were rejected with HTTP 429 and did not create accepted tasks. No successful conversation is verified.

[ADD ACTUAL LIVE TEST DATE, RELEASE COMMIT, REDACTED PROOF, OBSERVED RESULT AND REVIEW CORRECTIONS.]

## Challenges and learning

The central challenge is keeping the representative within its knowledge while understanding what the customer needs. Customer speech establishes preferences; AI speech records an explanation; neither creates new restaurant facts. Missing information must remain a staff task.

A short create-request timeout left the first live dispatch uncertain. We retained its lock and reconciled the same saved request with the same idempotency key, then increased the timeout. Independent review also exposed stale poll responses that could unlock a recipient; persisted poll tokens now fence both state updates and terminal side effects. These tests improve application reliability without proving that a phone conversation will succeed.

## What's next

Validate the handoff with customers and restaurant staff, and evaluate whether bounded callbacks reduce repeated explanation. A real deployment would need maintained business information, consent-aware customer onboarding and an actual staff process. The prototype records follow-up; it does not deliver or schedule it.

Related work includes [AccessLine](https://github.com/CALLE-AI/awesome-phone-call-agents/tree/main/apps/python/accessline). Before We Go’s current direction is a restaurant representative calling its customer about an enquiry. We do not claim first-of-kind novelty or superior results.

## Form values pending

- Public source: https://github.com/Sravanalaxmi05/before-we-go
- Private deployment: https://before-we-go.jatindeh.chatgpt.site (judge access unresolved)
- Contribution: https://github.com/CALLE-AI/awesome-phone-call-agents/pull/430
- Public video: [YOUTUBE_OR_VIMEO_URL]
- Built with: TypeScript, React 19, Vinext, Cloudflare Workers, D1/SQLite, CALL-E REST API, Node.js 24, Miniflare
- Testing instructions: [FINAL_PRIVATE_TESTING_INSTRUCTIONS]
- CALL-E email: [ENTER_DIRECTLY_IN_PRIVATE_FORM_FIELD]
