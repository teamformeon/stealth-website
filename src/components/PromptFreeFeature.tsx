'use client';

import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Brain, ArrowRight, CheckCircle2 } from 'lucide-react';

const PromptFreeFeature = () => {
    return (
        <Section className="bg-gradient-to-b from-slate-50 to-white py-24">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold tracking-wide mb-6 uppercase shadow-lg">
                        <Sparkles size={14} />
                        Available Now
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black mb-6 text-black leading-tight">
                        AI That Works <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Without Prompts</span>
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Stealth's prompt-free AI automatically analyzes your screen and suggests actions based on context—no manual prompting required.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 bg-white rounded-2xl border-2 border-blue-200 shadow-lg"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                                <Brain size={24} className="text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-black">Context-Aware Intelligence</h3>
                        </div>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            When you open Stealth, it automatically captures your screen, analyzes the content, and suggests 1-3 high-value actions based on what you're looking at—all without you writing a prompt.
                        </p>
                        <div className="space-y-3">
                            {[
                                'Analyzes screen content automatically',
                                'Suggests actions based on context (email, code, tasks)',
                                'Time-based suggestions (morning brief, daily wrap-up)',
                                'App focus monitoring for productivity apps'
                            ].map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <CheckCircle2 size={18} className="text-blue-600 flex-shrink-0" />
                                    <span className="text-sm text-slate-700">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 bg-white rounded-2xl border-2 border-indigo-200 shadow-lg"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                <Zap size={24} className="text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-black">Proactive Suggestions</h3>
                        </div>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            The AI proactively suggests actions without you asking. Looking at an email? It suggests "Draft reply". Viewing a task list? It offers "Create task". The suggestions are contextual and actionable.
                        </p>
                        <div className="space-y-3">
                            {[
                                'Context-aware action suggestions',
                                'Automatic screen content analysis',
                                'Proactive recommendations based on activity',
                                'Natural language command execution'
                            ].map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <CheckCircle2 size={18} className="text-indigo-600 flex-shrink-0" />
                                    <span className="text-sm text-slate-700">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl text-white text-center"
                >
                    <Sparkles size={48} className="mx-auto mb-6 text-blue-200" />
                    <h3 className="text-3xl font-black mb-4">Intelligence That Works Automatically</h3>
                    <p className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto mb-8">
                        No more crafting the perfect prompt. Press the hotkey, and Stealth automatically understands what you're working on. It sees your screen, understands context, and suggests the right actions—instantly.
                    </p>
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                        <span>Available now in Stealth</span>
                        <ArrowRight size={16} />
                    </div>
                </motion.div>
            </div>
        </Section>
    );
};

export default PromptFreeFeature;

