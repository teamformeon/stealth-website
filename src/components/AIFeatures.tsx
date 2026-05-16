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
        <Section id="features" className="bg-white py-24 relative overflow-hidden">
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200 text-xs font-semibold tracking-wide mb-6 uppercase">
                        <Sparkles size={14} />
                        Two Ways to Work
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black mb-6 text-black leading-tight">
                        Your Execution <span className="text-neutral-400">Command Center.</span>
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Synthesize Insights. Visualize Roadmaps. Plan Workflows. Send to Jira.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="p-8 bg-neutral-50 rounded-2xl border border-neutral-200 transition-shadow"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-white border border-neutral-200 flex items-center justify-center">
                                <Brain size={24} className="text-neutral-700" />
                            </div>
                            <h3 className="text-2xl font-bold text-black">Discovery & Synthesis</h3>
                        </div>
                        <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                            Run a discovery session in the Sandbox. Drop PRDs, transcripts, and logs, then synthesize to get a proposed product plan.
                        </p>
                        <div className="space-y-3">
                            {[
                                'Turn messy inputs into blueprints',
                                'Extract product opportunities',
                                'Validate ideas against source data',
                                'Generate full PRDs automatically'
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
                        className="p-8 bg-neutral-50 rounded-2xl border border-neutral-200 transition-shadow"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-white border border-neutral-200 flex items-center justify-center">
                                <MessageSquare size={24} className="text-neutral-700" />
                            </div>
                            <h3 className="text-2xl font-bold text-black">Control Tower & Advisor</h3>
                        </div>
                        <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                            Evaluate ideas with the PM Advisor and seamlessly track validation and execution straight into Jira.
                        </p>
                        <div className="space-y-3">
                            {[
                                'Score features against roadmaps',
                                'Single command center for blueprints',
                                'Push validated tasks straight to Jira',
                                'Track execution and decisions'
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
                    className="p-10 bg-neutral-50 border border-neutral-200 rounded-3xl text-neutral-900 text-center relative overflow-hidden"
                >
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                        }}
                    />
                    <div className="relative z-10">
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                        >
                            <Sparkles size={48} className="mx-auto mb-6 text-neutral-400" />
                        </motion.div>
                        <h3 className="text-3xl font-black mb-4">From Idea to Visual Blueprint.</h3>
                        <p className="text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto mb-8">
                            Keep everything organized in your Control Tower. Visualize your product hypotheses, test out ideas in the Sandbox, and keep teams perfectly aligned before writing a single line of code.
                        </p>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-neutral-200 rounded-full text-sm font-semibold hover:bg-neutral-50 transition-colors cursor-pointer"
                        >
                            <span>Available now in Formeon</span>
                            <ArrowRight size={16} />
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </Section>
    );
};

export default AIFeatures;

