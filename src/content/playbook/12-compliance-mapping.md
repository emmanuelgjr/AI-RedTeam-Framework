---
title: "Compliance mapping — how findings become audit evidence"
chapter: 12
description: Tying AI red team output directly to audit evidence requirements and regulatory expectations.
last_reviewed: "2026-05-01"
---

A defensible AI red team program produces findings that audit consumes directly and regulators recognize. The mapping is explicit, not implicit.

## Frameworks the engagement output feeds

| Framework | Requirement | What the AI red team produces |
|---|---|---|
| ISO/IEC 42001 | 8.3, 9.1 (evaluation) | Test reports per AI-CTRL-003 (LLM) and AI-CTRL-014 (non-LLM) |
| NIST AI RMF | MEASURE-2.7 (Adversarial testing) | Test reports |
| EU AI Act | Article 15 (Accuracy, robustness, cybersecurity) | Test reports for high-risk systems |
| OSFI E-21 | Operational resilience testing | Compliance-driven engagement output |
| NYDFS Part 500 | §500.05 (Penetration testing) | Engagement output where in scope |

## Producing the evidence

Each engagement's audit-ready report (chapter 9) includes a compliance traceability section that maps the engagement to applicable framework requirements. Generated automatically by the Engagement Planner when the user selects a regulatory regime. The auditor or regulator can consume this section directly.

## What auditors actually want to see

When internal or external audit examines an AI red team program, they look for:

1. **Charter** with documented authority (chapter 3).
2. **Annual plan** with risk-prioritized coverage.
3. **Per-engagement evidence**: ROE (signed), test report, findings register entries, remediation evidence.
4. **Program metrics** demonstrating control operating effectiveness.
5. **Independence** between testing function and tested function.
6. **Methodology** documentation kept current.

The [AI Controls Catalog](https://aicontrolscatalog.dev) provides the Test of Operating Effectiveness procedures auditors run. The AI red team produces the evidence those procedures consume.

## What regulators ask, separately

Regulator examination typically goes deeper on:

- Coverage of high-risk systems (have you tested them all? on what cadence?).
- Independence of testing.
- Whether findings drive change (or sit unaddressed).
- Whether incidents in the period were detected by the program or only after the fact.

Prepare answers in advance. The metrics in chapter 10 are the answer set.

## The integration point

The compliance mapping is not paperwork. It is the reason the red team exists from a regulator's perspective. Treat the mapping section of each engagement as carefully as the technical findings.
