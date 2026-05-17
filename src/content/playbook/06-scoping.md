---
title: "Scoping — from system inventory to engagement"
chapter: 6
description: How to scope an engagement when you have an AI System Inventory and limited test capacity.
last_reviewed: "2026-05-01"
---

Scoping decides what you test, and therefore what you don't test. Skip scoping discipline and you'll test the system everyone is loudest about, not the system that most warrants attention.

## Start from the inventory

Pull the AI System Inventory ([see AI-CTRL-001](https://aicontrolscatalog.dev/controls/AI-CTRL-001) and the [AI Governance Toolkit's Inventory module](https://aigovernancetoolkit.dev/inventory)). For each system, rate four dimensions:

- **Impact** (1–5): If this system fails or is compromised, how bad?
- **Exposure** (1–5): How accessible is it to external actors or to broad internal user groups?
- **Autonomy** (1–5): How much real-world action can it take without human review?
- **Change velocity** (1–5): How often does it materially change?

Multiply: a system scoring 5×5×5×5 (125) gets quarterly attack simulations; a system at 2×1×1×2 (4) may get annual evaluation.

## Engagement-design questions

For the systems that warrant testing this cycle, walk through:

1. **What are we trying to learn?** Validation of a specific control? Discovery of unknown failure modes? Evidence for a regulator?
2. **What's the realistic threat actor?** External actor with API access? Internal user with policy violation intent? Indirect attacker via supplied content?
3. **What outputs would change behavior?** If the result is "no critical findings," does that change anything? If yes, the engagement is worth doing; if no, reconsider scope or method.
4. **What can the engagement not do?** Time, budget, data sensitivity, environment constraints.

If you cannot articulate answers to all four, the engagement is not ready to scope. Fix that before the planner.

## In-scope vs. out-of-scope

Be explicit on:

- Components (the agent runtime, the tool layer, the memory store, RAG sources, downstream consumers).
- Environments (production with safeguards, staging, isolated test environment, synthetic).
- Data classes the engagement may produce or process (test data, synthetic, approved samples, never real PII without separate explicit authorization).
- Time windows and blackout periods.

Vague scope means inconclusive findings.

## Pitfalls

- **Scope creep mid-engagement.** Lock scope at ROE sign-off. Mid-engagement expansion requires a documented amendment.
- **Out-of-scope drift.** Test outputs sometimes incidentally produce evidence about systems not in scope; preserve the evidence but do not act on it — escalate per chapter 4.
- **Single-system tunnel vision.** AI systems connect; an in-scope system's failure may affect out-of-scope downstream consumers. Note these in the scope statement.
