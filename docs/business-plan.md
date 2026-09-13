> Historical development document. For current status, demo access and limitations, use the repository README. Earlier references to pending submission, private-only judging access or an open contribution PR are superseded.

# Before We Go: business plan

## Current decision — 10 September 2026

A customer submits a visit-specific accessibility enquiry and requests a callback. CALL-E calls that customer as a disclosed AI restaurant representative, using a bounded, versioned fictional restaurant fact sheet. The customer explains their needs; the agent explains known facts and records what human staff must still check. The user plays the customer in the live test.

This user-authorized direction supersedes the earlier agent-calls-restaurant-staff plan, preserved in archive/plans/venue-interview-2026-09-10/. Do not reuse that plan's recipient role or staff-reported evidence claims.

## User and useful outcome

Customer: a person organizing a restaurant visit, including a disabled person planning their own visit. Business operator: the restaurant enquiry team. Trigger: a customer asks an access question and requests a callback. Outcome: a reviewable handoff containing customer needs, approved facts explained, unresolved questions and the requested next action. The system does not decide whether a venue is suitable for a person.

Demo restaurant: The Courtyard, explicitly fictional. The main entrance and ground-floor dining area are step-free; the upstairs room has two steps. Ground-floor seating requires staff confirmation and the prototype has no live inventory. A ground-floor toilet exists, but its dimensions and full access route are unverified. Lifting or carrying a person or wheelchair must never be offered as a workaround. Other business details are unavailable unless the approved sheet supplies them.

## Value and distinction

Potential value: answer the part of an enquiry the restaurant can substantiate, capture the customer's actual route needs, and give staff a precise unanswered question instead of another generic reassurance. This is a constrained enquiry callback and handoff workflow, not a generic restaurant FAQ or an accessibility verdict. Its usefulness and differentiation remain hypotheses until customers and venue staff evaluate it. Do not claim proven demand, revenue uplift, venue partnerships or superior accessibility outcomes.

## Scope

One fictional restaurant, one consented customer callback, English, three access topics: entrance-to-table route, table-to-toilet route, and avoiding lifting/carrying. Bounded enquiry text provides context. The versioned fact sheet is the only source of restaurant facts. Customer statements establish customer needs; they cannot update restaurant knowledge.

No bookings, seating promises, live inventory, inbound calling, during-call database/tool access, maps, venue search, medical advice, diagnosis collection or automatic staff outreach. Unknown facts become a recorded follow-up item. A saved follow-up is not a message sent to staff. No automatic redial or positive global accessibility badge.

## Validation and acceptance

Demonstrate a real app-originated CALL-E callback to the user's willing mobile, with the user acting as customer. Verify that the agent explains the two-step barrier, does not promise a ground-floor table, retains the toilet-route uncertainty and records a useful staff question. Inspect bot turns against the approved fact sheet and customer turns against captured needs. Human review precedes export; a plausible quote alone cannot prove the agent's answer was correct.

A successful role-play establishes a working callback integration and observed behavior in that scenario. It does not establish real restaurant cooperation, customer demand or real-world access suitability. Label fictional restaurant data separately from whether the phone call was real.

## Delivery and economics

Hard deadline: 14 September 2026 at 21:15 IST. Submit target: 18:00 IST; release candidate target: 13 September. The previous 30–42 focused-hour estimate predates the role reversal and must be re-estimated after the revised persisted flow works. Cut cosmetic scope first.

Account setup and a read-only API check have succeeded, according to root's progress evidence. Dashboard shows 100 credits, not an established 20-call balance. Pricing, duration rounding and failed-attempt costs remain unverified; do not equate credits and calls. Keep dispatch reservations conservative, measure the first authorized test's balance delta, and do not purchase top-ups without authorization. No call has been verified yet.

The submission needs functional CALL-E integration, a contribution PR, a public video under three minutes and working judge access. Preserve testing access through 13 October 14:30 IST. Dedicated judge authentication and consented recipient setup remain a release dependency; public fictional samples alone do not resolve it. [Official rules](https://call-e.devpost.com/rules)
