'use client';

import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';

const companies = ['Amazon', 'Disney', 'Netflix', 'PayPal'];

function MarqueeContent() {
    return (
        <>
            {companies.map((name) => (
                <span
                    key={name}
                    className="mx-10 md:mx-14 text-2xl md:text-3xl font-semibold tracking-tight text-[#12141c]/25 whitespace-nowrap select-none"
                >
                    {name}
                </span>
            ))}
        </>
    );
}

const SocialProof = () => {
    return (
        <Section className="py-20 md:py-28 border-y border-[#12141c]/[0.06] bg-white/50 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-2xl mx-auto mb-12 px-6"
            >
                <h2 className="font-serif-display text-2xl md:text-3xl tracking-tight text-[#12141c] mb-3">
                    Built for product teams moving fast
                </h2>
                <p className="text-[#64687a] text-[15px]">
                    Trusted by operators and PMs from teams at leading companies.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="marquee-mask relative"
            >
                <div className="marquee-track items-center" aria-hidden>
                    <MarqueeContent />
                    <MarqueeContent />
                </div>
            </motion.div>
        </Section>
    );
};

export default SocialProof;
