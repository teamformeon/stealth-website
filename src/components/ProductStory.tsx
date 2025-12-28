'use client';

import React, { useState, useEffect } from 'react';
import Section from './Section';
import { motion, useAnimation } from 'framer-motion';
import { Terminal, Cpu, Database, MousePointer2, Code2, Globe, Shield } from 'lucide-react';

const ProductStory = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [nodes, setNodes] = useState<{ id: number; top: string; left: string; duration: number; delay: number }[]>([]);
    const cursorControls = useAnimation();

    useEffect(() => {
        setIsMounted(true);
        // Generate random nodes only on the client to fix hydration error and stabilize random values
        setNodes([...Array(8)].map((_, i) => ({
            id: i,
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 2,
        })));

        // Cursor sequence
        const runCursorSequence = async () => {
            while (true) {
                await cursorControls.start({ x: 100, y: 150, transition: { duration: 1.5, ease: "easeInOut" } });
                await new Promise(r => setTimeout(r, 500));
                await cursorControls.start({ x: 300, y: 80, transition: { duration: 1.2, ease: "easeInOut" } });
                await new Promise(r => setTimeout(r, 800));
                await cursorControls.start({ x: 50, y: 220, transition: { duration: 1.8, ease: "easeInOut" } });
                await new Promise(r => setTimeout(r, 600));
            }
        };
        runCursorSequence();
    }, [cursorControls]);

    return (
        <Section className="border-t border-white/5 bg-neutral-900/10 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-10 leading-tight">
                        Interactions <br />
                        <span className="text-neutral-500 italic">Reimagined.</span>
                    </h2>

                    <div className="space-y-8 text-neutral-400 text-lg leading-relaxed max-w-md">
                        <p>
                            Your apps should talk to each other. Stealth bridges the gap between your browser, your terminal, and your sensitive local data.
                        </p>
                        <p>
                            It isn’t a chatbot; it’s a system-wide companion that learns your habits and anticipates your needs.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative aspect-[4/3] rounded-3xl bg-stealth-gray border border-white/5 overflow-hidden shadow-2xl group"
                >
                    {/* Windows Header Pad */}
                    <div className="absolute inset-x-0 top-0 h-10 border-b border-white/5 bg-black/60 flex items-center justify-between px-6 z-30">
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                                <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                                <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                            </div>
                            <div className="h-4 w-px bg-white/10 mx-2" />
                            <div className="flex items-center gap-2 text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
                                <Terminal size={10} className="text-stealth-accent" />
                                <span>Stealth Context v1.0</span>
                            </div>
                        </div>
                        <div className="text-[9px] font-mono text-stealth-accent/60 flex items-center gap-1.5 uppercase font-bold tracking-widest">
                            <div className="w-1.5 h-1.5 rounded-full bg-stealth-accent animate-pulse" />
                            Live Utility
                        </div>
                    </div>

                    <div className="p-8 pt-16 h-full flex flex-col relative z-20">
                        <div className="grid grid-cols-12 gap-4 h-full">
                            {/* Left Side: Agent Activity Logs */}
                            <div className="col-span-4 flex flex-col gap-4">
                                <div className="premium-card p-4 h-full bg-black/40 border-white/5 overflow-hidden flex flex-col">
                                    <div className="text-[8px] font-bold text-neutral-600 uppercase mb-4 flex items-center gap-1.5 tracking-widest">
                                        <Code2 size={10} /> Activity Log
                                    </div>
                                    <div className="space-y-3 font-mono text-[9px] text-neutral-500">
                                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>&gt; Initializing local node...</motion.div>
                                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>&gt; Indexing file system...</motion.div>
                                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>&gt; Binding accessibility API...</motion.div>
                                        <motion.div className="text-stealth-accent" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 1.5 }}>&gt; AGENT ACTIVE</motion.div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Interaction Area */}
                            <div className="col-span-8 flex flex-col gap-4">
                                <div className="premium-card p-6 grow bg-black/40 border-white/5 relative flex flex-col items-center justify-center overflow-hidden">
                                    {/* Ghost Cursor Overlay */}
                                    <motion.div
                                        animate={cursorControls}
                                        className="absolute z-50 pointer-events-none text-stealth-accent/80 drop-shadow-[0_0_8px_rgba(0,245,255,0.4)]"
                                    >
                                        <MousePointer2 size={18} fill="currentColor" />
                                        <motion.div
                                            animate={{ scale: [1, 2, 1], opacity: [0, 0.5, 0] }}
                                            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                                            className="absolute -inset-2 rounded-full border border-stealth-accent"
                                        />
                                    </motion.div>

                                    {/* Agent Presence Visual */}
                                    <div className="relative z-10 text-center">
                                        <motion.div
                                            animate={{
                                                boxShadow: ["0 0 20px rgba(0,245,255,0.1)", "0 0 40px rgba(0,245,255,0.2)", "0 0 20px rgba(0,245,255,0.1)"]
                                            }}
                                            transition={{ duration: 4, repeat: Infinity }}
                                            className="w-20 h-20 rounded-full bg-stealth-accent/5 border border-stealth-accent/20 flex items-center justify-center relative mx-auto mb-6"
                                        >
                                            <Cpu size={28} className="text-stealth-accent" />
                                            <motion.div
                                                className="absolute inset-0 border-2 border-stealth-accent/10 rounded-full border-t-transparent"
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                            />
                                        </motion.div>
                                        <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.4em]">Autonomous Mode</p>
                                    </div>

                                    {/* Floating Nodes (Hydration Fixed) */}
                                    {isMounted && nodes.map((node) => (
                                        <motion.div
                                            key={node.id}
                                            className="absolute w-1 h-1 bg-stealth-accent rounded-full opacity-40"
                                            style={{ top: node.top, left: node.left }}
                                            animate={{
                                                scale: [1, 1.5, 1],
                                                opacity: [0.2, 0.4, 0.2]
                                            }}
                                            transition={{
                                                duration: node.duration,
                                                repeat: Infinity,
                                                delay: node.delay
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* App Dock/Control Bar */}
                                <div className="h-12 premium-card bg-[#0a0a0a] border-white/5 flex items-center px-4 justify-between">
                                    <div className="flex gap-4">
                                        {[Globe, Database, Shield, Terminal].map((Icon, i) => (
                                            <div key={i} className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-neutral-500 group-hover:text-neutral-300 transition-colors">
                                                <Icon size={14} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="h-4 w-px bg-white/10" />
                                    <div className="flex gap-2">
                                        <div className="px-3 py-1 rounded bg-stealth-accent/10 border border-stealth-accent/20 text-[9px] font-mono text-stealth-accent uppercase tracking-widest font-bold">
                                            Indexing...
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scanning Sweep */}
                    <motion.div
                        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-stealth-accent/30 to-transparent z-40 pointer-events-none"
                        animate={{ top: ["20%", "95%", "20%"] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none z-10" />
                </motion.div>
            </div>
        </Section>
    );
};

export default ProductStory;
