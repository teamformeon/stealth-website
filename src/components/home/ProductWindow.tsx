'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { easeOut } from '@/lib/motion';

const sidebar = {
    top: ['Inbox', 'New Chat', 'Meeting Notes', 'Agents'],
    workspace: ['Team Overview', 'Intelligence Feed'],
    projects: ['Enterprise Solutions', 'Growth Strategies', 'Customer Success', 'Streaming and ASR', 'Security Initiatives', 'CRM Integration'],
};

const pulse = [
    { label: 'Meetings today', value: 4 },
    { label: 'New decisions', value: 20 },
    { label: 'New artifacts', value: 264 },
];

const decisions = [
    'In-house transcription for real-time path',
    'Two-pass design for streaming ASR',
    'Chose Gong over Meridian for Riverstone Group',
    'Automate SOC 2 evidence collection',
    'Implement SCIM group sync architecture',
];

const label = 'text-[11px] tracking-[0.08em] text-faint';

const CountUp = ({ to, delay }: { to: number; delay: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true });
    const reduce = useReducedMotion();
    const [n, setN] = useState(0);

    // reduced motion jumps straight to the value after mount (rendering it directly would mismatch SSR)
    useEffect(() => {
        if (!inView) return;
        const controls = animate(0, to, {
            duration: reduce ? 0 : 1.4,
            delay: reduce ? 0 : delay,
            ease: easeOut,
            onUpdate: (v) => setN(Math.round(v)),
        });
        return () => controls.stop();
    }, [inView, reduce, to, delay]);

    return (
        <div ref={ref} className="font-serif text-3xl mt-1.5 tabular-nums">
            {n}
        </div>
    );
};

