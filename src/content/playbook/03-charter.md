---
title: "Charter — mission, scope, authority, exclusions"
chapter: 3
description: How to write an AI Red Team Charter that survives CISO, CRO, audit, and regulator scrutiny.
last_reviewed: "2026-05-01"
---

The charter is the first formal artifact of a new AI red team function. Without it, the team has no defined mission, no documented authority, no clear scope, and no defensible boundaries. With a vague one, the team will be misused (asked to evaluate a vendor's marketing claims, asked to "test" a chatbot in production during business hours, asked to attribute incidents). A clear charter prevents all of this.

## What a charter contains

Six sections. None optional.

### 1. Mission

One sentence. Example: "The AI Red Team validates the resilience of in-scope AI systems to adversarial inputs, with findings produced in a form suitable for executive decision-making, audit evidence, and regulatory examination."

### 2. Scope (and what's out of scope)

What does the team cover? Common scope inclusions:

- All AI systems above a documented risk threshold (typically EU AI Act high-risk equivalent, customer-facing, or systems handling regulated data).
- Pre-production, material-change, and periodic testing of in-scope systems.
- Evidence production for the AI Controls Catalog and applicable regulatory regimes.

Common scope exclusions (state these explicitly):

- Vendor evaluation as a procurement gate (that belongs to TPRM; AI Red Team may contribute technical evaluation).
- Operational SOC investigation of AI-related incidents (that's IR; the AI Red Team contributes domain expertise during response, but does not lead).
- "Try to hallucinate this" requests — the team's evaluation methodology defines what is tested; ad-hoc requests are triaged.

### 3. Authority

Who authorizes engagements? Typically the AI Governance lead and the system owner jointly. Major engagements require sponsoring-executive sign-off (CISO or CRO, depending on org). State that engagements are only conducted under written authorization, and that the team has no implicit authorization to act outside an authorized engagement — even in research mode.

### 4. RACI

Spell out:
- Responsible: AI Red Team lead.
- Accountable: CISO (or CRO if AI sits under risk).
- Consulted: AI Governance, Legal (for high-risk engagements), Privacy (when personal data is in scope), Communications (when public impact possible).
- Informed: Audit committee (quarterly), board (semi-annually).

### 5. Conflict of interest and ethics

The team does not test systems where members have a personal stake (built it, manages the team that built it). Inviolable hard limits — no production customer-data extraction, no actions that move real money, no targeting of specific named individuals — are reproduced from chapter 5.

### 6. Review cadence

Charter is reviewed annually and revised with sponsoring-executive approval.

## Sample charter

A working draft is downloadable at [/templates](/templates). Use the Engagement Planner ([/planner](/planner)) to generate a per-engagement Rules of Engagement that operationalizes the charter for a specific scope.
