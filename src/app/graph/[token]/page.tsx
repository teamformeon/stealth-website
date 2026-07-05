// Public read-only graph view — stealthtechnologies.dev/graph/[token]
//
// Server-rendered: we call the get_shared_decision RPC with the anon key.
// The RPC is SECURITY DEFINER and only returns rows where share_enabled is
// true and share_expires_at hasn't passed, so we never expose RLS-private data.
//
// This is also the viral surface — every render of this page is a recipient
// who isn't yet a Formeon user. The "Sign up for Formeon" CTA at the top is
// the conversion event.

import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import SharedGraphCanvas from './SharedGraphCanvas';

interface EvidenceRow {
  id: string;
  dimension: string | null;
  source_type: string | null;
  source_ref: string | null;
  source_date: string | null;
  summary: string | null;
  verbatim: string | null;
  speaker_name: string | null;
  deep_link: string | null;
}

interface SharedDecision {
  id: string;
  title: string;
  description: string | null;
  rationale: string | null;
  verdict: string | null;
  status: string | null;
  final_score: number | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  evidence: EvidenceRow[];
}

type RpcResponse =
  | SharedDecision
  | { error: 'not_found' | 'not_shared' | 'expired' };

async function loadSharedDecision(token: string): Promise<RpcResponse | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  const supabase = createClient(url, anon);
  const { data, error } = await supabase.rpc('get_shared_decision', {
    share_token_in: token,
  });
  if (error) {
    console.error('[graph/token] rpc error', error);
    return { error: 'not_found' };
  }
  return data as RpcResponse;
}

