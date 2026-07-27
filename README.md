# AI Red Team Framework

> Stand up an AI red team at a regulated enterprise.

[![Site](https://img.shields.io/badge/site-live-9F1239)](https://emmanuelgjr.github.io/AI-RedTeam-Framework/)
[![License: MIT](https://img.shields.io/badge/code-MIT-slate)](LICENSE)
[![Content: CC-BY 4.0](https://img.shields.io/badge/content-CC--BY%204.0-9F1239)](CONTENT-LICENSE)
[![Attack patterns](https://img.shields.io/badge/attack%20patterns-25-9F1239)](https://emmanuelgjr.github.io/AI-RedTeam-Framework/attacks/)

The practitioner playbook + interactive tooling for planning, scoping,
executing, and reporting AI red team engagements at regulated enterprises.

[**Try the Engagement Planner →**](https://emmanuelgjr.github.io/AI-RedTeam-Framework/planner/)

## What's inside (v0.2)

- 15-chapter playbook from charter to maturity model
- **Engagement Planner** — answer 12 questions, download a professionally drafted Word Rules of Engagement
- 25 attack patterns mapped to OWASP LLM Top 10, OWASP Agentic Top 10, MITRE ATLAS, NIST AI RMF
- 15 tool reviews — open source, commercial, AI-augmented BAS — with honest limitations
- **10 downloadable templates** — charter, ROE master, RACI matrix (Excel),
  engagement brief, daily standup, exit briefing, and four report formats
- **Metrics dashboards** — reference charts for program reporting (sample data)
- **Pattern submission builder** — draft a schema-valid attack pattern in the
  browser and open it as a PR
- Compliance crosswalk: OSFI E-21, NIST AI RMF, ISO/IEC 42001

## Why this exists

By 2027, every Schedule I bank, large insurer, and major healthcare system in
North America will have an AI red team function — or be told by a regulator
to build one. Almost no public guidance exists on *how* to actually stand one
up at a regulated enterprise. This framework fills that gap.

## Who built this

**Emmanuel Guilherme Jr.** — Senior Global IT Auditor, Co-lead of the OWASP
GenAI Data Security Initiative, Candidate Expert on Canada's ISO/IEC JTC 1/SC
42 mirror committee. Built an in-house Red Team framework end-to-end at a
Canadian Schedule I bank, including AI-augmented offensive tooling (NodeZero,
Cymulate).

## Ethics

This is a defensive resource for authorized testing. We do not host
weaponized payloads or zero-days. See [ETHICS.md](ETHICS.md).

## Local development

```bash
npm ci
npm run dev        # http://localhost:4321
npm run validate
npm run test
npm run build
```

## Use it. Cite it.

```
Guilherme Jr., E. (2026). AI Red Team Framework (Version 0.2.0). https://emmanuelgjr.github.io/AI-RedTeam-Framework/
```

## Licensing

- **Code:** [MIT](LICENSE)
- **Content** (patterns, playbook, templates): [CC-BY 4.0](CONTENT-LICENSE)

## Related work in this portfolio

- [AI-Controls-Catalog](https://github.com/emmanuelgjr/AI-Controls-Catalog) — Audit AI
- [AI-RedTeam-Framework](https://github.com/emmanuelgjr/AI-RedTeam-Framework) — Attack AI *(this repo)*
- [AI-Governance-Toolkit](https://github.com/emmanuelgjr/AI-Governance-Toolkit) — Govern AI
- [Shadow-AI-Defense](https://github.com/emmanuelgjr/Shadow-AI-Defense) — Defend against rogue AI
