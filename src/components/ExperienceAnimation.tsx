'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Mail,
    MessageSquare,
    Trello,
    FileText,
    Smile,
    Frown,
    CheckCircle2,
    Sparkles
} from 'lucide-react';

const ExperienceAnimation = () => {
    // Phases: 0 (Chaos), 1 (Integration), 2 (Unified), 3 (Relaxed)

    return (
        <div className="relative w-full aspect-[16/9] bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/5 flex items-center justify-center">
            {/* Background Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-br from-[#4a3aff]/10 to-transparent blur-[100px]"
            />

            {/* App Windows - Chaos Phase */}
            <div className="absolute inset-0 z-10">
                {[
                    { Icon: Mail, color: '#EA4335', delay: 0 },
                    { Icon: MessageSquare, color: '#4A154B', delay: 0.1 },
                    { Icon: Trello, color: '#0052CC', delay: 0.2 },
                    { Icon: FileText, color: '#4285F4', delay: 0.3 }
                ].map((app, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                        animate={{
                            // Phase 0: Chaos
                            x: [
                                (i % 2 === 0 ? 100 : -100),
                                (i % 2 === 0 ? -80 : 80),
                                0
                            ],
                            y: [
                                (i < 2 ? 80 : -80),
                                (i < 2 ? -60 : 60),
                                0
                            ],
                            rotate: [0, i % 2 === 0 ? 15 : -15, 0],
                            scale: [1, 0.9, 1],
                            opacity: [1, 1, 0], // Fades out as they integrate
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            times: [0, 0.3, 0.4], // Chaos ends at 30%, Fades out by 40%
                            ease: "easeInOut"
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                        <div
                            className="p-4 rounded-2xl bg-black border border-white/10 shadow-2xl backdrop-blur-md"
                            style={{ boxShadow: `0 0 30px ${app.color}20` }}
                        >
                            <app.Icon size={32} style={{ color: app.color }} />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Stealth AI Intervention */}
            <motion.div
                animate={{
                    scale: [0, 1.2, 1, 0],
                    opacity: [0, 1, 1, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    times: [0.3, 0.35, 0.8, 1], // Appears at 30%, stays until 80%
                    ease: "anticipate"
                }}
                className="relative z-20"
            >
                <div className="w-24 h-24 bg-[#4a3aff] rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(74,58,255,0.6)]">
                    <Sparkles size={40} className="text-white animate-pulse" />
                </div>
            </motion.div>

            {/* Unified Dashboard UI - Phase 2 */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0.8, 1, 1, 0.8],
                    y: [20, 0, 0, 20]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    times: [0.4, 0.5, 0.8, 1], // Appears after chaos (40%), stays until 80%
                }}
                className="absolute z-30 w-[80%] max-w-2xl bg-stealth-black border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden"
            >
                <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-4">
                    <div className="w-8 h-8 bg-stealth-accent rounded-lg flex items-center justify-center">
                        <CheckCircle2 size={16} className="text-black" />
                    </div>
                    <div>
                        <div className="text-[10px] font-black tracking-widest text-[#4a3aff] uppercase">Unified Context</div>
                        <div className="text-[10px] text-neutral-500 font-mono">Stealth AI Operational</div>
                    </div>
                </div>

                <div className="space-y-4">
                    {[
                        { title: 'Slack Summary', text: 'Decision reached on API architecture.', color: '#4A154B' },
                        { title: 'Email Action', text: 'Drafted follow-up for client review.', color: '#EA4335' },
                        { title: 'Documentation', text: 'Auto-indexed technical requirements.', color: '#4285F4' }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{
                                delay: 2 + i * 0.2, // Starts around 40% point (2s / 5s)
                                repeat: Infinity,
                                repeatDelay: 5 - (0.5 + i * 0.1) // This is tricky with repeat: Infinity.
                                // Actually, within the 5s loop:
                            }}
                            // Better way to do sequential items in a fixed duration loop:
                            style={{
                                animation: `fadeInRight 5s infinite`,
                                animationDelay: `${2.2 + i * 0.3}s`
                            }}
                            className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5"
                        >
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                            <div className="flex-grow">
                                <div className="text-[10px] font-bold text-white mb-1 uppercase tracking-tight">{item.title}</div>
                                <div className="text-xs text-neutral-500">{item.text}</div>
                            </div>
                            <Sparkles size={14} className="text-stealth-accent/40" />
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* User Avatar & Emotion */}
            <motion.div
                className="absolute bottom-12 z-40 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-4 rounded-full flex items-center gap-4 shadow-xl"
                animate={{
                    y: [0, -5, 0],
                    opacity: [1, 1, 1, 1]
                }}
                transition={{ duration: 5, repeat: Infinity }}
            >
                <div className="relative">
                    {/* Stressed Face */}
                    <motion.div
                        animate={{
                            opacity: [1, 0, 0, 1],
                            scale: [1, 1, 1, 1]
                        }}
                        transition={{ duration: 5, repeat: Infinity, times: [0, 0.4, 0.9, 1] }}
                    >
                        <Frown className="text-neutral-500" size={24} />
                    </motion.div>
                    {/* Relaxed Face */}
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            opacity: [0, 1, 1, 0],
                            scale: [0.8, 1, 1, 0.8]
                        }}
                        transition={{ duration: 5, repeat: Infinity, times: [0, 0.5, 0.8, 0.9] }}
                    >
                        <Smile className="text-emerald-500" size={24} />
                    </motion.div>
                </div>
                <div className="text-xs font-bold text-neutral-400">
                    <motion.span
                        animate={{
                            opacity: [1, 0, 0, 1],
                        }}
                        transition={{ duration: 5, repeat: Infinity, times: [0, 0.4, 0.9, 1] }}
                    >
                        Overwhelmed
                    </motion.span>
                    <motion.span
                        className="absolute ml-[-78px]"
                        animate={{
                            opacity: [0, 1, 1, 0],
                        }}
                        transition={{ duration: 5, repeat: Infinity, times: [0, 0.5, 0.8, 0.9] }}
                    >
                        Workflow Seamless
                    </motion.span>
                </div>
            </motion.div>

            {/* App Logo Corner */}
            <motion.div
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 5, repeat: Infinity, times: [0.5, 0.6, 0.9, 1] }}
                className="absolute bottom-8 right-8 z-50 flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 border border-white/10 rounded-xl"
            >
                <div className="w-5 h-5 bg-[#4a3aff] rounded rotate-45 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 text-white -rotate-45">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                    </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white">Stealth Technologies</span>
            </motion.div>

            <style jsx>{`
                @keyframes fadeInRight {
                    0%, 40% { opacity: 0; transform: translateX(-20px); }
                    50%, 80% { opacity: 1; transform: translateX(0); }
                    90%, 100% { opacity: 0; transform: translateX(-20px); }
                }
            `}</style>
        </div>
    );
};

export default ExperienceAnimation;
