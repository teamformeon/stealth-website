'use client';

import React from 'react';
import { Reveal, Stagger, StaggerItem } from './motion';

const icon = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const;

const props = [
    {
        title: 'Reads back three months',
        body: 'The moment you connect a tool, Formeon starts learning what your team has built, decided and tried.',
        icon: (
            <svg {...icon}>
                <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
                <path d="M3 3v5h5" />
                <path d="M12 7v5l3 2" />
            </svg>
        ),
    },
    {
        title: 'Organised into projects',
        body: 'Epics, channels, threads and docs are grouped automatically. Rename, merge or add — it keeps refining.',
        icon: (
            <svg {...icon}>
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
        ),
    },
    {
        title: 'Private by default',
        body: 'Sign in with Google or Microsoft. [Add your data-handling and retention commitments here.]',
        icon: (
            <svg {...icon}>
                <rect x="4" y="11" width="16" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
        ),
    },
];

const ValueProps = () => (
    <section className="px-6 pt-20 pb-10">
        <div className="max-w-[1120px] mx-auto">
            <Reveal>
                <h2 className="m-0 mb-10 font-serif font-medium text-[clamp(30px,3.6vw,42px)] tracking-[-0.02em] text-center">
                    Connect once. Remembered forever.
                </h2>
            </Reveal>
            <Stagger className="flex flex-wrap gap-5">
                {props.map((p) => (
                    <StaggerItem key={p.title} className="group flex-[1_1_300px] flex gap-3.5 items-start">
                        <span className="shrink-0 size-10 rounded-xl bg-moss-tint text-moss flex items-center justify-center transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                            {p.icon}
                        </span>
                        <div>
                            <div className="font-semibold text-[17px]">{p.title}</div>
                            <div className="text-muted text-[15px] leading-normal mt-1">{p.body}</div>
                        </div>
                    </StaggerItem>
                ))}
            </Stagger>
        </div>
    </section>
);

export default ValueProps;
