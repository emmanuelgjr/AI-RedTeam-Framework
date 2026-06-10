import { useMemo, useState } from 'react';
import { Check, Clipboard, Download } from 'lucide-react';

const CATEGORIES = [
  'Prompt manipulation',
  'Output handling',
  'Tool & agent abuse',
  'Model integrity',
  'Data integrity',
  'Infrastructure',
  'Trust & social',
  'Evaluation & guardrail bypass',
  'Multi-modal',
] as const;

const SYSTEM_TYPES = [
  'LLM',
  'RAG',
  'Agentic AI',
  'Multi-modal',
  'Traditional ML',
  'Computer Vision',
  'Recommender',
  'Speech',
] as const;

interface Props {
  nextId: string;
}

interface FormState {
  id: string;
  name: string;
  category: string;
  appliesTo: string[];
  prerequisites: string;
  testApproach: string;
  expectedEvidence: string;
  detectionSignals: string;
  defensiveRecommendations: string;
  owaspLlm: string;
  owaspAgentic: string;
  mitreAtlas: string;
  nistAiRmf: string;
  controlRefs: string;
  references: string;
  author: string;
}

const lines = (s: string) =>
  s
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

const csv = (s: string) =>
  s
    .split(',')
    .map((l) => l.trim())
    .filter(Boolean);

