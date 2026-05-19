'use client';

import React from 'react';
import Section from './Section';
import FeatureCard from './FeatureCard';
import { Zap, Shield, Cpu, Layers, MousePointer2, Command } from 'lucide-react';
import { motion } from 'framer-motion';
// temp push
const features = [
    {
        title: 'Instant Synthesis',
        description: 'Drop in your 50 customer interviews, support tickets, or sales calls. Formeon synthesizes them into actionable product opportunities instantly.',
        icon: <Layers size={24} />,
    },
    {
        title: 'Living PRDs',
        description: 'Turn validated ideas into structured Product Requirements Docs that link directly to your source evidence. When the data changes, your specs update.',
        icon: <Command size={24} />,
    },
    {
        title: 'Strategic Clarity',
        description: 'Visually map out product roadmaps, evaluate ideas, and trace hypotheses directly back to customer calls before committing to Jira.',
        icon: <Zap size={24} />,
    },
    {
        title: 'Automated Discovery',
        description: 'Run Discovery sessions in the Sandbox to turn messy inputs into visual blueprints. Test and refine your plans before deploying tasks to engineering.',
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
                    Your Execution <br />
                    <span className="text-neutral-400">Command Center.</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-slate-500 text-lg leading-relaxed max-w-2xl font-light"
                >
                    Stop guessing what to build. Formeon ingests your customer feedback, market data, and usage metrics to synthesize, score, and confidently deliver blueprints to Jira.
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
