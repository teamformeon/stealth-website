'use client';

import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { Code, Lightbulb, ArrowRight, Zap, FileText, Users, BarChart3 } from 'lucide-react';

const ProblemStatement = () => {
    return (
        <Section className="bg-gradient-to-b from-white to-slate-50 py-24">
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
                        AI tools require <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">perfect prompts</span>.<br />
                        What if AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">understood context</span>?
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
                            <h3 className="text-xl font-bold text-black">Coding Tools Are Great</h3>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            Most AI assistants require you to craft the perfect prompt. You need to explain context, describe what you want, and hope the AI understands. It's manual work.
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
                            <h3 className="text-xl font-bold text-black">Context-Aware Intelligence</h3>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            What if AI could see your screen, understand what you're working on, and suggest actions automatically? No prompts needed—just intelligence that works.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="p-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-100"
                >
                    <h3 className="text-2xl font-bold text-black mb-6">The Stealth Approach</h3>
                    <p className="text-slate-700 text-lg leading-relaxed mb-6">
                        Stealth is a system-wide AI assistant that runs in the background. When you press the hotkey, you can choose: let it automatically analyze your screen and suggest actions, or type natural language commands for precise control.
                    </p>
                    <p className="text-slate-600 leading-relaxed mb-8">
                        In prompt-free mode, it knows when you're looking at an email and suggests "Draft reply". It sees a task list and offers "Create task". Or type "summarize my emails" and get exactly what you need. Both modes work seamlessly.
                    </p>
                    <div className="flex items-center gap-2 text-blue-700 font-semibold">
                        <span>Automatic suggestions or explicit commands.</span>
                        <ArrowRight size={20} />
                        <span className="text-blue-600">Choose what works best for you</span>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
};

export default ProblemStatement;

