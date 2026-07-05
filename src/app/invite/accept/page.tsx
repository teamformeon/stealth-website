'use client';

// Invite acceptance page — landing target of the Supabase Auth invite email.
//
// Supabase Auth's `inviteUserByEmail` creates an auth user with no password
// and sends a recovery-style magic link. When the recipient clicks the link
// they land here with an access_token + refresh_token in the URL hash, which
// Supabase-js picks up automatically.
//
// Two branches:
//   New user  → set first/last/password, then promote the pending
//               workspace_members row to active.
//   Existing  → sign in with email + password, then promote membership.
//
// On success: deep-link into the desktop app via stealth://auth/invite-callback.

import { useEffect, useState, type FormEvent } from 'react';
import { createClient } from '@/utils/supabase/client';
import type { SupabaseClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';

interface InviteMeta {
  workspaceId: string;
  workspaceName: string;
  inviterName: string;
  role: 'member' | 'admin';
  /** True if Supabase created a brand-new auth user for this invite. */
  isNew: boolean;
}

type Phase = 'loading' | 'no-invite' | 'signup' | 'signin' | 'joining' | 'done' | 'error';

export default function InviteAcceptPage() {
  const [phase, setPhase] = useState<Phase>('loading');
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<InviteMeta | null>(null);
  const [email, setEmail] = useState<string>('');

  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

  useEffect(() => {
    setSupabase(createClient());
  }, []);

  // 1. Read the session Supabase auto-populated from the invite-email hash.
  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;
    (async () => {
      const { data, error: sessErr } = await supabase.auth.getSession();
      if (cancelled) return;

      if (sessErr) {
        setError(sessErr.message);
        setPhase('error');
        return;
      }

      const session = data.session;
      if (session) {
        hydrateFromSession(session);
        return;
      }

      // The hash exchange can be async on first paint. Listen briefly.
      const { data: sub } = supabase.auth.onAuthStateChange((event, s) => {
        if (event === 'SIGNED_IN' && s) hydrateFromSession(s);
      });
      setTimeout(() => {
        if (phase === 'loading') setPhase('no-invite');
        sub.subscription.unsubscribe();
      }, 2500);
    })();
    return () => {
      cancelled = true;
    };
  }, [supabase]);

  const hydrateFromSession = (session: {
    user: {
      email?: string | null;
      created_at?: string;
      last_sign_in_at?: string | null;
      user_metadata?: Record<string, unknown> | null;
    };
  }) => {
    const md = (session.user.user_metadata ?? {}) as Record<string, unknown>;
    const workspaceId = (md.workspace_id as string | undefined) ?? '';
    const workspaceName = (md.workspace_name as string | undefined) ?? 'their workspace';
    const inviterName = (md.invited_by_name as string | undefined) ?? 'A teammate';
    const roleRaw = (md.role as string | undefined) ?? 'member';
    const role: 'member' | 'admin' = roleRaw === 'admin' ? 'admin' : 'member';

    if (!workspaceId) {
      setPhase('no-invite');
      return;
    }

    // A brand-new invited user has no last_sign_in_at. An existing user being
    // re-invited (rare path — they already have a Formeon account) does.
    const isNew = !session.user.last_sign_in_at;

    setMeta({ workspaceId, workspaceName, inviterName, role, isNew });
    setEmail(session.user.email ?? '');
    setPhase(isNew ? 'signup' : 'signin');
  };

  // ─── Promote membership + hand off to desktop ──────────────────────────
  const finalizeAcceptance = async (userId: string) => {
    if (!meta || !supabase) return;

    const { error: memErr } = await supabase
      .from('workspace_members')
      .update({
        status: 'active',
        joined_at: new Date().toISOString(),
      })
      .eq('workspace_id', meta.workspaceId)
      .eq('user_id', userId)
      .eq('status', 'pending');

    if (memErr) {
      // Non-fatal — they're signed in, just surface to console.
      console.error('[invite] membership update failed', memErr);
    }

    setPhase('done');
    setTimeout(() => {
      window.location.href = 'stealth://auth/invite-callback';
    }, 1200);
  };

  // ─── Signup path (new user) ────────────────────────────────────────────
  const onSignup = async (e: FormEvent) => {
    e.preventDefault();
    if (!meta || !supabase) return;
    if (!firstName.trim()) {
      setError('First name is required.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setError(null);
    setPhase('joining');

    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    const { data: updated, error: pwErr } = await supabase.auth.updateUser({
      password,
      data: {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        full_name: fullName,
      },
    });
    if (pwErr || !updated.user) {
      setError(pwErr?.message ?? 'Could not create account.');
      setPhase('signup');
      return;
    }

    // Best-effort profile row write (RLS allows insert/update of own profile).
    await supabase.from('profiles').upsert({
      id: updated.user.id,
      email: updated.user.email,
      full_name: fullName,
    });

    await finalizeAcceptance(updated.user.id);
  };

  // ─── Sign-in path (returning user) ─────────────────────────────────────
  const onSignin = async (e: FormEvent) => {
    e.preventDefault();
    if (!meta || !supabase) return;
    setError(null);
    setPhase('joining');

    const { data, error: siErr } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (siErr || !data.user) {
      setError(siErr?.message ?? 'Sign-in failed.');
      setPhase('signin');
      return;
    }
    await finalizeAcceptance(data.user.id);
  };

  // ─── Render ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#FAFAF9' }}>
      <AnimatePresence mode="wait">
        {phase === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <div className="w-8 h-8 mx-auto border-2 border-slate-200 border-t-[#6B4EFF] rounded-full animate-spin" />
            <p className="mt-4 text-sm text-slate-500">Verifying your invitation…</p>
          </motion.div>
        )}

        {phase === 'no-invite' && (
          <motion.div
            key="no-invite"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-md text-center bg-white border border-slate-200 rounded-3xl p-10 shadow-sm"
          >
            <FormeonMark />
            <h1 className="mt-6 text-xl font-semibold text-slate-900">
              Invitation link not recognized
            </h1>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed">
              This invitation has expired or already been accepted. Ask the person who
              invited you to send a fresh one from inside Formeon.
            </p>
            <a
              href="https://stealthtechnologies.dev"
              className="mt-6 inline-block text-sm font-medium text-[#6B4EFF] hover:underline"
            >
              Back to Formeon
            </a>
          </motion.div>
        )}

        {(phase === 'signup' || phase === 'signin') && meta && (
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-[460px] bg-white border border-slate-200 rounded-3xl p-10 shadow-[0_30px_60px_rgba(15,23,42,0.06)]"
          >
            <FormeonMark />

            <h1 className="mt-6 text-[20px] font-bold text-slate-900 text-center leading-snug">
              {meta.inviterName} invited you to join{' '}
              <span className="text-[#6B4EFF]">{meta.workspaceName}</span> on Formeon
            </h1>
            <p className="mt-3 text-[13px] text-slate-500 text-center leading-relaxed">
              You&apos;ll have {meta.role === 'admin' ? 'full admin' : 'member'} access to
              every captured decision, proposal, and lesson in this workspace.
            </p>

            {phase === 'signup' ? (
              <form onSubmit={onSignup} className="mt-8 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="First name">
                    <input
                      autoFocus
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Last name">
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={inputCls}
                    />
                  </Field>
                </div>

                <Field label="Email">
                  <input type="email" value={email} disabled className={inputDisabledCls} />
                </Field>

                <Field label="Create a password">
                  <PasswordInput
                    value={password}
                    onChange={setPassword}
                    show={showPassword}
                    onToggle={() => setShowPassword((v) => !v)}
                    placeholder="At least 8 characters"
                  />
                </Field>

                {error && <p className="text-[12px] text-rose-600">{error}</p>}

                <button type="submit" className={purpleBtnCls}>
                  Create Account &amp; Accept
                </button>
              </form>
            ) : (
              <form onSubmit={onSignin} className="mt-8 space-y-4">
                <Field label="Email">
                  <input type="email" value={email} disabled className={inputDisabledCls} />
                </Field>
                <Field label="Password">
                  <PasswordInput
                    value={password}
                    onChange={setPassword}
                    show={showPassword}
                    onToggle={() => setShowPassword((v) => !v)}
                    placeholder="Your Formeon password"
                    autoFocus
                  />
                </Field>

                {error && <p className="text-[12px] text-rose-600">{error}</p>}

                <button type="submit" className={purpleBtnCls}>
                  Sign In &amp; Accept
                </button>
              </form>
            )}

            <p className="mt-6 text-center text-[11px] text-slate-400">
              You&apos;ll be redirected to the Formeon desktop app once you finish.
            </p>
          </motion.div>
        )}

        {phase === 'joining' && (
          <motion.div
            key="joining"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <div className="w-8 h-8 mx-auto border-2 border-slate-200 border-t-[#6B4EFF] rounded-full animate-spin" />
            <p className="mt-4 text-sm text-slate-500">Joining workspace…</p>
          </motion.div>
        )}

        {phase === 'done' && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center max-w-md bg-white border border-slate-200 rounded-3xl p-10 shadow-sm"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-50 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-900">You&apos;re in.</h2>
            <p className="mt-2 text-sm text-slate-500">
              Opening the Formeon desktop app… If it doesn&apos;t launch automatically,
              make sure the app is installed and try the link again.
            </p>
            <a
              href="stealth://auth/invite-callback"
              className="mt-6 inline-block text-[13px] font-medium text-[#6B4EFF] hover:underline"
            >
              Open Formeon manually
            </a>
          </motion.div>
        )}

        {phase === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center max-w-md bg-white border border-slate-200 rounded-3xl p-10 shadow-sm"
          >
            <h1 className="text-xl font-semibold text-slate-900">Something went wrong</h1>
            <p className="mt-3 text-sm text-rose-600">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Local UI helpers ─────────────────────────────────────────────────────

const inputCls =
  'w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6B4EFF]/15 focus:border-[#6B4EFF] transition-all';

const inputDisabledCls =
  'w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500';

const purpleBtnCls =
  'w-full py-3 rounded-lg bg-[#6B4EFF] text-white text-[14px] font-semibold hover:bg-[#5a3fe6] active:scale-[0.99] transition-all';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function PasswordInput({
  value,
  onChange,
  show,
  onToggle,
  placeholder,
  autoFocus,
}: {
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggle: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}) {
  return (
    <div className="relative">
      <input
        autoFocus={autoFocus}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        minLength={8}
        required
        className={`${inputCls} pr-14`}
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-medium text-slate-400 hover:text-slate-700"
      >
        {show ? 'Hide' : 'Show'}
      </button>
    </div>
  );
}

function FormeonMark() {
  return (
    <div className="flex justify-center">
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center"
        style={{ background: 'rgba(107,78,255,0.10)' }}
      >
        <span className="text-[18px] font-bold tracking-tight" style={{ color: '#6B4EFF' }}>
          F
        </span>
      </div>
    </div>
  );
}
