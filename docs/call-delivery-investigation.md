# Call delivery investigation — 10 September 2026

The user declined support outreach. No support message was sent.

## Verified so far

- The application's first real request was accepted by CALL-E, but ended failed with no transcript. The recipient confirmed the phone never rang.
- The submitted E.164 phone number exactly matched the recipient number returned by CALL-E. Returned region and locale matched `IN` and `en-IN`.
- The official OpenAPI schema accepts E.164 recipient arrays, optional BCP 47 locale hints, optional region codes, task text, metadata and the extraction schema features used by the application.
- Our 15-second create timeout was too short for the observed request. It is now 45 seconds. The uncertain dispatch was reconciled using the original saved payload and idempotency key; it did not create a new application call.
- A provider attempt diagnostic is not a documented stable error enum. It does not establish whether the cause is our configuration, account setup, or downstream delivery.

## Bounded diagnostic

One separate minimal connectivity request has been reserved and dispatched to the same authorized owner-operated phone. It omits optional region, locale, metadata and extraction schema; task text requests a brief English AI-disclosed test. This isolates the provider's simplest documented create path from restaurant facts, extraction and our web server. It is a diagnostic call, not a successful product demonstration. Private request and response state is retained outside git. No automatic retries.

Outcome: accepted, then failed with zero transcript turns and the same undocumented attempt diagnostic as the application call. This reduces the likelihood that our restaurant prompt, optional locale/region or extraction schema caused the failure. It does not prove a provider fault. No further automatic or manual call is scheduled.

The account Numbers page shows no purchased number. The public CALL-E FAQ discusses purchased numbers and region-dependent outbound KYC, but does not establish that a purchased number is required for this free Developer API workflow. No purchase or identity submission was made. See [CALL-E FAQ](https://www.heycall-e.com/).

## References

- [Create Call API](https://docs.heycall-e.com/api-reference/calls)
- [Official OpenAPI schema](https://docs.heycall-e.com/openapi/calle.openapi.yaml)
