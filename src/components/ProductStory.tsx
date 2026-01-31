'use client';

import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import ConsolidationVisual from './ConsolidationVisual';

const ProductStory = () => {
    return (
        <Section className="border-t border-white/5 bg-neutral-900/10 overflow-hidden flex flex-col items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-6xl aspect-square md:aspect-video rounded-3xl overflow-hidden shadow-2xl"
            >
                <ConsolidationVisual />
            </motion.div>
        </Section>
    );
};

export default ProductStory;
