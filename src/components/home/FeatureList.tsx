'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { easeOut, viewport } from '@/lib/motion';
import { Reveal } from './motion';

const features = [
    {
        title: 'Pull context across your stack',
        body: 'Slack, Notion, Jira, docs, and customer conversations — connected into one company-specific memory layer.',
    },
    {
        title: 'Generate grounded product work',
        body: 'PRDs, specs, tickets, and product briefs built on what your team has already decided and shipped.',
    },
    {
        title: 'Surface past decisions before you repeat them',
        body: 'Similar initiatives, tradeoffs, and outcomes — surfaced when new work starts, not after the retro.',
    },
];

const Rule = ({ delay }: { delay: number }) => (
    <motion.div
        aria-hidden="true"
        className="h-px bg-ink/12 origin-left"
        variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 1.1, ease: easeOut, delay } } }}
    />
);

const FeatureList = () => (
    <section className="px-6 pt-[120px] pb-10">
        <div className="max-w-[1120px] mx-auto">
            <Reveal>
                <h2 className="m-0 mb-12 font-serif font-medium text-[clamp(32px,4vw,48px)] leading-[1.08] tracking-[-0.02em]">
                    Works the way your team already does.
                </h2>
            </Reveal>
            <motion.div initial="hidden" whileInView="visible" viewport={viewport}>
                {features.map((f, i) => (
                    <div key={f.title} className="group">
                        <Rule delay={i * 0.15} />
                        <motion.div
                            className="py-9 flex flex-wrap gap-x-14 gap-y-6 items-baseline"
                            variants={{
                                hidden: { opacity: 0, y: 16 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut, delay: 0.15 + i * 0.15 } },
                            }}
                        >
                            <div className="flex-[1_1_320px] font-serif text-[28px] font-medium transition-[color,transform] duration-500 group-hover:text-moss group-hover:translate-x-1.5">
                                {f.title}
                            </div>
                            <p className="flex-[1_1_420px] m-0 text-[17px] leading-[1.55] text-muted">{f.body}</p>
                        </motion.div>
                    </div>
                ))}
                <Rule delay={features.length * 0.15} />
            </motion.div>
        </div>
    </section>
);

export default FeatureList;
