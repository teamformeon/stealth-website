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

export const AppleIcon = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
        <path d="M17.05 20.28c-.98.95-2.05 1.79-3.48 1.79-1.42 0-1.88-.87-3.57-.87-1.69 0-2.2.85-3.56.87-1.33.02-2.39-.84-3.41-1.83-2.07-2.01-3.66-5.69-3.66-9.15 0-3.43 1.72-5.24 3.39-5.24 1.63 0 2.54 1.01 3.77 1.01 1.21 0 2.21-1.04 3.96-1.04 1.48 0 3.33.79 4.38 2.26-2.73 1.64-2.29 5.38.48 6.5-.59 1.49-1.37 2.97-2.3 4.29zm-4.75-15.35c-.15-2.07 1.64-3.89 3.52-4.11.19 2.22-1.84 4.09-3.52 4.11z" />
    </svg>
);

