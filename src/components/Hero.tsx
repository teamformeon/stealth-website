'use client';

import React from 'react';
import Section from '@/components/Section';
import { motion } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import DownloadButton from '@/components/DownloadButton';

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
                        The Productivity Layer <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">for Product Managers.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl leading-relaxed text-balance font-light">
                        Desktop Native. Zero Tabs. <br />
                        Context-Aware AI that lives where you work.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <MagneticButton href="#pricing" className="px-10 py-4 bg-black text-white text-sm font-semibold rounded-2xl hover:bg-neutral-800 transition-colors shadow-lg shadow-black/20">
                            Download for Free
                        </MagneticButton>
                        <MagneticButton href="#pricing" className="px-10 py-4 bg-white border border-slate-200 text-slate-900 text-sm font-semibold rounded-2xl hover:bg-slate-50 transition-colors hover:border-slate-300">
                            View Pricing
                        </MagneticButton>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-16 flex flex-wrap gap-6"
                    >
                        <DownloadButton platform="windows" />
                    </motion.div>
                </motion.div>
            </div>
        </Section>
    );
};

export default Hero;
