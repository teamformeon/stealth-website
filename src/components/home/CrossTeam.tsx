'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { easeOut, springSnappy, viewport } from '@/lib/motion';

const pills = [
    { label: '2 Conflicts', cls: 'bg-alert-tint text-alert' },
    { label: '1 Stale', cls: 'bg-warn-tint text-warn' },
    { label: '3 Alignment', cls: 'bg-info-tint text-info' },
];

const findings = [
    { title: 'HubSpot field mapping disagrees with CRM-303', teams: 'CRM Integration ↔ Salesforce Integration' },
    { title: 'Dynamic batching rollback not reflected in ML Platform spec', teams: 'Infrastructure ↔ ML Platform Development' },
    { title: 'Two teams are scoping diarization separately', teams: 'Conversational AI ↔ Streaming and ASR' },
];

const CrossTeam = () => (
    <motion.div
        className="relative bg-white rounded-2xl border border-ink/8 p-[22px] shadow-[0_10px_30px_rgba(27,26,24,0.06)] overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
    >
        {/* agents sweeping the workspace */}
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 overflow-hidden">
            <div className="fm-scan h-full w-1/2 bg-[linear-gradient(90deg,transparent,rgba(47,107,79,0.55),transparent)]" />
        </div>
        <div className="text-[11px] tracking-[0.08em] text-faint">CROSS-TEAM INTELLIGENCE</div>
        <div className="flex flex-wrap gap-2 mt-3 text-[13px] font-medium">
            {pills.map((p) => (
                <motion.span
                    key={p.label}
                    variants={{ hidden: { opacity: 0, scale: 0.7 }, visible: { opacity: 1, scale: 1, transition: springSnappy } }}
                    className={`rounded-full px-3 py-[5px] ${p.cls}`}
                >
                    {p.label}
                </motion.span>
            ))}
        </div>
        <div className="mt-3.5 flex flex-col gap-2.5 text-sm leading-[1.45]">
            {findings.map((f) => (
                <motion.div
                    key={f.title}
                    variants={{ hidden: { opacity: 0, x: 24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easeOut } } }}
                    className="border border-ink/8 rounded-xl px-3.5 py-3 transition-[border-color,transform] duration-300 hover:border-ink/16 hover:-translate-y-0.5"
                >
                    <div className="font-semibold">{f.title}</div>
                    <div className="text-subtle mt-0.5">{f.teams}</div>
                </motion.div>
            ))}
        </div>
    </motion.div>
);

export default CrossTeam;
