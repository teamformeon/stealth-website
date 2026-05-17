'use client';

/**
 * Looping hero product animation — timing constants (edit SCENE_MS to retime beats)
 * SCENE_MS.capture: 5500 | memory: 4000 | discovery: 7500 | output: 5500 | crossfade: 1200
 * Total cycle ≈ 23.7s
 */
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageSquare, Mail, Users, FolderKanban } from 'lucide-react';
import Image from 'next/image';

const SCENE_MS = {
    capture: 5500,
    memory: 4000,
    discovery: 7500,
    output: 5500,
    crossfade: 1200,
} as const;

const CYCLE_MS =
    SCENE_MS.capture + SCENE_MS.memory + SCENE_MS.discovery + SCENE_MS.output + SCENE_MS.crossfade;

type Phase = 'capture' | 'memory' | 'discovery' | 'output';

const ease = [0.16, 1, 0.3, 1] as const;

const captureChips = [
    { icon: MessageSquare, label: '#product-feedback', text: 'SSO request from enterprise…' },
    { icon: Mail, label: 'Gmail', text: 'Re: Q3 roadmap — your input?' },
    { icon: Users, label: 'Teams', text: 'Engineering sync notes' },
    { icon: FolderKanban, label: 'Jira', text: 'FEAT-284 — draft, no AC' },
];

const memoryChain = [
    { step: 'Proposal', value: 'Enterprise SSO' },
    { step: 'Decision', value: 'Approved for Q3' },
    { step: 'Outcome', value: 'Blocked at security review' },
    { step: 'Lesson', value: 'Start security review earlier' },
];

function useAnimationPhase() {
    const [phase, setPhase] = useState<Phase>('capture');
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(mq.matches);
        const handler = () => setReducedMotion(mq.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
        if (reducedMotion) return;

        const phases: Phase[] = ['capture', 'memory', 'discovery', 'output'];
        let i = 0;
        let timeout: ReturnType<typeof setTimeout>;

        const advance = () => {
            const current = phases[i];
            setPhase(current);
            const duration = SCENE_MS[current];
            timeout = setTimeout(() => {
                i = (i + 1) % phases.length;
                advance();
            }, duration);
        };

        advance();
        return () => clearTimeout(timeout);
    }, [reducedMotion]);

    return { phase, reducedMotion };
}

function CardShell({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.div
            className={`bg-white rounded-xl border border-black/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.05)] ${className}`}
            layout
        >
            {children}
        </motion.div>
    );
}

function CaptureScene() {
    return (
        <div className="relative w-full h-full flex items-center justify-center px-4">
            <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    className="w-24 h-24 rounded-full border border-[#6366F1]/20 bg-[#6366F1]/5 flex items-center justify-center"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                >
                    <span className="text-[10px] font-medium uppercase tracking-wider text-[#6366F1]">
                        Memory
                    </span>
                </motion.div>
            </motion.div>
            {captureChips.map((chip, i) => (
                <motion.div
                    key={chip.label}
                    initial={{ opacity: 0, x: -80, y: 20 + i * 12 }}
                    animate={{ opacity: 1, x: 40 + i * 8, y: 40 + i * 44 }}
                    exit={{ opacity: 0, scale: 0.9, x: 120 }}
                    transition={{ duration: 1.1, delay: i * 0.15, ease }}
                    className="absolute left-4 md:left-8 flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-black/[0.08] shadow-sm text-left max-w-[200px]"
                >
                    <chip.icon className="w-3.5 h-3.5 text-[#6366F1] shrink-0" />
                    <div className="min-w-0">
                        <p className="text-[9px] text-slate-400 truncate">{chip.label}</p>
                        <p className="text-[11px] text-slate-700 truncate">{chip.text}</p>
                    </div>
                </motion.div>
            ))}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-6 text-[11px] text-slate-500"
            >
                Capture from your stack
            </motion.p>
        </div>
    );
}

function MemoryScene() {
    return (
        <motion.div
            className="flex flex-col items-center justify-center h-full px-4 gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">Living decision memory</p>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-lg">
                {memoryChain.map((item, i) => (
                    <React.Fragment key={item.step}>
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.14, duration: 0.65, ease }}
                            className="px-3 py-2.5 bg-white rounded-lg border border-black/[0.08] shadow-sm min-w-[100px] text-center"
                        >
                            <p className="text-[9px] uppercase tracking-wider text-[#6366F1] font-medium">
                                {item.step}
                            </p>
                            <p className="text-[12px] text-slate-800 mt-0.5 font-medium">{item.value}</p>
                        </motion.div>
                        {i < memoryChain.length - 1 && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.4 }}
                                transition={{ delay: i * 0.1 + 0.05 }}
                                className="hidden md:flex items-center text-slate-300 text-lg"
                            >
                                →
                            </motion.span>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </motion.div>
    );
}

