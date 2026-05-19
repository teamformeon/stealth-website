'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeUpChild, springSnappy, staggerContainer } from '@/lib/motion';

const DiscoveryHubAnimation = dynamic(() => import('@/components/animations/DiscoveryHubAnimation'), {
    ssr: false,
    loading: () => (
        <motion.div className="w-full aspect-[16/10] max-h-[320px] md:max-h-[520px] rounded-2xl bg-white border border-black/[0.06] animate-pulse" />
    ),
});

const Hero = () => {
    return (
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 relative overflow-hidden">
            <motion.div
                className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[min(800px,95vw)] h-[480px] rounded-full animate-glow-pulse opacity-60"
                style={{
                    background:
                        'radial-gradient(ellipse, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
                }}
                aria-hidden
            />

            <div className="max-w-6xl mx-auto relative">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="text-center lg:text-left"
                    >
                        <motion.div variants={fadeUpChild}>
                            <Link
                                href="/#product"
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF2FF] text-[#6366F1] text-sm font-medium mb-8 hover:bg-[#E0E7FF] transition-colors"
                            >
                                Decision intelligence for product teams
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </motion.div>

                        <motion.h1
                            variants={fadeUpChild}
                            className="font-serif-display text-[2.5rem] sm:text-5xl md:text-[3.25rem] leading-[1.08] tracking-tight text-slate-900 text-balance mb-6"
                        >
                            Your team&apos;s decisions, remembered.
                        </motion.h1>

                        <motion.p
                            variants={fadeUpChild}
                            className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed text-balance mb-8"
                        >
                            Know what to build next — with proof. Formeon captures proposals, outcomes, and lessons from the tools you already use.
                        </motion.p>

                        <motion.div
                            variants={fadeUpChild}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
                        >
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={springSnappy}>
                                <Link href="/#contact" className="btn-primary w-full sm:w-auto">
                                    Book a demo
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={springSnappy}>
                                <Link href="/#product" className="btn-secondary w-full sm:w-auto">
                                    See how it works
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="order-first lg:order-last"
                    >
                        <DiscoveryHubAnimation />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
