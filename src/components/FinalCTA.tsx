'use client';

import React from 'react';
import Link from 'next/link';
import Section from './Section';
import { motion } from 'framer-motion';
import { fadeUp, fadeUpChild, springSnappy, staggerContainer, viewport } from '@/lib/motion';

const FinalCTA = () => {
    return (
        <Section className="py-24 md:py-36 relative overflow-hidden">
            <motion.div
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                aria-hidden
            >
                <motion.div
                    className="w-[500px] h-[300px] rounded-full"
                    style={{
                        background: 'radial-gradient(ellipse, rgba(79, 93, 255, 0.08) 0%, transparent 70%)',
                    }}
                    animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                />
            </motion.div>

            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="max-w-3xl mx-auto text-center relative"
            >
                <motion.h2
                    variants={fadeUpChild}
                    className="font-serif-display text-3xl md:text-[2.75rem] leading-tight tracking-tight text-[#12141c] mb-5 text-balance"
                >
                    Stop rebuilding context from scratch
                </motion.h2>
                <motion.p
                    variants={fadeUpChild}
                    className="text-[#64687a] text-lg md:text-xl leading-relaxed mb-10 text-balance max-w-xl mx-auto"
                >
                    Give your product team a memory layer that turns scattered knowledge into structured product work.
                </motion.p>
                <motion.div variants={fadeUpChild} className="inline-block">
                    <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        transition={springSnappy}
                        className="rounded-full"
                    >
                        <Link href="/#contact" className="btn-primary">
                            Book a demo
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        </Section>
    );
};

export default FinalCTA;
