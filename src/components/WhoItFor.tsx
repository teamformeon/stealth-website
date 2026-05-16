'use client';

import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';

import { Briefcase, Rocket, TrendingUp, CheckCircle2 } from 'lucide-react';

const targets = [
    {
        role: 'Product Managers',
        context: 'Draft PRDs, sync Jira tickets, and summarize Slack threads without leaving your focus. Formeon understands your product context.',
        icon: <Briefcase size={20} />,
        benefits: ['PRD Generation', 'Jira Syncing', 'Slack Recap'],
    },
    {
        role: 'Product Teams',
        context: 'Align across tools with zero context switching. Perfect for engineering syncs and cross-functional handoffs.',
        icon: <Rocket size={20} />,
        benefits: ['Cross-Tool Alignment', 'Automated Daily Briefs', 'Native Integration'],
    },
];

const WhoItFor = () => {
    return (
        <Section className="border-t border-slate-200 bg-slate-50">
            <div className="max-w-4xl mx-auto text-center mb-24">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-8 text-black"
                >
                    Built for <span className="text-slate-400">Product Velocity.</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-slate-600 text-lg leading-relaxed font-medium"
                >
                    No prompts. No manual setup. Just absolute focus for PMs.
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
                        className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all group"
                    >
                        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                            {target.icon}
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-black">{target.role}</h3>
                        <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                            {target.context}
                        </p>
                        <div className="space-y-2">
                            {target.benefits?.map((benefit, i) => (
                                <div key={i} className="flex items-center gap-2 text-slate-600">
                                    <CheckCircle2 size={16} className="text-blue-600" />
                                    <span className="text-sm">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

export default WhoItFor;
