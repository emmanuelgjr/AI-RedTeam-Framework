import { z } from 'zod';

const Reference = z.object({ title: z.string(), url: z.string().url() });

export const AttackCategory = z.enum([
  'Prompt manipulation',
  'Output handling',
  'Tool & agent abuse',
  'Model integrity',
  'Data integrity',
  'Infrastructure',
  'Trust & social',
  'Evaluation & guardrail bypass',
  'Multi-modal',
]);

export const AISystemType = z.enum([
  'LLM',
  'RAG',
  'Agentic AI',
  'Multi-modal',
  'Traditional ML',
  'Computer Vision',
  'Recommender',
  'Speech',
]);

export const attackSchema = z.object({
  id: z.string().regex(/^ATK-\d{3}$/),
  name: z.string().min(8),
  category: AttackCategory,
  applies_to: z.array(AISystemType).min(1),
  prerequisites: z.array(z.string()).min(1),
  test_approach: z.string().min(80),
  expected_evidence: z.array(z.string()).min(2),
  detection_signals: z.array(z.string()).min(2),
  defensive_recommendations: z.array(z.string()).min(2),
  framework_mappings: z.object({
    owasp_llm_top_10: z.array(z.string()).optional(),
    owasp_agentic_top_10: z.array(z.string()).optional(),
    mitre_atlas: z.array(z.string()).optional(),
    nist_ai_rmf: z.array(z.string()).optional(),
  }),
  ai_controls_catalog_refs: z.array(z.string()).default([]),
  references: z.array(Reference).min(2),
  author: z.string(),
  created: z.string(),
  last_reviewed: z.string(),
});

export type Attack = z.infer<typeof attackSchema>;

export const ToolType = z.enum(['open-source', 'commercial', 'freemium']);
export const ToolCategory = z.enum([
  'prompt-testing',
  'automated-redteam',
  'BAS',
  'model-eval',
  'guardrail-testing',
  'agentic-testing',
]);
export const IntegrationEffort = z.enum(['low', 'medium', 'high']);

export const toolSchema = z.object({
  slug: z.string(),
  name: z.string(),
  vendor: z.string(),
  type: ToolType,
  category: z.array(ToolCategory).min(1),
  what_it_does: z.string().min(40),
  what_it_doesnt_do: z.string().min(40),
  best_for: z.array(z.string()).min(1),
  not_for: z.array(z.string()).min(1),
  pricing_summary: z.string(),
  integration_effort: IntegrationEffort,
  team_skill_required: z.string(),
  url: z.string().url(),
  last_reviewed: z.string(),
});

export type Tool = z.infer<typeof toolSchema>;

export const playbookSchema = z.object({
  title: z.string(),
  chapter: z.number().int(),
  description: z.string(),
  last_reviewed: z.string(),
});