function DiscoveryScene() {
    const [typed, setTyped] = useState('');
    const full = 'Should we prioritize SSO for enterprise?';

    useEffect(() => {
        setTyped('');
        let i = 0;
        const id = setInterval(() => {
            i += 1;
            setTyped(full.slice(0, i));
            if (i >= full.length) clearInterval(id);
        }, 55);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="relative w-full h-full flex items-stretch gap-3 p-4 md:p-6">
            <motion.div
                className="flex-1 flex flex-col justify-end pb-4"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease }}
            >
                <p className="text-[10px] uppercase tracking-wider text-slate-400 text-center mb-4">
                    Discovery Hub
                </p>
                <CardShell className="p-4 flex-1 flex flex-col justify-center max-h-[280px]">
                    <div className="flex justify-center mb-4">
                        <Image src="/formeon-logo.png" alt="" width={32} height={32} className="opacity-90" />
                    </div>
                    <p className="text-center text-slate-800 text-sm md:text-base font-serif-display mb-4">
                        How can I help you today?
                    </p>
                    <div className="mt-auto rounded-2xl border border-[#E0E0E0] bg-white px-4 py-3 shadow-sm flex items-center gap-2">
                        <span className="text-sm text-slate-700 flex-1 min-h-[20px]">
                            {typed}
                            <motion.span
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="inline-block w-0.5 h-4 bg-[#6366F1] ml-0.5 align-middle"
                            />
                        </span>
                        <div className="w-8 h-8 rounded-full bg-[#6366F1] shrink-0" />
                    </div>
                </CardShell>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.85, ease }}
                className="w-[42%] max-w-[220px] hidden sm:block"
            >
                <div className="h-full rounded-xl bg-[#111115] border border-white/[0.08] p-3.5 text-white shadow-xl relative overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6366F1] to-transparent"
                        layoutId="indigo-line"
                    />
                    <p className="text-[9px] text-amber-400/90 mb-2 leading-snug">
                        ⚠ Similar work found (87% match)
                    </p>
                    <p className="text-[10px] font-mono text-white/50 uppercase mb-2">Similar work found</p>
                    <p className="text-[11px] text-white/80 leading-relaxed mb-3">
                        #product-feedback — procurement blocked Q3 2024
                    </p>
                    <div className="space-y-1.5">
                        {['Market signal', 'Strategic fit', 'Execution risk'].map((label, i) => (
                            <div key={label}>
                                <div className="flex justify-between text-[8px] text-white/40 mb-0.5">
                                    <span>{label}</span>
                                </div>
                                <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                                    <motion.div
                                        className="h-full bg-[#6366F1] rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${55 + i * 12}%` }}
                                        transition={{ delay: 1.4 + i * 0.15, duration: 0.7, ease }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function OutputScene() {
    return (
        <motion.div
            className="grid md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-4 items-stretch h-full p-4 md:p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease }}
        >
            <CardShell className="p-4 md:p-5">
                <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400 mb-3">
                    Scattered context
                </p>
                <div className="space-y-2 text-[12px] text-slate-600">
                    <p>
                        <span className="text-slate-400">#product</span> Can we ship SSO for enterprise?
                    </p>
                    <p>
                        <span className="text-slate-400">#sales</span> 3 customers blocked on auth…
                    </p>
                    <p className="opacity-70">
                        <span className="text-slate-400">Jira</span> FEAT-284 — draft, no AC
                    </p>
                    <p className="opacity-50">
                        <span className="text-slate-400">Notion</span> Q3 roadmap notes (outdated)
                    </p>
                </div>
            </CardShell>

            <div className="hidden md:flex items-center justify-center">
                <motion.div
                    className="w-9 h-9 rounded-full bg-white border border-[#6366F1]/25 shadow-md flex items-center justify-center"
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                >
                    <Sparkles className="w-4 h-4 text-[#6366F1]" />
                </motion.div>
            </div>

            <CardShell className="p-4 md:p-5">
                <motion.div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-[#6366F1]" />
                    <p className="text-[10px] font-medium uppercase tracking-wider text-[#6366F1]">
                        Formeon output
                    </p>
                </motion.div>
                <div className="rounded-xl bg-[#EEF2FF] border border-[#E0E7FF] p-3 mb-3">
                    <p className="font-semibold text-slate-900 text-sm mb-1">PRD: Enterprise SSO</p>
                    <p className="text-[12px] text-slate-600 leading-relaxed">
                        Grounded in 4 Slack threads, similar launch from Q1, and 2 customer calls.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded-md bg-white border border-slate-200 text-[11px] text-slate-600">
                        3 Jira tickets suggested
                    </span>
                    <span className="px-2 py-1 rounded-md bg-amber-50 border border-amber-100 text-[11px] text-amber-800">
                        Missing acceptance criteria
                    </span>
                </div>
            </CardShell>
        </motion.div>
    );
}

function StaticPoster() {
    return <OutputScene />;
}

export default function HeroProductAnimation() {
    const { phase, reducedMotion } = useAnimationPhase();

    return (
        <div
            className="relative w-full max-w-[min(1200px,100%)] mx-auto aspect-[16/10] max-h-[320px] md:max-h-[560px] rounded-2xl overflow-hidden bg-[#FAFAF8] border border-black/[0.06]"
            aria-hidden="true"
        >
            {reducedMotion ? (
                <StaticPoster />
            ) : (
                <AnimatePresence mode="wait">
                    <motion.div
                        key={phase}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: SCENE_MS.crossfade / 1000, ease: 'easeInOut' }}
                    >
                        {phase === 'capture' && <CaptureScene />}
                        {phase === 'memory' && <MemoryScene />}
                        {phase === 'discovery' && <DiscoveryScene />}
                        {phase === 'output' && <OutputScene />}
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );
}
