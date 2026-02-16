'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    href?: string;
}

export default function MagneticButton({ children, className = "", onClick, href }: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        x.set(middleX);
        y.set(middleY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const Content = (
        <motion.div
            className={`relative overflow-hidden cursor-pointer ${className}`}
            ref={ref}
            style={{ x: mouseX, y: mouseY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );

    if (href) {
        return <a href={href} className="inline-block">{Content}</a>;
    }

    return Content;
}
