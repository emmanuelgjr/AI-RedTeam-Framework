---
title: "Purple team — operationalizing findings with blue team and AI engineering"
chapter: 11
description: How to convert AI red team findings into durable improvements through collaboration with detection engineering and AI engineering.
last_reviewed: "2026-05-01"
---

A red-only function produces reports. A purple-team function produces durable defensive improvements. The framework defaults to purple where possible.

## With blue team

Each high or critical AI red team finding becomes a detection-engineering opportunity. Workflow:

1. AI red team produces finding with attack pattern (ATK-XXX) and reproduction evidence.
2. Blue team (detection engineering) authors or tunes detection for the pattern, drawing from [Shadow-AI-Defense](https://shadowaidefense.dev/detections) where applicable.
3. Joint validation: AI red team re-runs the attack pattern; blue team verifies detection fires; together they tune for false-positive tolerance.
4. Detection is added to the production library; the finding is closed only when both remediation and detection are in place.

This converts each finding from a one-shot fix into compound defensive improvement.

## With AI engineering

The harder collaboration. AI engineering teams sometimes feel red team findings as criticism rather than help. Make this work:

1. Embed AI red team early — pre-production evaluation gate (AI-CTRL-017), not just post-deployment.
2. Frame findings as constraints discovered ("this pattern works against the system as currently designed; the team needs to choose how to harden") rather than failures.
3. Sit together on root-cause discussion. The engineer often knows the actual implementation constraint better than the red teamer.
4. Distinguish "design-time fix" from "guardrail patch." Both are sometimes valid; only the former is durable.

## With AI governance

Findings flow to the AI Risk Register (Toolkit module). For findings that cannot be fully remediated, document residual-risk acceptance per the standard, with sign-off authority appropriate to severity.

## Anti-patterns

- AI red team holding findings until the formal report (kills urgency).
- Blue team building detections only for patterns where the AI red team produced critical-severity findings (misses lower-severity-but-high-frequency patterns).
- AI engineering treating red team as adversarial. The red team's job is to find the issues the engineering team would prefer not to know about. Mature programs welcome that.

## Cadence

Pair the AI red team with blue team and AI engineering in a recurring (weekly or biweekly) working session, not just per-engagement. Most durable improvements come from these conversations, not from the engagement reports themselves.
