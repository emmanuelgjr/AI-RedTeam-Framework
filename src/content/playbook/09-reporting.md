---
title: "Reporting — three-tier deliverables that get acted on"
chapter: 9
description: Three deliverables per engagement, each calibrated to a different audience.
last_reviewed: "2026-05-01"
---

Reports get acted on when their audience can read them in the time available. A 60-page technical report sent to a CISO will sit unread. A bulleted exec summary sent to engineering will produce vague remediation. Three reports per engagement.

## 1. Executive summary (1–2 pages)

Audience: sponsoring executive, AI Governance committee, audit committee chair.

Contains:

- One-paragraph engagement summary (target, type, dates, sponsor).
- Risk-tier rollup (How many critical / high / medium / low / informational).
- Top three findings with one-sentence-each business impact.
- Top three recommendations with owner and target date.
- Compliance traceability summary (which framework requirements this engagement contributes evidence to).

Reads in five minutes. Survives a forwarded email.

## 2. Audit-ready findings report (10–20 pages)

Audience: internal audit, GRC, external auditors, regulators.

Contains:

- Engagement context.
- Methodology with traceability to AI Controls Catalog and applicable framework requirements.
- Each finding mapped to AI-CTRL-XXX, the applicable framework clause, severity rationale.
- Evidence references (not full evidence — the package is separate).
- Remediation status and owner.

Standard template. Boring layout. That's the point.

## 3. Technical findings report (engineering depth)

Audience: system owner, AI engineering, remediation team.

Contains:

- Per-finding: full reproduction steps, environment context, evidence references, root-cause hypothesis, remediation recommendation with implementation considerations.
- Patterns observed across findings (e.g., "five of seven findings trace to retrieval-layer trust scoring").
- Suggested defensive priorities.

This is the report that drives remediation. Be specific.

## Severity scale

Standard 5-level scale used across the framework:

- **Critical**: Active customer impact, regulator-relevant exposure, or unauthorized control of agentic system with broad authorities. Immediate escalation.
- **High**: Confirmed exploitable issue producing material data leakage or significant policy violation.
- **Medium**: Issue exploitable under specific conditions; impact limited or compensating controls present.
- **Low**: Minor policy deviations, hygiene issues, hardening opportunities.
- **Informational**: Observations not rising to a finding but worth tracking.

## Findings format

Each finding has: ID, title, severity, description, evidence summary, attack-pattern reference (ATK-XXX), affected components, risk statement, recommended remediation, owner, target date.

## Format and ownership

Templates downloadable at [/templates](/templates). Reports are confidential. Distribution per RACI; never via personal email or unmanaged file-sharing.
