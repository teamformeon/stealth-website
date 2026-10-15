'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { useInView } from 'framer-motion';
import { Reveal } from './motion';
import { h2Big } from './type';

// Ported 1:1 from the Formeon Website design: the fm-* keyframes in globals.css
// drive a 9s loop — scattered → connected → remembered.

type Vars = React.CSSProperties & { '--x'?: string; '--y'?: string };

const sources = [
    { x: '13%', y: '16%', delay: '0s', bob: undefined, logo: '/logos/slack.svg', size: 24, title: 'Slack · #enterprise', note: '“Can we ship SSO this quarter?”', ping: '0s' },
    { x: '11%', y: '46%', delay: '0.12s', bob: '3.1s', logo: '/logos/jira.svg', size: 24, title: 'Jira · FEAT-284', note: 'No acceptance criteria' },
    { x: '16%', y: '74%', delay: '0.24s', bob: '3s', logo: '/logos/linear.svg', size: 24, title: 'Linear', note: 'Customer call notes' },
    { x: '87%', y: '16%', delay: '0.06s', bob: '3.4s', logo: '/logos/microsoft.svg', size: 22, title: 'Microsoft Teams', note: 'Eng sync — SSO scoped?', ping: '0.4s' },
    { x: '89%', y: '46%', delay: '0.18s', bob: '2.9s', logo: '/logos/gmail.svg', size: 24, title: 'Gmail', note: 'Re: Q3 roadmap — your input?', ping: '0.8s' },
    { x: '84%', y: '74%', delay: '0.3s', bob: '3.2s', logo: '/logos/notion.png', size: 24, title: 'Notion', note: 'Product brief (outdated)' },
];

const problems = [
    { left: '34%', top: '26%', text: 'Decision lost', tone: 'alert', delay: '0s' },
    { left: '57%', top: '62%', text: 'Duplicate work', tone: 'warn', delay: '0.5s' },
    { left: '60%', top: '24%', text: 'Missing context', tone: 'warn', delay: '0.9s' },
    { left: '31%', top: '64%', text: 'Who decided this?', tone: 'alert', delay: '1.2s' },
];

const tones = {
    alert: 'text-alert bg-alert-tint border-alert-line',
    warn: 'text-warn bg-warn-tint border-warn-line',
};

const steps = [
    { label: '1 · Scattered', cls: 'fm-s1 text-alert' },
    { label: '2 · Connected', cls: 'fm-s2 text-moss' },
    { label: '3 · Remembered', cls: 'fm-s3 text-moss' },
];

const rowLabel = 'text-[10.5px] tracking-[0.08em] text-subtle font-semibold';
const rowIcon = 'shrink-0 size-6 rounded-[7px] flex items-center justify-center';

const SourceBadge = ({ s }: { s: (typeof sources)[number] }) => (
    <div className="fm-cf-badge z-[3]" style={{ '--x': s.x, '--y': s.y, animationDelay: s.delay } as Vars}>
        <div
            className="fm-bob relative flex items-center gap-2.5 bg-white border border-ink/8 rounded-xl px-3 py-2.5 shadow-[0_6px_20px_rgba(27,26,24,0.08)] w-[210px] box-border"
            style={{ animationDuration: s.bob }}
        >
            {s.ping && (
                <span className="fm-s1 absolute -top-1 -right-1 size-2.5">
                    <span className="fm-ping absolute inset-0 rounded-full bg-signal" style={{ animationDelay: s.ping }} />
                    <span className="absolute inset-0 rounded-full bg-signal" />
                </span>
            )}
            <Image src={s.logo} alt="" width={s.size} height={s.size} className="shrink-0" />
            <div className="min-w-0">
                <div className="text-xs font-semibold">{s.title}</div>
                <div className="text-[11.5px] text-subtle whitespace-nowrap overflow-hidden text-ellipsis">{s.note}</div>
            </div>
        </div>
    </div>
);

const Hub = () => (
    <div className="fm-cf-hubpos absolute left-1/2 top-[44%] w-0 h-0 z-[4]">
        {/* inline transform, not Tailwind's translate-*: the fm-glow keyframes replace it rather than stacking on it */}
        <div
            className="fm-cf-glow absolute left-0 top-0 size-[140px] rounded-full bg-[radial-gradient(circle,rgba(47,107,79,0.22)_0%,rgba(47,107,79,0)_70%)]"
            style={{ transform: 'translate(-50%,-50%)' }}
        />
        <div className="absolute -left-[110px] -top-[46px] w-[220px] flex flex-col items-center">
            <div className="fm-cf-hub relative size-[92px]">
                <div className="fm-cf-ring absolute inset-0 rounded-3xl border-2 border-moss/45" />
                <div className="absolute inset-0 rounded-3xl bg-white border border-moss/22 shadow-[0_14px_40px_rgba(47,107,79,0.26),0_0_0_8px_rgba(47,107,79,0.07)] flex items-center justify-center">
                    <Image src="/formeon-mark.png" alt="" width={52} height={52} className="object-contain" />
                </div>
            </div>
            <div className="relative h-10 w-[220px] mt-3.5 text-center">
                <div className="fm-s2 absolute inset-0 text-xs font-semibold text-moss">Connecting 6 sources…</div>
                <div className="fm-s3 absolute inset-0">
                    <div className="text-xs font-semibold tracking-[0.08em] uppercase text-moss">Unified memory</div>
                    <div className="text-xs text-subtle mt-0.5">6 sources connected</div>
                </div>
            </div>
        </div>
    </div>
);

