'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Section from './Section';
import { motion } from 'framer-motion';
import { Layers, FileOutput, GitBranch } from 'lucide-react';
import { fadeUp, fadeUpChild, viewport } from '@/lib/motion';

const IntelligenceGraphAnimation = dynamic(
    () => import('@/components/animations/IntelligenceGraphAnimation'),
    { ssr: false }
);
const MemoryChainAnimation = dynamic(() => import('@/components/animations/MemoryChainAnimation'), {
    ssr: false,
});
const NotesViewAnimation = dynamic(() => import('@/components/animations/NotesViewAnimation'), {
    ssr: false,
});

const features = [
    {
        icon: Layers,
        title: 'Pull context across your stack',
        description:
            'Slack, Notion, Jira, docs, and customer conversations—connected into one company-specific memory layer.',
        animation: 'graph' as const,
    },
    {
        icon: FileOutput,
        title: 'Generate grounded product work',
        description:
            'PRDs, specs, tickets, and product briefs built on what your team has already decided and shipped.',
        animation: 'memory' as const,
    },
    {
        icon: GitBranch,
        title: 'Surface past decisions before you repeat them',
        description:
            'Similar initiatives, tradeoffs, and outcomes—surfaced when new work starts, not after the retro.',
        animation: 'notes' as const,
    },
];

function FeatureAnimation({ type }: { type: 'graph' | 'memory' | 'notes' }) {
    if (type === 'memory') return <MemoryChainAnimation />;
    if (type === 'notes') return <NotesViewAnimation />;
    return <IntelligenceGraphAnimation />;
}

const Solution = () => {
    return (
        <Section className="py-24 md:py-32">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUp}
                className="text-center max-w-2xl mx-auto mb-16 md:mb-20"
            >
                <h2 className="font-serif-display text-3xl md:text-[2.75rem] leading-tight tracking-tight text-[#12141c] mb-4">
                    Formeon remembers what your team forgets
                </h2>
            </motion.div>

            <motion.div className="space-y-20 md:space-y-28 max-w-6xl mx-auto">
                {features.map((item, i) => {
                    const reverse = i % 2 === 1;

                    if (item.animation === 'graph') {
                        return (
                            <motion.div
                                key={item.title}
                                initial="hidden"
                                whileInView="visible"
                                viewport={viewport}
                                variants={fadeUpChild}
                                className="flex flex-col gap-8 lg:gap-10"
                            >
                                <motion.div className="max-w-xl">
                                    <motion.div className="w-10 h-10 rounded-xl bg-[#eef0f8] flex items-center justify-center text-[#4f5dff] mb-5">
                                        <item.icon className="w-5 h-5" />
                                    </motion.div>
                                    <h3 className="font-serif-display text-2xl md:text-[1.75rem] text-[#12141c] mb-4 leading-snug">
                                        {item.title}
                                    </h3>
                                    <p className="text-[#64687a] leading-relaxed text-[15px] md:text-base">
                                        {item.description}
                                    </p>
                                </motion.div>
                                <motion.div className="w-full">
                                    <FeatureAnimation type="graph" />
                                </motion.div>
                            </motion.div>
                        );
                    }

                    return (
                        <motion.div
                            key={item.title}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewport}
                            variants={fadeUpChild}
                            className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center"
                        >
                            <motion.div className={reverse ? 'lg:order-2' : ''}>
                                <motion.div className="w-10 h-10 rounded-xl bg-[#eef0f8] flex items-center justify-center text-[#4f5dff] mb-5">
                                    <item.icon className="w-5 h-5" />
                                </motion.div>
                                <h3 className="font-serif-display text-2xl md:text-[1.75rem] text-[#12141c] mb-4 leading-snug">
                                    {item.title}
                                </h3>
                                <p className="text-[#64687a] leading-relaxed text-[15px] md:text-base max-w-lg">
                                    {item.description}
                                </p>
                            </motion.div>
                            <motion.div className={reverse ? 'lg:order-1' : ''}>
                                <FeatureAnimation type={item.animation} />
                            </motion.div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </Section>
    );
};

export default Solution;
