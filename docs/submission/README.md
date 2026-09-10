# Before We Go submission checklist

## Current status — 10 September 2026

Completed evidence:

- Public source [before-we-go](https://github.com/Sravanalaxmi05/before-we-go), commit `87b2ba6`: 13 tests passing, including the built Worker HTTP flow with isolated D1 and mock CALL-E; typecheck passed. Mock provider results do not prove phone delivery.
- Private deployment [Before We Go](https://before-we-go.jatindeh.chatgpt.site) exists; judge access remains unverified.
- Community [PR #430](https://github.com/CALLE-AI/awesome-phone-call-agents/pull/430) is OPEN, with no reviews or hosted checks yet. Its separate 12-test suite and repository validator passed locally.
- Devpost draft rename and pitch were saved and verified; progress is 2/5 steps.

Blocked or unresolved:

- Two accepted real call requests failed with zero transcript. The user confirmed the first did not ring; whether the second rang is unconfirmed. No successful conversation is verified.
- No public video. Public-access and eligibility questions await the user; judging access remains unresolved.
- Devpost additional information was not persisted because requirements remain unresolved. The entry is not submitted.
- Provider-support outreach is declined; no outreach is authorized. Prior dashboard observation of 100 credits does not establish current balance or call capacity.

## Current product direction

A customer submits a restaurant enquiry. CALL-E calls that consenting customer as the disclosed AI representative of The Courtyard, a fictional restaurant. The representative explains only the versioned supplied business facts and captures customer needs, explanation excerpts and unresolved questions for staff review. The customer is never asked to act as venue staff. No booking, scheduled staff callback or access guarantee is made. The UI/domain/fixtures have been rewritten for this direction; live proof and submission gates remain open.

## Verified external requirements

The [official rules](https://call-e.devpost.com/rules), checked 10 September, specify a functional CALL-E integration, community-repository PR URL, feature description, CALL-E account email, and publicly visible YouTube/Vimeo demonstration under three minutes showing the app running. Materials must be in English (or translated). The optional demo URL does not remove the requirement to supply working testing access. Private access needs testing credentials; judges must have free, unrestricted testing access through 13 October 2026, 17:00 SGT (14:30 IST). Submission closes 14 September 2026, 23:45 SGT (21:15 IST); internal target is 18:00 IST. Recheck rules before submission. Entrant eligibility, ownership and rights must also be confirmed by the entrant.

## Pack

- `devpost-story.md`: honest draft narrative and evidence slots.
- `demo-script.md`: 2:45 recording/edit plan; use actual verified footage.
- `roleplay-scenario.md`: customer role-play and bounded fictional restaurant facts.
- `judging-instructions-draft.md`: release-blocked testing handoff.
- `contribution-checklist.md`: repository packaging and PR preparation.
- `operator-rehearsal-checklist.md`: concise pre-call and evidence rehearsal.

## Release ledger

- [ ] Independent review findings addressed: [REVIEW_EVIDENCE]
- [x] App verification at `87b2ba6`: 13 tests and typecheck passed.
- [ ] Secure CALL-E setup and actual available credits checked: [PRIVATE_SETUP_STATUS]
- [ ] Willing mobile recipient and call/capture consent recorded privately: [CONSENT_RECORD]
- [ ] Application-originated CALL-E call completed and human-reviewed: [REDACTED_LIVE_PROOF]
- [ ] Evidence separates customer needs, AI explanation and facts requiring staff confirmation: [REVIEWED_RESULT]
- [ ] Deployment works in a fresh browser: [APP_URL_AND_CHECK_TIME]
- [ ] Judging live-access mechanism tested independently: [JUDGING_ACCESS_PROOF]
- [ ] Hosting and call allowance cover judging: [AVAILABILITY_PLAN]
- [x] Contribution: local 12-test suite and validator passed; PR #430 OPEN.
- [ ] Actual demo recorded; disclosure, privacy and duration reviewed: [VIDEO_REVIEW]
- [ ] Video public on YouTube/Vimeo: [VIDEO_URL]
- [ ] CALL-E account email entered directly into required form field: [ACCOUNT_EMAIL_ENTERED_PRIVATELY]
- [x] Devpost draft rename and pitch saved and verified (2/5).
- [ ] Eligibility and public-access questions answered.
- [ ] Additional information saved after unresolved requirements are addressed.
- [ ] Final Devpost fields checked against shipped behavior: [FINAL_REVIEW]
- [ ] Submitted entry reopened and receipt/status verified: [DEVPOST_URL_AND_RECEIPT]

Do not put credentials, API keys, personal numbers or the private account email in this public pack. Call consent is separate from voice-publication consent. Remaining work is successful live evidence, working judge access, eligibility confirmation, public video and completed Devpost submission. Synthetic and mock-provider checks do not close live-integration gates.
