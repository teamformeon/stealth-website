'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Section from './Section';
import { motion } from 'framer-motion';
import { fadeUp, fadeUpChild, springSnappy, staggerContainer, viewport } from '@/lib/motion';

const CaptureFlowAnimation = dynamic(() => import('@/components/animations/CaptureFlowAnimation'), {
    ssr: false,
});

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
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUp}
                className="text-center max-w-2xl mx-auto mb-10"
            >
                <h2 className="font-serif-display text-3xl md:text-[2.75rem] leading-tight tracking-tight text-[#12141c] mb-4">
                    Product teams lose context every week
                </h2>
            </motion.div>

            <CaptureFlowAnimation />

            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="grid md:grid-cols-3 gap-6"
            >
                {pains.map((pain, i) => (
                    <motion.div
                        key={pain.title}
                        variants={fadeUpChild}
                        whileHover={{ y: -8, transition: springSnappy }}
                        className="premium-card p-8 group"
                    >
                        <motion.span
                            className="block h-1 rounded-full bg-gradient-to-r from-[#4f5dff] to-[#4f5dff]/30 mb-5 origin-left"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        />
                        <h3 className="text-lg font-semibold text-[#12141c] mb-3 leading-snug group-hover:text-[#4f5dff] transition-colors duration-300">
                            {pain.title}
                        </h3>
                        <p className="text-[#64687a] leading-relaxed text-[15px]">{pain.description}</p>
                    </motion.div>
                ))}
            </motion.div>
        </Section>
    );
};

export default PainPoints;
