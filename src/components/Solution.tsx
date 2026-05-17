'use client';

import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { Layers, FileOutput, GitBranch } from 'lucide-react';
import { fadeUp, fadeUpChild, springSnappy, staggerContainer, viewport } from '@/lib/motion';

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
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUp}
                className="text-center max-w-2xl mx-auto mb-16"
            >
                <h2 className="font-serif-display text-3xl md:text-[2.75rem] leading-tight tracking-tight text-[#12141c] mb-4">
                    Formeon remembers what your team forgets
                </h2>
            </motion.div>

            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="grid md:grid-cols-3 gap-6"
            >
                {solutions.map((item) => (
                    <motion.div
                        key={item.title}
                        variants={fadeUpChild}
                        whileHover={{ y: -8, transition: springSnappy }}
                        className="premium-card p-8 group"
                    >
                        <motion.div
                            className="w-10 h-10 rounded-xl bg-[#eef0f8] flex items-center justify-center text-[#4f5dff] mb-5"
                            whileHover={{ scale: 1.12, rotate: 8 }}
                            transition={springSnappy}
                        >
                            <item.icon className="w-5 h-5" />
                        </motion.div>
                        <h3 className="text-lg font-semibold text-[#12141c] mb-3 leading-snug group-hover:text-[#4f5dff] transition-colors duration-300">
                            {item.title}
                        </h3>
                        <p className="text-[#64687a] leading-relaxed text-[15px]">{item.description}</p>
                    </motion.div>
                ))}
            </motion.div>
        </Section>
    );
};

export default Solution;
