'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
    }),
};

const Hero = () => {
    return (
        <section className="pt-36 pb-20 md:pt-44 md:pb-28 px-6 relative overflow-hidden">
            <div
                className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-40"
                style={{
                    background:
                        'radial-gradient(ellipse, rgba(79, 93, 255, 0.12) 0%, transparent 70%)',
                }}
            />

            <div className="max-w-4xl mx-auto text-center relative">
                <motion.div initial="hidden" animate="visible">
                    <motion.div custom={0} variants={fadeUp}>
                        <Link
                            href="/#product"
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8eaff] text-[#3d4ae8] text-sm font-medium mb-10 hover:bg-[#dce0ff] transition-colors"
                        >
                            Built for product teams
                            <motion.span
                                animate={{ x: [0, 3, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                            >
                                <ArrowRight className="w-3.5 h-3.5" />
                            </motion.span>
                        </Link>
                    </motion.div>

                    <motion.h1
                        custom={1}
                        variants={fadeUp}
                        className="font-serif-display text-[2.75rem] sm:text-5xl md:text-[3.5rem] lg:text-[4rem] leading-[1.08] tracking-tight text-[#12141c] text-balance mb-7"
                    >
                        Your product team&apos;s memory layer
                    </motion.h1>

                    <motion.p
                        custom={2}
                        variants={fadeUp}
                        className="text-lg md:text-xl text-[#64687a] max-w-2xl mx-auto leading-relaxed text-balance mb-10"
                    >
                        Formeon connects to the tools your team already uses, remembers past product decisions, and helps PMs generate PRDs, tickets, and specs with company-specific context.
                    </motion.p>

                    <motion.div
                        custom={3}
                        variants={fadeUp}
                        className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20"
                    >
                        <Link href="/#contact" className="btn-primary w-full sm:w-auto">
                            Book a demo
                        </Link>
                        <Link href="/#product" className="btn-secondary w-full sm:w-auto">
                            See how it works
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto text-left"
                >
                    <motion.div
                        className="product-window p-5 md:p-6 animate-float"
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                    >
                        <p className="text-[11px] font-medium uppercase tracking-wider text-[#9a9ca8] mb-4">
                            Scattered context
                        </p>
                        <motion.div
                            className="space-y-2.5 text-sm text-[#52556a]"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
                            }}
                        >
                            {[
                                ['#product', 'Can we ship SSO for enterprise?'],
                                ['#sales', '3 customers blocked on auth...'],
                                ['Jira', 'FEAT-284 — draft, no AC'],
                                ['Notion', 'Q3 roadmap notes (outdated)'],
                            ].map(([tag, text], i) => (
                                <motion.p
                                    key={tag}
                                    variants={{
                                        hidden: { opacity: 0, x: -12 },
                                        visible: { opacity: 1 - i * 0.15, x: 0 },
                                    }}
                                    className="flex gap-2"
                                >
                                    <span className="text-[#a0a3b1]">{tag}</span>
                                    {text}
                                </motion.p>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="product-window p-5 md:p-6 relative animate-float-delayed"
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                    >
                        <motion.div
                            className="flex items-center gap-2 mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            <motion.div
                                animate={{ rotate: [0, 8, -8, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                            >
                                <Sparkles className="w-4 h-4 text-[#4f5dff]" />
                            </motion.div>
                            <p className="text-[11px] font-medium uppercase tracking-wider text-[#4f5dff]">
                                Formeon output
                            </p>
                        </motion.div>
                        <div className="space-y-3 text-sm">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.85, duration: 0.5 }}
                                className="rounded-xl bg-[#eef0f8] p-3.5 border border-[#dfe2f0]"
                            >
                                <p className="font-medium text-[#12141c] mb-1">PRD: Enterprise SSO</p>
                                <p className="text-[#64687a] text-[13px] leading-relaxed">
                                    Grounded in 4 Slack threads, similar launch from Q1, and 2 customer calls.
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.05, staggerChildren: 0.1 }}
                                className="flex gap-2 flex-wrap"
                            >
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.1 }}
                                    className="px-2.5 py-1 rounded-md bg-white border border-[#dfe2f0] text-[12px] text-[#52556a]"
                                >
                                    3 Jira tickets suggested
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.2 }}
                                    className="px-2.5 py-1 rounded-md bg-amber-50 border border-amber-100 text-[12px] text-amber-800"
                                >
                                    Missing acceptance criteria
                                </motion.span>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
