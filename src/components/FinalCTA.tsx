'use client';

import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';

const FinalCTA = () => {
    return (
        <Section id="explore" className="pb-48">
            <div className="relative p-12 md:p-32 rounded-[3rem] bg-stealth-gray border border-white/5 overflow-hidden text-center">
                <div className="absolute inset-0 bg-hero-gradient opacity-20 pointer-events-none" />

                <div className="relative z-10 max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-7xl font-black mb-10 tracking-tighter uppercase">
                        The future is <span className="text-stealth-accent italic">Prompt-Free.</span>
                    </h2>
                    <p className="text-neutral-400 text-xl mb-12 leading-relaxed">
                        Stealth Technologies is currently in a closed, early-access beta.
                    </p>
                </div>
            </div>
        </Section>
    );
};

export default FinalCTA;
