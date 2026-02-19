'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Section from './Section';

const ScrollRevealSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress within this specific container
    // We make the container taller than the viewport to create the "lock" feel
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Create smooth progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Transform scroll progress into various animation states
    const opacity1 = useTransform(smoothProgress, [0, 0.2], [0, 1]);
    const opacity2 = useTransform(smoothProgress, [0.25, 0.45], [0.1, 1]);
    const opacity3 = useTransform(smoothProgress, [0.5, 0.7], [0.1, 1]);

    const scale1 = useTransform(smoothProgress, [0, 0.2], [0.95, 1]);
    const scale2 = useTransform(smoothProgress, [0.25, 0.45], [0.95, 1]);
    const scale3 = useTransform(smoothProgress, [0.5, 0.7], [0.95, 1]);

    const items = [
        {
            title: "Context-Aware",
            text: "Stealth reads your screen to understand exactly what you're working on.",
            opacity: opacity1,
            scale: scale1
        },
        {
            title: "Prompt-Free",
            text: "No more engineering complex prompts. AI suggests the next move automatically.",
            opacity: opacity2,
            scale: scale2
        },
        {
            title: "Native Speed",
            text: "Built for macOS and Windows. Zero tabs. Zero lag. Absolute focus.",
            opacity: opacity3,
            scale: scale3
        }
    ];

    return (
        <div ref={containerRef} className="relative h-[300vh] bg-slate-900">
            {/* Sticky viewport content */}
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
                <div className="max-w-4xl px-6 w-full">
                    <motion.div
                        className="text-center mb-24"
                        style={{ opacity: useTransform(smoothProgress, [0, 0.1], [1, 0.8]) }}
                    >
                        <h2 className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight">
                            The Future of <br />
                            <span className="text-blue-400">Human-AI Interaction.</span>
                        </h2>
                        <p className="text-slate-400 text-xl font-medium">Scroll to reveal the superpower.</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {items.map((item, i) => (
                            <motion.div
                                key={i}
                                style={{ opacity: item.opacity, scale: item.scale }}
                                className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm"
                            >
                                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-6 font-bold">
                                    0{i + 1}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                                <p className="text-slate-400 leading-relaxed font-medium">
                                    {item.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Background decorative element that reacts to scroll */}
                <motion.div
                    className="absolute inset-0 -z-10 opacity-20 pointer-events-none"
                    style={{
                        background: useTransform(
                            smoothProgress,
                            [0, 0.5, 1],
                            [
                                "radial-gradient(circle at 50% 50%, #3b82f6 0%, transparent 50%)",
                                "radial-gradient(circle at 20% 80%, #6366f1 0%, transparent 50%)",
                                "radial-gradient(circle at 80% 20%, #3b82f6 0%, transparent 50%)"
                            ]
                        )
                    }}
                />
            </div>
        </div>
    );
};

export default ScrollRevealSection;
