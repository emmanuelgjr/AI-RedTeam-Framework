import type { PlannerState } from './plannerSchema';

interface AttackRef {
  id: string;
  name: string;
  why: string;
  refs: string;
}

interface ToolRef {
  name: string;
  category: string;
  why: string;
  effort: string;
}

export function selectAttackPatterns(state: PlannerState): AttackRef[] {
  const out: AttackRef[] = [];
  const t = state.targetSystemType;
  const auto = state.autonomyLevel;

  // Direct + indirect PI for any LLM-derived system
  if (['LLM application', 'RAG system', 'Agentic / multi-agent', 'Multi-modal', 'GenAI for code'].includes(t)) {
    out.push({
      id: 'ATK-001',
      name: 'Direct Prompt Injection — User Input',
      why: 'User-controllable input is the most reliable injection vector.',
      refs: 'OWASP LLM01:2025 · MITRE AML.T0051',
    });
  }
  if (['RAG system', 'Agentic / multi-agent', 'LLM application'].includes(t)) {
    out.push({
      id: 'ATK-002',
      name: 'Indirect Prompt Injection via RAG Source',
      why: 'Retrieved-content trust is the most underestimated boundary in RAG systems.',
      refs: 'OWASP LLM01:2025 · MITRE AML.T0051.001',
    });
  }
  if (['LLM application', 'RAG system', 'Agentic / multi-agent'].includes(t)) {
    out.push({
      id: 'ATK-003',
      name: 'Indirect Prompt Injection via Document Upload',
      why: 'Document-ingestion paths frequently lack injection-aware sanitization.',
      refs: 'OWASP LLM01/LLM02',
    });
  }
  if (t === 'Multi-modal') {
    out.push({
      id: 'ATK-004',
      name: 'Multi-Modal Prompt Injection — Image',
      why: 'Image input expands the injection surface beyond text scanners.',
      refs: 'OWASP LLM01:2025',
    });
  }
  if (['LLM application', 'Agentic / multi-agent'].includes(t)) {
    out.push({
      id: 'ATK-007',
      name: 'Prompt Leakage — System Prompt Exposure',
      why: 'Business logic in the system prompt is a common disclosure vector.',
      refs: 'OWASP LLM06:2025',
    });
  }

  // Agentic-specific
  if (t === 'Agentic / multi-agent') {
    out.push(
      {
        id: 'ATK-012',
        name: 'Excessive Agency — Unauthorized Tool Use',
        why: 'Tool authorization boundaries are the primary control surface for agents.',
        refs: 'OWASP LLM07 · AAI01/AAI04',
      },
      {
        id: 'ATK-013',
        name: 'Tool Permission Escalation',
        why: 'Self-elevation paths must be tested and contained.',
        refs: 'AAI04/AAI05',
      },
      {
        id: 'ATK-014',
        name: 'Multi-Agent Collusion',
        why: 'Inter-agent trust is rarely authenticated.',
        refs: 'AAI03/AAI06',
      },
      {
        id: 'ATK-024',
        name: 'Function-Calling Schema Abuse',
        why: 'Argument validation gaps reach downstream systems.',
        refs: 'OWASP LLM02/LLM07',
      },
    );
  }

  // Autonomy-driven
  if (['Autonomous in sandbox', 'Autonomous in production'].includes(auto)) {
    out.push({
      id: 'ATK-025',
      name: 'Cross-Plugin Request Forgery',
      why: 'High autonomy expands the cross-plugin blast radius.',
      refs: 'AAI02/AAI06',
    });
  }

  // Output handling broadly applicable
  if (['LLM application', 'Agentic / multi-agent', 'GenAI for code'].includes(t)) {
    out.push(
      {
        id: 'ATK-010',
        name: 'Insecure Output Handling — Code Execution',
        why: 'Generated-code execution pathways need explicit sandboxing tests.',
        refs: 'OWASP LLM02:2025',
      },
      {
        id: 'ATK-011',
        name: 'Insecure Output Handling — SSRF via URL',
        why: 'Model-emitted URLs reach internal/cloud endpoints if unfiltered.',
        refs: 'OWASP LLM02',
      },
    );
  }

  // Data-sensitivity-driven
  if (['Regulated (PCI/PHI/PII)', 'Highly regulated (banking secrecy / national security)'].includes(state.dataSensitivity)) {
    out.push(
      {
        id: 'ATK-008',
        name: 'Training Data Extraction via Prompting',
        why: 'Regulated training data must withstand extraction attempts.',
        refs: 'OWASP LLM06',
      },
      {
        id: 'ATK-009',
        name: 'PII Leakage from Inference',
        why: 'Regulated data exposure across users is the most common audit finding.',
        refs: 'OWASP LLM06',
      },
    );
  }

  // Guardrail bypass for any system with policy boundaries
  out.push({
    id: 'ATK-006',
    name: 'Refusal Evasion / Jailbreak',
    why: 'Policy boundaries must be tested against current public corpora.',
    refs: 'OWASP LLM01 · MITRE AML.T0054',
  });
  out.push({
    id: 'ATK-023',
    name: 'Guardrail Bypass via Encoding',
    why: 'Pattern-only guardrails are bypassed by trivial encodings.',
    refs: 'OWASP LLM01',
  });

  // Continuous testing includes cost-attack coverage
  if (state.engagementType === 'Continuous red team' || state.duration === 'Continuous') {
    out.push({
      id: 'ATK-020',
      name: 'Resource Exhaustion / Denial of Wallet',
      why: 'Continuous monitoring catches cost-amplification before financial damage.',
      refs: 'OWASP LLM10',
    });
  }

  // Dedup by id (preserve first)
  const seen = new Set<string>();
  return out.filter((a) => {
    if (seen.has(a.id)) return false;
    seen.add(a.id);
    return true;
  });
}

