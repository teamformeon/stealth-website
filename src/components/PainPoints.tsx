'use client';

import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';

const pains = [
    {
        title: 'Important decisions disappear in Slack',
        description:
            'Feature requests, customer pain points, and internal debates get buried across channels before they ever become structured product work.',
    },
    {
        title: 'PRDs start from scratch every time',
        description:
            'PMs waste hours reconstructing context from docs, tickets, meetings, and past launches just to write a decent spec.',
    },
    {
        title: 'Teams forget what they already learned',
        description:
            'Companies repeat mistakes because historical product decisions, outcomes, and tradeoffs are not accessible when new work begins.',
    },
];

const PainPoints = () => {
    return (
        <Section id="use-cases" className="py-24 md:py-32 bg-white/60">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-serif-display text-3xl md:text-[2.75rem] leading-tight tracking-tight text-[#12141c] mb-4"
                >
                    Product teams lose context every week
                </motion.h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {pains.map((pain, i) => (
                    <motion.div
                        key={pain.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -6 }}
                        className="premium-card p-8"
                    >
                        <motion.span
                            className="inline-block w-8 h-1 rounded-full bg-[#4f5dff] mb-5 origin-left"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 + 0.2, duration: 0.4 }}
                        />
                        <h3 className="text-lg font-semibold text-[#12141c] mb-3 leading-snug">{pain.title}</h3>
                        <p className="text-[#64687a] leading-relaxed text-[15px]">{pain.description}</p>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

export default PainPoints;
