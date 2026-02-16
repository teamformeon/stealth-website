'use client';

import React from 'react';
import Section from './Section';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Zap, Brain, ArrowRight, CheckCircle2, MessageSquare, Command } from 'lucide-react';

const AIFeatures = () => {
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);
    const scale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1]);

    return (
        <Section className="bg-gradient-to-b from-slate-50 to-white py-24 relative overflow-hidden">
            <motion.div
                style={{ opacity, scale }}
                className="max-w-5xl mx-auto"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold tracking-wide mb-6 uppercase shadow-lg">
                        <Sparkles size={14} />
                        Two Ways to Work
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black mb-6 text-black leading-tight">
                        AI That Adapts to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Your Workflow</span>
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Use Stealth with automatic context analysis, or type natural language commands. Choose what works best for you.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="p-8 bg-white rounded-2xl border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                                <Brain size={24} className="text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-black">Prompt-Free Mode</h3>
                        </div>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            When you open Stealth, it automatically captures your screen, analyzes the content, and suggests 1-3 high-value actions based on what you're looking at—all without you writing a prompt.
                        </p>
                        <div className="space-y-3">
                            {[
                                'Automatic screen content analysis',
                                'Context-aware action suggestions',
                                'Time-based suggestions (morning brief, daily wrap-up)',
                                'App focus monitoring for productivity apps'
                            ].map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + idx * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <CheckCircle2 size={18} className="text-blue-600 flex-shrink-0" />
                                    <span className="text-sm text-slate-700">{feature}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="p-8 bg-white rounded-2xl border-2 border-indigo-200 shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                <MessageSquare size={24} className="text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-black">Natural Language Commands</h3>
                        </div>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            Type anything in natural language. Stealth's NLU layer understands your intent and maps it to the right action. Perfect for when you know exactly what you want.
                        </p>
                        <div className="space-y-3">
                            {[
                                'Type commands in plain English',
                                'NLU maps intent to actions automatically',
                                'Works with email, calendar, tasks, and more',
                                'Full control over what gets executed'
                            ].map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + idx * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <CheckCircle2 size={18} className="text-indigo-600 flex-shrink-0" />
                                    <span className="text-sm text-slate-700">{feature}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="p-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl text-white text-center relative overflow-hidden"
                >
                    <div 
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                        }}
                    />
                    <div className="relative z-10">
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                        >
                            <Sparkles size={48} className="mx-auto mb-6 text-blue-200" />
                        </motion.div>
                        <h3 className="text-3xl font-black mb-4">Choose Your Workflow</h3>
                        <p className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto mb-8">
                            Whether you prefer automatic suggestions or explicit commands, Stealth adapts to how you work. Both modes are available now.
                        </p>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold hover:bg-white/30 transition-colors cursor-pointer"
                        >
                            <span>Available now in Stealth</span>
                            <ArrowRight size={16} />
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </Section>
    );
};

export default AIFeatures;

