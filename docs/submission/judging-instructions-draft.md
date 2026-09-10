# Judging instructions — blocked draft

Current status: see `README.md` for completed evidence and blocked requirements. Devpost is a saved draft at 2/5, not a submitted entry. Public-access and eligibility questions await the user; additional information is not saved.

Do not paste this into Devpost until every placeholder is resolved and a fresh tester completes the path. Current status: working judge access and a successful live conversation have not been verified. The owner-only recipient design does not yet establish a usable judge calling flow. See the verified requirements in `README.md` and the [official rules](https://call-e.devpost.com/rules).

The current UI supports four synthetic scenarios, transcript evidence, explicit review/disposition and exact JSON export. The server adapter and persisted dispatch are implemented with current verification recorded in `README.md`. Account/API access was verified read-only. Three accepted tasks failed without transcripts. The user confirmed that neither of the two application-to-mobile attempts rang; ringing for the separate minimal diagnostic is unconfirmed. Alternate-India and official-US requests were rejected with HTTP 429 and did not create accepted tasks. No successful conversation is verified. The displayed 100 credits are not a verified call allowance.

The result concerns customer preferences and staff follow-up, not staff-reported venue verification. No booking or staff callback is scheduled by the prototype.

## Handoff fields

- Private deployment: https://before-we-go.jatindeh.chatgpt.site — judge access unresolved
- Public source: https://github.com/Sravanalaxmi05/before-we-go
- Supported browser/platform: [TESTED_PLATFORM]
- Dedicated judge login and password, if needed: [PROVIDE_IN_PRIVATE_TESTING_FIELD_ONLY]
- Availability verified through: [13 OCTOBER 2026, 14:30 IST OR LATER]
- Live calling procedure: [IMPLEMENTED_AND_TESTED_CONSENTING_RECIPIENT_MECHANISM]
- CALL-E credits available for testing: [VERIFIED_ALLOWANCE_AND_REPLENISHMENT_PLAN]
- Support route: [ENTRANT_PROVIDED_CONTACT]

## Intended test sequence — align with shipped controls

1. Open the project and inspect the labeled synthetic customer-callback example. Review the customer enquiry and supplied fictional restaurant facts.
2. Inspect customer needs, separate AI explanation excerpts and unresolved staff questions. Ground-floor table availability and toilet access details remain unconfirmed. This is fixture inspection, not proof of calling.
3. Sign in using dedicated testing access. Follow [EXACT_VERIFIED_LIVE_SETUP_STEPS] to use an explicitly consenting recipient. The entrant's personal number and provider key must not be exposed.
4. Review the call plan, acknowledge test/capture permission and start once. The recipient plays the CUSTOMER using `roleplay-scenario.md` in their own words; the AI represents the fictional restaurant.
5. Follow status until completion. Review the actual transcript and results; unresolved evidence should remain visible. Record a staff-review disposition and inspect the reviewed JSON export. Confirm its contents against the displayed review.
6. For no answer, refusal or uncertain dispatch, follow [VERIFIED_RECOVERY_INSTRUCTIONS]. Do not initiate repeated calls to resolve an ambiguous status.

## Release decisions still required

A judge must be able to test the working integration without a paid account, unavailable owner session or exposed personal recipient. Root must choose and verify the access mechanism against the rules while retaining explicit recipient consent and abuse controls. Do not silently assume bring-your-own-key, a fixture-only page, or a scheduled demonstration satisfies that requirement. If organizer clarification is needed, prepare it for the entrant; this document does not authorize contacting organizers.

Independently verify credentials, session isolation, recipient setup, call allowance and ongoing hosting. Store actual testing secrets in the submission's private testing fields, never in public source or video. The final instructions must describe actual failure behavior and avoid claiming active-call cancellation unless verified.
