import { z } from 'zod';

export const EngagementType = z.enum([
  'Attack simulation',
  'Prompt injection assessment',
  'Agentic AI testing',
  'Model evaluation',
  'Continuous red team',
  'Full kill-chain red team',
  'Compliance-driven testing',
]);

export const TargetSystemType = z.enum([
  'LLM application',
  'RAG system',
  'Agentic / multi-agent',
  'Computer vision',
  'Recommendation / ranking',
  'Traditional ML',
  'GenAI for code',
  'Multi-modal',
]);

export const DeploymentModel = z.enum([
  'SaaS (third-party API)',
  'Self-hosted open weight',
  'Internally fine-tuned',
  'Hybrid',
]);

export const DataSensitivity = z.enum([
  'Public',
  'Internal',
  'Confidential',
  'Regulated (PCI/PHI/PII)',
  'Highly regulated (banking secrecy / national security)',
]);

export const AutonomyLevel = z.enum([
  'Read-only',
  'Suggest-only',
  'Act with human approval',
  'Autonomous in sandbox',
  'Autonomous in production',
]);

export const RegulatoryRegime = z.enum([
  'Banking (OSFI / OCC / Fed / ECB)',
  'Insurance (NAIC / state)',
  'Healthcare (HIPAA / HITECH)',
  'Public sector',
  'EU AI Act high-risk',
  'None / N/A',
]);

export const EngagementDuration = z.enum(['1–2 weeks', '3–4 weeks', '6–8 weeks', 'Continuous']);
export const TestTeamComposition = z.enum(['Internal', 'External (commissioned)', 'Hybrid']);
export const TestEnvironment = z.enum([
  'Production (with safeguards)',
  'Staging',
  'Isolated test environment',
  'Synthetic / mocked',
]);
export const AuthorizationScope = z.enum([
  'Single application',
  'Application family',
  'Business unit',
  'Enterprise-wide',
]);

export const RaciRow = z.object({
  role: z.string(),
  name: z.string(),
  responsibility: z.enum(['Responsible', 'Accountable', 'Consulted', 'Informed']),
});

export const plannerStateSchema = z.object({
  engagementType: EngagementType,
  targetSystemType: TargetSystemType,
  targetSystemName: z.string().min(2),
  deploymentModel: DeploymentModel,
  dataSensitivity: DataSensitivity,
  autonomyLevel: AutonomyLevel,
  regulatoryRegime: RegulatoryRegime,
  duration: EngagementDuration,
  testTeam: TestTeamComposition,
  testEnvironment: TestEnvironment,
  authorizationScope: AuthorizationScope,
  outOfScopeHardLimits: z.array(z.string()).default([]),
  raci: z.array(RaciRow).default([]),
  draftedBy: z.string().default('AI Red Team Lead'),
});

export type PlannerState = z.infer<typeof plannerStateSchema>;

export const defaultHardLimitsForRegime: Record<string, string[]> = {
  'Banking (OSFI / OCC / Fed / ECB)': [
    'Customer-facing production systems during business hours.',
    'Real customer PII extraction (synthetic / approved-test data only).',
    'Payment systems and PCI-scoped infrastructure.',
    'Any action that triggers a real money movement.',
    'Any action creating audit-log false positives in SOC without prior coordination.',
  ],
  'Insurance (NAIC / state)': [
    'Claims systems during active business hours.',
    'Real policyholder PII (synthetic / approved-test data only).',
    'Underwriting decisioning with real applicant data.',
  ],
  'Healthcare (HIPAA / HITECH)': [
    'Production patient data of any kind.',
    'Clinical decision-support systems serving real patients.',
    'Any action affecting electronic health records.',
  ],
  'Public sector': [
    'Citizen-facing service-delivery systems during published service hours.',
    'Real personal data of citizens.',
    'Any action affecting case adjudication.',
  ],
  'EU AI Act high-risk': [
    'Real subject data (use synthetic or approved-test only).',
    'Real-world automated decisions affecting individuals.',
  ],
  'None / N/A': [],
};

export function engagementRefId(today = new Date()): string {
  const yyyy = today.getFullYear();
  const seq = Math.floor(Math.random() * 900 + 100);
  return `AIRT-${yyyy}-${seq}`;
}
