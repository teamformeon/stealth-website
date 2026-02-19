'use client';

import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';


import { FileText, MessageSquare, BarChart3, Users, Calendar, Mail, Zap, CheckSquare } from 'lucide-react';

const cases = [
    {
        title: 'PRD Generation',
        desc: 'Convert Slack threads and meeting notes into structured PRDs in seconds.',
        icon: <FileText size={20} />,
    },
    {
        title: 'Jira & Backlog',
        desc: 'Sync updates, summarize tickets, and manage your backlog with zero tab switching.',
        icon: <Zap size={20} />,
    },
    {
        title: 'Slack Recap',
        desc: 'Get native desktop summaries of missed Slack context from your PM team.',
        icon: <MessageSquare size={20} />,
    },
    {
        title: 'Native Coordination',
        desc: 'Stealth lives on the desktop, unifying your entire product stack.',
        icon: <Users size={20} />,
    },
    {
        title: 'Context-Aware AI',
        desc: 'Zero prompts. Stealth understands your screen context and suggests the next move.',
        icon: <CheckSquare size={20} />,
    },
    {
        title: 'One Hotkey',
        desc: 'Absolute focus for PMs. No another tab, no another website.',
        icon: <Zap size={20} />,
    },
];

const UseCases = () => {
    return (
        <Section className="bg-white">
            <div className="flex flex-col md:flex-row gap-24 items-end mb-24">
                <div className="max-w-xl">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 text-black">Productivity <br /> for PMs.</h2>
                    <p className="text-slate-600 text-xl leading-relaxed font-medium">
                        No more context-switching. Stealth integrates your entire toolstack into one native layer.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cases.map((useCase, idx) => (
                    <motion.div
                        key={useCase.title}
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: idx * 0.08, duration: 0.5, type: "spring", stiffness: 100 }}
                        className="premium-card p-10 flex flex-col gap-6 group bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all"
                    >
                        <div className="text-blue-600 group-hover:text-blue-700 transition-colors">
                            {useCase.icon}
                        </div>
                        <h3 className="text-xl font-bold text-black">{useCase.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{useCase.desc}</p>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

export default UseCases;
