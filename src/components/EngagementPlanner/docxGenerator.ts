import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  AlignmentType,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  Footer,
  PageNumber,
  Header,
  ShadingType,
} from 'docx';
import {
  defaultHardLimitsForRegime,
  engagementRefId,
  type PlannerState,
} from './plannerSchema';
import { selectAttackPatterns, selectTools, complianceMappings } from './selectors';

const ACCENT = '9F1239';
const INK_900 = '0F172A';
const INK_500 = '64748B';

function h(text: string, level: typeof HeadingLevel[keyof typeof HeadingLevel] = HeadingLevel.HEADING_2) {
  return new Paragraph({
    heading: level,
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, bold: true, color: INK_900 })],
  });
}

function p(text: string, opts: { italic?: boolean; bold?: boolean; color?: string } = {}) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [
      new TextRun({
        text,
        italics: opts.italic,
        bold: opts.bold,
        color: opts.color,
      }),
    ],
  });
}

function bullet(text: string, level = 0) {
  return new Paragraph({
    spacing: { after: 80 },
    bullet: { level },
    children: [new TextRun({ text })],
  });
}

function tableCell(text: string, opts: { bold?: boolean; bg?: string; width?: number } = {}) {
  return new TableCell({
    width: opts.width ? { size: opts.width, type: WidthType.PERCENTAGE } : undefined,
    shading: opts.bg
      ? { type: ShadingType.CLEAR, fill: opts.bg, color: 'auto' }
      : undefined,
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text,
            bold: opts.bold,
            color: opts.bg ? 'FFFFFF' : undefined,
          }),
        ],
      }),
    ],
  });
}

function buildTable(rows: string[][], headerRow = true) {
  const borders = {
    top: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' },
    left: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' },
    right: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' },
    insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' },
    insideVertical: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' },
  };
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders,
    rows: rows.map((row, idx) =>
      new TableRow({
        children: row.map((cell) =>
          tableCell(cell, headerRow && idx === 0 ? { bold: true, bg: ACCENT } : {}),
        ),
      }),
    ),
  });
}

