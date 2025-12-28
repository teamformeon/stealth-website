'use client';

import React from 'react';
import Section from './Section';
import Button from './Button';
import { motion } from 'framer-motion';

const FinalCTA = () => {
    return (
        <Section className="pb-48">
            <div className="relative p-12 md:p-32 rounded-[3rem] bg-stealth-gray border border-white/5 overflow-hidden text-center">
                <div className="absolute inset-0 bg-hero-gradient opacity-20 pointer-events-none" />

                <div className="relative z-10 max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-7xl font-black mb-10 tracking-tighter uppercase">
                        Build <span className="text-stealth-accent italic">Faster</span>.
                    </h2>
                    <p className="text-neutral-400 text-xl mb-12 leading-relaxed">
                        Join the elite tier of professionals amplifying their output with Stealth.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <input
                            type="email"
                            placeholder="Enter your work email"
                            className="w-full sm:w-80 h-16 px-8 rounded-full bg-black border border-white/5 text-white focus:outline-none focus:border-stealth-accent/30 transition-all placeholder:text-neutral-600"
                            required
                        />
                        <Button variant="glow" size="lg" className="h-16 px-10 w-full sm:w-auto font-black uppercase text-sm tracking-widest bg-white text-black">
                            Request Invitation
                        </Button>
                    </div>

                    <p className="mt-10 text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-600">
                        macOS 12+ / Windows 10+ / Linux COMING SOON
                    </p>
                </div>
            </div>
        </Section>
    );
};

export default FinalCTA;
