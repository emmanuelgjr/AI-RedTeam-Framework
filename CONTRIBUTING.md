# Contributing

PRs are welcome â€” especially from red teamers with field experience.

## Especially valued

- Battle-tested attack patterns (defensive framing â€” see ETHICS.md).
- Tool reviews with honest limitations and "not for" entries.
- Playbook improvements rooted in real engagements (sanitized).
- Compliance mapping corrections and extensions.

## Quality bar

Attack patterns:

- Defensive framing ("how to test defenses against"), not offensive recipe.
- All schema fields populated (see `src/content/schemas.ts`).
- â‰¥ 2 framework mappings.
- â‰¥ 2 authoritative references.

Tool reviews:

- â‰¥ 1 entry in `not_for`.
- No vendor-supplied marketing copy. If a review reads like marketing, expect requested changes.

Playbook chapters:

- Real-world tone. Specific. Actionable.

## Local checks

```bash
npm ci
npm run validate
npm run test
npm run build
```

## Code of conduct

See `CODE_OF_CONDUCT.md`.
