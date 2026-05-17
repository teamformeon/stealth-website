'use client';

import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { fadeUp, viewport } from '@/lib/motion';

const companies = ['Amazon', 'Airbnb', 'Nintendo', 'Capital One', 'Oracle', 'Disney'];

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
    const items = [...companies, ...companies];
    return (
        <div
            className={`${reverse ? 'marquee-track-reverse' : 'marquee-track'} items-center py-3`}
            aria-hidden
        >
            {items.map((name, i) => (
                <span
                    key={`${name}-${i}`}
                    className="mx-8 md:mx-12 text-xl md:text-2xl font-semibold tracking-tight text-slate-900/15 whitespace-nowrap select-none transition-colors duration-300 hover:text-slate-900/35"
                >
                    {name}
                </span>
            ))}
        </div>
    );
}

const SocialProof = () => {
    return (
        <Section className="py-20 md:py-28 border-y border-black/[0.06] bg-white/50 overflow-hidden">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUp}
                className="text-center max-w-2xl mx-auto mb-10 px-6"
            >
                <h2 className="font-serif-display text-2xl md:text-3xl tracking-tight text-slate-900 mb-3">
                    Built for product teams moving fast
                </h2>
                <p className="text-slate-600 text-[15px] leading-relaxed">
                    Curated with the help of PMs from teams at leading companies.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="marquee-group marquee-mask relative space-y-1"
            >
                <MarqueeRow />
                <MarqueeRow reverse />
            </motion.div>
        </Section>
    );
};

export default SocialProof;
