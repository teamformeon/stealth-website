'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { AnimationFrame, ease } from './shared';

export default function GeneratedBriefAnimation() {
    const ref = React.useRef(null);
    const inView = useInView(ref, { once: false, margin: '-60px', amount: 0.3 });

    return (
        <motion.div ref={ref} className="w-full">
            <AnimationFrame activeNav="discovery" aspect="aspect-[4/3]" maxHeight="max-h-[280px] md:max-h-[360px]">
                <motion.div
                    className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 py-4"
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
                >
                    <motion.p
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                        className="text-[10px] uppercase tracking-wider text-slate-400 text-center mb-3"
                    >
                        Generated brief
                    </motion.p>
                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
                        transition={{ duration: 0.55, ease }}
                        className="rounded-xl border border-[#E8E8EC] bg-white p-4 shadow-md max-w-sm mx-auto w-full"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-4 h-4 text-[#6366F1]" />
                            <p className="font-serif-display text-sm sm:text-base text-slate-900">
                                Enterprise SSO — Decision Brief
                            </p>
                        </div>
                        <motion.div
                            className="space-y-2 text-[11px] text-slate-600 leading-relaxed"
                            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                            transition={{ delay: 0.2 }}
                        >
                            <p>
                                <span className="text-[#6366F1] font-medium">Context:</span> 4 Slack threads, Q1 launch
                                data, 2 customer calls.
                            </p>
                            <p>
                                <span className="text-[#6366F1] font-medium">Recommendation:</span> Q3 priority — security
                                review week 1.
                            </p>
                        </motion.div>
                        <motion.div
                            className="flex flex-wrap gap-1.5 mt-3"
                            variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}
                        >
                            {['4 sources', '87% match', '3 risks'].map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-0.5 rounded-md bg-[#EEF2FF] border border-[#E0E7FF] text-[10px] text-[#4F46E5]"
                                >
                                    {tag}
                                </span>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </AnimationFrame>
        </motion.div>
    );
}
