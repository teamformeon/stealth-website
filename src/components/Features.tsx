'use client';

import React from 'react';
import Section from './Section';
import FeatureCard from './FeatureCard';
import { Zap, Shield, Cpu, Layers, MousePointer2, Command } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        title: 'Context Engine',
        description: 'Understands your active files, terminal output, and logs in real-time.',
        icon: <Cpu size={24} />,
    },
    {
        title: 'Overlay Control',
        description: 'Invoke power anywhere with a single global hotkey interface.',
        icon: <Command size={24} />,
    },
    {
        title: 'Zero-Knowledge',
        description: 'Privacy by design. Your data never touches our servers.',
        icon: <Shield size={24} />,
    },
    {
        title: 'Native Speed',
        description: 'Built with performance in mind. Zero bloat, zero latency.',
        icon: <Zap size={24} />,
    },
    {
        title: 'Custom Logic',
        description: 'Script complex interactions with simple natural language.',
        icon: <Layers size={24} />,
    },
    {
        title: 'OS Integration',
        description: 'Deep control over file systems and hardware peripherals.',
        icon: <MousePointer2 size={24} />,
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
                    className="text-4xl md:text-6xl font-bold mb-8"
                >
                    Everything you need. <br />
                    <span className="text-stealth-accent">Nothing you don’t.</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-neutral-500 text-xl leading-relaxed"
                >
                    Powerful features designed for serious builders who value privacy and performance.
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
