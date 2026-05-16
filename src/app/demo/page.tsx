'use client';

import React, { useState, useRef, useEffect } from 'react';
import Section from '@/components/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Terminal, History, Save, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const MOCK_DATA = [
    { id: 1, name: 'Gmail Analysis', lastRun: '2m ago', type: 'Automation' },
    { id: 2, name: 'Debug Stack', lastRun: '1h ago', type: 'System' },
    { id: 3, name: 'Vercel Push', lastRun: '5h ago', type: 'DevOps' },
];

const MOCK_RESPONSES = [
    "Context mapped. Active window: Chrome (Docs).",
    "Fetching local repository history... OK.",
    "Synthesizing 5 recent Slack threads... Done.",
    "Diagnostic: Local node modules up to date.",
];

export default function DemoPage() {
    const [prompt, setPrompt] = useState('');
    const [logs, setLogs] = useState<{ id: number; text: string; type: 'info' | 'success' | 'cmd' }[]>([
        { id: 0, text: 'Formeon v1.0.0 initializing...', type: 'info' }
    ]);
    const [isProcessing, setIsProcessing] = useState(false);
    const logEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => scrollToBottom(), [logs]);

    const handleRun = () => {
        if (!prompt.trim() || isProcessing) return;
        setIsProcessing(true);
        const cmdId = Date.now();
        setLogs(prev => [...prev, { id: cmdId, text: `> ${prompt}`, type: 'cmd' }]);

        let step = 0;
        const interval = setInterval(() => {
            if (step < 3) {
                setLogs(prev => [...prev, {
                    id: cmdId + step + 1,
                    text: MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)],
                    type: 'info'
                }]);
                step++;
            } else {
                setLogs(prev => [...prev, { id: cmdId + 5, text: 'Execution complete.', type: 'success' }]);
                clearInterval(interval);
                setIsProcessing(false);
                setPrompt('');
            }
        }, 600);
    };

    return (
        <div className="pt-40 min-h-screen bg-black">
            <Section className="py-20">
                <div className="max-w-4xl mb-24">
                    <h1 className="text-6xl md:text-8xl font-black mb-8 italic">Live <br /> <span className="text-formeon-accent">Demo.</span></h1>
                    <p className="text-neutral-500 text-xl leading-relaxed">
                        Test the command interface. No local installation required for visual verification.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    <div className="lg:col-span-4 space-y-4">
                        <div className="premium-card p-10">
                            <div className="text-[10px] font-bold text-neutral-600 uppercase tracking-[0.2em] mb-6">Interaction</div>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Ask anything..."
                                className="w-full h-32 bg-transparent border-none text-white focus:ring-0 p-0 text-sm placeholder:text-neutral-700 resize-none mb-8"
                            />
                            <button suppressHydrationWarning
                                className="w-full h-14 bg-white text-black font-black uppercase tracking-widest text-[11px] rounded-lg hover:opacity-90 transition-all flex items-center justify-center disabled:opacity-50"
                                onClick={handleRun}
                                disabled={isProcessing || !prompt.trim()}
                            >
                                {isProcessing ? 'Processing' : 'Execute Command'}
                            </button>
                        </div>

                        <div className="premium-card p-10">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-[10px] font-bold text-neutral-600 uppercase tracking-[0.2em]">History</h3>
                            </div>
                            <div className="space-y-6">
                                {MOCK_DATA.map(item => (
                                    <div
                                        key={item.id}
                                        className="group flex flex-col gap-1 cursor-pointer"
                                        onClick={() => !isProcessing && setPrompt(`Rerun: ${item.name}`)}
                                    >
                                        <div className="text-sm font-bold text-neutral-400 group-hover:text-white transition-colors flex items-center justify-between">
                                            {item.name}
                                            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 text-formeon-accent transition-all translate-x-[-10px] group-hover:translate-x-0" />
                                        </div>
                                        <div className="text-[11px] text-neutral-700 italic uppercase tracking-tighter">{item.lastRun}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-8 h-full">
                        <div className="min-h-[600px] flex flex-col premium-card overflow-hidden bg-white/[0.01]">
                            <div className="px-10 py-6 border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                    <span className="ml-4 text-[10px] font-mono text-neutral-600 uppercase tracking-[0.2em]">System Console</span>
                                </div>
                            </div>

                            <div className="flex-grow p-10 font-mono text-sm overflow-y-auto space-y-4 custom-scrollbar">
                                {logs.map((log) => (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        key={log.id}
                                        className={cn(
                                            "leading-loose",
                                            log.type === 'cmd' && "text-formeon-accent font-bold",
                                            log.type === 'success' && "text-green-500",
                                            log.type === 'info' && "text-neutral-500"
                                        )}
                                    >
                                        {log.text}
                                    </motion.div>
                                ))}
                                <div ref={logEndRef} />
                            </div>

                            <div className="px-10 py-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
                                <div>Memory Buffer: OK</div>
                                <div className="text-formeon-accent">Lat: 0.04ms</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
