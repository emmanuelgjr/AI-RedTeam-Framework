---
title: "Execution — phases, evidence, safe handling of dangerous outputs"
chapter: 8
description: How to actually execute an AI red team engagement, with attention to evidence integrity and safe handling of harmful outputs.
last_reviewed: "2026-05-01"
---

Execution is where the engagement either produces defensible findings or doesn't. Most of the failure modes here are operational, not technical.

## Phases

1. **Pre-flight (Day −5 to 0)**: ROE signed, accounts provisioned, environments verified, baseline evidence captured (so you can prove later that an issue wasn't pre-existing).
2. **Active testing (variable)**: per the test plan; daily standup with engagement team; weekly checkpoint with sponsor.
3. **Evidence consolidation (Day −5 to 0 from delivery)**: triage findings, draft reports, internal QA.
4. **Delivery (Day 0)**: deliverables distributed; exit briefing with sponsor.
5. **Re-test (varies)**: per remediation timeline; closed when re-test evidence supports closure.

## Evidence requirements

For every finding, capture at minimum:

- Test inputs (prompts, files, configurations).
- Full request/response logs.
- Environment context (model version, deployment, time).
- Reproduction steps.
- Evidence of impact.

Store evidence in the engagement evidence directory with file hashes and access logs. Chain of custody matters when findings affect compliance.

## Safe handling of dangerous outputs

This is the chapter section most teams underweight.

The model may produce content that is itself dangerous to retain: working exploit code, harmful instructions, PII generated against a probe, copyrighted text retained verbatim. Default handling:

- **Working exploit code in output**: Capture metadata (prompt, prompt context, length, hash of output, why it was elicited). Delete the actual exploit content within 24 hours. Retain enough to prove the finding without enabling reuse.
- **PII in output (synthetic or otherwise)**: If the PII looks real, escalate immediately to Privacy. Do not store. Capture pattern and probe; describe but do not preserve.
- **Generated content that violates content policy (e.g., CSAM)**: Stop testing, escalate immediately, follow legal-provided handling instructions.
- **Output revealing internal documentation**: Capture excerpt sufficient to demonstrate the leak; do not store entire documents.

The principle: capture enough to prove the finding to a reviewer who needs to act on it, no more. Test artifacts are themselves a security and liability surface.

## What goes wrong, and how to handle it

- **A finding turns out to indicate pre-existing compromise.** Stop testing, preserve evidence, hand to IR, follow chapter 4 escalation.
- **An environment is not isolated as promised.** Stop testing in that environment immediately, document the discrepancy, restart only after written confirmation.
- **A sponsor requests scope expansion mid-engagement.** Refuse without an ROE amendment. Document the request and the refusal.

## Quality bar for execution

A finding is "ready to deliver" when an independent engineer could reproduce it from your evidence package alone. If you can't pass that test, the finding is not ready.