export function generateRoeDocx(state: PlannerState, refIdOverride?: string): Document {
  const refId = refIdOverride ?? engagementRefId();
  const today = new Date().toISOString().slice(0, 10);
  const attacks = selectAttackPatterns(state);
  const tools = selectTools(state);
  const compliance = complianceMappings(state);
  const baseHard = defaultHardLimitsForRegime[state.regulatoryRegime] ?? [];
  const hardLimits = [...baseHard, ...state.outOfScopeHardLimits];

  const headerObj = new Header({
    children: [
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [
          new TextRun({
            text: `AI Red Team Engagement — Rules of Engagement — ${refId}`,
            size: 16,
            color: INK_500,
          }),
        ],
      }),
    ],
  });
  const footerObj = new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: 'Page ', size: 16, color: INK_500 }),
          new TextRun({ children: [PageNumber.CURRENT], size: 16, color: INK_500 }),
          new TextRun({ text: ' of ', size: 16, color: INK_500 }),
          new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16, color: INK_500 }),
          new TextRun({ text: ` — ${refId} — Confidential`, size: 16, color: INK_500 }),
        ],
      }),
    ],
  });

  // Cover
  const cover = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 1600 },
      children: [
        new TextRun({ text: 'AI Red Team Engagement', size: 36, color: ACCENT, bold: true }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 240 },
      children: [
        new TextRun({ text: 'Rules of Engagement', size: 48, bold: true, color: INK_900 }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 480 },
      children: [
        new TextRun({
          text: state.engagementType,
          size: 28,
          color: INK_500,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 480, after: 60 },
      children: [
        new TextRun({ text: 'Engagement Reference: ', bold: true }),
        new TextRun({ text: refId }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [
        new TextRun({ text: 'Target System: ', bold: true }),
        new TextRun({ text: `${state.targetSystemName} (${state.targetSystemType})` }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [
        new TextRun({ text: 'Prepared by: ', bold: true }),
        new TextRun({ text: state.draftedBy }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [
        new TextRun({ text: 'Date: ', bold: true }),
        new TextRun({ text: today }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 600 },
      children: [
        new TextRun({ text: 'Version: ', bold: true }),
        new TextRun({ text: '1.0 — Draft for sign-off' }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [
        new TextRun({
          text: 'Confidentiality: Restricted — Internal Use Only — Distribution per Section 11',
          italics: true,
          color: INK_500,
        }),
      ],
    }),
    new Paragraph({ children: [new TextRun({ text: '', break: 1 })] }),
  ];

  // Section 2 — Document control
  const docControl = [
    h('2. Document Control'),
    p('Revision history'),
    buildTable([
      ['Version', 'Date', 'Author', 'Change'],
      ['1.0', today, state.draftedBy, 'Initial draft for sign-off'],
    ]),
    p(' '),
    p('Distribution list (auto-populated from RACI)'),
    ...(state.raci.length > 0
      ? state.raci.map((r) => bullet(`${r.responsibility}: ${r.name} (${r.role})`))
      : [p('— No RACI provided. Update before sign-off.', { italic: true, color: INK_500 })]),
    p(' '),
    p('Sign-off block'),
    buildTable([
      ['Role', 'Name', 'Signature', 'Date'],
      ['Accountable owner', '', '', ''],
      ['Sponsoring executive', '', '', ''],
      ['Security lead', '', '', ''],
      ['Legal review', '', '', ''],
    ]),
  ];

  // Section 3 — Charter
  const missionParagraph =
    `This engagement is a ${state.engagementType} against the ${state.targetSystemType} ${state.targetSystemName} operating at autonomy level "${state.autonomyLevel}". Its mission is to validate the resilience of in-scope controls against direct and indirect prompt injection, tool misuse, and output handling weaknesses, with findings produced in a form suitable for ${state.regulatoryRegime} examination and for input to the organization's AI Controls Catalog evidence base.`;
  const charter = [
    h('3. Engagement Charter'),
    h('3.1 Mission and Objectives', HeadingLevel.HEADING_3),
    p(missionParagraph),
    h('3.2 Authority', HeadingLevel.HEADING_3),
    p(
      'This engagement is conducted under written authorization from the Accountable owner identified in Section 2. Verbal authorization is not sufficient. Authorization is limited to the time window and scope defined below; any expansion requires a written amendment to this document.',
    ),
    h('3.3 Engagement Type', HeadingLevel.HEADING_3),
    p(state.engagementType),
  ];

  // Section 4 — Scope
  const scope = [
    h('4. Scope'),
    h('4.1 In-Scope Systems', HeadingLevel.HEADING_3),
    bullet(`Target: ${state.targetSystemName}`),
    bullet(`System type: ${state.targetSystemType}`),
    bullet(`Deployment model: ${state.deploymentModel}`),
    bullet(`Environment: ${state.testEnvironment}`),
    bullet(`Authorization scope: ${state.authorizationScope}`),
    h('4.2 Time Window', HeadingLevel.HEADING_3),
    bullet(`Engagement duration: ${state.duration}`),
    bullet('Permitted testing hours: Monday–Friday, 09:00–18:00 local time (customize at sign-off)'),
    bullet('Blackout periods: month-end / quarter-end / regulator-reporting windows for regulated environments'),
    h('4.3 Data Classifications In Scope', HeadingLevel.HEADING_3),
    p(`${state.dataSensitivity}. Data sensitivity drives the hard limits in Section 5.`),
  ];

  // Section 5 — Out of Scope Hard Limits
  const hardLimitsSection = [
    h('5. Out of Scope — Hard Limits'),
    ...hardLimits.map((l) => bullet(l)),
    ...(hardLimits.length === 0
      ? [p('— No regime-specific hard limits pre-loaded. Add explicit limits before sign-off.', { italic: true, color: INK_500 })]
      : []),
  ];

  // Section 6 — Authorization
  const auth = [
    h('6. Authorization'),
    h('6.1 Sign-off Matrix', HeadingLevel.HEADING_3),
    buildTable([
      ['Role', 'Name', 'Responsibility', 'Signature', 'Date'],
      ...(state.raci.length
        ? state.raci.map((r) => [r.role, r.name, r.responsibility, '', ''])
        : [['Accountable owner', '', 'Accountable', '', '']]),
    ]),
    p(' '),
    h('6.2 Pre-Engagement Authorization Letter (Annex A)', HeadingLevel.HEADING_3),
    p('A one-page authorization letter is generated alongside this ROE as a separate file.'),
  ];

  // Section 7 — Methodology
  const method = [
    h('7. Engagement Methodology'),
    h('7.1 Recommended Attack Patterns', HeadingLevel.HEADING_3),
    buildTable([
      ['ATK-ID', 'Pattern', 'Why selected for this engagement', 'Cross-reference'],
      ...attacks.map((a) => [a.id, a.name, a.why, a.refs]),
    ]),
    p(' '),
    h('7.2 Recommended Tools', HeadingLevel.HEADING_3),
    buildTable([
      ['Tool', 'Category', 'Why selected', 'Integration effort'],
      ...tools.map((t) => [t.name, t.category, t.why, t.effort]),
    ]),
    p(' '),
    h('7.3 Test Cases', HeadingLevel.HEADING_3),
    p(
      'Specific test cases will be authored by the Test Lead and appended as Annex B prior to execution. Test cases must trace to the attack patterns in 7.1.',
    ),
  ];

  // Section 8 — Evidence Collection
  const evidence = [
    h('8. Evidence Collection and Handling'),
    bullet('Capture: request/response logs, screenshots, test artifacts, derived outputs.'),
    bullet('Sensitive outputs (auto-generated harmful content) are described, not retained; hash and metadata only.'),
    bullet('Chain of custody documented in the engagement evidence directory.'),
    bullet('Cross-reference AI Controls Catalog AI-CTRL-003 for evidence requirements.'),
  ];

  // Section 9 — Deliverables
  const deliverables = [
    h('9. Deliverables and Reporting'),
    h('9.1 Reporting Cadence', HeadingLevel.HEADING_3),
    bullet('Daily standup notes (internal).'),
    ...((['3–4 weeks', '6–8 weeks', 'Continuous'] as string[]).includes(state.duration)
      ? [bullet('Weekly checkpoint with sponsor.')]
      : []),
    bullet('Exit briefing (mandatory).'),
    h('9.2 Deliverables', HeadingLevel.HEADING_3),
    bullet('Executive Summary Report (1–2 pages).'),
    bullet('Audit-Ready Findings Report (mapped to ISO/IEC 42001, NIST AI RMF, EU AI Act, and applicable sectoral regulation).'),
    bullet('Technical Findings Report (per-finding reproduction, evidence references, remediation).'),
    bullet('Raw Test Artifacts package.'),
    h('9.3 Severity Definitions', HeadingLevel.HEADING_3),
    p('Critical / High / Medium / Low / Informational — per framework playbook chapter 9.'),
    h('9.4 Findings Format', HeadingLevel.HEADING_3),
    p('Each finding: ID, Title, Severity, Description, Evidence reference, Attack Pattern reference (ATK-XXX), Affected Components, Risk Statement, Recommended Remediation, Owner, Target Date.'),
  ];

  // Section 10 — Escalation
  const escalation = [
    h('10. Escalation Path'),
    bullet('Active customer impact: STOP testing, notify Sponsor and CISO immediately.'),
    bullet('Pre-existing compromise discovered: STOP testing, preserve evidence, notify CISO immediately, hand to IR.'),
    bullet('Regulator-relevant evidence: notify Legal and Compliance before any external communication.'),
    bullet('Contact chain: Test Lead → AI Red Team Lead → CISO → Sponsor.'),
  ];

  // Section 11 — Communications
  const comms = [
    h('11. Communications and Distribution'),
    bullet('Distribution per RACI Informed (Section 2).'),
    bullet('Confidentiality classification matches the most sensitive data class in scope.'),
    bullet('External communication prohibited without sponsor approval.'),
    bullet('Vendor / third-party notification: when required, coordinated by sponsor.'),
  ];

  // Section 12 — Compliance Traceability
  const compl = [
    h('12. Compliance Traceability'),
    ...compliance.map((c) => bullet(c)),
  ];

  // Section 13 — Success Metrics
  const metrics = [
    h('13. Success Metrics'),
    bullet('% of selected attack patterns successfully exercised.'),
    bullet('# of findings by severity, with trend against prior engagement of this system.'),
    bullet('# of findings traceable to a missing or weak control in the AI Controls Catalog.'),
    bullet('Report delivery against schedule.'),
    bullet('Stakeholder satisfaction (qualitative).'),
  ];

  // Annexes
  const annexes = [
    h('Annex A — Pre-Engagement Authorization Letter'),
    p('(Provided as a separate file.)'),
    h('Annex B — Test Cases'),
    p('(To be appended by Test Lead prior to execution.)'),
    h('Annex C — Glossary'),
    p('Standard AI red team terminology per the AI-RedTeam-Framework playbook (https://emmanuelgjr.github.io/AI-RedTeam-Framework/playbook).'),
    h('Annex D — References'),
    bullet('AI Red Team Framework — https://emmanuelgjr.github.io/AI-RedTeam-Framework'),
    bullet('OWASP LLM Top 10 — https://genai.owasp.org/llm-top-10/'),
    bullet('OWASP Agentic AI Top 10 — https://genai.owasp.org/'),
    bullet('MITRE ATLAS — https://atlas.mitre.org/'),
    bullet('NIST AI RMF — https://www.nist.gov/itl/ai-risk-management-framework'),
    bullet('ISO/IEC 42001:2023 — https://www.iso.org/standard/81230.html'),
  ];

  return new Document({
    creator: 'AI-RedTeam-Framework Engagement Planner',
    title: `AI Red Team Engagement — Rules of Engagement — ${refId}`,
    description: 'Engagement Rules of Engagement generated by the AI-RedTeam-Framework Engagement Planner.',
    sections: [
      {
        headers: { default: headerObj },
        footers: { default: footerObj },
        children: [
          ...cover,
          ...docControl,
          ...charter,
          ...scope,
          ...hardLimitsSection,
          ...auth,
          ...method,
          ...evidence,
          ...deliverables,
          ...escalation,
          ...comms,
          ...compl,
          ...metrics,
          ...annexes,
        ],
      },
    ],
  });
}

export async function downloadRoe(state: PlannerState) {
  const doc = generateRoeDocx(state);
  const blob = await Packer.toBlob(doc);
  if (typeof document === 'undefined') return;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${engagementRefId()}-ROE.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
