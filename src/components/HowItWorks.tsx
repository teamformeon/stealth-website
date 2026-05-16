'use client';

import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { Download, Code2, Database, ShieldCheck } from 'lucide-react';

const steps = [
    {
        title: 'Install Utility',
        desc: 'Lightweight native client for macOS or Windows.',
        icon: <Download size={20} />,
    },
    {
        title: 'Bind Environment',
        desc: 'Connect your tools, folders, and local data silos.',
        icon: <Database size={20} />,
    },
    {
        title: 'Grant Access',
        desc: 'Enable system-level context for seamless automation.',
        icon: <ShieldCheck size={20} />,
    },
    {
        title: 'Unleash Performance',
        desc: 'Invoke anywhere with a single, fast global hotkey.',
        icon: <Code2 size={20} />,
    },
];

const HowItWorks = () => {
    return (
        <Section id="how-it-works" className="border-t border-white/5">
            <div className="max-w-2xl mb-24">
                <h2 className="text-4xl md:text-6xl font-bold mb-8 italic">The Process.</h2>
                <p className="text-neutral-500 text-xl leading-relaxed">
                    Setup in seconds. Performance for life. Formeon lives exactly where you need it most.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                {steps.map((step, idx) => (
                    <motion.div
                        key={step.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        className="flex flex-col gap-6"
                    >
                        <div className="text-formeon-accent/40 font-mono text-sm tracking-widest font-bold">
                            STEP 0{idx + 1}
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-formeon-light-gray flex items-center justify-center text-white">
                            {step.icon}
                        </div>
                        <h3 className="text-2xl font-bold">{step.title}</h3>
                        <p className="text-neutral-500 leading-relaxed text-sm">{step.desc}</p>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

export default HowItWorks;
