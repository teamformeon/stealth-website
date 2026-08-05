'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { PLANS, isPlanId, CHECKOUT_DEEP_LINK, type PlanSpec } from '@/lib/plans';

type Status = 'confirming' | 'confirmed' | 'cancelled';

// Same curve the connector pages use — one motion language across every handoff.
const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const SUCCESS = '#12A150';
const INK_FAINT = '#9aa0b0';

/**
 * The page Stripe returns to after checkout (/checkout-complete).
 *
 * Deliberately the same screen as the OAuth connector handoff — same white card,
 * same tile-track-tile beat, same "Secured by Formeon" footer — because it is the
 * same moment: you finished something in a browser, and the desktop app takes over.
 * Only the LEFT tile changes: a plan mark instead of an app logo, since what was
 * confirmed is a plan.
 *
 * The app's tier is set by the Stripe webhook, not by this page. Nothing here is
 * load-bearing for billing — it is a receipt and a door back.
 */
export default function CheckoutStatus() {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<Status>('confirming');
  const [plan, setPlan] = useState<PlanSpec | null>(null);
  const [deepLink, setDeepLink] = useState(CHECKOUT_DEEP_LINK);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tier = params.get('tier');
    const workspace = params.get('workspace');
    const cancelled = params.get('status') === 'cancelled';

    if (isPlanId(tier)) setPlan(PLANS[tier]);

    const qs = new URLSearchParams();
    if (tier) qs.set('tier', tier);
    if (workspace) qs.set('workspace', workspace);
    const link = qs.toString() ? `${CHECKOUT_DEEP_LINK}?${qs}` : CHECKOUT_DEEP_LINK;
    setDeepLink(link);

    if (cancelled) {
      setStatus('cancelled');
      setShowFallback(true);
      return;
    }

    // Hand back immediately; the beat below is cosmetic.
    window.location.replace(link);

    const t1 = setTimeout(() => setStatus('confirmed'), reduce ? 0 : 650);
    const t2 = setTimeout(() => setShowFallback(true), 1600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduce]);

  const cancelled = status === 'cancelled';
  const planName = plan?.name ?? 'your plan';

  const headline = cancelled
    ? 'Checkout cancelled'
    : status === 'confirming'
      ? 'Confirming your payment'
      : `You're on ${planName}`;

  const sub = cancelled
    ? 'Nothing was charged. Head back to Formeon whenever you’re ready.'
    : status === 'confirming'
      ? 'Handing you back to the Formeon desktop app…'
      : (plan?.unlocked ?? 'Handing you back to the Formeon desktop app…');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-white px-6 font-sans text-[#12141c]">
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: EASE_OUT }}
        className="relative w-full max-w-[420px] rounded-[24px] border border-black/[0.08] bg-white px-8 pb-7 pt-9 text-center"
      >
        <CheckoutVisual plan={plan} status={status} reduce={!!reduce} />

        <motion.h1
          key={headline}
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="font-serif-display text-[28px] leading-tight tracking-[-0.01em]"
        >
          {headline}
        </motion.h1>

        <p
          aria-live="polite"
          className="mx-auto mt-2 max-w-[300px] text-[14px] leading-relaxed text-[#64687a]"
        >
          {sub}
        </p>

        {/* Seat math only once the plan is known and the payment confirmed — a price
            shown next to "Confirming" would be a claim we haven't verified yet. */}
        {plan && status === 'confirmed' && (
          <motion.p
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.1 }}
            className="mt-3 text-[12.5px] text-[#9aa0b0]"
          >
            ${plan.pricePerSeat}
            {plan.priceIsFloor ? '+' : ''} per seat / month · billed to this workspace
          </motion.p>
        )}

        <div className="mt-6 h-[38px]">
          {showFallback && (
            <motion.a
              href={cancelled ? 'https://formeon.org' : deepLink}
              initial={reduce ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 text-[13.5px] font-medium text-[#12141c] transition-[transform,border-color,background] duration-150 hover:border-black/20 hover:bg-[#F7F7F5] active:scale-[0.97]"
            >
              {cancelled ? 'Return to Formeon' : 'Go back to Formeon'}
            </motion.a>
          )}
        </div>

        <div className="mt-6 flex items-center justify-center gap-1.5 text-[11.5px] font-medium tracking-wide text-[#9aa0b0]">
          <LockIcon />
          Secured by Stripe
        </div>
      </motion.div>
    </div>
  );
}

/* ── The confirmation beat: [plan] ——packet——▸ [Formeon], resolving to a check. ── */
function CheckoutVisual({
  plan,
  status,
  reduce,
}: {
  plan: PlanSpec | null;
  status: Status;
  reduce: boolean;
}) {
  const done = status === 'confirmed';
  const cancelled = status === 'cancelled';
  const badge = cancelled ? '#e5484d' : SUCCESS;

  return (
    <div className="mb-7 flex items-center justify-center">
      <Tile>
        {plan ? (
          <Image
            src={plan.icon}
            alt={plan.name}
            width={30}
            height={30}
            className="h-[30px] w-[30px] object-contain"
          />
        ) : (
          <StripeGlyph />
        )}
      </Tile>

      <div className="relative mx-0 h-[2px] w-[76px]">
        <div className="absolute inset-0 rounded-full bg-[#e6e7ee]" />
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: badge, transformOrigin: 'left center' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: done || cancelled ? 1 : 0 }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
        />
        {!done && !cancelled && !reduce && (
          <motion.span
            className="absolute h-[9px] w-[9px] rounded-full"
            style={{ top: '50%', y: '-50%', background: INK_FAINT, boxShadow: `0 0 12px ${INK_FAINT}55` }}
            initial={{ x: 4, opacity: 0 }}
            animate={{ x: [4, 63, 4], opacity: [0.15, 1, 0.15] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', times: [0, 0.5, 1] }}
          />
        )}
        {(done || cancelled) && (
          <motion.div
            className="absolute left-1/2 top-1/2 flex h-[26px] w-[26px] items-center justify-center rounded-full text-white"
            // x/y go through Motion, not Tailwind's -translate-x-1/2: Motion writes
            // its own inline `transform` for `scale`, which silently overwrites a
            // transform set by class. The badge then anchors by its top-left corner
            // and sits 13px — half its size — low and right of the track centre.
            style={{ background: badge, boxShadow: `0 4px 14px ${badge}55`, x: '-50%', y: '-50%' }}
            initial={reduce ? { opacity: 0 } : { scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={reduce ? { duration: 0.2 } : { type: 'spring', duration: 0.5, bounce: 0.42 }}
          >
            {cancelled ? <AlertIcon /> : <CheckIcon />}
          </motion.div>
        )}
      </div>

      <Tile>
        <Image
          src="/formeon-mark.png"
          alt="Formeon"
          width={30}
          height={30}
          className="h-[30px] w-[30px] object-contain"
        />
      </Tile>
    </div>
  );
}

function Tile({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-[16px] border border-black/[0.09] bg-white">
      {children}
    </div>
  );
}

/** Fallback when Stripe returns without a recognisable tier. */
function StripeGlyph() {
  return (
    <span className="text-[15px] font-semibold tracking-tight text-[#635BFF]">stripe</span>
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
