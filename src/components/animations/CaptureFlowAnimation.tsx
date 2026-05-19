'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ease, useReducedMotion } from './shared';

type Phase = 'scatter' | 'condense' | 'unified';

const PHASE_MS = { scatter: 2200, condense: 2400, unified: 2800 } as const;

const sources = [
    {
        id: 'slack',
        name: 'Slack',
        brand: '#4A154B',
        glyph: 'S',
        x: 10,
        y: 18,
        snippet: 'SSO request from enterprise…',
    },
    {
        id: 'jira',
        name: 'Jira',
        brand: '#0052CC',
        glyph: 'J',
        x: 8,
        y: 58,
        snippet: 'FEAT-284 — no acceptance criteria',
    },
    {
        id: 'microsoft',
        name: 'Microsoft',
        brand: '#00A4EF',
        glyph: '⊞',
        x: 86,
        y: 16,
        snippet: 'Teams · Engineering sync notes',
        useLogo: true,
    },
    {
        id: 'gmail',
        name: 'Gmail',
        brand: '#EA4335',
        glyph: 'M',
        x: 88,
        y: 50,
        snippet: 'Re: Q3 roadmap — your input?',
    },
    {
        id: 'notion',
        name: 'Notion',
        brand: '#191919',
        glyph: 'N',
        x: 78,
        y: 78,
        snippet: 'Product brief (outdated)',
    },
    {
        id: 'linear',
        name: 'Linear',
        brand: '#5E6AD2',
        glyph: 'L',
        x: 12,
        y: 80,
        snippet: 'Customer call notes',
    },
] as const;

const CENTER = { x: 50, y: 46 };

const captions: Record<Phase, string> = {
    scatter: 'Context scattered across Slack, Jira, Microsoft, email, and docs',
    condense: 'Formeon pulls it together — automatically',
    unified: 'One company memory — nothing gets lost',
};

function AppBadge({
    source,
    phase,
    index,
}: {
    source: (typeof sources)[number];
    phase: Phase;
    index: number;
}) {
    const condensing = phase === 'condense' || phase === 'unified';
    const hidden = phase === 'unified';

    return (
        <motion.div
            className="absolute z-20 flex flex-col items-center gap-1.5"
            style={{ left: `${source.x}%`, top: `${source.y}%` }}
            initial={false}
            animate={{
                left: condensing ? `${CENTER.x}%` : `${source.x}%`,
                top: condensing ? `${CENTER.y}%` : `${source.y}%`,
                x: condensing ? '-50%' : '-50%',
                y: condensing ? '-50%' : '-50%',
                scale: hidden ? 0 : condensing ? 0.35 : 1,
                opacity: hidden ? 0 : 1,
                filter: condensing ? 'blur(2px)' : 'blur(0px)',
            }}
            transition={{
                duration: phase === 'condense' ? 1.05 : 0.5,
                delay: phase === 'condense' ? index * 0.07 : 0,
                ease,
            }}
        >
            <motion.div
                className="flex items-center gap-2 px-2.5 py-2 bg-white rounded-xl border border-black/[0.08] shadow-[0_4px_16px_rgba(0,0,0,0.08)] min-w-[140px] max-w-[168px]"
                animate={
                    phase === 'scatter'
                        ? { y: [0, -4, 0], boxShadow: ['0 4px 16px rgba(0,0,0,0.08)', '0 6px 20px rgba(0,0,0,0.1)', '0 4px 16px rgba(0,0,0,0.08)'] }
                        : {}
                }
                transition={{ repeat: phase === 'scatter' ? Infinity : 0, duration: 2.8 + index * 0.2, ease: 'easeInOut' }}
            >
                <motion.div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white text-xs font-bold"
                    style={{
                        backgroundColor:
                            'useLogo' in source && source.useLogo ? '#ffffff' : source.brand,
                        border: 'useLogo' in source && source.useLogo ? '1px solid #e5e7eb' : undefined,
                    }}
                >
                    {'useLogo' in source && source.useLogo ? (
                        <Image src="/logos/microsoft.svg" alt="" width={20} height={20} />
                    ) : (
                        source.glyph
                    )}
                </motion.div>
                <div className="min-w-0 text-left">
                    <p className="text-[10px] font-semibold text-slate-800">{source.name}</p>
                    <p className="text-[9px] text-slate-500 truncate leading-tight">{source.snippet}</p>
                </div>
            </motion.div>
        </motion.div>
    );
}

function StreamLines({ phase }: { phase: Phase }) {
    const show = phase === 'condense';
    return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" aria-hidden>
            {sources.map((s, i) => {
                const x1 = `${s.x}%`;
                const y1 = `${s.y}%`;
                const x2 = `${CENTER.x}%`;
                const y2 = `${CENTER.y}%`;
                return (
                    <motion.line
                        key={s.id}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="url(#stream-gradient)"
                        strokeWidth="1.5"
                        strokeDasharray="4 6"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={
                            show
                                ? { pathLength: 1, opacity: [0, 0.7, 0.35] }
                                : { pathLength: 0, opacity: 0 }
                        }
                        transition={{ duration: 0.85, delay: i * 0.06, ease }}
                    />
                );
            })}
            <defs>
                <linearGradient id="stream-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity="0.15" />
                    <stop offset="50%" stopColor="#6366F1" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
                </linearGradient>
            </defs>
        </svg>
    );
}

