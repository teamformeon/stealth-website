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
        <g transform="translate(12 12.2) scale(0.78) translate(-12 -12)">
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
        </g>
    </svg>
);

export const WindowsIcon = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
        <path d="M0 3.45 9.75 2.1v9.45H0V3.45zm10.95-1.6L24 0v11.4H10.95V1.85zM0 12.6h9.75v9.45L0 20.7V12.6zm10.95 0H24V24l-13.05-1.8V12.6z" />
    </svg>
);

export type DesktopPlatform = 'mac' | 'windows';

export const useDesktopPlatform = (): DesktopPlatform => {
    const [platform, setPlatform] = React.useState<DesktopPlatform>('mac');

    React.useEffect(() => {
        const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
        const hint = `${nav.userAgentData?.platform ?? ''} ${navigator.platform} ${navigator.userAgent}`;
        if (/win/i.test(hint)) setPlatform('windows');
    }, []);

    return platform;
};

