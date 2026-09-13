> Historical development document. For current status, demo access and limitations, use the repository README. Earlier references to pending submission, private-only judging access or an open contribution PR are superseded.

# Workflow alignment — 10 September 2026

User clarified that the customer asks questions and CALL-E represents the restaurant. This supersedes the original venue-interview role assignment. No calls should use the old restaurant-staff-recipient prompt. Existing code still implements that old direction and must be revised before live testing.

## What the supplied video actually shows

Reread the original pasted transcript in full. Its tutorial code calls a real restaurant and asks its employee about a table for four and outdoor seating, without reserving. It supplies a goal and a result schema, not a scripted conversation. CALL-E conducts the call and returns yes/no/unknown fields. The host application can store those results and trigger the next workflow action. Restaurant information is learned from the call, not supplied by a database in that tutorial.

## What the user wants

A customer submits an enquiry and requests a callback. The application gives CALL-E the enquiry plus a bounded, approved restaurant fact sheet. CALL-E calls the customer as a disclosed AI restaurant representative, explains relevant facts, clarifies needs, and captures unresolved questions and a staff follow-up task. The test recipient plays the customer. Fictional business information must be labeled as such. Do not claim live inventory, confirmed seating, reservations, inbound call handling, or tool/database access during a call unless separately implemented and verified.

## External comparison, read 10 September

- Community google-form-callback: form response → consented callback → structured result writeback. Closely matches the trigger and result loop. https://github.com/CALLE-AI/awesome-phone-call-agents/tree/main/skills/google-form-callback
- Community customer-onboarding-call: business-side welcome conversation and CRM follow-up. https://github.com/CALLE-AI/awesome-phone-call-agents/tree/main/skills/customer-onboarding-call
- Genesis AI Devpost entry describes lead qualification, booking/vendor calls, structured reports and next actions. https://devpost.com/software/genesis-ai-with-call-e-implemented
- FieldRelay Devpost entry describes vendor clarification and dispatch workflow. https://devpost.com/software/fieldrelay

Community entries are implementation/reference contributions, not proof of a Devpost submission. Devpost descriptions are entrant-reported; no deployment/runtime verification was performed in this comparison. The gallery could not be fetched directly, so individual searchable entry pages were used.

## Product distinction to preserve

Focus the customer callback on visit-specific accessibility questions and a useful handoff: what the customer needs, which approved facts were explained, which questions the business still owes an answer to, and the requested next action. A generic restaurant FAQ voice bot is less distinctive. Emotional value follows from avoiding misleading reassurance and repeated explanations.

No real call was placed during this alignment review. Do not represent the existing venue-interview UI or schema as the clarified customer-callback implementation.
