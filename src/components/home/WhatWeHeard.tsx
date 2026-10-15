'use client';

import React from 'react';
import Image from 'next/image';
import { Reveal, Stagger, StaggerItem } from './motion';
import { eyebrow, h2Big } from './type';

const marks = [
    { name: 'PayPal', logo: '/logos/paypal.png', w: 1024, h: 284, display: 28 },
    { name: 'J.P. Morgan', logo: '/logos/jpmorgan.png', w: 745, h: 152, display: 26 },
    { name: 'Asana', logo: '/logos/asana.png', w: 809, h: 160, display: 26 },
    { name: 'ElevenLabs', logo: '/logos/elevenlabs.png', w: 1988, h: 257, display: 22 },
    { name: 'Expedia', logo: '/logos/expedia.png', w: 796, h: 160, display: 26 },
    { name: 'Oracle', logo: '/logos/oracle.png', w: 923, h: 120, display: 18 },
];

const featured = [
    {
        company: 'J.P. Morgan',
        logo: '/logos/jpmorgan.png',
        w: 745,
        h: 152,
        display: 32,
        person: 'Akil',
        role: 'Head of product',
        quote: '“Alignment across distributed teams is the biggest recurring issue.”',
        answer: 'Catch misalignment before it becomes a missed launch.',
        dark: false,
    },
    {
        company: 'ElevenLabs',
        logo: '/logos/elevenlabs.png',
        w: 1988,
        h: 257,
        display: 24,
        person: 'Jonathan',
        role: 'Product manager',
        quote: '“Decisions made in meetings get forgotten — or are never recognized as decisions at all.”',
        answer: 'Never lose the ‘why’ behind a decision again.',
        dark: false,
    },
];

const problems = [
    {
        company: 'PayPal',
        logo: '/logos/paypal.png',
        w: 1024,
        h: 284,
        display: 22,
        person: '',
        role: 'Product manager',
        quote: '“30+ days to learn a team. 45–50 days to become productive.”',
        answer: 'Get new PMs productive in days, not 50 days.',
    },
    {
        company: 'Asana',
        logo: '/logos/asana.png',
        w: 809,
        h: 160,
        display: 22,
        person: 'Adam',
        role: 'Growth PM',
        quote: '“One launch-date mismatch meant digging through 1,000+ Slack threads and tasks.”',
        answer: 'Catch misalignment before it becomes a missed launch.',
    },
    {
        company: 'Expedia',
        logo: '/logos/expedia.png',
        w: 796,
        h: 160,
        display: 22,
        person: 'Brian',
        role: 'Product manager',
        quote: '“PMs rebuild features other teams already tried, because they can’t see that work.”',
        answer: 'Know what’s been tried before you build it again.',
    },
    {
        company: 'Oracle',
        logo: '/logos/oracle.png',
        w: 923,
        h: 120,
        display: 16,
        person: 'Narutam',
        role: 'Product manager',
        quote: '“Context gets lost between cross-functional teams.”',
        answer: 'Every decision’s context, in one place.',
    },
];

const lift = 'transition-[transform,box-shadow] duration-500 hover:-translate-y-1';

const Mark = ({ name, logo, w, h, display }: { name: string; logo: string; w: number; h: number; display: number }) => (
    <Image src={logo} alt={name} width={w} height={h} quality={100} className="w-auto self-start" style={{ height: display }} />
);

const WhatWeHeard = () => (
    <section id="heard" className="px-6 pt-16 pb-6 scroll-mt-16">
        <div className="max-w-[1120px] mx-auto">
            <Reveal className="text-center">
                <div className={eyebrow}>From discovery calls</div>
                <h2 className={`${h2Big} mt-3 mx-auto max-w-[820px]`}>Product teams already told us what breaks.</h2>
            </Reveal>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-ink">
                {marks.map((m) => (
                    <Image key={m.name} src={m.logo} alt={m.name} width={m.w} height={m.h} quality={100} style={{ height: m.display, width: 'auto' }} />
                ))}
            </div>

            <Stagger className="flex flex-wrap gap-4 mt-10" gap={0.12}>
                {featured.map((f) => (
                    <StaggerItem key={f.company} className="flex-[1_1_440px] flex">
                        <figure
                            className={`m-0 w-full rounded-3xl p-[clamp(28px,4vw,44px)] flex flex-col gap-5 ${lift} ${f.dark ? 'bg-ink text-paper hover:shadow-[0_24px_60px_rgba(27,26,24,0.25)]' : 'bg-white border border-ink/8 hover:shadow-[0_24px_60px_rgba(27,26,24,0.08)]'}`}
                        >
                            <Mark name={f.company} logo={f.logo} w={f.w} h={f.h} display={f.display} />
                            <blockquote className="m-0 font-serif text-[clamp(26px,2.8vw,34px)] leading-[1.18] tracking-[-0.02em]">{f.quote}</blockquote>
                            <figcaption className={`text-sm ${f.dark ? 'text-dim' : 'text-subtle'}`}>{f.person ? `${f.person}, ${f.role}` : f.role}</figcaption>
                            <div className={`mt-auto pt-5 border-t text-lg font-medium ${f.dark ? 'border-paper/14' : 'border-ink/10'}`}>
                                {f.answer}
                            </div>
                        </figure>
                    </StaggerItem>
                ))}
            </Stagger>

            <Stagger className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 mt-4" gap={0.08}>
                {problems.map((p) => (
                    <StaggerItem key={p.company} className="flex">
                        <figure className={`group m-0 w-full bg-white border border-ink/7 rounded-[20px] p-6 flex flex-col gap-3.5 ${lift} hover:shadow-[0_18px_44px_rgba(27,26,24,0.08)]`}>
                            <Mark name={p.company} logo={p.logo} w={p.w} h={p.h} display={p.display} />
                            <blockquote className="m-0 text-[15px] leading-[1.5] text-muted">{p.quote}</blockquote>
                            <figcaption className="text-[13px] text-subtle">{p.person ? `${p.person}, ${p.role}` : p.role}</figcaption>
                            <div className="mt-auto text-[15px] font-semibold text-moss">{p.answer}</div>
                        </figure>
                    </StaggerItem>
                ))}
            </Stagger>
        </div>
    </section>
);

export default WhatWeHeard;
