import type { Variants } from 'framer-motion';

export const easeOut = [0.16, 1, 0.3, 1] as const;

export const viewport = {
    once: true,
    margin: '-60px' as const,
    amount: 0.25 as const,
};

export const spring = {
    type: 'spring' as const,
    stiffness: 140,
    damping: 22,
    mass: 0.8,
};

export const springSnappy = {
    type: 'spring' as const,
    stiffness: 380,
    damping: 26,
};

export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 32, filter: 'blur(10px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.95, ease: easeOut },
    },
};

export const fadeUpChild: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.8, ease: easeOut },
    },
};

export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.16, delayChildren: 0.1 },
    },
};

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.94, y: 16 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.65, ease: easeOut },
    },
};

export const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -28 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.55, ease: easeOut },
    },
};

export const slideInRight: Variants = {
    hidden: { opacity: 0, x: 28 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.55, ease: easeOut },
    },
};