export function selectTools(state: PlannerState): ToolRef[] {
  const out: ToolRef[] = [];

  // Always include a programmatic harness
  out.push({
    name: 'PyRIT',
    category: 'Automated red team / prompt testing',
    why: 'Programmatic orchestration of attack prompts; supports custom scorers for engagement-specific policies.',
    effort: 'medium',
  });

  // Always include a baseline scanner
  out.push({
    name: 'garak',
    category: 'Automated red team / model evaluation',
    why: 'Baseline scanning across common probe categories; useful for first-pass coverage.',
    effort: 'low',
  });

  // Promptfoo for evaluation discipline
  if (['Attack simulation', 'Prompt injection assessment', 'Model evaluation', 'Continuous red team'].includes(state.engagementType)) {
    out.push({
      name: 'Promptfoo',
      category: 'Evaluation / regression',
      why: 'Repeatable YAML-configured evaluation suitable for CI regression and side-by-side model comparison.',
      effort: 'low',
    });
  }

  // Inspect for agentic
  if (state.targetSystemType === 'Agentic / multi-agent' || state.engagementType === 'Agentic AI testing') {
    out.push({
      name: 'Inspect AI',
      category: 'Agent / tool-use evaluation',
      why: 'First-class support for agent and tool-use scenarios; matches the engagement structure.',
      effort: 'high',
    });
  }

  // Guardrail testing for any system with active guardrails
  out.push({
    name: 'LLM Guard',
    category: 'Guardrail testing',
    why: 'Compose input/output scanners to evaluate current defensive coverage.',
    effort: 'medium',
  });

  // Full kill-chain pulls in BAS
  if (state.engagementType === 'Full kill-chain red team') {
    out.push(
      {
        name: 'Horizon3.ai NodeZero',
        category: 'Autonomous pentest / blast-radius',
        why: 'Validates the broader attack surface around the AI system, including the network and identity it can reach.',
        effort: 'medium',
      },
      {
        name: 'Cymulate',
        category: 'BAS / detection validation',
        why: 'Validates SOC coverage of AI-related attack patterns end-to-end.',
        effort: 'medium',
      },
    );
  }

  // Commercial for compliance-driven
  if (state.engagementType === 'Compliance-driven testing' || state.regulatoryRegime !== 'None / N/A') {
    out.push({
      name: 'Lakera Red',
      category: 'Commercial automated red team',
      why: 'Reporting suitable for regulator-facing evidence; commercial accountability layer.',
      effort: 'medium',
    });
  }

  return out;
}

export function complianceMappings(state: PlannerState): string[] {
  const out: string[] = [
    'ISO/IEC 42001 Clause 8.3 — operational evaluation: satisfied by test reports + remediation evidence.',
    'NIST AI RMF MEASURE-2.7 — adversarial testing: satisfied by deliverables.',
  ];
  if (state.regulatoryRegime === 'EU AI Act high-risk') {
    out.push(
      'EU AI Act Article 15 — accuracy, robustness, cybersecurity: satisfied by test reports for the high-risk system in scope.',
      'EU AI Act Article 17 — quality management system: engagement records integrate into the QMS evidence base.',
    );
  }
  if (state.regulatoryRegime === 'Banking (OSFI / OCC / Fed / ECB)') {
    out.push(
      'OSFI E-21 — Operational Resilience: critical-operations testing evidence (where the system supports a critical operation).',
      'OSFI B-13 — Technology and Cyber Risk Management: AI-specific cyber testing evidence.',
    );
  }
  if (state.regulatoryRegime === 'Insurance (NAIC / state)') {
    out.push('NAIC AI Model Bulletin alignment: evidence of adversarial robustness for insurer-deployed AI.');
  }
  if (state.regulatoryRegime === 'Healthcare (HIPAA / HITECH)') {
    out.push('HIPAA Security Rule Risk Analysis: AI-system risk evidence.');
  }
  if (state.regulatoryRegime === 'Public sector') {
    out.push('Sector-specific AI directives (e.g., TBS Directive on Automated Decision-Making for Canada Federal): evidence per applicable instrument.');
  }
  if (state.targetSystemType === 'Agentic / multi-agent') {
    out.push('AI Controls Catalog AI-CTRL-019 — Agentic AI Tool Authorization Boundaries: engagement validates the control operating effectiveness.');
  }
  out.push('AI Controls Catalog AI-CTRL-003 — Adversarial Robustness Testing for LLM Systems: engagement produces required test cycle evidence.');
  return out;
}
