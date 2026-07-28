// Registry for the desktop OAuth handoff pages (/slack-callback, /jira-callback, …).
//
// Each connector's callback page is IDENTICAL except for the values below — the
// shared <ConnectStatus> component renders from this record. Add a connector by
// adding a row here and a two-line route under src/app/<id>-callback/page.tsx.
//
// `deepLink` MUST match the stealth:// route the desktop app handles in
// src/main/index.ts (handleSlackAuth / handleJiraAuth / …). The page forwards the
// OAuth `code`/`error`/`state` to it so the desktop app can finish the exchange.

export type ConnectAppId = 'slack' | 'jira' | 'confluence' | 'linear';

export interface ConnectApp {
  id: ConnectAppId;
  /** Display name shown in the headline ("Slack connected"). */
  name: string;
  /** Logo under /public. Omit to fall back to a lettermark tile. */
  logo?: string;
  /** stealth:// target the desktop app listens for (must match src/main/index.ts). */
  deepLink: string;
}

// NOTE: there is deliberately no per-app `accent`. Every callback page is the
// same white screen and the LOGO is the only thing that differs — a brand-tinted
// glow per connector made each one look like a different product.

export const CONNECT_APPS: Record<ConnectAppId, ConnectApp> = {
  slack: {
    id: 'slack',
    name: 'Slack',
    logo: '/logos/slack.svg',
    deepLink: 'stealth://slack-callback',
  },
  jira: {
    id: 'jira',
    name: 'Jira',
    logo: '/logos/jira.svg',
    deepLink: 'stealth://auth/jira',
  },
  confluence: {
    id: 'confluence',
    name: 'Confluence',
    logo: '/logos/confluence.svg',
    deepLink: 'stealth://auth/confluence',
  },
  linear: {
    id: 'linear',
    name: 'Linear',
    logo: '/logos/linear.svg',
    deepLink: 'stealth://linear-callback',
  },
};
