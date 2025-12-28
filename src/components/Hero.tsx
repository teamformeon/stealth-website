'use client';

import React from 'react';
import Section from '@/components/Section';
import DownloadButtons from './DownloadButtons';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <Section className="min-h-[90vh] flex flex-col justify-center overflow-visible">
            <div className="max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stealth-gray border border-white/5 text-neutral-400 text-[11px] font-mono tracking-wider mb-8 uppercase">
                        <span className="w-1 h-1 rounded-full bg-stealth-accent animate-pulse" />
                        Limited Beta v1.0.0
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.95] text-balance">
                        The OS for <br />
                        <span className="text-stealth-accent">Intelligence.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-neutral-400 mb-12 max-w-2xl leading-relaxed text-balance">
                        Stealth is a deeply integrated AI layer for professional workflows. <br className="hidden md:block" />
                        Automate the mundane. Focus on the creative.
                    </p>

                    <DownloadButtons className="mb-16" />
                </motion.div>
            </div>

            {/* Decorative side element */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 aspect-square max-w-md pointer-events-none hidden xl:block">
                <div className="w-full h-full relative">
                    <div className="absolute inset-0 border border-white/5 rounded-full scale-110" />
                    <div className="absolute inset-0 border border-white/5 rounded-full scale-75 rotate-45" />
                    <div className="absolute inset-0 bg-gradient-to-br from-stealth-accent/40 to-transparent blur-[100px] opacity-20" />
                </div>
            </div>
        </Section>
    );
};

export default Hero;
