# Pull Request

## What this PR adds or changes

<!-- One or two sentences. For attack patterns, name the pattern ID and technique. -->

## Type of contribution

- [ ] New attack pattern (`src/content/attacks/ATK-NNN.json`)
- [ ] Tool review (`src/content/tools/`)
- [ ] Playbook improvement (`src/content/playbook/`)
- [ ] Bug fix / site improvement
- [ ] Other

## Attack pattern checklist (delete this section if not applicable)

The submission UI at `/attacks/submit/` generates a schema-valid file — but
maintainer review applies the full quality bar:

- [ ] **Defensive framing** — the pattern describes how to *test defenses against*
      the technique under written authorization, not an offensive recipe.
- [ ] **No weaponized payloads, no zero-days**, no targeting of named third-party
      systems beyond well-known public services.
- [ ] **≥ 2 framework mappings** with real identifiers (OWASP LLM Top 10,
      OWASP Agentic, MITRE ATLAS, NIST AI RMF).
- [ ] **≥ 2 references** that resolve to the cited source (standard, advisory,
      research) — not marketing pages.
- [ ] **Field-tested** — drawn from a real engagement (sanitized), not speculation.
- [ ] **Author attribution** is filled in. Attribution is permanent.
- [ ] `npm run validate` passes locally.
- [ ] I have read [ETHICS](../ETHICS.md) and this contribution complies with it.

## Tool review checklist (delete if not applicable)

- [ ] Includes explicit **"not for"** entries and honest limitations.
- [ ] No vendor-supplied marketing copy; I have no undisclosed affiliation with the vendor.

## Notes for the reviewer

<!-- Anything that needs context: where this was field-tested (sanitized), known limitations, open questions. -->
