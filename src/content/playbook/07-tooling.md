---
title: "Tooling — build vs buy, AI-augmented offensive testing"
chapter: 7
description: How to choose AI red team tools, and where to draw the line between building in-house and buying.
last_reviewed: "2026-05-01"
---

Tool selection is a tradeoff between flexibility, time to value, and operational cost. Don't pick by features alone; pick by who is going to operate the tool, and how often.

## A simple decision tree

- **Will the team be ≥ 3 dedicated engineers, working continuously on AI red team?** → Lean to open-source orchestration (PyRIT, Inspect AI, Promptfoo). You'll customize heavily and that's the right investment.
- **Will the function be ≤ 2 people, part-time, with periodic bursts?** → Lean to commercial (Lakera Red, Robust Intelligence, Mindgard). You're buying time, not technology.
- **Mixed?** → Continuous low-intensity on commercial; bounded deep-dives in-house with OSS.

## What to build, what to buy

**Always in-house**: the attack-pattern catalog tied to your specific systems (see [/attacks](/attacks) as a starting point), engagement-specific test cases, custom scorers for your business-specific policies.

**Almost always buy**: BAS (Cymulate, AttackIQ, NodeZero) for the broader detection-engineering coverage that includes Shadow AI egress patterns — building this from scratch is wasteful.

**Either**: guardrail evaluation (LLM Guard, NeMo Guardrails, Rebuff are mature OSS). Choose by whether you already have a Python platform team to operate them.

## AI-augmented offensive tooling

NodeZero (Horizon3.ai) and similar platforms increasingly use ML internally to plan attack paths. They are valuable for the broader blast-radius picture around AI systems — what damage can an agent do if compromised, given the network and identity it inherits.

Two cautions:

1. **Scope discipline matters more, not less.** Autonomous tools without rigorous ROE produce incidents.
2. **The output is hypotheses, not facts.** Treat as a starting point for investigation, not as conclusive findings.

## Honest tool reviews

The [/tools](/tools) page in this site reviews 15 tools with honest limitations. If a tool review on this site reads like vendor marketing, that's a bug — open an issue. The credibility of the entire framework depends on these reviews being honest.

## Don't get tooled to death

It's tempting to assemble a tool stack and call that the program. Don't. Tools are operationalized methodology. Get the methodology right first (chapters 1–6, 8, 9). Then choose the tools that fit it.
