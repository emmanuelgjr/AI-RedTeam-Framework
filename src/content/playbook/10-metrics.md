---
title: "Metrics — engagement, program, board"
chapter: 10
description: Three layers of metrics for an AI red team program — engagement, program, board.
last_reviewed: "2026-05-01"
---

Metrics serve three audiences. Engagement metrics demonstrate the engagement met its objectives. Program metrics demonstrate the function operates effectively. Board metrics demonstrate AI risk is under control.

## Engagement metrics (per engagement)

- % of selected attack patterns successfully exercised.
- Findings by severity (critical / high / medium / low / informational).
- % of findings traceable to a missing or weak control in the AI Controls Catalog.
- Report delivery against schedule.
- Time to first finding.
- Stakeholder satisfaction (qualitative; tracked but not over-emphasized).

## Program metrics (quarterly)

- Coverage: % of in-scope production systems tested in the last 12 months.
- Coverage: % of EU AI Act high-risk systems tested in the last 6 months.
- Findings lifecycle: open / closed / past target.
- Remediation acceptance rate (% of recommendations adopted).
- Time-to-close by severity.
- Repeat findings rate (an attack pattern producing findings across engagements signals a systemic control gap).
- Cost per engagement (informational; not the primary lens).

## Board metrics (semi-annually)

Three to five metrics. Pick from:

- Coverage rate of high-risk AI systems.
- Number of unremediated critical or high findings older than target.
- Number of systems with adversarial testing within the last quarter (per AI-CTRL-003).
- Trend in repeat findings (declining repeats indicate control improvements).
- Maturity assessment delta against last reporting period.

Avoid "number of tests conducted" as a vanity metric. Volume is not value.

## What you should not measure

- Hours of effort (encourages padding).
- Number of test prompts run (encourages script-throwing).
- Individual analyst "findings closed" (encourages adversarial finding-counting between teams).

## Dashboard

The metrics page on the live site (when v0.2 ships) hosts a sample board dashboard. Until then, the engagement and program metric tables in the [/templates](/templates) quarterly report template are your starting point.
