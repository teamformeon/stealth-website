'use client';

import React from 'react';
import Link from 'next/link';
import Section from './Section';
import { motion } from 'framer-motion';

const FinalCTA = () => {
    return (
        <Section className="py-24 md:py-36">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto text-center"
            >
                <h2 className="font-serif-display text-3xl md:text-[2.75rem] leading-tight tracking-tight text-[#171717] mb-5 text-balance">
                    Stop rebuilding context from scratch
                </h2>
                <p className="text-[#6b6b6b] text-lg md:text-xl leading-relaxed mb-10 text-balance max-w-xl mx-auto">
                    Give your product team a memory layer that turns scattered knowledge into structured product work.
                </p>
                <Link href="/#contact" className="btn-primary">
                    Book a demo
                </Link>
            </motion.div>
        </Section>
    );
};

export default FinalCTA;
