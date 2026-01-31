'use client';

import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { Briefcase, UserCheck, Settings, Workflow } from 'lucide-react';

const targets = [
    {
        role: 'Product Managers',
        context: 'Coordinate across design, engineering, and stakeholders without losing context in endless tabs.',
        icon: <Briefcase size={20} />,
    },
    {
        role: 'Executive Assistants',
        context: 'Manage complex schedules, draft communications, and stay ahead of executive needs automatically.',
        icon: <UserCheck size={20} />,
    },
    {
        role: 'RevOps / Sales Ops',
        context: 'Maintain data integrity and automate cross-tool coordination for fast-moving sales teams.',
        icon: <Settings size={20} />,
    },
    {
        role: 'Operators',
        context: 'Anyone managing high-complexity workflows where tool-switching is the bottleneck.',
        icon: <Workflow size={20} />,
    },
];

const WhoItFor = () => {
    return (
        <Section className="border-t border-white/5 bg-white/[0.01]">
            <div className="max-w-4xl mx-auto text-center mb-24">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-8 uppercase tracking-tight"
                >
                    Built for <span className="text-stealth-accent italic">Operators.</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-neutral-500 text-lg leading-relaxed"
                >
                    Stealth Technologies is designed for those who manage complexity, not just conversations.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {targets.map((target, idx) => (
                    <motion.div
                        key={target.role}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-stealth-accent/10 border border-stealth-accent/20 flex items-center justify-center text-stealth-accent mb-6 group-hover:scale-110 transition-transform">
                            {target.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">{target.role}</h3>
                        <p className="text-neutral-500 leading-relaxed text-sm">
                            {target.context}
                        </p>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

export default WhoItFor;
