'use client';

import React from 'react';
import { motion } from 'framer-motion';

const logos = [
    { name: 'Google', url: '/logos/google.svg' },
    { name: 'Uber', url: '/logos/uber.svg' },
    { name: 'Underdog', url: '/logos/underdog.png', large: true },
    { name: 'Microsoft', url: '/logos/microsoft.svg' },
    { name: 'Apple', url: '/logos/apple.svg' },
    { name: 'Nintendo', url: '/logos/nintendo.png', large: true },
];

const CompanyLogos = () => {
    return (
        <section className="py-10 bg-white border-b border-slate-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-6">
                <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest">
                    Trusted by product teams at
                </p>
            </div>

            <div className="relative flex overflow-hidden group">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                {/* Scrolling Container */}
                <motion.div
                    className="flex items-center gap-16 min-w-full pl-16"
                    animate={{
                        x: ["0%", "-100%"],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 25,
                            ease: "linear",
                        },
                    }}
                >
                    {[...logos, ...logos, ...logos].map((logo, idx) => (
                        <div
                            key={`${logo.name}-${idx}`}
                            className={`flex-shrink-0 flex items-center justify-center ${logo.large ? 'min-w-[220px]' : 'min-w-[140px]'}`}
                        >
                            <img
                                src={logo.url}
                                alt={`${logo.name} logo`}
                                className={`w-auto object-contain ${logo.large ? 'h-20' : 'h-12'}`}
                            />
                        </div>
                    ))}
                </motion.div>

                {/* Duplicate for seamless loop (handled by tripling the array above for safety on wide screens,
                    but framer-motion x: -100% on the container works best with 2 sets.
                    Let's use the standard "scrolling ticker" technique where we have enough content to fill screen twice)
                */}
            </div>
        </section>
    );
};

export default CompanyLogos;
