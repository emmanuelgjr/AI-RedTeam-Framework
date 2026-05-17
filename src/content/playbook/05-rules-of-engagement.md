---
title: "Rules of Engagement — anatomy of a good ROE"
chapter: 5
description: What a Rules of Engagement document must contain for an AI red team engagement at a regulated enterprise.
last_reviewed: "2026-05-01"
---

Every engagement needs a Rules of Engagement document. Not optional. Not implicit. Not "we discussed it on a call." Written, signed, dated, distributed.

Why be this rigid: the worst day in a red team's life is the day someone in operations claims they never authorized the test that just broke production. The ROE is the artifact that prevents that day.

## The 13 mandatory sections

The [Engagement Planner](/planner) generates a working ROE in five minutes that hits every one of these. Sections summarized here so you understand what the planner is doing:

1. **Cover page** — title, engagement reference (AIRT-YYYY-NNN), target system, date, version, confidentiality classification.
2. **Document control** — revision history, distribution list (driven by RACI), sign-off block (Accountable owner, sponsoring executive, Security lead, Legal review).
3. **Engagement charter** — mission, authority statement, engagement type definition.
4. **Scope** — in-scope systems, time windows, testing hours, blackout periods, data classifications.
5. **Out of scope — hard limits** — explicit prohibitions, with regulator-relevant defaults pre-populated (e.g., no PII extraction in banking).
6. **Authorization** — sign-off matrix; reference to standalone authorization letter (Annex A).
7. **Methodology** — recommended attack patterns and tools, selected to the engagement.
8. **Evidence collection and handling** — what's captured, how sensitive outputs are handled, chain of custody.
9. **Deliverables and reporting** — cadence, deliverables list, severity definitions, findings format.
10. **Escalation path** — when to pause, when to immediately disclose, contacts.
11. **Communications and distribution** — distribution list, external communication restrictions.
12. **Compliance traceability** — explicit mapping from this engagement to the framework requirements it produces evidence for.
13. **Success metrics** — engagement-specific KPIs.

Plus annexes for the authorization letter, test cases (appended by Test Lead), glossary, and references.

## What makes a good ROE versus an OK one

OK ROEs cover the sections. Good ROEs are specific:

- Specific scope ("the `assist-api` service v3.2 deployed to `us-east-2`, including its retrieval over the `support-kb-prod` Pinecone index") rather than vague ("the assistant").
- Specific time windows ("Monday-Thursday 10 a.m.–6 p.m. ET; blackout Friday close-of-month") rather than "business hours."
- Specific hard limits naming systems and data classes that are off-limits.
- Specific success metrics (with target values).
- A populated compliance traceability section, not just a heading.

The planner produces specific output because it asks specific questions. If the engagement inputs are vague, the ROE will read vaguely — fix it before sign-off.

## Distribution

Restricted distribution per RACI. The cover-page classification should match the most sensitive data class in scope.
