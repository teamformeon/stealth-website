'use client';

import React from 'react';
import Section from '@/components/Section';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';

const Hero = () => {
    return (
        <Section className="min-h-[90vh] flex flex-col justify-center overflow-visible relative">
            <div className="max-w-5xl z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-[11px] font-medium tracking-wide mb-8 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Beta Access
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.95] text-balance text-black">
                        AI That <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Knows Your Context.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl leading-relaxed text-balance font-light">
                        A system-wide AI assistant that works two ways: automatically analyze your screen and get suggestions, or type natural language commands. Press a hotkey, get intelligent help.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-16">
                        <MagneticButton href="/#book-demo" className="px-10 py-4 bg-black text-white text-sm font-semibold rounded-2xl hover:bg-neutral-800 transition-colors shadow-lg shadow-black/20">
                            Try Stealth Out
                        </MagneticButton>
                        <MagneticButton href="/#vision" className="px-10 py-4 bg-white border border-slate-200 text-slate-900 text-sm font-semibold rounded-2xl hover:bg-slate-50 transition-colors hover:border-slate-300">
                            See How It Works
                        </MagneticButton>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
};

export default Hero;
