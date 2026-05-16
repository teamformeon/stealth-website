'use client';

import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { Layers, FileOutput, GitBranch } from 'lucide-react';

const solutions = [
    {
        icon: Layers,
        title: 'Pull context across your stack',
        description:
            'Slack, Notion, Jira, docs, and customer conversations—connected into one company-specific memory layer.',
    },
    {
        icon: FileOutput,
        title: 'Generate grounded product work',
        description:
            'PRDs, specs, tickets, and product briefs built on what your team has already decided and shipped.',
    },
    {
        icon: GitBranch,
        title: 'Surface past decisions before you repeat them',
        description:
            'Similar initiatives, tradeoffs, and outcomes—surfaced when new work starts, not after the retro.',
    },
];

const Solution = () => {
    return (
        <Section className="py-24 md:py-32">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-serif-display text-3xl md:text-[2.75rem] leading-tight tracking-tight text-[#12141c] mb-4"
                >
                    Formeon remembers what your team forgets
                </motion.h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {solutions.map((item, i) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="premium-card p-8"
                    >
                        <div className="w-10 h-10 rounded-xl bg-[#eef0f8] flex items-center justify-center text-[#4f5dff] mb-5">
                            <item.icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-semibold text-[#12141c] mb-3 leading-snug">{item.title}</h3>
                        <p className="text-[#64687a] leading-relaxed text-[15px]">{item.description}</p>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

export default Solution;
