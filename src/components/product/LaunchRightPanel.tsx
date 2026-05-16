import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LaunchRightPanelProps {
    isAnimated?: boolean;
    step?: 'initial' | 'mouseToLeft' | 'showLeft' | 'moveToRight' | 'clickSlack' | 'showChat' | 'typing';
}

const LaunchRightPanel = ({ isAnimated, step }: LaunchRightPanelProps) => {
    const [activeTab, setActiveTab] = useState('All');

    const messages = [
        {
            id: 1,
            source: 'Slack',
            sender: '#roadmap-sync',
            time: '9:42 AM',
            preview: 'Sarah: Updated the Q3 roadmap slides.',
            avatarColor: 'bg-indigo-500',
            icon: 'slack'
        },
        {
            id: 2,
            source: 'Slack',
            sender: '#product-ops',
            time: 'Yesterday',
            preview: 'Mike: Did we finalize the PRD for the new dashboard?',
            avatarColor: 'bg-emerald-500',
            icon: 'slack'
        },
        {
            id: 3,
            source: 'Slack',
            sender: '#design-review',
            time: 'Yesterday',
            preview: 'Alex: Feedback on the landing page mocks is ready.',
            avatarColor: 'bg-purple-500',
            icon: 'slack'
        }
    ];

    const chatHistory = [
        { sender: 'Sarah', text: 'Hey, I just updated the Q3 roadmap slides. Can you take a look?', time: '9:40 AM' },
        { sender: 'You', text: 'Sure thing, checking now.', time: '9:41 AM' },
        { sender: 'Sarah', text: 'Great, thanks! Let me know if the priorities look right.', time: '9:42 AM' }
    ];

    const showChat = step === 'showChat' || step === 'typing';

    return (
        <div className={`w-[320px] bg-[#1C1C1C] flex flex-col h-full rounded-tr-3xl rounded-br-3xl border-l border-[#2A2A2A] relative overflow-hidden  ${isAnimated ? 'pointer-events-none' : ''}`}>
            {/* Header */}
            <div className="p-5 pb-2">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#2A2A2A] flex items-center justify-center border border-[#333]">
                            <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-white font-bold text-sm tracking-tight">Communications</div>
                            <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Unified Inbox</div>
                        </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-sm" />
                </div>

                {/* Tabs */}
                {!showChat && (
                    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-2">
                        {['All', 'Gmail', 'Slack', 'Teams'].map(tab => (
                            <button suppressHydrationWarning
                                key={tab}
                                className={`
                                    px-3 py-1.5 rounded-full text-[10px] font-semibold transition-all whitespace-nowrap
                                    ${activeTab === tab
                                        ? 'bg-[#333] text-white shadow-sm'
                                        : 'text-gray-500'}
                                `}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Message List or Chat History */}
            <div className="flex-1 overflow-hidden relative">
                <AnimatePresence mode="wait">
                    {!showChat ? (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="px-2 space-y-2 h-full overflow-y-auto"
                        >
                            {messages.map((msg, i) => (
                                <div
                                    key={msg.id}
                                    className={`p-3 rounded-xl border transition-all ${i === 0 && step === 'clickSlack' ? 'bg-[#2A2A2A] border-blue-500/50 shadow-sm' : 'bg-[#252525] border-[#333]'} ${!isAnimated ? 'hover:border-[#444] hover:bg-[#2A2A2A] cursor-pointer group' : ''}`}
                                >
                                    <div className="flex items-start justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-8 h-8 rounded-lg ${msg.avatarColor} flex items-center justify-center`}>
                                                <svg className="w-4 h-4 text-white opacity-90" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M5.042 15.123a2.52 2.52 0 0 1-2.52-2.52 2.52 2.52 0 0 1 2.52-2.52h2.52v5.04z" />
                                                    <path d="M1.26 15.123a1.26 1.26 0 0 0-1.26 1.26c0 1.392 1.128 2.52 2.52 2.52 1.392 0 2.52-1.128 2.52-2.52v-1.26h-3.78z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-white text-xs font-bold">{msg.sender}</div>
                                                <div className="text-[10px] text-gray-500">{msg.time}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-[#333] border border-[#444]">
                                            <svg className="w-2.5 h-2.5 text-white/70" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M5.042 15.123c-1.393 0-2.522 1.13-2.522 2.522 0 1.393 1.13 2.522 2.522 2.522h2.522v-5.044H5.042zM1.261 15.123C.564 15.123 0 15.687 0 16.384c0 .696.564 1.26 1.261 1.26h3.783v-2.521H1.261zM15.123 5.042c0-1.393 1.13-2.522 2.522-2.522 1.393 0 2.522 1.13 2.522 2.522v2.522h-5.044V5.042zM15.123 1.261c0-.696.564-1.26 1.26-1.26.697 0 1.261.564 1.261 1.26v3.783h-2.521V1.261zM18.906 15.123c1.393 0 2.522-1.13 2.522-2.522 0-1.393-1.13-2.522-2.522-2.522h-2.522v5.044h2.522zM22.739 15.123c.697 0 1.261-.564 1.261-1.26 0-.697-.564-1.261-1.261-1.261h-3.783v2.521h3.783zM8.877 18.958c0 1.393-1.13 2.522-2.522 2.522-1.393 0-2.522-1.13-2.522-2.522v-2.522h5.044v2.522zM8.877 22.739c0 .696-.564 1.26-1.261 1.26-.696 0-1.261-.564-1.261-1.26v-3.783h2.522v3.783z" />
                                            </svg>
                                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">
                                                {msg.source}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-[11px] text-gray-400 pl-10 group-hover:text-gray-300 transition-colors">
                                        {msg.preview}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex flex-col h-full bg-[#1A1A1A]"
                        >
                            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                                {chatHistory.map((chat, i) => (
                                    <div key={i} className={`flex flex-col ${chat.sender === 'You' ? 'items-end' : 'items-start'}`}>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-bold text-gray-500">{chat.sender}</span>
                                            <span className="text-[9px] text-gray-600">{chat.time}</span>
                                        </div>
                                        <div className={`px-3 py-2 rounded-2xl text-xs max-w-[85%] ${chat.sender === 'You' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-[#2A2A2A] text-gray-300 rounded-tl-none'}`}>
                                            {chat.text}
                                        </div>
                                    </div>
                                ))}
                                {step === 'typing' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex flex-col items-end"
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-bold text-gray-500">You</span>
                                            <span className="text-[9px] text-gray-600">Just now</span>
                                        </div>
                                        <div className="px-3 py-2 rounded-2xl bg-blue-600 text-white text-xs rounded-tr-none shadow-lg shadow-blue-500/20">
                                            <TypingText text="Looks perfect! I'll share it with the team in our sync later today." />
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Input Footer */}
            <div className="p-4 border-t border-[#2A2A2A] bg-[#1F1F1F]">
                <div className="relative group">
                    <div className="w-full bg-[#111] border border-[#333] text-gray-300 text-xs rounded-xl pl-8 pr-12 py-3 min-h-[40px] flex items-center">
                        {step === 'typing' ? (
                            <span className="text-gray-400">Typing...</span>
                        ) : (
                            <span className="text-gray-600">Reply to #roadmap-sync...</span>
                        )}
                    </div>
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-sm" />

                    <div className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-[#222] text-blue-500">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-3 px-1">
                    <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">COMM CURSOR</span>
                        <span className="px-1 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[8px] font-bold">PRO</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TypingText = ({ text }: { text: string }) => {
    const [displayedText, setDisplayedText] = useState('');

    React.useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayedText(text.slice(0, i));
            i++;
            if (i > text.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, [text]);

    return <span>{displayedText}<span className="">|</span></span>;
};

export default LaunchRightPanel;
