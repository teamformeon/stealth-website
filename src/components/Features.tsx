'use client';

import React from 'react';
import Section from './Section';
import FeatureCard from './FeatureCard';
import { Zap, Shield, Cpu, Layers, MousePointer2, Command } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        title: 'Instant Synthesis',
        description: 'Upload 50 customer interviews, support tickets, or sales calls. Stealth identifies common patterns instantly, giving you a single source of truth for user pain points.',
        icon: <Layers size={24} />,
    },
    {
        title: 'Living PRDs',
        description: 'Generate comprehensive Product Requirements Docs that link directly to your source data. When the data changes, your specs update automatically.',
        icon: <Command size={24} />,
    },
    {
        title: 'Strategic Clarity',
        description: 'Stealth connects the dots between usage metrics and qualitative feedback, highlighting exactly which feature will drive the most impact next.',
        icon: <Zap size={24} />,
    },
    {
        title: 'Automated Discovery',
        description: 'Let Stealth browse your linear tickets and github issues to find discrepancies between what was planned and what was built.',
        icon: <MousePointer2 size={24} />,
    },
];

const Features = () => {
    return (
        <Section id="features" className="bg-slate-50/50">
            <div className="max-w-3xl mb-24">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-black"
                >
                    From Gut Feeling to <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Data-Driven Strategy.</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-slate-500 text-lg leading-relaxed max-w-2xl font-light"
                >
                    Stop guessing what to build. Stealth ingests your customer feedback, market data, and usage metrics to reveal the truth about your product.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, idx) => (
                    <FeatureCard
                        key={feature.title}
                        {...feature}
                        delay={idx * 0.05}
                    />
                ))}
            </div>
        </Section>
    );
};

export default Features;
