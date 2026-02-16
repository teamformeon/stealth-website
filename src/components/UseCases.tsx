'use client';

import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';


import { FileText, MessageSquare, BarChart3, Users, Calendar, Mail, Zap, CheckSquare } from 'lucide-react';

const cases = [
    {
        title: 'Email Management',
        desc: 'Draft replies, summarize emails, and manage Gmail and Outlook—all with natural language commands.',
        icon: <Mail size={20} />,
    },
    {
        title: 'Calendar & Scheduling',
        desc: 'Check upcoming events, plan your day, and get morning briefings automatically based on your calendar.',
        icon: <Calendar size={20} />,
    },
    {
        title: 'Task & Note Management',
        desc: 'Create tasks, save notes, and search your memory—all integrated with your workflow.',
        icon: <CheckSquare size={20} />,
    },
    {
        title: 'Screen Analysis',
        desc: 'Automatically analyze what\'s on your screen and get summaries, suggestions, and actions.',
        icon: <BarChart3 size={20} />,
    },
    {
        title: 'Integrations',
        desc: 'Works with Notion, Slack, Google Drive, and more. Context flows seamlessly across tools.',
        icon: <Users size={20} />,
    },
    {
        title: 'Natural Language',
        desc: 'Type anything in natural language. Stealth\'s NLU layer maps it to the right action automatically.',
        icon: <Zap size={20} />,
    },
];

const UseCases = () => {
    return (
        <Section className="bg-white">
            <div className="flex flex-col md:flex-row gap-24 items-end mb-24">
                <div className="max-w-xl">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 text-black">System-Wide <br /> Productivity.</h2>
                    <p className="text-slate-600 text-xl leading-relaxed">
                        From email to calendar to tasks—Stealth integrates with your entire workflow and understands context across all your tools.
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