const CheckIcon = ({ size, width }: { size: number; width: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 6 9 17l-5-5" />
    </svg>
);

const SlackCard = () => (
    <motion.div
        className="fm-float absolute -left-16 top-[120px] z-[3] w-[250px] text-left"
        initial={{ opacity: 0, x: -48, rotate: -10 }}
        animate={{ opacity: 1, x: 0, rotate: -4 }}
        transition={{ duration: 1.1, ease: easeOut, delay: 1.2 }}
    >
        <div className="fm-drift bg-white border border-ink/8 rounded-2xl p-4 shadow-[0_18px_40px_rgba(27,26,24,0.10)]">
            <div className="flex items-center gap-2 text-xs text-subtle">
                <Image src="/logos/slack.svg" alt="Slack" width={16} height={16} />
                #product · 2:14 PM
            </div>
            <div className="text-sm leading-[1.45] mt-2">Let’s go with Gong for Riverstone — Meridian can’t do call summaries yet.</div>
            {/* the "enhance" beat: the message is recognised as a decision a moment after it lands */}
            <motion.div
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-moss bg-moss-tint rounded-full px-2.5 py-1"
                initial={{ opacity: 0, scale: 0.6, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 380, damping: 18, delay: 2.2 }}
            >
                <CheckIcon size={12} width={2.5} />
                Captured as decision
            </motion.div>
        </div>
    </motion.div>
);

const ConflictCard = () => (
    <motion.div
        className="fm-float absolute -right-14 top-[300px] z-[3] w-60 text-left"
        initial={{ opacity: 0, x: 48, rotate: 8 }}
        animate={{ opacity: 1, x: 0, rotate: 3 }}
        transition={{ duration: 1.1, ease: easeOut, delay: 1.6 }}
    >
        <div className="fm-drift bg-white border border-ink/8 rounded-2xl p-4 shadow-[0_18px_40px_rgba(27,26,24,0.10)] [animation-delay:-3s]">
            <div className="flex items-center gap-2 text-xs font-semibold text-alert">
                <span className="relative inline-flex">
                    <span className="fm-ping absolute inset-0 rounded-full bg-signal/40" />
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="relative">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 8v4" />
                        <path d="M12 16h.01" />
                    </svg>
                </span>
                Conflict found
            </div>
            <div className="text-sm leading-[1.45] mt-2">
                CRM team mapped fields differently than <span className="font-semibold">CRM-303</span>. Two specs disagree.
            </div>
        </div>
    </motion.div>
);

const ProductWindow = () => (
    <div id="product" className="relative max-w-[1120px] mx-auto mt-[72px] [perspective:1600px]">
        <SlackCard />
        <ConflictCard />

        <motion.div
            className="relative z-[2] bg-white border border-ink/9 rounded-[20px] shadow-[0_30px_80px_rgba(27,26,24,0.12),0_2px_6px_rgba(27,26,24,0.05)] overflow-hidden text-left origin-top"
            initial={{ opacity: 0, y: 56, rotateX: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            transition={{ duration: 1.3, ease: easeOut, delay: 0.75 }}
        >
            <div className="flex items-center gap-2 px-[18px] py-3.5 border-b border-ink/7 bg-surface">
                <span className="size-3 rounded-full bg-[#EC6A5E]" />
                <span className="size-3 rounded-full bg-[#F4BF4F]" />
                <span className="size-3 rounded-full bg-[#61C554]" />
            </div>
            <div className="flex min-h-[560px]">
                <div className="fm-side w-[230px] shrink-0 bg-sidebar border-r border-ink/7 px-3 py-[18px] flex flex-col gap-1 text-sm text-body">
                    <div className="flex items-center gap-2 px-2 pt-1.5 pb-3.5 font-serif font-semibold text-[15px]">
                        <span className="size-[22px] rounded-md bg-acme text-white font-sans text-xs flex items-center justify-center">A</span>
                        Acme
                    </div>
                    {sidebar.top.map((item) => (
                        <div key={item} className="px-2.5 py-[7px]">{item}</div>
                    ))}
                    <div className="px-2.5 pt-3.5 pb-1.5 text-[11px] tracking-[0.08em] text-faint">WORKSPACE</div>
                    {sidebar.workspace.map((item, i) => (
                        <div key={item} className={i === 0 ? 'px-2.5 py-[7px] bg-selected rounded-lg font-semibold' : 'px-2.5 py-[7px]'}>
                            {item}
                        </div>
                    ))}
                    <div className="px-2.5 pt-3.5 pb-1.5 text-[11px] tracking-[0.08em] text-faint">PROJECTS</div>
                    {sidebar.projects.map((item) => (
                        <div key={item} className="px-2.5 py-1.5">{item}</div>
                    ))}
                </div>

                <div className="flex-auto min-w-0 px-8 py-[30px]">
                    <div className="font-serif text-3xl font-medium">Acme</div>
                    <div className="text-sm text-subtle mt-1">12 members · 16 projects · 7 sources connected</div>
                    <div className={`${label} mt-6 mb-2.5`}>TODAY’S PULSE</div>
                    <div className="grid grid-cols-3 gap-3">
                        {pulse.map((stat, i) => (
                            <div key={stat.label} className="border border-ink/9 rounded-[14px] px-4 py-3.5">
                                <div className="text-[13px] text-subtle">{stat.label}</div>
                                <CountUp to={stat.value} delay={1.3 + i * 0.12} />
                            </div>
                        ))}
                    </div>
                    <div className={`${label} mt-[26px] mb-2.5`}>THIS WEEK ACROSS THE TEAM</div>
                    <motion.div
                        className="border border-ink/9 rounded-[14px] overflow-hidden text-sm"
                        initial="hidden"
                        animate="visible"
                        variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 1.6 } } }}
                    >
                        {decisions.map((d, i) => (
                            <motion.div
                                key={d}
                                variants={{
                                    hidden: { opacity: 0, x: -10 },
                                    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } },
                                }}
                                className={`flex justify-between gap-3 px-4 py-3 ${i < decisions.length - 1 ? 'border-b border-ink/6' : ''}`}
                            >
                                <span>{d}</span>
                                <span className="text-faint whitespace-nowrap">Decision</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    </div>
);

export default ProductWindow;
