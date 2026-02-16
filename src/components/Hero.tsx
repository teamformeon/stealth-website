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
                        Build the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Right Thing.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl leading-relaxed text-balance font-light">
                        The AI-native product discovery engine. Import interviews, synthesize feedback, and generate PRDs in seconds.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-16">
                        <MagneticButton href="/#explore" className="px-10 py-4 bg-black text-white text-sm font-semibold rounded-2xl hover:bg-neutral-800 transition-colors shadow-lg shadow-black/20">
                            Start Discovery
                        </MagneticButton>
                        <MagneticButton href="/#vision" className="px-10 py-4 bg-white border border-slate-200 text-slate-900 text-sm font-semibold rounded-2xl hover:bg-slate-50 transition-colors hover:border-slate-300">
                            How it Works
                        </MagneticButton>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Graph Animation (Light Mode) */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[40%] aspect-square max-w-xl pointer-events-none hidden xl:block">
                <div className="w-full h-full relative">
                    <motion.div
                        className="absolute inset-0 border border-slate-100 rounded-full"
                        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute inset-[15%] border border-slate-100 rounded-full"
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {/* Floating Nodes */}
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100"
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <span className="text-2xl">🗣️</span>
                    </motion.div>
                    <motion.div
                        className="absolute bottom-1/4 right-1/3 w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100"
                        animate={{ y: [0, 25, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    >
                        <span className="text-3xl">📊</span>
                    </motion.div>
                    <motion.div
                        className="absolute top-1/3 right-10 w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100"
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    >
                        <span className="text-xl">📝</span>
                    </motion.div>

                    {/* Central Hub */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-2xl flex items-center justify-center border border-blue-100 z-10">
                        <div className="text-center">
                            <div className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">Insight</div>
                            <div className="w-8 h-1 bg-blue-500 rounded-full mx-auto" />
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Hero;
