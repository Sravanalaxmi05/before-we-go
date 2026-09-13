> Historical development document. For current status, demo access and limitations, use the repository README. Earlier references to pending submission, private-only judging access or an open contribution PR are superseded.

# Before We Go

Restaurant enquiry callbacks that keep customer needs, business facts and staff follow-up clear.

## Inspiration

Planning a family meal can involve questions that a restaurant’s general information does not answer. A step-free entrance says little about the table available for a particular visit or the route to a suitable toilet. A useful enquiry conversation should explain what the restaurant knows, understand what the customer needs and leave unanswered questions with staff.

Before We Go explores that conversation from the restaurant’s side: a disclosed AI representative calls back a consenting customer about their enquiry.

## What it does

The intended live workflow starts with a customer enquiry. CALL-E calls the customer as the representative of The Courtyard, a fictional restaurant, using a bounded, versioned fact sheet. The representative asks about visit requirements, explains known information and records what staff must check. It does not ask the customer to supply restaurant facts.

The implemented interface supports four labeled synthetic scenarios, transcript inspection, explicit human review, a staff follow-up disposition and exact JSON export. Results separate customer-stated needs, the representative’s explanation excerpts and supplied restaurant facts. Matching an excerpt establishes where words appear in the transcript; it does not establish that an explanation is correct.

In the fictional scenario, the entrance and ground-floor dining area are step-free, but staff must confirm a ground-floor table. A ground-floor toilet exists, while its complete route, doorway width and turning space remain unverified. These gaps stay visible. The prototype cannot book a table, promise availability, schedule a staff callback or guarantee access.

## How we built it

The app uses React 19, Vinext Worker routes and D1 persistence, with a server-side CALL-E adapter. Reviewed plans, persisted dispatch state and polling connect the enquiry workflow to the provider. Customer excerpts and AI explanation excerpts remain separate in the review model and exported handoff.

At source commit `87b2ba6`, 13 app tests and typecheck passed. The tests include the built Worker HTTP flow using isolated D1 and a mock CALL-E service. This verifies application behavior under controlled conditions, not real phone delivery. The separate portable community contribution passed its 12-test suite and repository validator locally. Its pull request is open and has not yet received reviews or hosted checks.

## Current integration evidence

The integration has submitted real requests, but no successful phone conversation has been demonstrated. Three accepted tasks failed without transcripts. The tester confirmed that neither of the two application-to-mobile attempts rang; ringing for a separate minimal diagnostic is unconfirmed. Two further requests, testing alternate-India and official-US paths, were rejected with HTTP 429 and did not create accepted tasks.

A provider investigation was requested in [issue #124](https://github.com/CALLE-AI/call-e-integrations/issues/124). As of 11 September 2026 it is open without comments. We do not infer the cause or claim that delivery is fixed. All conversation examples currently available in the app are synthetic and labeled accordingly.

## Challenges and learning

The key product challenge is preserving uncertainty while still producing a useful handoff. A customer’s preference is not a restaurant fact, and an AI explanation cannot confirm missing availability or access details. Human review keeps those distinctions visible.

The engineering work also exposed the importance of treating uncertain dispatch as a state to reconcile. A client timeout must not become an automatic new call. Persisted polling ownership prevents stale responses from applying terminal side effects. Controlled tests cover these application behaviors; the unresolved live-delivery problem remains a separate limitation.

## What is next

First, establish a successful consented callback and review the actual transcript against the knowledge source. Then validate the enquiry and handoff with customers and restaurant staff. Any real deployment would need maintained business information, recipient onboarding and an operational staff follow-up process. The current prototype records follow-up for review; it does not perform that follow-up.

## Project links

- [Public source](https://github.com/Sravanalaxmi05/before-we-go)
- [Community contribution PR #430](https://github.com/CALLE-AI/awesome-phone-call-agents/pull/430)

A private deployment exists. Public judging access and a public demonstration video are not yet available; this copy describes the current prototype and is not evidence of a completed submission.
