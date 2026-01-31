'use client';

import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import ConsolidationVisual from './ConsolidationVisual';

const ProductStory = () => {
    return (
        <Section className="border-t border-white/5 bg-neutral-900/10 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-10 leading-tight uppercase">
                        Why work is <br />
                        <span className="text-stealth-accent italic">fragmented.</span>
                    </h2>

                    <div className="space-y-8 text-neutral-400 text-lg leading-relaxed max-w-md">
                        <p>
                            Smart people spend half their time copying, pasting, and coordinating between a dozen different apps. Context is lost, intent is buried, and every task feels like a manual chore.
                        </p>
                        <p>
                            Existing AI tools still require you to switch tabs, write manual prompts, and explain exactly what you need—every single time. It’s just more work.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative aspect-square lg:aspect-[4/3] w-full max-w-2xl mx-auto"
                >
                    <ConsolidationVisual />
                </motion.div>
            </div>
        </Section>
    );
};

export default ProductStory;
