---
title: "Introduction — why AI red teaming, and how it's different"
chapter: 1
description: Why an AI red team is now a distinct, defensible function inside regulated enterprises, and how it differs from traditional offensive security.
last_reviewed: "2026-05-01"
---

Every Schedule I bank, large insurer, and major healthcare system in North America is being asked the same question by its board this year: "What's our AI red team?" In most cases the answer is "we're working on it." The work is happening badly — a couple of engineers running an open-source tool against a chatbot once a quarter, calling it a program.

This playbook is for the person being asked to build that function properly inside a regulated enterprise.

## Why this is now a distinct function

For decades, "red team" inside a bank or insurer meant an offensive function inside Information Security that simulated an external attacker's traversal of the network. AI red teaming is not a renaming of that. It overlaps with it, and the two should integrate (see chapter 11), but the goal, methods, deliverables, and stakeholders are different enough that treating them as the same function produces bad results.

A traditional red team's objective is to demonstrate that an attacker could reach a critical asset. An AI red team's objective is to demonstrate that an AI system, in production, behaves within defensible limits across realistic inputs, including adversarial ones — and to produce the evidence that supports that argument under regulatory examination.

Traditional findings look like "we got domain admin in six hours." AI red team findings look like "in this 200-prompt corpus, the production assistant emitted policy-violating output 7% of the time, half of which involved retrieved-content injection. Here's what changes if we fix the retrieval-layer trust scoring."

## What an AI red team is responsible for

Six things, structured here for ease of stakeholder communication:

1. **Pre-production evaluation** of every AI system entering production.
2. **Material-change evaluation** when a deployed system meaningfully changes — new model version, new tool, new data source.
3. **Periodic evaluation** of in-production systems on a documented cadence (typically quarterly for customer-facing or high-risk; semi-annually otherwise).
4. **Bespoke engagements** when something changes in the threat landscape (a new OWASP entry, a new ATLAS technique, a relevant incident at a peer organization).
5. **Compliance evidence production** in a form auditors and regulators can consume — see chapter 12.
6. **Purple-team operationalization** of findings with blue team / AI engineering / governance — see chapter 11.

## Who reads this playbook

- **CISOs and Heads of AI Security** asked to stand up the function.
- **Existing red team leads** extending coverage to AI.
- **Advisory firms** building AI red team services.
- **Internal auditors** assessing AI red team programs.
- **Regulators** drafting examination procedures.

If you're reading this from a different role, the playbook is still usable — you'll just skim some chapters and read others deeply. Chapters 3 (charter) and 5 (rules of engagement) are unavoidable reading; chapter 10 (metrics) is where you justify the program to the board.

## How to use this playbook

Read chapters 1–5 in order. After that, jump to whichever chapter answers a question you have today. The chapter index is the cross-reference; assume the playbook chapters are intentionally short because their value is being read, not collected.

Pair the playbook with the [Engagement Planner](/planner). The planner turns the abstract guidance in chapters 5 and 6 into a working Rules of Engagement document you can mark up and send for sign-off.