const fmtDate = (iso?: string | null): string => {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const verdictTone = (v: string | null | undefined): string => {
  if (!v) return 'bg-slate-100 text-slate-600';
  const lower = v.toLowerCase();
  if (lower.includes('approve') || lower.includes('build') || lower.includes('ship'))
    return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (lower.includes('reject') || lower.includes('kill') || lower.includes('no'))
    return 'bg-rose-50 text-rose-700 border-rose-200';
  return 'bg-amber-50 text-amber-700 border-amber-200';
};

export default async function SharedGraphPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const result = await loadSharedDecision(token);

  // ─── Error states ─────────────────────────────────────────────────────
  if (!result) {
    return <ErrorShell title="Configuration error" body="This server isn't configured to serve shared graphs yet." />;
  }
  if ('error' in result) {
    if (result.error === 'not_found') {
      return (
        <ErrorShell
          title="Link not found"
          body="This share link doesn't point to anything we recognize. Ask the person who sent it to share again."
        />
      );
    }
    if (result.error === 'not_shared') {
      return (
        <ErrorShell
          title="Sharing is turned off"
          body="The owner of this graph has disabled public access. Ask them to re-enable the share link."
        />
      );
    }
    if (result.error === 'expired') {
      return (
        <ErrorShell
          title="Link expired"
          body="This share link has expired. Ask the owner to send a fresh one."
        />
      );
    }
  }

  const decision = result as SharedDecision;
  const evidence = decision.evidence ?? [];

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Top bar — viral CTA on the right */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur">
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/"
              className="text-[15px] font-bold tracking-tight text-slate-900 shrink-0"
            >
              Formeon
            </Link>
            <span className="text-slate-300">·</span>
            <span className="text-[13px] text-slate-500 truncate">
              Viewing <span className="font-medium text-slate-800">{decision.title}</span>
            </span>
            <span
              className="ml-2 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-500"
              style={{ letterSpacing: '0.08em' }}
            >
              Read only
            </span>
          </div>
          <a
            href="https://stealthtechnologies.dev"
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#6B4EFF] text-white text-[13px] font-semibold hover:bg-[#5a3fe6] transition-colors"
          >
            Get Formeon for your team
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </header>

      {/* Decision header */}
      <section className="max-w-[1200px] mx-auto px-6 pt-10 pb-6">
        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-full bg-white border-2 border-[#6B4EFF] flex items-center justify-center shrink-0"
            style={{ boxShadow: '0 4px 16px rgba(99,102,241,0.15)' }}
          >
            <span className="text-[18px] font-bold text-[#6B4EFF]">
              {decision.title
                .trim()
                .split(/\s+/)
                .slice(0, 2)
                .map((w) => w[0])
                .join('')
                .toUpperCase()}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h1
              className="text-[28px] font-bold text-slate-900 leading-tight"
              style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
            >
              {decision.title}
            </h1>
            <div className="mt-2 flex items-center gap-2 flex-wrap text-[12px] text-slate-500">
              <span>Captured {fmtDate(decision.created_at)}</span>
              {decision.verdict && (
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded border ${verdictTone(decision.verdict)}`}
                  style={{ fontSize: 11, fontWeight: 600 }}
                >
                  {decision.verdict}
                </span>
              )}
              {decision.final_score != null && (
                <span className="inline-flex items-center gap-1">
                  <span className="text-slate-400">·</span>
                  Score
                  <span className="font-semibold text-slate-700">
                    {decision.final_score.toFixed(1)}
                  </span>
                </span>
              )}
              <span className="inline-flex items-center gap-1">
                <span className="text-slate-400">·</span>
                {evidence.length} evidence item{evidence.length === 1 ? '' : 's'}
              </span>
            </div>
          </div>
        </div>

        {decision.description && (
          <p className="mt-5 max-w-[760px] text-[14px] text-slate-700 leading-relaxed">
            {decision.description}
          </p>
        )}
      </section>

      {/* Graph */}
      <section className="max-w-[1200px] mx-auto px-6">
        <SharedGraphCanvas
          decisionId={decision.id}
          decisionTitle={decision.title}
          evidence={evidence}
        />
      </section>

      {/* Rationale + evidence list */}
      <section className="max-w-[1200px] mx-auto px-6 pb-20 pt-12 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
        <div>
          {decision.rationale && (
            <div>
              <h2
                className="text-[18px] font-semibold text-slate-900 mb-3"
                style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
              >
                Why this decision
              </h2>
              <p className="text-[14px] text-slate-700 leading-relaxed whitespace-pre-wrap">
                {decision.rationale}
              </p>
            </div>
          )}

          {evidence.length > 0 && (
            <div className="mt-10">
              <h2
                className="text-[18px] font-semibold text-slate-900 mb-3"
                style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
              >
                Evidence
              </h2>
              <div className="space-y-3">
                {evidence.map((ev) => (
                  <div
                    key={ev.id}
                    className="bg-white border border-slate-200 rounded-2xl p-5"
                  >
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      {ev.source_type && <span>{ev.source_type}</span>}
                      {ev.dimension && <span>· {ev.dimension}</span>}
                      {ev.source_date && (
                        <span>· {fmtDate(ev.source_date)}</span>
                      )}
                    </div>
                    {ev.verbatim ? (
                      <blockquote
                        className="mt-3 text-[14px] text-slate-800 leading-relaxed"
                        style={{
                          borderLeft: '3px solid #6B4EFF',
                          paddingLeft: 14,
                        }}
                      >
                        "{ev.verbatim}"
                      </blockquote>
                    ) : ev.summary ? (
                      <p className="mt-3 text-[14px] text-slate-700 leading-relaxed">
                        {ev.summary}
                      </p>
                    ) : null}
                    <div className="mt-3 flex items-center gap-2 text-[12px] text-slate-500">
                      {ev.speaker_name && (
                        <span className="font-medium text-slate-700">
                          {ev.speaker_name}
                        </span>
                      )}
                      {ev.deep_link && (
                        <>
                          {ev.speaker_name && <span className="text-slate-300">·</span>}
                          <a
                            href={ev.deep_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#6B4EFF] hover:underline"
                          >
                            View source
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA sidebar */}
        <aside className="lg:sticky lg:top-24 self-start bg-white border border-slate-200 rounded-2xl p-6">
          <div className="text-[11px] uppercase tracking-wider text-[#6B4EFF] font-semibold">
            Built with Formeon
          </div>
          <h3
            className="mt-2 text-[20px] font-semibold text-slate-900 leading-tight"
            style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
          >
            Your team&apos;s decisions, remembered.
          </h3>
          <p className="mt-3 text-[13px] text-slate-600 leading-relaxed">
            Every proposal, decision, and outcome — captured automatically from
            Slack, Jira, Notion, and meetings. Then turned into an AI advisor
            that recommends what to build next.
          </p>
          <a
            href="https://stealthtechnologies.dev"
            className="mt-5 block w-full text-center py-3 rounded-xl bg-[#6B4EFF] text-white text-[14px] font-semibold hover:bg-[#5a3fe6] transition-colors"
          >
            Get Formeon for your team
          </a>
          <a
            href="https://stealthtechnologies.dev"
            className="mt-2 block w-full text-center py-3 rounded-xl border border-slate-200 text-slate-700 text-[14px] font-medium hover:bg-slate-50 transition-colors"
          >
            See how it works
          </a>
        </aside>
      </section>
    </div>
  );
}

function ErrorShell({ title, body }: { title: string; body: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#FAFAF9]">
      <div className="max-w-md text-center bg-white border border-slate-200 rounded-3xl p-10 shadow-sm">
        <h1
          className="text-[22px] font-semibold text-slate-900"
          style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
        >
          {title}
        </h1>
        <p className="mt-3 text-[14px] text-slate-500 leading-relaxed">{body}</p>
        <Link
          href="/"
          className="mt-6 inline-block text-[13px] font-medium text-[#6B4EFF] hover:underline"
        >
          Back to stealthtechnologies.dev
        </Link>
      </div>
    </div>
  );
}
