'use client';

import React from 'react';
import { Reveal, Stagger, StaggerItem } from './motion';
import { eyebrow, h2Big } from './type';

const featured = [
    {
        tag: 'Nobody remembers why',
        quote: '“Decisions made in meetings get forgotten — or are never recognized as decisions at all.”',
        who: '— From a discovery call',
        answer: 'Never lose the ‘why’ behind a decision again.',
        dark: true,
    },
    {
        tag: 'Knowledge walks out the door',
        quote: '“30+ days to learn a team. 45–50 days to become productive.”',
        who: '— PM, Fortune 500 fintech',
        answer: 'Get new PMs productive in days, not 50 days.',
        dark: false,
    },
];

const problems = [
    {
        title: 'Teams aren’t aligned, and nobody notices until it breaks.',
        quote: '“Sorting out one launch-date mismatch meant digging through 1,000+ Slack threads and Asana tasks.”',
        who: '— Product manager',
        answer: 'Catch misalignment before it becomes a missed launch.',
    },
    {
        title: 'Context is scattered across too many tools.',
        quote: '“Miro, Slack, email and Jira — cross-referenced by hand, every single day.”',
        who: '— Product leader, global bank',
        answer: 'Every decision’s context, in one place, without changing your tools.',
    },
    {
        title: 'Too much manual admin.',
        quote: '“Jira tickets, repeat questions, historical research, meeting prep, decision write-ups — low-value work.”',
        who: '— PM, Fortune 500 fintech',
        answer: 'Spend your time on product, not paperwork.',
    },
    {
        title: 'Teams rebuild work that’s already been done.',
        quote: '“PMs rebuild features other teams already tried, because they can’t see that work.”',
        who: '— From a discovery call',
        answer: 'Know what’s been tried before you build it again.',
    },
    {
        title: 'PMs can’t see from the PRD through to engineering.',
        quote: '“PRDs become epics by hand, estimates are opaque, and build decisions never flow back into the spec.”',
        who: '— Product manager',
        answer: 'Keep the spec and the build in sync.',
    },
    {
        title: 'Blind spots across teams.',
        quote: '“Unresolved actions, conflicting decisions, emerging blockers — across every team’s meetings.”',
        who: '— From a discovery call',
        answer: 'See the blockers and conflicts no single meeting reveals.',
    },
];

const lift = 'transition-[transform,box-shadow] duration-500 hover:-translate-y-1';

const WhatWeHeard = () => (
    <section id="heard" className="px-6 pt-32 pb-10 scroll-mt-16">
        <div className="max-w-[1120px] mx-auto">
            <Reveal className="text-center">
                <div className={eyebrow}>What we heard</div>
                <h2 className={`${h2Big} mt-3 mx-auto max-w-[780px]`}>We asked product teams what breaks.</h2>
                <p className="mt-[18px] mx-auto max-w-[600px] text-lg leading-[1.55] text-muted">
                    The same eight problems came up again and again. Formeon is built around each one.
                </p>
            </Reveal>

            <Stagger className="flex flex-wrap gap-4 mt-14" gap={0.15}>
                {featured.map((f) => (
                    <StaggerItem key={f.tag} className="flex-[1_1_440px] flex">
                        <figure
                            className={`m-0 w-full rounded-3xl p-[clamp(28px,4vw,44px)] flex flex-col gap-5 ${lift} ${f.dark ? 'bg-ink text-paper hover:shadow-[0_24px_60px_rgba(27,26,24,0.25)]' : 'bg-moss-tint hover:shadow-[0_24px_60px_rgba(47,107,79,0.15)]'}`}
                        >
                            <div className={`text-xs tracking-[0.08em] uppercase font-semibold ${f.dark ? 'text-sage' : 'text-moss'}`}>{f.tag}</div>
                            <blockquote className="m-0 font-serif text-[clamp(24px,2.6vw,32px)] leading-[1.22] tracking-[-0.01em]">{f.quote}</blockquote>
                            <figcaption className={`text-sm ${f.dark ? 'text-dim' : 'text-moss-ink'}`}>{f.who}</figcaption>
                            <div className={`mt-auto pt-5 border-t flex gap-2.5 items-baseline text-lg font-medium ${f.dark ? 'border-paper/14' : 'border-ink/12'}`}>
                                <span className={f.dark ? 'text-sage' : 'text-moss'} aria-hidden="true">→</span>
                                {f.answer}
                            </div>
                        </figure>
                    </StaggerItem>
                ))}
            </Stagger>

            <Stagger className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 mt-4" gap={0.08}>
                {problems.map((p) => (
                    <StaggerItem key={p.title} className="flex">
                        <figure className={`group m-0 w-full bg-white border border-ink/7 rounded-[20px] p-[26px] flex flex-col gap-3.5 ${lift} hover:shadow-[0_18px_44px_rgba(27,26,24,0.08)]`}>
                            <div className="font-serif text-[21px] font-medium leading-[1.2]">{p.title}</div>
                            <blockquote className="m-0 text-[15px] leading-[1.55] text-muted">{p.quote}</blockquote>
                            <figcaption className="text-[13px] text-subtle">{p.who}</figcaption>
                            <div className="mt-auto text-[15px] font-semibold text-moss">
                                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span> {p.answer}
                            </div>
                        </figure>
                    </StaggerItem>
                ))}
            </Stagger>
            <p className="mt-5 text-[13px] text-subtle text-center">Paraphrased from discovery calls with product teams. Shared anonymously.</p>
        </div>
    </section>
);

export default WhatWeHeard;
