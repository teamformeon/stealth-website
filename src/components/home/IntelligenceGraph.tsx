'use client';

import React from 'react';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { easeOut, viewport } from '@/lib/motion';

const svgProps = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const;

const MicIcon = () => (
    <svg width="18" height="18" {...svgProps}>
        <rect x="9" y="3" width="6" height="11" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0" />
        <path d="M12 18v3" />
    </svg>
);

const DocIcon = () => (
    <svg width="18" height="18" {...svgProps}>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6" />
        <path d="M9 17h6" />
    </svg>
);

// Source colours are data colours (one per tool), so they live with the data.
const hubs = [
    { left: '56%', top: '24%', ring: '#5B84E6', label: 'Jira · 2', icon: <Image src="/logos/jira.svg" alt="" width={20} height={20} /> },
    { left: '30%', top: '40%', ring: '#5FAF7A', label: 'Meeting Notes · 2', icon: <span className="text-[#3E8E5A]"><MicIcon /></span> },
    { left: '76%', top: '50%', ring: '#9B6597', label: 'Slack · 1', icon: <Image src="/logos/slack.svg" alt="" width={20} height={20} /> },
    { left: '36%', top: '78%', ring: '#6E7AA6', label: 'Confluence · 5', icon: <Image src="/logos/confluence.svg" alt="" width={20} height={20} /> },
    { left: '64%', top: '80%', ring: '#7FA3E8', label: 'Google Docs · 1', icon: <span className="text-[#3F6FD1]"><DocIcon /></span> },
];

const flows = [
    { d: 'M56 24 Q 52 40 50 56', stroke: '#5B84E6' },
    { d: 'M30 40 Q 44 36 50 56', stroke: '#5FAF7A' },
    { d: 'M76 50 Q 62 42 50 56', stroke: '#9B6597' },
    { d: 'M36 78 Q 38 60 50 56', stroke: '#6E7AA6' },
    { d: 'M64 80 Q 60 62 50 56', stroke: '#7FA3E8' },
];

const links = [
    'M47 12 Q 52 16 56 24', 'M67 14 Q 60 18 56 24', 'M16 14 Q 26 26 30 40', 'M12 36 Q 22 40 30 40', 'M88 34 Q 82 44 76 50',
    'M14 64 Q 26 72 36 78', 'M14 88 Q 26 82 36 78', 'M40 92 Q 37 86 36 78', 'M84 90 Q 72 86 64 80',
];

const cards = [
    { left: '47%', top: '12%', border: '#C9D6F5', src: 'Jira', date: 'Apr 8', title: 'LIVE-127: Latency budget and load test' },
    { left: '67%', top: '14%', border: '#C9D6F5', src: 'Jira', date: 'Apr 7', title: 'LIVE-110: Streaming ASR architecture' },
    { left: '16%', top: '14%', border: '#CFE6D6', src: 'Meeting Notes', date: 'Apr 8', title: 'Incident Retrospective — PLAT-88 OOM' },
    { left: '12%', top: '36%', border: '#CFE6D6', src: 'Meeting Notes', date: 'Oct 2', title: 'Real-Time Platform Sync' },
    { left: '88%', top: '32%', border: '#E5D2E4', src: 'Slack', date: 'Apr 7', title: '#asr-eng — latency budget agreed' },
    { left: '14%', top: '64%', border: '#D3D8EA', src: 'Confluence', date: 'Apr 7', title: 'Decision Log — ML Architecture' },
    { left: '14%', top: '88%', border: '#D3D8EA', src: 'Confluence', date: '6d ago', title: 'Transcription Platform Strategy' },
    { left: '40%', top: '92%', border: '#D3D8EA', src: 'Confluence', date: 'Apr 7', title: 'Streaming ASR Architecture RFC' },
    { left: '84%', top: '90%', border: '#D3DEF6', src: 'Google Docs', date: 'Mar 20', title: 'GPU Infrastructure — PLAT-86 A100' },
];

// The map assembles from the middle out: project → sources → artifacts.
const pop = (delay: number): Variants => ({
    hidden: { opacity: 0, scale: 0.6 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20, delay } },
});
const fade = (delay: number): Variants => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: easeOut, delay } },
});

const node = 'absolute -translate-x-1/2 -translate-y-1/2 z-[2]';

