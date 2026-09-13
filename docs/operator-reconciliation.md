> Historical development document. For current status, demo access and limitations, use the repository README. Earlier references to pending submission, private-only judging access or an open contribution PR are superseded.

# Ambiguous dispatch recovery

The application never automatically repeats a failed or timed-out create request. A reservation remains spent and the recipient remains locked while dispatch is uncertain.

CALL-E documents recovery by resubmitting the **identical saved payload with the identical Idempotency-Key**, returning the original task if already created. Do not create a fresh plan or change its data to recover an ID. Recovery may initiate the originally authorized call if the provider never accepted it. An operator must therefore verify the original consent still applies, inspect account records, and record this as a manual recovery action.

After recovering the top-level call task ID, verify metadata.plan_id against the local immutable plan, bind it to that call record and fetch its terminal outcome. Only the token-fenced terminal update releases the mutex. Do not erase the reservation or suppression to obtain another attempt. A genuinely new test needs explicit consent, a deliberate budget change and a new plan.

The first test on 10 September returned a task with status failed and one failed provider attempt. There was no completed conversation. No automatic retry was scheduled. Provider diagnostic strings are not interpreted as a stable reason enum.

Source: https://docs.heycall-e.com/calls#recover-after-a-restart-or-lost-response
