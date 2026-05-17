---
title: "Program maturity — Crawl, Walk, Run, Lead"
chapter: 15
description: A four-stage maturity model for an AI red team program, with practical signals for each level.
last_reviewed: "2026-05-01"
---

Use this maturity model to position the program honestly with your board and to plan the next year of investment.

## Level 1 — Crawl

The function exists in name. One or two engineers run open-source tools against high-profile systems on an ad-hoc basis. No charter. No ROE per engagement. Findings live in tickets, not reports. Coverage is unknown. No integration with audit or governance.

**Honest signals**: "We tested our chatbot last month." "We have a tool we run sometimes."

**Right next investment**: charter (chapter 3), ROE discipline (chapter 5), first end-to-end engagement using the Engagement Planner.

## Level 2 — Walk

Charter exists. ROEs per engagement. Two- or three-tier reporting in place. Half of in-scope systems tested in the last 12 months. Findings flow to remediation owners. Some integration with audit (audit team has the reports). Limited blue-team / AI-engineering operationalization.

**Honest signals**: "We run formal engagements quarterly, with reports. About half our systems are covered."

**Right next investment**: program metrics (chapter 10), purple-team integration (chapter 11), continuous testing in CI for top-tier systems.

## Level 3 — Run

All in-scope systems tested on cadence. Three-tier reporting standard. Compliance traceability per engagement. Purple-team integration weekly. Continuous testing in CI for high-risk systems. Findings drive measurable detection improvements. Independence formalized (second-line placement). Program metrics reported quarterly to governance committee.

**Honest signals**: "We cover all high-risk systems on a documented cadence. Findings produce both fixes and durable detections."

**Right next investment**: external publication, contribution to industry knowledge (patterns, tooling, conference talks), formal external assurance over the program.

## Level 4 — Lead

The function contributes outside the organization: published patterns, tooling, talks at conferences, participation in standards work (e.g., OWASP, MITRE ATLAS contributions). Other organizations adopt the methodology. External assurance is in place. The program is referenceable to regulators as a benchmark, not a beneficiary.

**Honest signals**: External practitioners cite your work. Your patterns appear in industry frameworks.

**Right next investment**: helping the broader industry catch up — open-sourcing what you can, mentoring, hiring from outside to bring new perspectives in.

## Where to be

Most regulated enterprises starting in 2026 should target Walk by end of year one and Run by end of year two. Lead is a multi-year commitment that depends on individual investment by the program leadership.

Map your program against these signals honestly. The maturity self-assessment that will ship in v0.3 of the framework formalizes this; until then, the descriptions above are the operating model.