const Toolbar = () => (
    <div className="flex flex-wrap gap-3 items-center justify-between px-[18px] py-3.5 border-b border-ink/7">
        <div className="flex items-center gap-2.5 border border-ink/10 rounded-[10px] px-3 py-[7px] text-sm font-medium">
            <span className="size-6 rounded-full bg-sidebar text-[10px] font-semibold flex items-center justify-center">SA</span>
            Streaming and ASR Development
            <svg width="14" height="14" {...svgProps} className="text-subtle">
                <path d="m6 9 6 6 6-6" />
            </svg>
        </div>
        <div className="fm-hide-sm flex gap-2 items-center text-[13px]">
            <span className="inline-flex border border-ink/10 rounded-[9px] overflow-hidden">
                <span className="bg-moss text-white px-3 py-1.5 font-medium">Source</span>
                <span className="px-3 py-1.5 text-muted">Theme</span>
            </span>
            <span className="border border-ink/10 rounded-[9px] px-3 py-1.5 text-body">Sync</span>
            <span className="border border-ink/10 rounded-[9px] px-3 py-1.5 text-body">Re-cluster</span>
        </div>
    </div>
);

const IntelligenceGraph = () => (
    <div className="mt-9 bg-white border border-ink/9 rounded-3xl shadow-[0_24px_60px_rgba(27,26,24,0.08)] overflow-hidden">
        <Toolbar />
        <motion.div
            className="relative h-[500px] bg-surface bg-[radial-gradient(circle_at_1px_1px,rgba(27,26,24,0.07)_1px,transparent_0)] bg-[length:24px_24px]"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
        >
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%" className="absolute inset-0" aria-hidden="true">
                {flows.map((f, i) => (
                    <motion.path key={f.d} variants={fade(0.35 + i * 0.08)} className="fm-flow" d={f.d} fill="none" stroke={f.stroke} strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
                ))}
                {links.map((d, i) => (
                    <motion.path key={d} variants={fade(0.9 + i * 0.05)} d={d} fill="none" stroke="#D6D3CC" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                ))}
            </svg>

            {/* centre node */}
            <motion.div variants={pop(0)} className={`${node} left-1/2 top-[56%] flex flex-col items-center gap-1.5`}>
                <div className="relative size-12">
                    <div className="fm-pulse absolute inset-0 rounded-full border-2 border-signal/50" />
                    <div className="absolute inset-0 rounded-full bg-white border-2 border-signal flex items-center justify-center text-signal">
                        <svg width="20" height="20" {...svgProps}>
                            <path d="M4 10v4" />
                            <path d="M8 7v10" />
                            <path d="M12 4v16" />
                            <path d="M16 7v10" />
                            <path d="M20 10v4" />
                        </svg>
                    </div>
                </div>
                <div className="text-xs font-semibold bg-surface/90 px-1.5 py-px rounded whitespace-nowrap">Streaming and ASR Dev…</div>
            </motion.div>

            {hubs.map((h, i) => (
                <motion.div key={h.label} variants={pop(0.25 + i * 0.1)} className={`${node} flex flex-col items-center gap-1`} style={{ left: h.left, top: h.top }}>
                    <motion.div
                        whileHover={{ scale: 1.12 }}
                        className="size-[42px] rounded-full bg-white border-2 flex items-center justify-center"
                        style={{ borderColor: h.ring }}
                    >
                        {h.icon}
                    </motion.div>
                    <div className="text-[11px] text-muted">{h.label}</div>
                </motion.div>
            ))}

            {cards.map((c, i) => (
                <motion.div
                    key={c.title}
                    variants={pop(0.8 + i * 0.07)}
                    className={`fm-hide-sm ${node} w-[158px] bg-white border rounded-lg px-2.5 py-[7px] shadow-[0_2px_8px_rgba(27,26,24,0.05)] transition-shadow hover:shadow-[0_10px_24px_rgba(27,26,24,0.10)]`}
                    style={{ left: c.left, top: c.top, borderColor: c.border }}
                >
                    <div className="flex justify-between text-[10px] text-faint">
                        <span>{c.src}</span>
                        <span>{c.date}</span>
                    </div>
                    <div className="text-[11.5px] font-medium leading-[1.3] mt-0.5">{c.title}</div>
                </motion.div>
            ))}
        </motion.div>
    </div>
);

export default IntelligenceGraph;
