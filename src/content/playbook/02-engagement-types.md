---
title: "Engagement types — when to use which"
chapter: 2
description: The seven engagement types this framework supports, when each is appropriate, what each produces.
last_reviewed: "2026-05-01"
---

Not every AI red team activity is the same engagement. The framework distinguishes seven types because the scope, deliverables, duration, and stakeholders differ meaningfully.

## 1. Attack simulation

Bounded engagement (typically 2–4 weeks) testing a specific AI system against a documented attack pattern set. Most common engagement type. Used pre-production and on material change. Produces findings, recommendations, and re-test evidence. Almost always uses the Engagement Planner-generated ROE.

## 2. Prompt injection assessment

Narrower than attack simulation — focused specifically on direct and indirect prompt injection vectors. Useful when a system has just added a new ingestion source (RAG corpus expansion, new document upload feature). Shorter (1–2 weeks).

## 3. Agentic AI testing

When the system under test combines an LLM with tools, longer running with bounded-recursion considerations. Tool authorization boundaries (AI-CTRL-019) become the focus. Plan for 3–4 weeks; multi-agent systems can stretch longer.

## 4. Model evaluation

Closer to ML research than red teaming — evaluating performance, fairness, robustness in a structured way against benchmarks and bespoke datasets. Frequently sits with ML engineering rather than security; AI red team contributes adversarial and safety dimensions. 2–6 weeks.

## 5. Continuous red team

Programmatic, low-intensity ongoing testing integrated into CI/CD. PyRIT or Promptfoo runs daily; weekly summary; investigated when regressions appear. Augments rather than replaces bounded engagements.

## 6. Full kill-chain red team

Combines AI red teaming with broader offensive testing — what happens if the AI agent is compromised and the attacker uses its tool authorities to traverse the network? This is where AI red team and traditional red team must cooperate; the AI team brings model-domain expertise, the network team brings traversal expertise. 6–8 weeks typical. Use Horizon3 NodeZero or Cymulate for the non-AI portions.

## 7. Compliance-driven testing

Engagement scoped explicitly to produce evidence for a named regulatory requirement (OSFI E-21 critical operations testing, EU AI Act Article 15 robustness evidence, NIST AI RMF MEASURE-2.7 adversarial testing). Deliverables are formatted for the regulatory audience rather than engineering. Often combined with another engagement type.

## How to pick

Walk through these questions in order:

1. **Is there a specific regulator deliverable?** → Compliance-driven plus a base engagement type.
2. **Is the system net-new to production?** → Attack simulation (pre-production).
3. **Did a specific high-risk area change?** → Prompt injection assessment or agentic testing, depending on the change.
4. **Is the system already in production?** → Continuous + periodic Attack simulation (quarterly for high-risk).
5. **Is the AI system embedded in an enterprise-critical workflow with broad tool authorities?** → Full kill-chain.

In practice, most enterprises run continuous testing for in-production systems and book bounded attack simulations on each material change. Use the Engagement Planner to formalize whichever you choose.