const ResultCard = () => (
    <div className="fm-cf-card absolute left-[44%] top-[44%] z-[5] w-[min(400px,50%)] bg-white border border-ink/9 rounded-[18px] shadow-[0_24px_60px_rgba(27,26,24,0.12)] px-5 py-[18px] box-border">
        <div className="flex items-center justify-between gap-2.5">
            <div className="font-serif text-lg font-medium">Enterprise SSO</div>
            <span className="text-[11px] font-semibold text-moss bg-moss-tint rounded-full px-[9px] py-[3px]">Remembered</span>
        </div>
        <div className="fm-r1 mt-3.5 flex gap-3 items-start">
            <span className={`${rowIcon} bg-moss-tint text-moss`}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                </svg>
            </span>
            <div className="min-w-0">
                <div className={rowLabel}>DECISION</div>
                <div className="text-sm font-medium mt-px">Ship SSO for the enterprise tier in Q3</div>
                <div className="flex items-start gap-1.5 mt-1.5">
                    <Image src="/logos/slack.svg" alt="" width={14} height={14} />
                    <Image src="/logos/microsoft.svg" alt="" width={13} height={13} />
                    <Image src="/logos/gmail.svg" alt="" width={14} height={14} />
                </div>
            </div>
        </div>
        <div className="fm-r2 mt-3 pt-3 border-t border-ink/7 flex gap-3 items-start">
            <span className={`${rowIcon} bg-warn-tint text-warn`}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 8v5" />
                    <path d="M12 16h.01" />
                    <circle cx="12" cy="12" r="9" />
                </svg>
            </span>
            <div className="min-w-0">
                <div className={rowLabel}>OPEN QUESTION</div>
                <div className="text-sm font-medium mt-px">FEAT-284 still needs acceptance criteria</div>
            </div>
        </div>
        <div className="fm-r3 mt-3 pt-3 border-t border-ink/7 flex gap-3 items-start">
            <span className={`${rowIcon} bg-info-tint text-info`}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
                    <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
                </svg>
            </span>
            <div className="min-w-0">
                <div className={rowLabel}>LINKED</div>
                <div className="text-sm font-medium mt-px">Customer calls, roadmap thread, Notion brief</div>
            </div>
        </div>
    </div>
);

const ContextFlow = () => {
    const stage = useRef<HTMLDivElement>(null);
    const inView = useInView(stage, { once: true, amount: 0.4 });

    return (
        <section className="px-6 pt-28 pb-6">
            <div className="max-w-[1120px] mx-auto">
                <Reveal>
                    <h2 className={`${h2Big} mx-auto mb-10 max-w-[760px] text-center`}>Product teams lose context every week.</h2>
                </Reveal>
                <div
                    ref={stage}
                    data-play={inView || undefined}
                    aria-hidden="true"
                    className="fm-stage relative h-[500px] rounded-3xl overflow-hidden bg-surface bg-[radial-gradient(circle_at_1px_1px,rgba(47,107,79,0.13)_1px,transparent_0)] bg-[length:28px_28px] border border-ink/7 shadow-[0_8px_40px_rgba(27,26,24,0.05)]"
                >
                    {/* stream lines (connect phase) */}
                    <svg width="100%" height="100%" className="absolute inset-0 z-[1]">
                        {sources.map((s) => (
                            <line key={s.title} className="fm-cf-line" x1={s.x} y1={s.y} x2="50%" y2="44%" stroke="#2F6B4F" strokeWidth="1.5" strokeDasharray="4 6" />
                        ))}
                    </svg>

                    {/* data dots flowing in */}
                    {sources.map((s) => (
                        <span key={s.title} className="fm-cf-dot z-[2]" style={{ '--x': s.x, '--y': s.y, animationDelay: s.delay } as Vars} />
                    ))}

                    {/* what goes wrong (scatter phase) */}
                    {problems.map((p) => (
                        <span key={p.text} className="fm-s1 absolute z-[1]" style={{ left: p.left, top: p.top }}>
                            <span
                                className={`fm-shake text-xs font-semibold border rounded-full px-[11px] py-1 ${tones[p.tone as keyof typeof tones]}`}
                                style={{ animationDelay: p.delay }}
                            >
                                {p.text}
                            </span>
                        </span>
                    ))}

                    {/* source cards (gather one after another) */}
                    {sources.map((s) => (
                        <SourceBadge key={s.title} s={s} />
                    ))}

                    <Hub />
                    <ResultCard />

                    {/* caption + step indicator */}
                    <div className="absolute inset-x-0 bottom-[66px] h-[22px] z-[6] text-center text-[15px] text-body">
                        <div className="fm-s1 absolute inset-0 px-4">Context is scattered across Slack, Jira, Teams, email and docs</div>
                        <div className="fm-s2 absolute inset-0 px-4">Formeon pulls it together — automatically</div>
                        <div className="fm-s3 absolute inset-0 px-4">One company memory — nothing gets lost</div>
                    </div>
                    <div className="absolute left-1/2 bottom-[22px] -translate-x-1/2 z-[6] w-[min(420px,86%)]">
                        <div className="grid grid-cols-3 text-xs font-semibold text-center">
                            {steps.map((step) => (
                                <div key={step.label} className="relative h-[18px]">
                                    <span className="absolute inset-0 text-hush">{step.label}</span>
                                    <span className={`absolute inset-0 ${step.cls}`}>{step.label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-2 h-[3px] rounded-[3px] bg-ink/8 overflow-hidden">
                            <div className="fm-progress h-full bg-moss rounded-[3px]" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContextFlow;
