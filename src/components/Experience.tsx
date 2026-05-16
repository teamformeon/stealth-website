'use client';

import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import ExperienceAnimation from './ExperienceAnimation';

const Experience = () => {
    return (
        <Section id="how-it-works" className="border-t border-white/5 bg-black overflow-hidden py-32">
            <div className="flex flex-col items-center text-center mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl"
                >
                    <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 uppercase leading-none">
                        Chaos to <br />
                        <span className="text-formeon-accent italic">Order.</span>
                    </h2>
                    <p className="text-neutral-500 text-xl leading-relaxed">
                        Formeon Technologies bridges the gap between fragmented tools.
                        Watch as chaos integrates into a seamless, high-performance workflow.
                    </p>
                </motion.div>
            </div>

            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <ExperienceAnimation />

                    {/* Decorative elements around the animation */}
                    <div className="absolute -top-12 -left-12 w-24 h-24 border-l border-t border-formeon-accent/20" />
                    <div className="absolute -bottom-12 -right-12 w-24 h-24 border-r border-b border-formeon-accent/20" />
                </motion.div>
            </div>
        </Section>
    );
};

export default Experience;
