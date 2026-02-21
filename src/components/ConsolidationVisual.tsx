'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MessageSquare,
    Briefcase,
    Calendar,
    CheckSquare,
    Settings,
    User,
    Search,
    Star,
    Clock,
    Send,
    AlertCircle,
    Inbox,
    Users,
    Tag,
    ChevronLeft,
    Sparkles,
    MousePointer2,
    Type,
    Paperclip,
    Smile,
    Trash2,
    MoreVertical,
    Image as ImageIcon,
    Type as Font
} from 'lucide-react';

const ConsolidationVisual = () => {
    const [activeTab, setActiveTab] = useState<'sidebar' | 'gmail'>('sidebar');
    const [demoPhase, setDemoPhase] = useState<'idle' | 'moving' | 'clicked' | 'viewing' | 'resetting'>('idle');
    const [isComposing, setIsComposing] = useState(true);
    const [composeData, setComposeData] = useState({
        to: 'team@stealth.ai',
        subject: 'Q1 Product Roadmap Updates',
        body: "Hey team,\n\nI've consolidated the latest feedback from our beta users. The main focus for Q1 will be on deep integration with Gmail and Slack.\n\nBest,\nSanit"
    });
    const [isSaving, setIsSaving] = useState(false);

    // Automated Demo Logic
    useEffect(() => {
        const sequence = async () => {
            // Start Loop
            while (true) {
                setDemoPhase('idle');
                setActiveTab('sidebar');
                await new Promise(r => setTimeout(r, 2000));

                setDemoPhase('moving');
                await new Promise(r => setTimeout(r, 1500));

                setDemoPhase('clicked');
                setActiveTab('gmail');
                await new Promise(r => setTimeout(r, 4000));

                setDemoPhase('resetting');
                setActiveTab('sidebar');
                await new Promise(r => setTimeout(r, 1000));
            }
        };

        sequence();
    }, []);

    const gmailEmails = [
        { id: 1, sender: 'Product Hunt', subject: 'Your launch is trending! 🚀', time: '10:42 AM', preview: "Hey! Just wanted to let you know that Stealth Technologies is currently #1...", labels: ['Primary'], unread: true },
        { id: 2, sender: 'Slack', subject: 'New login from Chrome on Windows', time: '9:15 AM', preview: "A new login was detected on your account. If this wasn't you, please...", labels: ['Social'], unread: false },
        { id: 3, sender: 'Vercel', subject: 'Deployment Successful: stealth-web', time: 'Yesterday', preview: "Your project was successfully deployed to production. Click to view...", labels: ['Updates'], unread: false },
        { id: 4, sender: 'GitHub', subject: '[GitHub] Security Alert: vulnerability found', time: 'Yesterday', preview: "We found a potential security vulnerability in one of your dependencies...", labels: ['Promotions'], unread: true }
    ];

    return (
        <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/5 shadow-2xl group bg-[#0a0a0a]">
            {/* Real Backdrop Background (Forest/Nature) with Parallax */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.05, 1]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute inset-0 z-0"
            >
                <img
                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop"
                    alt="Forest Background"
                    className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            </motion.div>

            {/* Content Container */}
            <div className="relative z-10 w-full h-full flex">
                {/* Sidebar UI */}
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className={`relative z-10 h-full bg-black/60 backdrop-blur-xl p-8 flex flex-col transition-all duration-500 ${activeTab === 'gmail' ? 'w-24 overflow-hidden' : 'w-full'}`}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-10 min-w-[200px]">
                        <div className="flex items-center gap-3">
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="w-10 h-10 bg-[#4a3aff] rounded-xl flex items-center justify-center shadow-lg"
                            >
                                <div className="w-5 h-5 text-white">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                    </svg>
                                </div>
                            </motion.div>
                            <div className={activeTab === 'gmail' ? 'opacity-0' : 'opacity-100'}>
                                <h3 className="text-sm font-bold text-white leading-none">Stealth AI</h3>
                                <span className="text-[10px] text-neutral-500 font-medium tracking-tight">Personal</span>
                            </div>
                        </div>
                        <div className={`p-2 rounded-full bg-white/5 border border-white/10 ${activeTab === 'gmail' ? 'opacity-0' : 'opacity-100'}`}>
                            <User size={14} className="text-neutral-400" />
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-1 mb-10 min-w-[200px]">
                        {[
                            { icon: MessageSquare, label: 'Chat', active: true },
                            { icon: Briefcase, label: 'Projects' },
                            { icon: Calendar, label: 'Calendar' },
                            { icon: CheckSquare, label: 'To-Dos' }
                        ].map((item, idx) => (
                            <div
                                key={item.label}
                                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${item.active ? 'bg-white/5 text-white' : 'text-neutral-400'}`}
                            >
                                <item.icon size={18} className={item.active ? 'text-[#4a3aff]' : ''} />
                                <span className={`text-xs ${item.active ? 'font-semibold' : 'font-medium'} ${activeTab === 'gmail' ? 'opacity-0' : 'opacity-100'}`}>{item.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Integrations */}
                    <div className="mb-10 min-w-[200px]">
                        <h4 className={`text-[10px] font-black tracking-widest text-neutral-600 uppercase mb-4 px-3 ${activeTab === 'gmail' ? 'opacity-0' : 'opacity-100'}`}>Integrations</h4>
                        <div className="space-y-4 px-3">
                            <div
                                className={`flex items-center justify-between group/item transition-all duration-300 ${activeTab === 'gmail' ? 'scale-110' : ''}`}
                            >
                                <div className="flex items-center gap-3">
                                    <motion.div
                                        animate={demoPhase === 'clicked' ? { scale: [1, 0.9, 1] } : {}}
                                        className={`w-5 h-5 bg-white/10 rounded flex items-center justify-center overflow-hidden transition-all ${activeTab === 'gmail' ? 'bg-[#4a3aff]/20 border border-[#4a3aff]/30' : ''}`}
                                    >
                                        <img src="https://www.google.com/favicon.ico" className="w-3 h-3 grayscale transition-all group-hover/item:grayscale-0" />
                                    </motion.div>
                                    <span className={`text-[11px] font-medium transition-colors ${activeTab === 'gmail' ? 'text-white' : 'text-neutral-300 group-hover/item:text-white'}`}>Google Workspace</span>
                                </div>
                                <div className={`w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] ${activeTab === 'gmail' ? 'animate-ping' : ''}`} />
                            </div>
                            <div className="flex items-center justify-between opacity-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 bg-white/10 rounded flex items-center justify-center p-1">
                                        <svg viewBox="0 0 24 24" className="w-full h-full grayscale opacity-70" fill="currentColor">
                                            <path d="M6 15a2 2 0 100 4 2 2 0 000-4zm4-4h2v2h-2v-2zm-6 0h2v2H4v-2zm8 4a2 2 0 100 4 2 2 0 000-4z" />
                                        </svg>
                                    </div>
                                    <span className="text-[11px] font-medium text-neutral-300">Slack</span>
                                </div>
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            </div>
                        </div>
                    </div>

                    {/* AI Engine - Only show when expanded */}
                    <div className={`mt-auto px-1 transition-opacity duration-300 ${activeTab === 'gmail' ? 'opacity-0' : 'opacity-100'}`}>
                        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-bold text-white tracking-tight">Auto (Robust)</span>
                                <div className="w-2 h-2 rounded-full bg-[#00f5ff] animate-pulse" />
                            </div>
                            <p className="text-[10px] text-neutral-500 font-medium">Hybrid Reasoning</p>
                        </div>
                    </div>
                </motion.div>

                {/* Gmail UI Overlay */}
                <AnimatePresence>
                    {activeTab === 'gmail' && (
                        <motion.div
                            initial={{ x: 200, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 200, opacity: 0 }}
                            className="flex-grow h-full bg-[#1a1a1b] flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
                        >
                            {/* Gmail Header */}
                            <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#0f0f10]">
                                <div className="flex items-center gap-4 flex-grow max-w-2xl">
                                    <div className="p-2 hover:bg-white/5 rounded-full text-neutral-400">
                                        <ChevronLeft size={20} />
                                    </div>
                                    <div className="flex-grow relative">
                                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" />
                                        <input
                                            placeholder="Search mail"
                                            readOnly
                                            className="w-full bg-white/5 border border-white/5 rounded-full py-2 pl-12 pr-4 text-sm text-white focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-[#ea4335] flex items-center justify-center text-[10px] font-bold text-white shadow-lg">G</div>
                                </div>
                            </div>

                            <div className="flex flex-grow overflow-hidden relative">
                                {/* Gmail Sidebar */}
                                <div className="w-16 h-full border-r border-white/5 flex flex-col items-center py-6 gap-6 bg-[#0f0f10]">
                                    <div className="p-3 bg-white/[0.03] rounded-2xl text-white shadow-lg"><Inbox size={20} /></div>
                                    <div className="p-3 text-neutral-600"><Star size={20} /></div>
                                    <div className="p-3 text-neutral-600"><Clock size={20} /></div>
                                    <div className="p-3 text-neutral-600"><Send size={20} /></div>
                                    <div className="mt-auto p-3 text-neutral-600"><Settings size={20} /></div>
                                </div>

                                {/* Inbox List */}
                                <div className="flex-grow flex flex-col bg-[#141415]">
                                    {/* Compose Box */}
                                    <AnimatePresence>
                                        {isComposing && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="border-b border-white/5 bg-[#1a1a1b] overflow-hidden"
                                            >
                                                <div className="p-6 space-y-4">
                                                    <div className="flex items-center gap-4 text-sm">
                                                        <span className="text-neutral-500 w-12">To</span>
                                                        <input
                                                            value={composeData.to}
                                                            onChange={(e) => setComposeData({ ...composeData, to: e.target.value })}
                                                            className="flex-grow bg-transparent border-none outline-none text-white font-medium"
                                                            placeholder="Recipients"
                                                        />
                                                    </div>
                                                    <div className="h-px bg-white/5" />
                                                    <div className="flex items-center gap-4 text-sm">
                                                        <span className="text-neutral-500 w-12">Subject</span>
                                                        <input
                                                            value={composeData.subject}
                                                            onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
                                                            className="flex-grow bg-transparent border-none outline-none text-white font-medium"
                                                            placeholder="Subject"
                                                        />
                                                    </div>
                                                    <div className="h-px bg-white/5" />
                                                    <textarea
                                                        value={composeData.body}
                                                        onChange={(e) => {
                                                            setComposeData({ ...composeData, body: e.target.value });
                                                            setIsSaving(true);
                                                            setTimeout(() => setIsSaving(false), 1000);
                                                        }}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                                e.preventDefault();
                                                                setIsComposing(false);
                                                            }
                                                        }}
                                                        className="w-full h-32 bg-transparent border-none outline-none text-white text-sm resize-none leading-relaxed"
                                                        placeholder="Compose your email..."
                                                    />

                                                    <div className="flex items-center justify-between pt-2">
                                                        <div className="flex items-center gap-1">
                                                            <button
                                                                onClick={() => setIsComposing(false)}
                                                                className="px-6 py-2.5 bg-[#4a3aff] hover:bg-[#5a4aff] text-white text-xs font-bold rounded-full transition-colors flex items-center gap-2"
                                                            >
                                                                Send <Send size={14} />
                                                            </button>
                                                            <div className="flex items-center gap-1 ml-4 text-neutral-500">
                                                                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors"><Font size={16} /></button>
                                                                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors"><Paperclip size={16} /></button>
                                                                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors"><Smile size={16} /></button>
                                                                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors"><ImageIcon size={16} /></button>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-[10px] text-neutral-600 font-medium">
                                                                {isSaving ? 'Saving...' : 'Draft saved'}
                                                            </span>
                                                            <button
                                                                onClick={() => setIsComposing(false)}
                                                                className="p-2 text-neutral-600 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Tabs */}
                                    <div className="flex border-b border-white/5 px-4 h-14 items-center gap-8">
                                        <div className="flex items-center gap-3 text-[#ea4335] text-xs font-bold border-b-2 border-[#ea4335] h-full px-2">
                                            <Inbox size={14} /> Primary
                                        </div>
                                        <div className="flex items-center gap-3 text-neutral-600 text-xs font-medium h-full px-2">
                                            <Tag size={14} /> Promotions
                                        </div>
                                        <div className="flex items-center gap-3 text-neutral-600 text-xs font-medium h-full px-2">
                                            <Users size={14} /> Social
                                        </div>
                                    </div>

                                    {/* Emails */}
                                    <div className="flex-grow overflow-y-auto">
                                        {gmailEmails.map((email) => (
                                            <div
                                                key={email.id}
                                                className={`flex items-center gap-4 px-6 py-4 border-b border-white/5 ${email.unread ? 'bg-white/[0.02]' : ''}`}
                                            >
                                                <div className="text-neutral-700"><Star size={18} /></div>
                                                <div className={`w-32 text-sm truncate ${email.unread ? 'font-bold text-white' : 'text-neutral-400'}`}>{email.sender}</div>
                                                <div className="flex-grow min-w-0">
                                                    <span className={`text-sm mr-2 ${email.unread ? 'font-bold text-white' : 'text-neutral-300'}`}>{email.subject}</span>
                                                    <span className="text-sm text-neutral-500 truncate inline-block w-full">— {email.preview}</span>
                                                </div>
                                                <div className={`text-xs w-20 text-right ${email.unread ? 'font-bold text-[#ea4335]' : 'text-neutral-600'}`}>{email.time}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* AI Overlay Suggestion */}
                                    <motion.div
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 1 }}
                                        className="absolute bottom-8 right-8 left-8 p-6 bg-black/80 backdrop-blur-2xl border border-[#4a3aff]/30 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-50 flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 bg-[#4a3aff] rounded-2xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(74,58,255,0.4)]">
                                                <Sparkles size={24} className="animate-pulse" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black tracking-widest text-[#4a3aff] uppercase mb-1">Stealth Intelligent Action</div>
                                                <div className="text-sm font-bold text-white">Consolidate roadmap updates?</div>
                                            </div>
                                        </div>
                                        <button className="px-6 py-2 bg-[#4a3aff] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-[0_0_20px_rgba(74,58,255,0.3)]">
                                            Execute
                                        </button>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Simulated Mouse Cursor */}
            <AnimatePresence>
                {demoPhase !== 'viewing' && (
                    <motion.div
                        initial={{ opacity: 0, x: 600, y: 400 }}
                        animate={
                            demoPhase === 'moving'
                                ? { opacity: 1, x: 180, y: 345 } // Position of Google Workspace Integration
                                : demoPhase === 'clicked'
                                    ? { opacity: 1, x: 180, y: 345, scale: 0.8 }
                                    : demoPhase === 'resetting'
                                        ? { opacity: 0, x: 600, y: 400 }
                                        : { opacity: 0 }
                        }
                        transition={{
                            duration: demoPhase === 'moving' ? 1.5 : 0.3,
                            ease: "easeInOut"
                        }}
                        className="absolute z-[100] pointer-events-none text-white drop-shadow-2xl"
                        style={{ filter: 'drop-shadow(0 0 10px rgba(0,245,255,0.5))' }}
                    >
                        <MousePointer2 size={32} fill="white" stroke="black" strokeWidth={1} />
                        <motion.div
                            animate={{ scale: [1, 2, 1], opacity: [0, 0.5, 0] }}
                            transition={{ duration: 0.5, repeat: demoPhase === 'clicked' ? 0 : Infinity }}
                            className="absolute -top-1 -left-1 w-8 h-8 bg-[#4a3aff] rounded-full -z-10 blur-sm"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ConsolidationVisual;
