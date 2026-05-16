'use client';

import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { Code, Lightbulb, ArrowRight, Zap, FileText, Users, BarChart3 } from 'lucide-react';

const ProblemStatement = () => {
    return (
        <Section id="problem" className="bg-slate-50 py-24">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wide mb-6 uppercase">
                        <Zap size={14} />
                        The Problem
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black mb-6 text-black leading-tight">
                        Stop killing your focus <br />
                        <span className="text-slate-500">switching tabs.</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                                <Code size={20} className="text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-black">Context-Switching is the Enemy</h3>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            PMs spend 40% of their day moving between Jira, Slack, and PRDs. Every new tab is a distraction. Formeon lives on your desktop, bringing the tools to you.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                <Lightbulb size={20} className="text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-black">From Transcripts to Jira</h3>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            Upload meeting transcripts or logs. Formeon extracts tasks and turns them into Jira tickets you can assign to engineers—no copy-paste, no tab chaos.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="p-10 bg-white rounded-3xl border border-slate-200 shadow-sm"
                >
                    <h3 className="text-2xl font-bold text-black mb-6">The Desktop Native Edge</h3>
                    <p className="text-slate-700 text-lg leading-relaxed mb-4">
                        Formeon isn't another tab. It's a system-wide productivity layer that integrates Jira, Slack, and Teams into your native macOS/Windows experience.
                    </p>
                    <p className="text-slate-600 leading-relaxed mb-8 font-medium italic">
                        "Draft PRD from this Slack thread", "Summarize last 10 Jira comments", "Sync this update to Teams" — one hotkey, zero context loss.
                    </p>
                    <div className="flex items-center gap-2 text-blue-700 font-semibold">
                        <span>One key. Zero tabs. Absolute focus.</span>
                        <ArrowRight size={20} />
                        <span className="text-blue-600">The PM superpower</span>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
};

export default ProblemStatement;

