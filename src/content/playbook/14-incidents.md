---
title: "Incidents — what to do when red team finds a real-world live issue"
chapter: 14
description: What changes when an engagement uncovers a live, in-production issue with customer or regulator impact.
last_reviewed: "2026-05-01"
---

Eventually, a red team engagement will find a real-world live issue: a production exposure, a customer-impacting model behavior, evidence of prior compromise unrelated to your testing. When that happens, the engagement transforms into incident response. The hand-off must be clean, fast, and pre-rehearsed.

## Recognizing the moment

Three signals demand immediate pause:

1. **Customer impact is plausibly already occurring** (e.g., PII appears in outputs for users whose data should not be retrievable).
2. **Pre-existing compromise indicators discovered** (artifacts you did not place).
3. **Regulator-relevant exposure surfaces** that would require notification regardless of disclosure path.

If any are present, stop testing.

## Immediate actions (first hour)

1. **Stop testing.** Do not run more probes. The evidence already collected is more valuable than more evidence collected past this point.
2. **Preserve everything.** Snapshot the engagement environment, lock the evidence directory, halt automated tooling.
3. **Notify CISO and Sponsor.** Via voice if possible; in writing immediately after.
4. **Notify Legal.** Especially for anything potentially requiring regulator notification.
5. **Do not communicate externally.** Including to the system owner if not already RACI-Informed; let the IR organization control communications.

## Hand-off to IR

The AI red team's role transforms from operator to subject-matter expert:

- Walk IR through what you know.
- Translate model-specific findings into IR-actionable terms.
- Continue to be available for technical questions throughout the response.
- Do not lead the incident. You are now a witness and SME.

## Common errors

- Continuing testing "to confirm" the finding. Don't.
- Privately notifying the system owner without going through CISO. Don't.
- Posting in Slack/Teams to ask colleagues' opinions. Don't.
- Discarding evidence to "clean up the test environment." Don't.

## After the incident

Post-incident review per AI-CTRL-009 includes the red team's perspective: was the finding reachable through normal monitoring? Why didn't blue-team coverage detect it sooner? What attack patterns should be added to the catalog? Feed answers back into the program.
