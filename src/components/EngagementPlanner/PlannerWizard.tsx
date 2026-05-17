import { useState, type ChangeEvent } from 'react';
import { ChevronLeft, ChevronRight, Download, Plus, Trash2 } from 'lucide-react';
import {
  plannerStateSchema,
  type PlannerState,
  defaultHardLimitsForRegime,
} from './plannerSchema';
import { selectAttackPatterns, selectTools, complianceMappings } from './selectors';
import { downloadRoe } from './docxGenerator';

const initial: PlannerState = {
  engagementType: 'Attack simulation',
  targetSystemType: 'LLM application',
  targetSystemName: '',
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

const STEP_LABELS = [
  'Engagement type',
  'Target system',
  'Deployment',
  'Data sensitivity',
  'Autonomy',
  'Regulatory regime',
  'Duration',
  'Test team',
  'Environment',
  'Authorization scope',
  'Hard limits',
  'RACI & sign-off',
];

const opts = <T extends string>(items: readonly T[]) => items;

const ENG_TYPE = opts([
  'Attack simulation',
  'Prompt injection assessment',
  'Agentic AI testing',
  'Model evaluation',
  'Continuous red team',
  'Full kill-chain red team',
  'Compliance-driven testing',
] as const);

const SYS_TYPE = opts([
  'LLM application',
  'RAG system',
  'Agentic / multi-agent',
  'Computer vision',
  'Recommendation / ranking',
  'Traditional ML',
  'GenAI for code',
  'Multi-modal',
] as const);

const DEPLOY = opts([
  'SaaS (third-party API)',
  'Self-hosted open weight',
  'Internally fine-tuned',
  'Hybrid',
] as const);

const SENS = opts([
  'Public',
  'Internal',
  'Confidential',
  'Regulated (PCI/PHI/PII)',
  'Highly regulated (banking secrecy / national security)',
] as const);

const AUTO = opts([
  'Read-only',
  'Suggest-only',
  'Act with human approval',
  'Autonomous in sandbox',
  'Autonomous in production',
] as const);

const REGIME = opts([
  'Banking (OSFI / OCC / Fed / ECB)',
  'Insurance (NAIC / state)',
  'Healthcare (HIPAA / HITECH)',
  'Public sector',
  'EU AI Act high-risk',
  'None / N/A',
] as const);

const DUR = opts(['1–2 weeks', '3–4 weeks', '6–8 weeks', 'Continuous'] as const);
const TEAM = opts(['Internal', 'External (commissioned)', 'Hybrid'] as const);
const ENV = opts([
  'Production (with safeguards)',
  'Staging',
  'Isolated test environment',
  'Synthetic / mocked',
] as const);
const SCOPE = opts(['Single application', 'Application family', 'Business unit', 'Enterprise-wide'] as const);

export default function PlannerWizard() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<PlannerState>(initial);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof PlannerState>(k: K, v: PlannerState[K]) =>
    setState((s) => ({ ...s, [k]: v }));

  const next = () => {
    setError(null);
    if (step === 1 && !state.targetSystemName.trim()) {
      setError('Target system name is required.');
      return;
    }
    setStep((s) => Math.min(STEP_LABELS.length, s + 1));
  };
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const onDownload = async () => {
    const parsed = plannerStateSchema.safeParse(state);
    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message ?? 'Invalid planner input');
      return;
    }
    await downloadRoe(parsed.data);
  };

  const progress = ((step + 1) / (STEP_LABELS.length + 1)) * 100;

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-ink-500 mb-2">
          <span>
            Step {Math.min(step + 1, STEP_LABELS.length + 1)} of {STEP_LABELS.length + 1}
          </span>
          <span className="font-medium text-ink-700">
            {step < STEP_LABELS.length ? STEP_LABELS[step] : 'Generate ROE'}
          </span>
        </div>
        <div className="h-1 bg-ink-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent-700 transition-all"
            style={{ width: `${progress}%` }}
            aria-hidden
          />
        </div>
      </div>

      <div
        role="region"
        aria-live="polite"
        aria-label={`Step ${step + 1}: ${STEP_LABELS[step] ?? 'Generate ROE'}`}
        className="card min-h-[24rem]"
      >
        {step === 0 && (
          <RadioGroup
            label="What kind of engagement is this?"
            value={state.engagementType}
            options={ENG_TYPE}
            onChange={(v) => update('engagementType', v as PlannerState['engagementType'])}
          />
        )}
        {step === 1 && (
          <>
            <RadioGroup
              label="What is the target AI system type?"
              value={state.targetSystemType}
              options={SYS_TYPE}
              onChange={(v) => update('targetSystemType', v as PlannerState['targetSystemType'])}
            />
            <div className="mt-6">
              <label className="block text-sm font-medium text-ink-700 mb-1">
                Target system name
              </label>
              <input
                type="text"
                value={state.targetSystemName}
                onChange={(e) => update('targetSystemName', e.target.value)}
                placeholder="e.g., assist-api service v3.2"
                className="form-input w-full rounded-md border-ink-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30"
              />
              {error && <p className="text-sm text-risk-700 mt-1">{error}</p>}
            </div>
          </>
        )}
        {step === 2 && (
          <RadioGroup
            label="Deployment model"
            value={state.deploymentModel}
            options={DEPLOY}
            onChange={(v) => update('deploymentModel', v as PlannerState['deploymentModel'])}
          />
        )}
        {step === 3 && (
          <RadioGroup
            label="Data sensitivity"
            value={state.dataSensitivity}
            options={SENS}
            onChange={(v) => update('dataSensitivity', v as PlannerState['dataSensitivity'])}
          />
        )}
        {step === 4 && (
          <RadioGroup
            label="Autonomy level"
            value={state.autonomyLevel}
            options={AUTO}
            onChange={(v) => update('autonomyLevel', v as PlannerState['autonomyLevel'])}
          />
        )}
        {step === 5 && (
          <RadioGroup
            label="Regulatory regime"
            value={state.regulatoryRegime}
            options={REGIME}
            onChange={(v) => update('regulatoryRegime', v as PlannerState['regulatoryRegime'])}
          />
        )}
        {step === 6 && (
          <RadioGroup
            label="Engagement duration"
            value={state.duration}
            options={DUR}
            onChange={(v) => update('duration', v as PlannerState['duration'])}
          />
        )}
        {step === 7 && (
          <RadioGroup
            label="Test team composition"
            value={state.testTeam}
            options={TEAM}
            onChange={(v) => update('testTeam', v as PlannerState['testTeam'])}
          />
        )}
        {step === 8 && (
          <RadioGroup
            label="Test environment"
            value={state.testEnvironment}
            options={ENV}
            onChange={(v) => update('testEnvironment', v as PlannerState['testEnvironment'])}
          />
        )}
        {step === 9 && (
          <RadioGroup
            label="Authorization scope"
            value={state.authorizationScope}
            options={SCOPE}
            onChange={(v) => update('authorizationScope', v as PlannerState['authorizationScope'])}
          />
        )}
        {step === 10 && (
          <HardLimits state={state} update={update} />
        )}
        {step === 11 && (
          <Raci state={state} update={update} />
        )}
        {step === STEP_LABELS.length && (
          <ReviewAndGenerate state={state} onDownload={onDownload} error={error} />
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={prev}
          disabled={step === 0}
          className="btn btn-ghost btn-md disabled:opacity-30"
          aria-label="Previous step"
        >
          <ChevronLeft size={16} /> Back
        </button>
        {step < STEP_LABELS.length ? (
          <button onClick={next} className="btn btn-primary btn-md">
            Next <ChevronRight size={16} />
          </button>
        ) : (
          <button onClick={onDownload} className="btn btn-primary btn-lg">
            <Download size={16} /> Generate ROE (.docx)
          </button>
        )}
      </div>
    </div>
  );
}

function RadioGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-base font-semibold text-ink-900 mb-4">{label}</legend>
      <div className="grid gap-2">
        {options.map((opt) => (
          <label
            key={opt}
            className={`flex items-start gap-3 p-3 rounded-md border cursor-pointer transition-colors ${
              value === opt
                ? 'border-accent-500 bg-accent-50/50'
                : 'border-ink-200 hover:border-accent-300'
            }`}
          >
            <input
              type="radio"
              name={label}
              checked={value === opt}
              onChange={() => onChange(opt)}
              className="form-radio mt-1 text-accent-700 focus:ring-accent-500"
            />
            <span className="text-sm text-ink-800">{opt}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function HardLimits({
  state,
  update,
}: {
  state: PlannerState;
  update: <K extends keyof PlannerState>(k: K, v: PlannerState[K]) => void;
}) {
  const [draft, setDraft] = useState('');
  const defaults = defaultHardLimitsForRegime[state.regulatoryRegime] ?? [];
  return (
    <div>
      <h3 className="text-base font-semibold text-ink-900 mb-1">Out-of-scope hard limits</h3>
      <p className="text-sm text-ink-600 mb-4">
        These supplement the regulatory-regime defaults that will be pre-populated automatically.
      </p>
      {defaults.length > 0 && (
        <div className="mb-4 p-3 rounded-md bg-ink-50 border border-ink-200">
          <p className="text-xs font-medium text-ink-500 uppercase tracking-wide mb-2">
            Pre-populated for {state.regulatoryRegime}
          </p>
          <ul className="text-sm text-ink-700 space-y-1 list-disc list-inside">
            {defaults.map((d) => <li key={d}>{d}</li>)}
          </ul>
        </div>
      )}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add a hard limit..."
          className="form-input flex-1 rounded-md border-ink-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30"
        />
        <button
          onClick={() => {
            if (draft.trim()) {
              update('outOfScopeHardLimits', [...state.outOfScopeHardLimits, draft.trim()]);
              setDraft('');
            }
          }}
          className="btn btn-secondary btn-md"
        >
          <Plus size={14} /> Add
        </button>
      </div>
      <ul className="space-y-2">
        {state.outOfScopeHardLimits.map((l, i) => (
          <li key={i} className="flex items-start gap-2 p-2 rounded border border-ink-200">
            <span className="text-sm text-ink-800 flex-1">{l}</span>
            <button
              onClick={() =>
                update(
                  'outOfScopeHardLimits',
                  state.outOfScopeHardLimits.filter((_, idx) => idx !== i),
                )
              }
              className="text-ink-400 hover:text-risk-600"
              aria-label="Remove limit"
            >
              <Trash2 size={14} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Raci({
  state,
  update,
}: {
  state: PlannerState;
  update: <K extends keyof PlannerState>(k: K, v: PlannerState[K]) => void;
}) {
  const addRow = () =>
    update('raci', [...state.raci, { role: '', name: '', responsibility: 'Consulted' }]);
  const remove = (i: number) =>
    update('raci', state.raci.filter((_, idx) => idx !== i));
  const setField = (i: number, k: 'role' | 'name' | 'responsibility', v: string) =>
    update(
      'raci',
      state.raci.map((r, idx) =>
        idx === i ? { ...r, [k]: v } : r,
      ) as PlannerState['raci'],
    );
  return (
    <div>
      <h3 className="text-base font-semibold text-ink-900 mb-1">RACI &amp; sign-off</h3>
      <p className="text-sm text-ink-600 mb-4">
        Add the stakeholders who must sign off, be consulted, or be informed for this engagement.
      </p>

      <div className="space-y-3">
        {state.raci.map((row, i) => (
          <div key={i} className="grid grid-cols-[1fr_1fr_180px_auto] gap-2 items-start">
            <input
              type="text"
              value={row.role}
              onChange={(e) => setField(i, 'role', e.target.value)}
              placeholder="Role (e.g., CISO)"
              className="form-input rounded-md border-ink-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30 text-sm"
            />
            <input
              type="text"
              value={row.name}
              onChange={(e) => setField(i, 'name', e.target.value)}
              placeholder="Name"
              className="form-input rounded-md border-ink-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30 text-sm"
            />
            <select
              value={row.responsibility}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setField(i, 'responsibility', e.target.value)
              }
              className="form-select rounded-md border-ink-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30 text-sm"
            >
              <option>Responsible</option>
              <option>Accountable</option>
              <option>Consulted</option>
              <option>Informed</option>
            </select>
            <button
              onClick={() => remove(i)}
              className="text-ink-400 hover:text-risk-600 p-2"
              aria-label="Remove row"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
      <button onClick={addRow} className="btn btn-secondary btn-sm mt-3">
        <Plus size={14} /> Add stakeholder
      </button>

      <div className="mt-6">
        <label className="block text-sm font-medium text-ink-700 mb-1">Drafted by</label>
        <input
          type="text"
          value={state.draftedBy}
          onChange={(e) => update('draftedBy', e.target.value)}
          className="form-input w-full rounded-md border-ink-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30"
        />
      </div>
    </div>
  );
}

function ReviewAndGenerate({
  state,
  onDownload,
  error,
}: {
  state: PlannerState;
  onDownload: () => void;
  error: string | null;
}) {
  const attacks = selectAttackPatterns(state);
  const tools = selectTools(state);
  const compliance = complianceMappings(state);
  return (
    <div>
      <h3 className="text-base font-semibold text-ink-900 mb-3">Review and generate</h3>
      <p className="text-sm text-ink-600 mb-4">
        The generated ROE will include {attacks.length} attack patterns, {tools.length} recommended
        tools, and {compliance.length} compliance traceability statements derived from your inputs.
      </p>

      <div className="grid gap-3 sm:grid-cols-2 text-sm">
        <Field label="Engagement type" value={state.engagementType} />
        <Field label="Target system" value={`${state.targetSystemName} (${state.targetSystemType})`} />
        <Field label="Deployment" value={state.deploymentModel} />
        <Field label="Data sensitivity" value={state.dataSensitivity} />
        <Field label="Autonomy" value={state.autonomyLevel} />
        <Field label="Regulatory regime" value={state.regulatoryRegime} />
        <Field label="Duration" value={state.duration} />
        <Field label="Test team" value={state.testTeam} />
        <Field label="Environment" value={state.testEnvironment} />
        <Field label="Authorization scope" value={state.authorizationScope} />
      </div>

      {error && <p className="text-sm text-risk-700 mt-4">{error}</p>}

      <div className="mt-6 p-4 bg-accent-50/50 border border-accent-200 rounded-md text-sm text-ink-700">
        <strong>Privacy:</strong> Your inputs never leave the browser. The ROE document is generated
        client-side and downloaded directly to your machine.
      </div>

      <button onClick={onDownload} className="btn btn-primary btn-lg mt-6 w-full">
        <Download size={16} /> Generate ROE (.docx)
      </button>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-ink-500 uppercase tracking-wide">{label}</p>
      <p className="text-ink-900 mt-0.5">{value}</p>
    </div>
  );
}
