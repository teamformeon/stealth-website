'use client';

import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { Upload, MessageSquare, Sparkles, Code, Zap, ArrowRight } from 'lucide-react';

const VisionSection = () => {
    return (
        <Section className="bg-white py-24">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-black mb-6 text-black leading-tight">
                        How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Works</span>
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Upload meeting transcripts and logs, then delegate tasks to engineers via Jira. Stealth runs on your desktop and connects to your tools—one hotkey, no tab-switching.
                    </p>
                </motion.div>

                {/* Workflow Steps */}
                <div className="grid md:grid-cols-4 gap-6 mb-16">
                    {[
                        {
                            icon: <Zap size={24} />,
                            title: 'Press Hotkey',
                            description: 'Global hotkey (⌘+\) opens overlay instantly',
                            iconBg: 'bg-blue-50',
                            iconColor: 'text-blue-600'
                        },
                        {
                            icon: <Upload size={24} />,
                            title: 'Upload Transcripts & Logs',
                            description: 'PMs drop meeting transcripts or logs into Stealth',
                            iconBg: 'bg-indigo-50',
                            iconColor: 'text-indigo-600'
                        },
                        {
                            icon: <MessageSquare size={24} />,
                            title: 'Get Actions',
                            description: 'Summarize, extract tasks, or draft PRDs from context',
                            iconBg: 'bg-purple-50',
                            iconColor: 'text-purple-600'
                        },
                        {
                            icon: <Code size={24} />,
                            title: 'Delegate to Engineers',
                            description: 'Create and assign Jira tickets to SWEs in one flow',
                            iconBg: 'bg-pink-50',
                            iconColor: 'text-pink-600'
                        }
                    ].map((step, idx) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 40, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: idx * 0.12, duration: 0.6, type: "spring", stiffness: 120 }}
                            className="relative"
                        >
                            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all h-full">
                                <div className={`w-12 h-12 rounded-xl ${step.iconBg} flex items-center justify-center ${step.iconColor} mb-4`}>
                                    {step.icon}
                                </div>
                                <h3 className="text-lg font-bold text-black mb-2">{step.title}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                            </div>
                            {idx < 3 && (
                                <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                                    <ArrowRight size={20} className="text-slate-400" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Key Features */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-10 bg-gradient-to-br from-black to-slate-900 rounded-3xl text-white relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <Zap size={32} className="text-blue-400" />
                            <h3 className="text-3xl font-black">System-Wide Intelligence</h3>
                        </div>
                        <p className="text-xl text-slate-300 leading-relaxed mb-6 max-w-3xl">
                            Stealth integrates with your entire workflow: email (Gmail, Outlook), calendar, tasks, notes, Notion, Slack, and more. It understands context across all your tools.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 mt-8">
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                <div className="text-sm font-semibold text-blue-400 mb-2">Upload Transcripts & Logs</div>
                                <div className="text-slate-300 text-sm">PMs drop meeting transcripts or research logs; Stealth extracts tasks and context for Jira and docs.</div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                <div className="text-sm font-semibold text-blue-400 mb-2">Delegate to SWEs via Jira</div>
                                <div className="text-slate-300 text-sm">Turn action items into Jira tickets and assign to engineers without leaving your flow.</div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                <div className="text-sm font-semibold text-blue-400 mb-2">Time-Based Suggestions</div>
                                <div className="text-slate-300 text-sm">Morning briefs, daily wrap-ups, and contextual prompts based on time of day</div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                <div className="text-sm font-semibold text-blue-400 mb-2">Natural Language Commands</div>
                                <div className="text-slate-300 text-sm">Type anything—Stealth maps it to the right action across Jira, Slack, and docs.</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
};

export default VisionSection;

