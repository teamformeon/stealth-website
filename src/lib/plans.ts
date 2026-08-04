// Registry for the post-payment handoff page (/checkout-complete).
//
// Sibling to connectApps.ts: same idea, different event. Stripe redirects here with
// ?status=success&tier=<id>&workspace=<ws_...>, and the page hands the browser back
// to the desktop app over the stealth:// deep link.
//
// The plan icons replace the connector logo in the left tile — the thing being
// confirmed is a plan, not an app, so the mark should say which one.

export type PlanId = 'starter' | 'growth' | 'scale';

export interface PlanSpec {
  id: PlanId;
  name: string;
  /** Icon under /public/logos — the stacked-bar family, one bar per tier. */
  icon: string;
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
    icon: '/logos/plan-starter.svg',
    pricePerSeat: 39,
    unlocked: 'Unlimited capture and every agent finding unlocked.',
  },
  growth: {
    id: 'growth',
    name: 'Growth',
    icon: '/logos/plan-growth.svg',
    pricePerSeat: 69,
    unlocked: 'Audience briefs, priority models, and workspace calibration.',
  },
  scale: {
    id: 'scale',
    name: 'Scale',
    icon: '/logos/plan-scale.svg',
    pricePerSeat: 79,
    priceIsFloor: true,
    unlocked: 'SSO/SAML, org-wide controls, and dedicated support.',
  },
};

export const isPlanId = (v: string | null): v is PlanId =>
  v === 'starter' || v === 'growth' || v === 'scale';

/** Where the desktop app listens for the post-checkout handoff. */
export const CHECKOUT_DEEP_LINK = 'stealth://checkout-complete';
