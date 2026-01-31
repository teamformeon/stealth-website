'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail,
    MessageSquare,
    FileText,
    Trello,
    Users,
    Calendar,
    CheckCircle2,
    ArrowRight,
    Search,
    Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

const apps = [
    { id: 'email', name: 'Email', icon: Mail, color: '#EA4335', position: { top: '10%', left: '15%' } },
    { id: 'slack', name: 'Slack', icon: MessageSquare, color: '#4A154B', position: { top: '25%', left: '5%' } },
    { id: 'docs', name: 'Docs', icon: FileText, color: '#4285F4', position: { top: '65%', left: '8%' } },
    { id: 'jira', name: 'Jira', icon: Trello, color: '#0052CC', position: { top: '85%', left: '15%' } },
    { id: 'crm', name: 'CRM', icon: Users, color: '#F2994A', position: { top: '80%', left: '80%' } },
    { id: 'calendar', name: 'Calendar', icon: Calendar, color: '#34A853', position: { top: '15%', left: '82%' } },
];

const actions = [
    {
        id: 1,
        type: 'Draft',
        app: 'Email',
        title: 'Response for John Smith',
        content: 'Drafted follow-up regarding the Q4 roadmap synthesis.',
        icon: Mail,
        time: 'Just now'
    },
    {
        id: 2,
        type: 'Task',
        app: 'Jira',
        title: 'Create Engineering Sync',
        content: 'Actionable items extracted from Slack #eng thread.',
        icon: Trello,
        time: '2m ago'
    },
    {
        id: 3,
        type: 'Summary',
        app: 'Calendar',
        title: 'Product Review Sync',
        content: 'Consolidated notes and next steps from 10:00 AM call.',
        icon: FileText,
        time: '5m ago'
    }
];

const ConsolidationVisual = () => {
    return (
        <div className="relative w-full h-full bg-black rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(circle, #00f5ff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            {/* Dashboard Container */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative w-[75%] h-[75%] bg-stealth-black border border-white/10 rounded-2xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-20 overflow-hidden flex flex-col"
                >
                    {/* UI Header */}
                    <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-stealth-accent rounded-lg flex items-center justify-center">
                                <Search size={16} className="text-black font-bold" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-black tracking-widest text-white">Stealth Interface</span>
                                <span className="text-[8px] font-mono text-neutral-500">Node Active: us-east-1</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[8px] font-mono text-neutral-400">
                                48 Contextual Feeds
                            </div>
                        </div>
                    </div>

                    {/* Feed Content */}
                    <div className="flex-grow space-y-4 overflow-hidden">
                        <AnimatePresence>
                            {actions.map((action, idx) => (
                                <motion.div
                                    key={action.id}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 + idx * 0.2 }}
                                    className="p-4 bg-stealth-gray/50 border border-white/5 rounded-xl flex items-start gap-4 hover:border-stealth-accent/20 transition-all"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center border border-white/5 shrink-0">
                                        <action.icon size={18} className="text-stealth-accent" />
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">{action.type} • {action.app}</span>
                                            <span className="text-[9px] font-mono text-neutral-600">{action.time}</span>
                                        </div>
                                        <h4 className="text-sm font-bold text-white mb-1 truncate">{action.title}</h4>
                                        <p className="text-xs text-neutral-500 leading-relaxed truncate">{action.content}</p>
                                    </div>
                                    <div className="shrink-0 self-center">
                                        <ArrowRight size={14} className="text-neutral-700" />
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Bottom Status */}
                    <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[8px] font-mono uppercase tracking-[0.2em] text-neutral-600">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-stealth-accent animate-pulse" />
                            Coordinating cross-app workflows
                        </div>
                        <span>v1.2.4-PROD</span>
                    </div>
                </motion.div>
            </div>

            {/* App Streams */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                <svg className="w-full h-full">
                    {apps.map((app) => (
                        <g key={app.id}>
                            <motion.path
                                d={`M ${parseFloat(app.position.left) * 10}% ${parseFloat(app.position.top) * 10}% Q 50 50, 50 50`}
                                fill="none"
                                stroke={app.color}
                                strokeWidth="0.5"
                                strokeOpacity="0.1"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.3 }}
                                transition={{ duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
                            />
                            {/* Animated particles along path (Simplified) */}
                            <motion.circle
                                r="1.5"
                                fill={app.color}
                                filter="blur(1px)"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    cx: [`${parseFloat(app.position.left)}%`, "50%"],
                                    cy: [`${parseFloat(app.position.top)}%`, "50%"]
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                    ease: 'linear',
                                    delay: Math.random() * 3
                                }}
                            />
                        </g>
                    ))}
                </svg>
            </div>

            {/* App Floating Icons */}
            {apps.map((app) => (
                <motion.div
                    key={app.id}
                    style={{ top: app.position.top, left: app.position.left }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: Math.random() * 0.5 }}
                    className="absolute z-30 group"
                >
                    <div className="relative">
                        <div
                            className="w-12 h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center shadow-xl group-hover:border-white/20 transition-all overflow-hidden"
                        >
                            <div
                                className="absolute inset-0 opacity-10"
                                style={{ backgroundColor: app.color }}
                            />
                            <app.icon size={20} className="text-white relative z-10 opaciy-80" />
                        </div>
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-600 group-hover:text-neutral-400 transition-colors">
                                {app.name}
                            </span>
                        </div>
                    </div>
                </motion.div>
            ))}

            {/* Floating Popups/Status */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 right-8 z-40 bg-stealth-accent/10 border border-stealth-accent/30 rounded-lg p-3 backdrop-blur-md flex items-center gap-3"
            >
                <div className="w-6 h-6 rounded-full bg-stealth-accent flex items-center justify-center">
                    <CheckCircle2 size={12} className="text-black" />
                </div>
                <div>
                    <div className="text-[8px] font-bold uppercase text-white tracking-widest">Action Executed</div>
                    <div className="text-[9px] text-stealth-accent/80 font-mono">Consolidated 12 unread Slack threads</div>
                </div>
            </motion.div>

            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute top-12 right-12 z-40 bg-stealth-gray border border-white/5 rounded-lg p-3 shadow-2xl flex items-center gap-3"
            >
                <Clock size={14} className="text-neutral-500" />
                <div className="text-[9px] text-neutral-400 font-mono">Real-time syncing enabled</div>
            </motion.div>
        </div>
    );
};

export default ConsolidationVisual;
