'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AnimationFrame, CountUp, ease } from './shared';

const lines = [
    { x1: 50, y1: 48, x2: 28, y2: 28 },
    { x1: 50, y1: 48, x2: 72, y2: 26 },
    { x1: 50, y1: 48, x2: 24, y2: 58 },
    { x1: 50, y1: 48, x2: 76, y2: 62 },
    { x1: 50, y1: 48, x2: 68, y2: 78 },
];

function SlackNode({
    label,
    className,
    delay = 0,
    size = 'sm',
    inView,
}: {
    label: string;
    className?: string;
    delay?: number;
    size?: 'sm' | 'center';
    inView: boolean;
}) {
    const sizes = {
        sm: 'w-10 h-10 sm:w-11 sm:h-11',
        center: 'w-12 h-12 sm:w-14 sm:h-14',
    };
    return (
        <motion.div
            className={cn('absolute flex flex-col items-center', className)}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
            transition={{ delay, duration: 0.55, type: 'spring', stiffness: 260, damping: 22 }}
        >
            <motion.div
                className={cn(
                    'rounded-full border-2 border-[#E8E8EC] bg-white shadow-sm flex items-center justify-center',
                    sizes[size]
                )}
            >
                <span className="font-semibold text-[#4A154B] text-sm">S</span>
            </motion.div>
            {label && (
                <p className="mt-1 text-[8px] sm:text-[9px] text-slate-500 max-w-[72px] text-center truncate">
                    {label}
                </p>
            )}
        </motion.div>
    );
}

export default function IntelligenceGraphAnimation() {
    const ref = React.useRef(null);
    const inView = useInView(ref, { once: false, margin: '-80px', amount: 0.35 });

    return (
        <div ref={ref}>
            <AnimationFrame activeNav="graph" aspect="aspect-[4/3]" maxHeight="max-h-[300px] md:max-h-[380px]">
                <motion.div
                    className="absolute inset-0 flex min-h-0"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="flex-1 relative">
                        <motion.div
                            className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-[#EBEBEB] bg-white text-[10px] text-slate-700 shadow-sm"
                            initial={{ opacity: 0, y: -8 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.15, duration: 0.45, ease }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
                            Payments Dashboard
                        </motion.div>

                        <svg
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            aria-hidden
                        >
                            {lines.map((l, i) => (
                                <motion.line
                                    key={i}
                                    x1={l.x1}
                                    y1={l.y1}
                                    x2={l.x2}
                                    y2={l.y2}
                                    stroke="#D4D4D8"
                                    strokeWidth="0.35"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={inView ? { pathLength: 1, opacity: 0.75 } : { pathLength: 0, opacity: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1, duration: 0.65, ease }}
                                />
                            ))}
                        </svg>

                        <div className="absolute inset-0">
                            <SlackNode inView={inView} label="Slack · 4" className="left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2" delay={0.1} size="center" />
                            <SlackNode inView={inView} label="We are killing the not…" className="left-[22%] top-[22%] -translate-x-1/2" delay={0.45} />
                            <SlackNode inView={inView} label="Hey I think we should…" className="left-[74%] top-[20%] -translate-x-1/2" delay={0.55} />
                            <SlackNode inView={inView} label="i really like the new G…" className="left-[78%] top-[58%] -translate-x-1/2" delay={0.7} />
                            <motion.div
                                className="absolute left-[62%] top-[72%] -translate-x-1/2"
                                initial={{ opacity: 0, scale: 0.7 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.85, type: 'spring', stiffness: 220, damping: 20 }}
                            >
                                <motion.div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#6366F1] bg-[#EEF2FF] flex items-center justify-center">
                                    <span className="text-[8px] font-medium text-[#6366F1] text-center px-1">Payments Dashb…</span>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>

                    <motion.aside
                        className="w-[38%] max-w-[180px] shrink-0 border-l border-[#EBEBEB] bg-[#FAFAFA] p-3 hidden sm:flex flex-col"
                        initial={{ opacity: 0, x: 16 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.9, duration: 0.55, ease }}
                    >
                        <p className="text-[9px] uppercase tracking-wider text-slate-400 mb-1">Project</p>
                        <p className="font-serif-display text-sm text-slate-900 mb-2">Payments Dashboard</p>
                        <p className="text-[9px] uppercase tracking-wider text-slate-400 mb-1">Captures</p>
                        <p className="text-[12px] font-medium text-slate-800">
                            {inView ? <CountUp target={4} delay={1} /> : 0} decisions captured
                        </p>
                        <p className="text-[11px] text-slate-500 mt-1">4 from Slack</p>
                    </motion.aside>
                </motion.div>
            </AnimationFrame>
        </div>
    );
}
