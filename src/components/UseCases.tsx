'use client';

import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { Monitor, Code, Palette, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

const cases = [
    {
        title: 'Developers',
        desc: 'Terminal-aware assistance and automated package management.',
        icon: <Code size={20} />,
    },
    {
        title: 'Designers',
        desc: 'System-wide asset search and contextual inspiration mapping.',
        icon: <Palette size={20} />,
    },
    {
        title: 'Managers',
        desc: 'Integrated documentation logs and cross-tool coordination.',
        icon: <Briefcase size={20} />,
    },
    {
        title: 'Architects',
        desc: 'Local file indexing and semantic code base exploration.',
        icon: <Monitor size={20} />,
    },
];

const UseCases = () => {
    return (
        <Section className="bg-neutral-900/10">
            <div className="flex flex-col md:flex-row gap-24 items-end mb-24">
                <div className="max-w-xl">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8">Tailored for <br /> Builders.</h2>
                    <p className="text-neutral-500 text-xl leading-relaxed">
                        One utility, infinite workflows. Stealth adapts to the way you think and build.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cases.map((useCase, idx) => (
                    <motion.div
                        key={useCase.title}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className="premium-card p-10 flex flex-col gap-6 group"
                    >
                        <div className="text-neutral-500 group-hover:text-stealth-accent transition-colors">
                            {useCase.icon}
                        </div>
                        <h3 className="text-xl font-bold">{useCase.title}</h3>
                        <p className="text-neutral-500 text-sm leading-relaxed">{useCase.desc}</p>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

export default UseCases;
