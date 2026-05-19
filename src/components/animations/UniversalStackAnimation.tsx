'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { AnimationFrame, ease } from './shared';
import { AppIconRow } from './AppIcon';

export default function UniversalStackAnimation() {
    const ref = React.useRef(null);
    const inView = useInView(ref, { once: false, margin: '-60px', amount: 0.3 });

    return (
        <motion.div ref={ref} className="w-full">
            <AnimationFrame activeNav="discovery" aspect="aspect-[4/3]" maxHeight="max-h-[280px] md:max-h-[340px]">
                <motion.div
                    className="absolute inset-0 flex flex-col justify-center px-5 sm:px-6 py-5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease }}
                >
                    <div className="flex justify-center mb-5">
                        <AppIconRow ids={['slack', 'jira', 'microsoft', 'gmail', 'notion', 'linear']} size="sm" />
                    </div>

                    <motion.div
                        className="rounded-xl border border-[#E8E8EC] bg-white p-4 sm:p-5 shadow-sm max-w-sm mx-auto w-full"
                        initial={{ opacity: 0, y: 8 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.15, duration: 0.5, ease }}
                    >
                        <div className="flex items-center gap-2 mb-2.5">
                            <Sparkles className="w-4 h-4 text-[#6366F1] shrink-0" />
                            <p className="font-serif-display text-sm sm:text-base text-slate-900">
                                Enterprise SSO — Brief
                            </p>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                            Synthesized from Slack, Jira, Teams, Gmail, and Notion — with a Q3 recommendation and
                            security review in week 1.
                        </p>
                        <motion.div
                            className="flex gap-2 mt-3"
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.35 }}
                        >
                            <span className="px-2 py-0.5 rounded-md bg-[#EEF2FF] text-[10px] text-[#4F46E5] font-medium">
                                6 tools
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-[#EEF2FF] text-[10px] text-[#4F46E5] font-medium">
                                87% match
                            </span>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </AnimationFrame>
        </motion.div>
    );
}
