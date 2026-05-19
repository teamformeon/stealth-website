'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { ease } from './shared';

const chain = [
    { step: 'Proposal', value: 'Enterprise SSO' },
    { step: 'Decision', value: 'Approved for Q3' },
    { step: 'Outcome', value: 'Blocked at security review' },
    { step: 'Lesson', value: 'Start security review earlier' },
];

export default function MemoryChainAnimation() {
    const ref = React.useRef(null);
    const inView = useInView(ref, { once: false, margin: '-60px', amount: 0.35 });

    return (
        <div
            ref={ref}
            className="w-full aspect-[4/3] max-h-[280px] md:max-h-[360px] rounded-2xl overflow-hidden bg-white border border-black/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center px-4 py-6"
            aria-hidden
        >
            <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-5">Living decision memory</p>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-md">
                {chain.map((item, i) => (
                    <React.Fragment key={item.step}>
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                            transition={{ delay: i * 0.14, duration: 0.55, ease }}
                            className="px-3 py-2.5 bg-[#FAFAFA] rounded-lg border border-[#EBEBEB] shadow-sm min-w-[96px] text-center"
                        >
                            <p className="text-[9px] uppercase tracking-wider text-[#6366F1] font-medium">{item.step}</p>
                            <p className="text-[12px] text-slate-800 mt-0.5 font-medium">{item.value}</p>
                        </motion.div>
                        {i < chain.length - 1 && (
                            <motion.span
                                className="hidden sm:flex items-center text-slate-300 text-base self-center"
                                initial={{ opacity: 0 }}
                                animate={inView ? { opacity: 0.45 } : {}}
                                transition={{ delay: i * 0.1 + 0.08 }}
                            >
                                →
                            </motion.span>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
