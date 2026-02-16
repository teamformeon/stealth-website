'use client';

import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';

import { Briefcase, Rocket, TrendingUp, CheckCircle2 } from 'lucide-react';

const targets = [
    {
        role: 'Knowledge Workers',
        context: 'Get intelligent assistance across email, calendar, tasks, and notes. Stealth understands context and suggests actions automatically.',
        icon: <Briefcase size={20} />,
        benefits: ['Email Management', 'Calendar Integration', 'Task Automation'],
    },
    {
        role: 'Product Teams',
        context: 'Coordinate across tools without context switching. Stealth integrates with Notion, Slack, and your entire workflow.',
        icon: <Rocket size={20} />,
        benefits: ['Cross-Tool Context', 'Automated Summaries', 'Proactive Suggestions'],
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
                    Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Everyone.</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-slate-600 text-lg leading-relaxed"
                >
                    Stealth works for anyone who wants AI assistance that understands context—no prompts, no manual setup, just intelligent help when you need it.
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
                        <p className="text-slate-600 leading-relaxed mb-6">
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
