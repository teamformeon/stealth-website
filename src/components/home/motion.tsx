'use client';

import React from 'react';
import { motion, MotionConfig } from 'framer-motion';
import { easeOut, fadeUp, fadeUpChild, staggerContainer, viewport } from '@/lib/motion';

// Honour the OS "reduce motion" setting for every framer animation below it.
export const MotionRoot = ({ children }: { children: React.ReactNode }) => (
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
);

type DivProps = { children: React.ReactNode; className?: string; delay?: number };

// Granola-style soft rise: fade + lift + un-blur as the block scrolls in.
export const Reveal = ({ children, className, delay = 0 }: DivProps) => (
    <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        // variant transitions win over the transition prop, so the delay goes in the variant
        variants={{
            hidden: fadeUp.hidden,
            visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.95, ease: easeOut, delay } },
        }}
    >
        {children}
    </motion.div>
);

export const Stagger = ({ children, className, gap = 0.12 }: Omit<DivProps, 'delay'> & { gap?: number }) => (
    <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={{ ...staggerContainer, visible: { transition: { staggerChildren: gap, delayChildren: 0.1 } } }}
    >
        {children}
    </motion.div>
);

export const StaggerItem = ({ children, className }: Omit<DivProps, 'delay'>) => (
    <motion.div className={className} variants={fadeUpChild}>
        {children}
    </motion.div>
);
