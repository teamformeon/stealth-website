'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail,
    Calendar,
    CheckSquare,
    BarChart3,
    Sparkles,
    CheckCircle2,
    MessageSquare,
    Clock,
    Zap
} from 'lucide-react';

const MorningBriefDemo = () => {
    const [phase, setPhase] = useState<number>(0);
    const [typedText, setTypedText] = useState('');
    const fullText = 'Give me morning brief.';

    useEffect(() => {
        const sequence = async () => {
            while (true) {
                // Phase 0: Initial State
                setPhase(0);
                setTypedText('');
                await new Promise(r => setTimeout(r, 1000));

                // Phase 1: Typing (0-3s)
                for (let i = 0; i <= fullText.length; i++) {
                    setTypedText(fullText.slice(0, i));
                    await new Promise(r => setTimeout(r, 60));
                }
                setPhase(1);
                await new Promise(r => setTimeout(r, 1000));

                // Phase 2: Thinking & Gathering (3-5s)
                setPhase(2);
                await new Promise(r => setTimeout(r, 1500));

                // Phase 3: Cascading Reveal (5-8s)
                setPhase(3);
                await new Promise(r => setTimeout(r, 5000));

                // Phase 4: Summarize & Final Insight (8-12s)
                setPhase(4);
                await new Promise(r => setTimeout(r, 4000));
            }
        };
        sequence();
    }, []);

    return (
        <div className="relative w-full h-full min-h-[500px] flex flex-col items-center justify-center p-8 bg-[#0a0a0b] rounded-[3rem] border border-white/5 shadow-md overflow-hidden group">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#4a3aff]/10 blur-[120px] rounded-full " />
                <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-formeon-accent/10 blur-[100px] rounded-full  delay-700" />
            </div>

            {/* Phase 1: Command Input Container */}
            <AnimatePresence>
                {phase < 3 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        className="relative z-20 w-full max-w-xl"
                    >
                        <div className="bg-white/[0.03]  border border-white/10 rounded-2xl p-6 shadow-md">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-[#4a3aff] rounded-xl flex items-center justify-center shadow-sm">
                                    <Sparkles size={20} className="text-white" />
                                </div>
                                <div className="flex-grow">
                                    <div className="text-xs font-black tracking-widest text-[#4a3aff] uppercase mb-1">Formeon</div>
                                    <div className="text-lg font-medium text-white/90">
                                        {typedText}
                                        <motion.span
                                            animate={{ opacity: [1, 0, 1] }}
                                            transition={{ duration: 0.8, repeat: Infinity }}
                                            className="inline-block w-0.5 h-5 ml-1 bg-[#4a3aff] align-middle"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {phase === 2 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-4 flex items-center justify-center gap-4 text-neutral-500 font-medium text-sm"
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="w-4 h-4 border-2 border-[#4a3aff]/30 border-t-[#4a3aff] rounded-full"
                                />
                                Gathering context from 12 integrations...
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Phase 3 & 4: Dashboard Grid Reveal */}
            <div className="relative z-10 w-full h-full max-w-6xl">
                <AnimatePresence>
                    {phase >= 3 && (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: { transition: { staggerChildren: 0.15 } }
                            }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full content-center"
                        >
                            {/* Panel 1: Email Summary */}
                            <GridPanel delay={0} icon={<Mail size={18} />} title="Email Summary" color="bg-blue-500/20 text-blue-400">
                                <div className="space-y-3">
                                    <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                                        <div className="text-[10px] font-bold text-white mb-1">Q1 Roadmap Update</div>
                                        <div className="text-[10px] text-neutral-500 line-clamp-2">"We need to finalize the sprint..."</div>
                                    </div>
                                    <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 opacity-60">
                                        <div className="text-[10px] font-bold text-white mb-1">Security Audit Results</div>
                                        <div className="text-[10px] text-neutral-500 line-clamp-2">"Compliance check passed for v2..."</div>
                                    </div>
                                    <motion.div
                                        animate={phase === 4 ? { backgroundColor: 'rgba(74,58,255,0.1)', borderColor: 'rgba(74,58,255,0.3)' } : {}}
                                        className="p-3 rounded-xl border border-[#4a3aff]/10 mt-auto"
                                    >
                                        <div className="text-[10px] font-black tracking-widest text-[#4a3aff] uppercase mb-1">Insight</div>
                                        <div className="text-[11px] font-medium text-white italic">Prioritize Roadmap email.</div>
                                    </motion.div>
                                </div>
                            </GridPanel>

                            {/* Panel 2: Meeting Notes */}
                            <GridPanel delay={0.15} icon={<Calendar size={18} />} title="Meetings" color="bg-purple-500/20 text-purple-400">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-[10px] font-bold text-white">10A</div>
                                        <div className="flex-grow">
                                            <div className="text-[11px] font-bold text-white">Daily Standup</div>
                                            <div className="text-[9px] text-neutral-500">Video Sync • 5 Participants</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 opacity-60">
                                        <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-[10px] font-bold text-white">2P</div>
                                        <div className="flex-grow">
                                            <div className="text-[11px] font-bold text-white">Product Sync</div>
                                            <div className="text-[9px] text-neutral-500">Design Review • v1.4</div>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-white/5">
                                        <div className="text-[10px] font-bold text-neutral-400 mb-2">Key Highlights:</div>
                                        <ul className="text-[10px] text-neutral-500 space-y-1">
                                            <li className="flex items-start gap-2">• Beta feedback summarized</li>
                                            <li className="flex items-start gap-2">• New assets ready</li>
                                        </ul>
                                    </div>
                                </div>
                            </GridPanel>

                            {/* Panel 3: Tasks */}
                            <GridPanel delay={0.3} icon={<CheckSquare size={18} />} title="Action Items" color="bg-emerald-500/20 text-emerald-400">
                                <div className="space-y-4">
                                    {[
                                        { t: "Review PR #412", d: "Due 1h" },
                                        { t: "Update Security Doc", d: "High" },
                                        { t: "Finalize Logo Assets", d: "M" }
                                    ].map((task, i) => (
                                        <div key={i} className="flex items-center justify-between group/task">
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 rounded border border-[#4a3aff]/30 flex items-center justify-center">
                                                    {i === 0 && <CheckCircle2 size={10} className="text-[#4a3aff]" />}
                                                </div>
                                                <span className="text-[11px] font-medium text-white/90">{task.t}</span>
                                            </div>
                                            <span className="text-[9px] font-black text-neutral-600 uppercase">{task.d}</span>
                                        </div>
                                    ))}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 1 }}
                                        className="h-1 bg-white/5 rounded-full overflow-hidden"
                                    >
                                        <motion.div
                                            animate={{ width: ['0%', '65%'] }}
                                            transition={{ duration: 2, delay: 1 }}
                                            className="h-full bg-[#4a3aff]"
                                        />
                                    </motion.div>
                                    <div className="text-right text-[9px] font-black text-[#4a3aff]">65% COMPLETE</div>
                                </div>
                            </GridPanel>

                            {/* Panel 4: Metrics */}
                            <GridPanel delay={0.45} icon={<BarChart3 size={18} />} title="Project Health" color="bg-orange-500/20 text-orange-400">
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end gap-1 h-20">
                                        {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ height: 0 }}
                                                animate={{ height: `${h}%` }}
                                                transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                                                className="w-full bg-[#4a3aff]/20 border border-[#4a3aff]/20 rounded-t-sm"
                                            />
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 bg-white/[0.03] rounded-2xl border border-white/5">
                                            <div className="text-[10px] text-neutral-500 mb-1">Efficiency</div>
                                            <div className="text-sm font-bold text-white">+12%</div>
                                        </div>
                                        <div className="p-3 bg-white/[0.03] rounded-2xl border border-white/5">
                                            <div className="text-[10px] text-neutral-500 mb-1">Accuracy</div>
                                            <div className="text-sm font-bold text-white">99.2%</div>
                                        </div>
                                    </div>
                                </div>
                            </GridPanel>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Phase 4: Final AI Insight Badge */}
            <AnimatePresence>
                {phase === 4 && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute bottom-12 z-30 px-8 py-5 bg-black/80  border border-[#4a3aff]/30 rounded-3xl shadow-[0_30px_100px_rgba(74,58,255,0.3)] flex items-center gap-6"
                    >
                        <div className="w-14 h-14 bg-[#4a3aff] rounded-2xl flex items-center justify-center text-white shadow-sm">
                            <Sparkles size={28} className="" />
                        </div>
                        <div className="max-w-md">
                            <div className="text-[11px] font-black tracking-[0.2em] text-[#4a3aff] uppercase mb-1">Morning Summary Complete</div>
                            <div className="text-lg font-bold text-white leading-tight">Focus on the sprint roadmap this morning. 2/3 tasks are already prep-ready.</div>
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-[#4a3aff] text-white text-xs font-black uppercase tracking-[0.1em] rounded-xl cursor-default shadow-lg"
                        >
                            Open Hub
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Decorative Connection Lines */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <svg className="w-full h-full" viewBox="0 0 1000 1000">
                    <motion.path
                        d="M0,500 Q250,250 500,500 T1000,500"
                        stroke="#4a3aff"
                        strokeWidth="1"
                        fill="none"
                        animate={{ strokeDashoffset: [2000, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        strokeDasharray="10 20"
                    />
                </svg>
            </div>

            {/* Corner Indicators */}
            <div className="absolute top-8 right-8 flex items-center gap-3 opacity-30">
                <Clock size={14} className="text-neutral-500" />
                <span className="text-[10px] font-black tracking-widest text-neutral-500 uppercase">System Active • 0.04ms</span>
            </div>
        </div>
    );
};

// Sub-component for individual grid panels
const GridPanel = ({ children, icon, title, color, delay }: any) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: 30, scale: 0.95 },
            visible: { opacity: 1, y: 0, scale: 1 }
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative group/panel h-full"
    >
        <div className="h-full bg-white/[0.04]  border border-white/[0.08] rounded-[2rem] p-6 shadow-sm flex flex-col transition-all duration-500 group-hover/panel:bg-white/[0.06] group-hover/panel:border-white/20 group-hover/panel:translate-y-[-4px]">
            <div className="flex items-center gap-3 mb-6">
                <div className={`w-9 h-9 ${color} rounded-xl flex items-center justify-center shadow-lg`}>
                    {icon}
                </div>
                <h3 className="text-xs font-black tracking-widest text-white uppercase">{title}</h3>
            </div>
            <div className="flex-grow">
                {children}
            </div>
            <div className="mt-6 flex items-center justify-between text-[9px] font-bold text-neutral-600">
                <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-emerald-500" />
                    LIVE
                </div>
                <span>AUTO-SYNCED</span>
            </div>
        </div>
    </motion.div>
);

export default MorningBriefDemo;