export default function PatternSubmissionForm({ nextId }: Props) {
  const [form, setForm] = useState<FormState>({
    id: nextId,
    name: '',
    category: CATEGORIES[0],
    appliesTo: [],
    prerequisites: '',
    testApproach: '',
    expectedEvidence: '',
    detectionSignals: '',
    defensiveRecommendations: '',
    owaspLlm: '',
    owaspAgentic: '',
    mitreAtlas: '',
    nistAiRmf: '',
    controlRefs: '',
    references: '',
    author: '',
  });
  const [copied, setCopied] = useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleSystem = (t: string) =>
    set(
      'appliesTo',
      form.appliesTo.includes(t)
        ? form.appliesTo.filter((x) => x !== t)
        : [...form.appliesTo, t]
    );

  const parsedRefs = useMemo(
    () =>
      lines(form.references).map((l) => {
        const [title, url] = l.split('|').map((p) => p.trim());
        return { title: title ?? '', url: url ?? '' };
      }),
    [form.references]
  );

  const mappingCount = useMemo(
    () =>
      [form.owaspLlm, form.owaspAgentic, form.mitreAtlas, form.nistAiRmf]
        .map(csv)
        .filter((arr) => arr.length > 0).length,
    [form.owaspLlm, form.owaspAgentic, form.mitreAtlas, form.nistAiRmf]
  );

  const problems = useMemo(() => {
    const p: string[] = [];
    if (!/^ATK-\d{3}$/.test(form.id)) p.push('ID must match ATK-NNN (e.g. ATK-026).');
    if (form.name.trim().length < 8) p.push('Name must be at least 8 characters.');
    if (form.appliesTo.length < 1) p.push('Select at least one applicable system type.');
    if (lines(form.prerequisites).length < 1) p.push('At least 1 prerequisite.');
    if (form.testApproach.trim().length < 80)
      p.push('Test approach must be at least 80 characters — describe the defensive test, with authorization assumed.');
    if (lines(form.expectedEvidence).length < 2) p.push('At least 2 expected evidence items.');
    if (lines(form.detectionSignals).length < 2) p.push('At least 2 detection signals.');
    if (lines(form.defensiveRecommendations).length < 2)
      p.push('At least 2 defensive recommendations.');
    if (mappingCount < 2)
      p.push('At least 2 framework mappings (across OWASP LLM, OWASP Agentic, MITRE ATLAS, NIST AI RMF).');
    if (parsedRefs.length < 2) p.push('At least 2 references.');
    if (parsedRefs.some((r) => !r.title || !/^https?:\/\//.test(r.url)))
      p.push('Each reference needs the form: Title | https://url — one per line.');
    if (!form.author.trim()) p.push('Author attribution is required (and permanent).');
    return p;
  }, [form, parsedRefs, mappingCount]);

  const json = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const mappings: Record<string, string[]> = {};
    if (csv(form.owaspLlm).length) mappings.owasp_llm_top_10 = csv(form.owaspLlm);
    if (csv(form.owaspAgentic).length) mappings.owasp_agentic_top_10 = csv(form.owaspAgentic);
    if (csv(form.mitreAtlas).length) mappings.mitre_atlas = csv(form.mitreAtlas);
    if (csv(form.nistAiRmf).length) mappings.nist_ai_rmf = csv(form.nistAiRmf);
    return JSON.stringify(
      {
        id: form.id,
        name: form.name.trim(),
        category: form.category,
        applies_to: form.appliesTo,
        prerequisites: lines(form.prerequisites),
        test_approach: form.testApproach.trim(),
        expected_evidence: lines(form.expectedEvidence),
        detection_signals: lines(form.detectionSignals),
        defensive_recommendations: lines(form.defensiveRecommendations),
        framework_mappings: mappings,
        ai_controls_catalog_refs: csv(form.controlRefs),
        references: parsedRefs,
        author: form.author.trim(),
        created: today,
        last_reviewed: today,
      },
      null,
      2
    );
  }, [form, parsedRefs]);

  const copy = async () => {
    await navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    const blob = new Blob([json], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${form.id}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const label = 'block text-sm font-medium text-ink-700';
  const input =
    'form-input mt-1 w-full rounded border-ink-300 text-sm focus:border-accent-500 focus:ring-accent-500';
  const area = `${input} font-mono text-xs leading-relaxed`;
  const hint = 'mt-1 text-xs text-ink-500';

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={label} htmlFor="ps-id">Pattern ID</label>
            <input id="ps-id" className={`${input} font-mono`} value={form.id}
              onChange={(e) => set('id', e.target.value)} />
            <p className={hint}>Next available: {nextId}</p>
          </div>
          <div>
            <label className={label} htmlFor="ps-category">Category</label>
            <select id="ps-category" className={input} value={form.category}
              onChange={(e) => set('category', e.target.value)}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className={label} htmlFor="ps-name">Pattern name</label>
          <input id="ps-name" className={input} value={form.name} placeholder="e.g. Indirect Prompt Injection — Retrieved Documents"
            onChange={(e) => set('name', e.target.value)} />
        </div>

        <fieldset>
          <legend className={label}>Applies to</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {SYSTEM_TYPES.map((t) => (
              <button type="button" key={t} onClick={() => toggleSystem(t)}
                className={`px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
                  form.appliesTo.includes(t)
                    ? 'bg-accent-700 border-accent-700 text-white'
                    : 'bg-white border-ink-300 text-ink-600 hover:border-accent-400'
                }`}>
                {t}
              </button>
            ))}
          </div>
        </fieldset>

        <div>
          <label className={label} htmlFor="ps-prereq">Prerequisites <span className="font-normal text-ink-400">(one per line)</span></label>
          <textarea id="ps-prereq" rows={3} className={area} value={form.prerequisites}
            onChange={(e) => set('prerequisites', e.target.value)} />
        </div>

        <div>
          <label className={label} htmlFor="ps-approach">Test approach</label>
          <textarea id="ps-approach" rows={6} className={area} value={form.testApproach}
            placeholder="With written authorization, the tester …"
            onChange={(e) => set('testApproach', e.target.value)} />
          <p className={hint}>
            Defensive framing: describe how to <em>test defenses against</em> this technique,
            not an offensive recipe. No weaponized payloads.
          </p>
        </div>

        <div>
          <label className={label} htmlFor="ps-evidence">Expected evidence <span className="font-normal text-ink-400">(one per line, ≥ 2)</span></label>
          <textarea id="ps-evidence" rows={3} className={area} value={form.expectedEvidence}
            onChange={(e) => set('expectedEvidence', e.target.value)} />
        </div>

        <div>
          <label className={label} htmlFor="ps-signals">Detection signals <span className="font-normal text-ink-400">(one per line, ≥ 2)</span></label>
          <textarea id="ps-signals" rows={3} className={area} value={form.detectionSignals}
            onChange={(e) => set('detectionSignals', e.target.value)} />
        </div>

        <div>
          <label className={label} htmlFor="ps-recs">Defensive recommendations <span className="font-normal text-ink-400">(one per line, ≥ 2)</span></label>
          <textarea id="ps-recs" rows={3} className={area} value={form.defensiveRecommendations}
            onChange={(e) => set('defensiveRecommendations', e.target.value)} />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={label} htmlFor="ps-owasp-llm">OWASP LLM Top 10</label>
            <input id="ps-owasp-llm" className={`${input} font-mono`} placeholder="LLM01:2025" value={form.owaspLlm}
              onChange={(e) => set('owaspLlm', e.target.value)} />
          </div>
          <div>
            <label className={label} htmlFor="ps-owasp-ag">OWASP Agentic</label>
            <input id="ps-owasp-ag" className={`${input} font-mono`} placeholder="AAI01" value={form.owaspAgentic}
              onChange={(e) => set('owaspAgentic', e.target.value)} />
          </div>
          <div>
            <label className={label} htmlFor="ps-atlas">MITRE ATLAS</label>
            <input id="ps-atlas" className={`${input} font-mono`} placeholder="AML.T0051" value={form.mitreAtlas}
              onChange={(e) => set('mitreAtlas', e.target.value)} />
          </div>
          <div>
            <label className={label} htmlFor="ps-nist">NIST AI RMF</label>
            <input id="ps-nist" className={`${input} font-mono`} placeholder="MEASURE-2.7" value={form.nistAiRmf}
              onChange={(e) => set('nistAiRmf', e.target.value)} />
          </div>
        </div>
        <p className="text-xs text-ink-500 -mt-2">Comma-separate multiple IDs. At least two of the four frameworks must be mapped.</p>

        <div>
          <label className={label} htmlFor="ps-ctrl">AI Controls Catalog refs <span className="font-normal text-ink-400">(optional, comma-separated)</span></label>
          <input id="ps-ctrl" className={`${input} font-mono`} placeholder="AI-CTRL-003, AI-CTRL-007" value={form.controlRefs}
            onChange={(e) => set('controlRefs', e.target.value)} />
        </div>

        <div>
          <label className={label} htmlFor="ps-refs">References <span className="font-normal text-ink-400">(one per line: Title | URL, ≥ 2)</span></label>
          <textarea id="ps-refs" rows={3} className={area} value={form.references}
            placeholder={'OWASP LLM01:2025 — Prompt Injection | https://genai.owasp.org/llm-top-10/'}
            onChange={(e) => set('references', e.target.value)} />
        </div>

        <div>
          <label className={label} htmlFor="ps-author">Author</label>
          <input id="ps-author" className={input} value={form.author} placeholder="Your name as it should appear — attribution is permanent"
            onChange={(e) => set('author', e.target.value)} />
        </div>
      </div>

      <div className="lg:sticky lg:top-6 self-start space-y-4">
        {problems.length > 0 ? (
          <div className="rounded-lg border border-warn-600/30 bg-warn-50 p-4">
            <h3 className="text-sm font-semibold text-ink-900">Before this is submittable</h3>
            <ul className="mt-2 space-y-1 text-sm text-ink-700 list-disc list-inside">
              {problems.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
        ) : (
          <div className="rounded-lg border border-ok-600/30 bg-ok-50 p-4 flex items-start gap-2">
            <Check className="h-4 w-4 text-ok-700 mt-0.5 shrink-0" aria-hidden="true" />
            <p className="text-sm text-ink-700">
              Passes the schema checks. Maintainer review still applies the full quality bar
              (defensive framing, field-tested, ethics).
            </p>
          </div>
        )}

        <div className="rounded-lg bg-ink-900 p-4 overflow-x-auto max-h-[28rem] overflow-y-auto">
          <pre className="text-[11px] leading-relaxed text-ink-200 font-mono whitespace-pre">{json}</pre>
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={copy} disabled={problems.length > 0}
            className="btn btn-primary btn-md disabled:opacity-40 disabled:cursor-not-allowed">
            <Clipboard className="h-4 w-4" aria-hidden="true" />
            {copied ? 'Copied' : 'Copy JSON'}
          </button>
          <button type="button" onClick={download} disabled={problems.length > 0}
            className="btn btn-secondary btn-md disabled:opacity-40 disabled:cursor-not-allowed">
            <Download className="h-4 w-4" aria-hidden="true" />
            Download {form.id}.json
          </button>
        </div>

        <ol className="text-sm text-ink-600 space-y-1.5 list-decimal list-inside">
          <li>Fork <span className="font-mono text-xs">emmanuelgjr/AI-RedTeam-Framework</span></li>
          <li>Add this file at <span className="font-mono text-xs">src/content/attacks/{form.id}.json</span></li>
          <li>Run <span className="font-mono text-xs">npm run validate</span> locally</li>
          <li>Open a PR — the template walks you through the submission checklist</li>
        </ol>
        <p className="text-xs text-ink-500">
          Everything on this page runs in your browser. Nothing you type here is sent anywhere.
        </p>
      </div>
    </div>
  );
}
