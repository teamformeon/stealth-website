'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import type { ConnectApp } from '@/lib/connectApps';

type Status = 'connecting' | 'connected' | 'error';

// Strong ease-out (easing.dev) — the built-in CSS curve is too weak for the entrance.
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/**
 * The OAuth handoff page shown after a provider redirects back to formeon.org.
 * Forwards the auth `code` to the desktop app via its stealth:// deep link, then
 * plays a short connection beat while the app takes over. One component, every
 * connector — see src/lib/connectApps.ts.
 */
export default function ConnectStatus({ app }: { app: ConnectApp }) {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<Status>('connecting');
  const [deepLink, setDeepLink] = useState(app.deepLink);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');
    const state = params.get('state');

    const qs = new URLSearchParams();
    if (code) qs.set('code', code);
    if (error) qs.set('error', error);
    if (state) qs.set('state', state);
    const link = qs.toString() ? `${app.deepLink}?${qs}` : app.deepLink;
    setDeepLink(link);

    if (error) {
      setStatus('error');
      setShowFallback(true);
      return;
    }

    // Hand the code back to the desktop app immediately; the beat below is cosmetic.
    window.location.replace(link);

    const t1 = setTimeout(() => setStatus('connected'), reduce ? 0 : 650);
    const t2 = setTimeout(() => setShowFallback(true), 1600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [app.deepLink, reduce]);

  const isError = status === 'error';
  const headline =
    status === 'connecting'
      ? `Connecting ${app.name}`
      : status === 'connected'
        ? `${app.name} connected`
        : `Couldn't connect ${app.name}`;
  const sub = isError
    ? 'Authorization didn’t complete. Head back to Formeon and try connecting again.'
    : 'Handing you back to the Formeon desktop app…';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#FAFAF8] px-6 font-sans text-[#12141c]">
      <Ambient accent={app.accent} error={isError} />

      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: EASE_OUT }}
        className="relative w-full max-w-[420px] rounded-[24px] border border-black/[0.06] bg-white/80 px-8 pb-7 pt-9 text-center backdrop-blur-xl"
        style={{ boxShadow: '0 1px 3px rgba(28,32,51,0.05), 0 24px 60px rgba(28,32,51,0.10)' }}
      >
        <ConnectVisual app={app} status={status} reduce={!!reduce} />

        <motion.h1
          key={headline}
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="font-serif-display text-[28px] leading-tight tracking-[-0.01em]"
        >
          {headline}
        </motion.h1>

        <p aria-live="polite" className="mx-auto mt-2 max-w-[300px] text-[14px] leading-relaxed text-[#64687a]">
          {sub}
        </p>

        <div className="mt-6 h-[38px]">
          {showFallback && (
            <motion.a
              href={isError ? 'https://formeon.org' : deepLink}
              initial={reduce ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 text-[13.5px] font-medium text-[#12141c] transition-[transform,border-color,background] duration-150 hover:border-[#6366F1]/35 hover:bg-[#fafbff] active:scale-[0.97]"
            >
              {isError ? 'Return to Formeon' : 'Didn’t jump back? Reopen Formeon'}
            </motion.a>
          )}
        </div>

        <div className="mt-6 flex items-center justify-center gap-1.5 text-[11.5px] font-medium tracking-wide text-[#9aa0b0]">
          <LockIcon />
          Secured by Formeon
        </div>
      </motion.div>
    </div>
  );
}

/* ── Ambient background: two soft brand-tinted glows + a faint grain. ───────── */
function Ambient({ accent, error }: { accent: string; error: boolean }) {
  const glow = error ? '#e5484d' : accent;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className="absolute -left-[10%] top-[-15%] h-[520px] w-[520px] rounded-full blur-[120px] animate-glow-pulse"
        style={{ background: glow, opacity: 0.14 }}
      />
      <div
        className="absolute -right-[8%] bottom-[-18%] h-[460px] w-[460px] rounded-full blur-[120px] animate-glow-pulse"
        style={{ background: '#6366F1', opacity: 0.1, animationDelay: '-5s' }}
      />
      {/* Grain — masks the flatness of the glows without reading as texture. */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

/* ── The connection beat: [app] ——packet——▸ [Formeon], resolving to a check. ── */
function ConnectVisual({ app, status, reduce }: { app: ConnectApp; status: Status; reduce: boolean }) {
  const done = status === 'connected';
  const error = status === 'error';
  const badge = error ? '#e5484d' : app.accent;

  return (
    <div className="mb-7 flex items-center justify-center">
      <Tile>
        {app.logo ? (
          <Image src={app.logo} alt={app.name} width={30} height={30} className="h-[30px] w-[30px] object-contain" />
        ) : (
          <span className="text-[19px] font-semibold" style={{ color: app.accent }}>
            {app.name.charAt(0)}
          </span>
        )}
      </Tile>

      {/* Connector track */}
      <div className="relative mx-0 h-[2px] w-[76px]">
        <div className="absolute inset-0 rounded-full bg-[#e6e7ee]" />
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: badge, transformOrigin: 'left center' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: done || error ? 1 : 0 }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
        />
        {/* Traveling packet — only while connecting */}
        {!done && !error && !reduce && (
          <motion.span
            className="absolute h-[9px] w-[9px] rounded-full"
            style={{ top: '50%', y: '-50%', background: app.accent, boxShadow: `0 0 12px ${app.accent}` }}
            initial={{ x: 4, opacity: 0 }}
            animate={{ x: [4, 63, 4], opacity: [0.15, 1, 0.15] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', times: [0, 0.5, 1] }}
          />
        )}
        {/* Resolution badge — blooms at center on success/error */}
        {(done || error) && (
          <motion.div
            className="absolute left-1/2 top-1/2 flex h-[26px] w-[26px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white"
            style={{ background: badge, boxShadow: `0 4px 14px ${badge}55` }}
            initial={reduce ? { opacity: 0 } : { scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={reduce ? { duration: 0.2 } : { type: 'spring', duration: 0.5, bounce: 0.42 }}
          >
            {error ? <AlertIcon /> : <CheckIcon />}
          </motion.div>
        )}
      </div>

      <Tile>
        <Image src="/formeon-logo.png" alt="Formeon" width={30} height={30} className="h-[30px] w-[30px] object-contain" />
      </Tile>
    </div>
  );
}

function Tile({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-[16px] border border-black/[0.06] bg-white"
      style={{ boxShadow: '0 1px 2px rgba(28,32,51,0.05), 0 8px 20px rgba(28,32,51,0.06)' }}
    >
      {children}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <motion.path
        d="M2.5 7.5L5.5 10.5L11.5 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.12 }}
      />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M7 3.5V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="7" cy="10.5" r="1" fill="currentColor" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
      <rect x="2.5" y="5.25" width="7" height="5" rx="1.4" stroke="currentColor" strokeWidth="1.1" />
      <path d="M4 5.25V4a2 2 0 0 1 4 0v1.25" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}
