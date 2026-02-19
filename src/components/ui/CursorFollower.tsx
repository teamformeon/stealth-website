'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CursorFollower = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Mouse coordinates
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth dampening for the movement
    const smoothX = useSpring(mouseX, { damping: 20, stiffness: 200 });
    const smoothY = useSpring(mouseY, { damping: 20, stiffness: 200 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [mouseX, mouseY, isVisible]);

    return (
        <motion.div
            style={{
                position: 'fixed',
                left: 0,
                top: 0,
                x: smoothX,
                y: smoothY,
                pointerEvents: 'none',
                zIndex: 9999,
                translateX: '-50%',
                translateY: '-50%',
            }}
            animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.8,
            }}
            transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.3 } }}
        >
            {/* The main glow */}
            <div className="w-[300px] h-[300px] bg-blue-400/10 rounded-full blur-[80px]" />

            {/* The core dot (subtle) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500/20 rounded-full blur-sm" />
        </motion.div>
    );
};

export default CursorFollower;
