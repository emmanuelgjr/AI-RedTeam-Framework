---
title: "Governance — RACI, oversight, reporting, escalation"
chapter: 4
description: How to govern an AI red team function so it survives regulator scrutiny and integrates with three-lines-of-defense.
last_reviewed: "2026-05-01"
---

A governance design that works for the AI Red Team has four properties: it integrates with three-lines-of-defense, makes oversight explicit, defines escalation paths in advance, and produces reporting that the board can absorb in fifteen minutes.

## Three lines of defense

The AI Red Team usually sits in the **second line** (independent assurance over the first-line AI engineering function). It must be operationally independent — not reporting into the team whose systems it tests — and its findings must reach the third line (internal audit) without filtering.

Some organizations place the team in the first line as part of AI engineering. This works for early-stage programs but is hard to defend at audit. Plan to move it to the second line by the second annual review.

## Oversight committee

The team reports into an AI Governance committee (or equivalent) chaired by an executive with risk authority (CISO, CRO, Chief AI Officer). The committee:

- Approves the team's annual plan.
- Reviews findings monthly or quarterly.
- Approves residual-risk acceptance for findings that cannot be remediated.
- Escalates to the board quarterly with metrics (see chapter 10).

## Escalation paths

Three escalation paths must be documented in advance because they are needed in minutes, not days:

1. **Active customer impact discovered during testing**: Stop testing, notify Sponsor and CISO immediately, hand to IR.
2. **Pre-existing compromise discovered during testing**: Stop testing, preserve evidence, notify CISO immediately. Do not continue lest you destroy forensic data.
3. **Regulator-relevant evidence produced during testing**: Notify Legal and Compliance before any external communication.

These paths are reproduced in every Rules of Engagement (the planner does this automatically).

## Reporting cadence

Three tiers of reporting:

- **Executive summary (1–2 pages)**: monthly to AI Governance Committee, quarterly to risk committee.
- **Audit-ready findings (10–20 pages)**: per engagement, mapped to AI Controls Catalog and applicable framework requirements.
- **Technical findings (engineering depth)**: per engagement, for the system owner and remediation team.

Reporting templates are in [/templates](/templates).

## What governance is not for

Governance is not a substitute for technical rigor. A pristine RACI matrix cannot offset poor evaluation methodology. The point of governance is to make sure the technical work is taken seriously and acted on — not to perform compliance theater.
