import { describe, it, expect } from 'vitest';
import { plannerStateSchema, type PlannerState } from '../src/components/EngagementPlanner/plannerSchema';
import { selectAttackPatterns, selectTools, complianceMappings } from '../src/components/EngagementPlanner/selectors';

const base: PlannerState = {
  engagementType: 'Attack simulation',
  targetSystemType: 'LLM application',
  targetSystemName: 'assist-api v3.2',
  deploymentModel: 'SaaS (third-party API)',
  dataSensitivity: 'Internal',
  autonomyLevel: 'Suggest-only',
  regulatoryRegime: 'None / N/A',
  duration: '3–4 weeks',
  testTeam: 'Internal',
  testEnvironment: 'Staging',
  authorizationScope: 'Single application',
  outOfScopeHardLimits: [],
  raci: [],
  draftedBy: 'AI Red Team Lead',
};

describe('plannerStateSchema', () => {
  it('parses a valid state', () => {
    expect(() => plannerStateSchema.parse(base)).not.toThrow();
  });
  it('rejects empty target name', () => {
    expect(() => plannerStateSchema.parse({ ...base, targetSystemName: '' })).toThrow();
  });
});

describe('selectAttackPatterns', () => {
  it('includes direct PI for LLM application', () => {
    const out = selectAttackPatterns(base);
    expect(out.find((a) => a.id === 'ATK-001')).toBeDefined();
  });
  it('includes RAG indirect PI for RAG system', () => {
    const out = selectAttackPatterns({ ...base, targetSystemType: 'RAG system' });
    expect(out.find((a) => a.id === 'ATK-002')).toBeDefined();
  });
  it('includes excessive agency for agentic system', () => {
    const out = selectAttackPatterns({ ...base, targetSystemType: 'Agentic / multi-agent' });
    expect(out.find((a) => a.id === 'ATK-012')).toBeDefined();
  });
  it('includes multi-modal PI for multi-modal', () => {
    const out = selectAttackPatterns({ ...base, targetSystemType: 'Multi-modal' });
    expect(out.find((a) => a.id === 'ATK-004')).toBeDefined();
  });
  it('includes data extraction patterns for regulated data', () => {
    const out = selectAttackPatterns({ ...base, dataSensitivity: 'Regulated (PCI/PHI/PII)' });
    expect(out.find((a) => a.id === 'ATK-008')).toBeDefined();
    expect(out.find((a) => a.id === 'ATK-009')).toBeDefined();
  });
});

describe('selectTools', () => {
  it('always includes PyRIT and garak', () => {
    const out = selectTools(base);
    expect(out.find((t) => t.name === 'PyRIT')).toBeDefined();
    expect(out.find((t) => t.name === 'garak')).toBeDefined();
  });
  it('includes Inspect AI for agentic', () => {
    const out = selectTools({ ...base, targetSystemType: 'Agentic / multi-agent' });
    expect(out.find((t) => t.name === 'Inspect AI')).toBeDefined();
  });
  it('includes BAS for full kill-chain', () => {
    const out = selectTools({ ...base, engagementType: 'Full kill-chain red team' });
    expect(out.find((t) => t.name === 'Horizon3.ai NodeZero')).toBeDefined();
  });
});

describe('complianceMappings', () => {
  it('always includes ISO 42001 and NIST AI RMF', () => {
    const out = complianceMappings(base);
    expect(out.some((s) => s.includes('ISO/IEC 42001'))).toBe(true);
    expect(out.some((s) => s.includes('NIST AI RMF'))).toBe(true);
  });
  it('includes EU AI Act Article 15 for EU high-risk', () => {
    const out = complianceMappings({ ...base, regulatoryRegime: 'EU AI Act high-risk' });
    expect(out.some((s) => s.includes('EU AI Act Article 15'))).toBe(true);
  });
  it('includes OSFI E-21 for Banking', () => {
    const out = complianceMappings({ ...base, regulatoryRegime: 'Banking (OSFI / OCC / Fed / ECB)' });
    expect(out.some((s) => s.includes('OSFI E-21'))).toBe(true);
  });
});
