// Registry for the post-payment handoff page (/checkout-complete).
//
// Sibling to connectApps.ts: same idea, different event. Stripe redirects here with
// ?status=success&tier=<id>&workspace=<ws_...>, and the page hands the browser back
// to the desktop app over the stealth:// deep link.
//
// The left tile shows STRIPE, not the plan: the plan is named in the headline, and
// the stacked-bar plan glyphs read as a loading skeleton at tile size. What remains
// here is the copy and the price shown after confirmation.

export type PlanId = 'starter' | 'growth' | 'scale';

export interface PlanSpec {
  id: PlanId;
  name: string;
  /** Dollars per seat per month. Must match src/renderer/lib/pricing.ts in the app. */
  pricePerSeat: number;
  /** True when the price is a floor ("$79+") rather than the price. */
  priceIsFloor?: boolean;
  /** One line on what just got unlocked. Kept short — this screen is a handoff. */
  unlocked: string;
}

export const PLANS: Record<PlanId, PlanSpec> = {
  starter: {
    id: 'starter',
    name: 'Starter',
    pricePerSeat: 39,
    unlocked: 'Unlimited capture and every agent finding unlocked.',
  },
  growth: {
    id: 'growth',
    name: 'Growth',
    pricePerSeat: 69,
    unlocked: 'Audience briefs, priority models, and workspace calibration.',
  },
  scale: {
    id: 'scale',
    name: 'Scale',
    pricePerSeat: 79,
    priceIsFloor: true,
    unlocked: 'SSO/SAML, org-wide controls, and dedicated support.',
  },
};

export const isPlanId = (v: string | null): v is PlanId =>
  v === 'starter' || v === 'growth' || v === 'scale';

/** Where the desktop app listens for the post-checkout handoff. */
export const CHECKOUT_DEEP_LINK = 'stealth://checkout-complete';
