'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface FeatureCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    delay?: number;
}

const FeatureCard = ({ title, description, icon, delay = 0 }: FeatureCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
            className="premium-card p-10 group"
        >
            <div className="w-12 h-12 rounded-2xl bg-stealth-light-gray border border-white/10 flex items-center justify-center mb-8 text-neutral-400 group-hover:text-stealth-accent group-hover:bg-stealth-accent/10 transition-all duration-300">
                {icon}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
            <p className="text-neutral-500 leading-relaxed group-hover:text-neutral-400 transition-colors">
                {description}
            </p>
        </motion.div>
    );
};

export default FeatureCard;
