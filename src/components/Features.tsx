'use client';

import React from 'react';
import Section from './Section';
import FeatureCard from './FeatureCard';
import { Zap, Shield, Cpu, Layers, MousePointer2, Command } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        title: 'Context Awareness',
        description: 'Stealth AI retains continuous memory across your entire desktop. It understands what you’re working on—whether it’s a Slack thread, a local spreadsheet, or a browser terminal—and acts accordingly.',
        icon: <Layers size={24} />,
    },
    {
        title: 'Cross-App Execution',
        description: 'Beyond generation, it performs. Stealth drafts emails, updates CRM records, pulls data from dashboards, and coordinates tasks between tools without you lifting a finger.',
        icon: <MousePointer2 size={24} />,
    },
    {
        title: 'Predictive Assistance',
        description: 'By observing your workflows, Stealth anticipates your next move. It surfaces relevant information and drafts actions before you explicitly ask, reducing tool switching by 80%.',
        icon: <Zap size={24} />,
    },
    {
        title: 'Zero Prompting',
        description: 'No prompt engineering. No complex command syntax. Stealth works silently in the background, executing intent rather than just following instructions.',
        icon: <Command size={24} />,
    },
];

const Features = () => {
    return (
        <Section id="features">
            <div className="max-w-2xl mb-24">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold mb-8 uppercase"
                >
                    Software that <br />
                    <span className="text-stealth-accent">Executes.</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-neutral-500 text-xl leading-relaxed max-w-xl"
                >
                    Stealth Technologies isn’t another chatbot. It’s an execution layer designed for operators who need work done, not just text generated.
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