export default function CaptureFlowAnimation() {
    const ref = React.useRef(null);
    const inView = useInView(ref, { once: false, margin: '-80px', amount: 0.3 });
    const reducedMotion = useReducedMotion();
    const [phase, setPhase] = useState<Phase>('scatter');

    useEffect(() => {
        if (!inView || reducedMotion) {
            setPhase(reducedMotion ? 'unified' : 'scatter');
            return;
        }

        const phases: Phase[] = ['scatter', 'condense', 'unified'];
        let i = 0;
        let timeout: ReturnType<typeof setTimeout>;

        const run = () => {
            const current = phases[i];
            setPhase(current);
            timeout = setTimeout(() => {
                i = (i + 1) % phases.length;
                run();
            }, PHASE_MS[current]);
        };

        run();
        return () => clearTimeout(timeout);
    }, [inView, reducedMotion]);

    return (
        <div
            ref={ref}
            className="relative w-full aspect-[16/9] min-h-[260px] max-h-[340px] md:max-h-[400px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#FAFAF8] to-[#F4F4F8] border border-black/[0.06] shadow-[0_8px_40px_rgba(0,0,0,0.05)] mb-12 md:mb-16"
            aria-hidden
        >
            {/* ambient grid */}
            <motion.div
                className="absolute inset-0 opacity-[0.35]"
                style={{
                    backgroundImage:
                        'radial-gradient(circle at 1px 1px, rgba(99,102,241,0.12) 1px, transparent 0)',
                    backgroundSize: '28px 28px',
                }}
                animate={{ opacity: phase === 'unified' ? 0.5 : 0.35 }}
            />

            {/* center glow */}
            <motion.div
                className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                animate={{
                    width: phase === 'unified' ? 220 : phase === 'condense' ? 160 : 100,
                    height: phase === 'unified' ? 220 : phase === 'condense' ? 160 : 100,
                    opacity: phase === 'scatter' ? 0.35 : phase === 'condense' ? 0.55 : 0.7,
                }}
                transition={{ duration: 0.9, ease }}
                style={{
                    background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
                }}
            />

            <StreamLines phase={phase} />

            {/* Formeon hub */}
            <motion.div
                className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center"
                initial={false}
                animate={{ scale: phase === 'unified' ? 1 : phase === 'condense' ? 0.92 : 0.75 }}
                transition={{ duration: 0.7, ease }}
            >
                <motion.div
                    className="relative flex items-center justify-center"
                    animate={
                        phase === 'condense'
                            ? { scale: [1, 1.08, 1] }
                            : phase === 'unified'
                              ? { scale: [1, 1.04, 1] }
                              : {}
                    }
                    transition={{ repeat: phase !== 'scatter' ? Infinity : 0, duration: 1.8 }}
                >
                    {phase === 'condense' && (
                        <motion.div
                            className="absolute inset-0 rounded-2xl border-2 border-[#6366F1]/40"
                            initial={{ scale: 0.8, opacity: 0.8 }}
                            animate={{ scale: 1.8, opacity: 0 }}
                            transition={{ repeat: Infinity, duration: 1.2, ease: 'easeOut' }}
                        />
                    )}
                    <motion.div
                        className="w-[72px] h-[72px] md:w-[84px] md:h-[84px] rounded-2xl bg-white border border-[#6366F1]/20 shadow-[0_8px_32px_rgba(99,102,241,0.25)] flex items-center justify-center"
                        animate={{
                            boxShadow:
                                phase === 'unified'
                                    ? '0 12px 48px rgba(99,102,241,0.35), 0 0 0 8px rgba(99,102,241,0.08)'
                                    : '0 8px 32px rgba(99,102,241,0.2)',
                        }}
                    >
                        <Image src="/formeon-logo.png" alt="" width={48} height={48} className="rounded-md" />
                    </motion.div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {phase === 'unified' && (
                        <motion.div
                            key="unified-label"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.45, ease }}
                            className="mt-3 text-center"
                        >
                            <p className="text-[11px] font-semibold text-[#6366F1] uppercase tracking-wider">
                                Unified memory
                            </p>
                            <p className="text-[10px] text-slate-500 mt-0.5">
                                {sources.length} sources connected
                            </p>
                        </motion.div>
                    )}
                    {phase === 'condense' && (
                        <motion.p
                            key="condense-label"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="mt-3 text-[10px] font-medium text-[#6366F1]"
                        >
                            Condensing…
                        </motion.p>
                    )}
                </AnimatePresence>
            </motion.div>

            {sources.map((source, i) => (
                <AppBadge key={source.id} source={source} phase={phase} index={i} />
            ))}

            {/* floating context fragments during scatter */}
            <AnimatePresence>
                {phase === 'scatter' &&
                    ['Decision lost', 'Duplicate work', 'Missing AC'].map((frag, i) => (
                        <motion.span
                            key={frag}
                            className="absolute z-0 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-100 text-[9px] text-amber-700 font-medium"
                            style={{
                                left: `${35 + i * 18}%`,
                                top: `${38 + (i % 2) * 12}%`,
                            }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: [0.4, 0.7, 0.4], y: [0, -6, 0] }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ repeat: Infinity, duration: 3 + i * 0.4, ease: 'easeInOut' }}
                        >
                            {frag}
                        </motion.span>
                    ))}
            </AnimatePresence>

            <motion.p
                className="absolute bottom-4 md:bottom-5 left-0 right-0 text-center text-[11px] md:text-xs text-slate-500 px-4"
                key={phase}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease }}
            >
                {captions[phase]}
            </motion.p>
        </div>
    );
}
