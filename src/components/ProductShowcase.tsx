'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import LaunchLeftPanel from './product/LaunchLeftPanel';
import LaunchRightPanel from './product/LaunchRightPanel';

/**
 * ProductShowcase - Animations based on the exact Stealth Electron product overlay.
 * Styling matches: src/renderer/App.tsx, CommandBar, LaunchScreen
 */
const ProductShowcase = () => {
    const [view, setView] = useState<'overlay' | 'launch' | 'discovery'>('overlay');

    return (
        <section id="process" className="py-24 bg-slate-50 border-y border-slate-200 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-black mb-4">
                        The Product
                    </h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        System-wide overlay that appears when you need it. Same look, anywhere.
                    </p>
                </motion.div>

                {/* View Toggle - Circular indicators */}
                <div className="flex justify-center gap-4 mb-12">
                    {(['overlay', 'launch', 'discovery'] as const).map((v) => (
                        <button
                            key={v}
                            onClick={() => setView(v)}
                            className="relative flex items-center justify-center p-2 group"
                            aria-label={`Switch to ${v} view`}
                        >
                            <motion.div
                                animate={{
                                    scale: view === v ? 1 : 0.8,
                                    opacity: view === v ? 1 : 0.4,
                                }}
                                className={cn(
                                    "w-4 h-4 rounded-full transition-all duration-300",
                                    view === v
                                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                                        : "bg-slate-300 group-hover:bg-slate-400"
                                )}
                            />
                            {view === v && (
                                <motion.div
                                    layoutId="active-circle"
                                    className="absolute inset-0 border-2 border-blue-600/30 rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Demo Container */}
                <motion.div
                    key={view}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-center"
                >
                    <AnimatePresence mode="wait">
                        {view === 'overlay' && <OverlayAnimation key="overlay" />}
                        {view === 'launch' && <LaunchScreenAnimation key="launch" />}
                        {view === 'discovery' && <DiscoveryAnimation key="discovery" />}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

const MockDesktop = () => (
    <div className="absolute inset-0 z-0 bg-slate-200 overflow-hidden font-sans select-none pointer-events-none">
        {/* Desktop Wallpaper */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100" />

        {/* Spreadsheet Access Window */}
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-8 left-8 right-8 bottom-8 bg-white rounded-lg shadow-xl border border-slate-300 flex flex-col overflow-hidden"
        >
            {/* Window Header */}
            <div className="h-8 bg-green-700 flex items-center px-4 justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-white/20 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </div>
                    <span className="text-xs font-semibold text-white">Annual_Report_2025.xlsx - Spreadsheet</span>
                </div>
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
                </div>
            </div>

            {/* Toolbar */}
            <div className="h-10 border-b border-slate-200 bg-slate-50 flex items-center px-4 gap-4">
                <div className="flex gap-2">
                    <div className="w-6 h-6 rounded bg-slate-200" />
                    <div className="w-6 h-6 rounded bg-slate-200" />
                    <div className="w-6 h-6 rounded bg-slate-200" />
                </div>
                <div className="w-px h-6 bg-slate-300" />
                <div className="flex gap-2 text-[10px] text-slate-500 font-medium">
                    <span>Arial</span>
                    <span>11</span>
                    <span className="font-bold">B</span>
                </div>
            </div>

            {/* Formula Bar */}
            <div className="h-7 border-b border-slate-200 bg-white flex items-center px-2 gap-2">
                <div className="text-[10px] w-6 text-center text-slate-400">fx</div>
                <div className="h-5 flex-1 bg-slate-50 border border-slate-200 rounded text-[10px] flex items-center px-2 text-slate-600">
                    =SUM(C4:E4)
                </div>
            </div>

            {/* Grid */}
            <div className="flex-1 bg-white relative overflow-hidden">
                {/* Headers */}
                <div className="flex border-b border-slate-200">
                    <div className="w-8 h-6 bg-slate-50 border-r border-slate-200" />
                    {['A', 'B', 'C', 'D', 'E', 'F'].map(col => (
                        <div key={col} className="w-24 h-6 bg-slate-50 border-r border-slate-200 flex items-center justify-center text-[10px] font-medium text-slate-500">
                            {col}
                        </div>
                    ))}
                </div>

                {/* Rows */}
                {[1, 2, 3, 4, 5, 6, 7, 8].map(row => (
                    <div key={row} className="flex border-b border-slate-100 h-8">
                        <div className="w-8 bg-slate-50 border-r border-slate-200 flex items-center justify-center text-[10px] text-slate-400">
                            {row}
                        </div>
                        {/* Cell Contents */}
                        <div className="w-24 border-r border-slate-100 flex items-center px-2 text-[10px]">
                            {row === 2 && <span className="font-bold text-slate-700">Metric</span>}
                            {row === 3 && <span className="text-slate-600">Revenue</span>}
                            {row === 4 && <span className="text-slate-600">COGS</span>}
                            {row === 5 && <span className="text-slate-600">Gross Profit</span>}
                            {row === 6 && <span className="text-slate-600">OpEx</span>}
                            {row === 7 && <span className="font-bold text-slate-700">Net Income</span>}
                        </div>
                        <div className="w-24 border-r border-slate-100 flex items-center justify-end px-2 text-[10px] text-slate-600">
                            {row === 2 && <span className="font-bold text-slate-700">Q1 2025</span>}
                            {row === 3 && "$12.4M"}
                            {row === 4 && "$4.2M"}
                            {row === 5 && "$8.2M"}
                            {row === 6 && "$5.1M"}
                            {row === 7 && <span className="font-bold text-green-600">$3.1M</span>}
                        </div>
                        <div className="w-24 border-r border-slate-100 flex items-center justify-end px-2 text-[10px] text-slate-600">
                            {row === 2 && <span className="font-bold text-slate-700">Q2 2025</span>}
                            {row === 3 && "$13.8M"}
                            {row === 4 && "$4.5M"}
                            {row === 5 && "$9.3M"}
                            {row === 6 && "$5.4M"}
                            {row === 7 && <span className="font-bold text-green-600">$3.9M</span>}
                        </div>
                        <div className="w-24 border-r border-slate-100 flex items-center justify-end px-2 text-[10px] bg-blue-50/30">
                            {row === 2 && <span className="font-bold text-slate-700">Q3 2025</span>}
                            {row === 3 && <span className="text-blue-700 font-medium">$15.2M</span>}
                            {row === 4 && "$4.8M"}
                            {row === 5 && "$10.4M"}
                            {row === 6 && "$5.9M"}
                            {row === 7 && <span className="font-bold text-green-600">$4.5M</span>}
                        </div>
                        <div className="w-24 border-r border-slate-100 flex items-center justify-end px-2 text-[10px] text-slate-400">
                            {row === 2 && <span className="font-bold text-slate-700">Growth</span>}
                            {row === 3 && <span className="text-green-600">+10.1%</span>}
                        </div>
                    </div>
                ))}

                {/* Chart Overlay */}
                <div className="absolute right-8 top-12 w-48 h-32 border border-slate-200 bg-white shadow-sm p-2 flex flex-col">
                    <div className="text-[9px] font-bold text-slate-500 mb-2">Revenue Trend</div>
                    <div className="flex-1 flex items-end gap-2 px-2 pb-2 border-b border-l border-slate-100 relative">
                        <div className="w-6 bg-blue-200 h-[60%] rounded-t-sm" />
                        <div className="w-6 bg-blue-300 h-[75%] rounded-t-sm" />
                        <div className="w-6 bg-blue-500 h-[90%] rounded-t-sm shadow-[0_0_10px_rgba(59,130,246,0.3)]" />
                    </div>
                </div>
            </div>
        </motion.div>
    </div>
);


/** Command overlay animation - Circular glow -> Prompts -> Execution */
const OverlayAnimation = () => {
    const [step, setStep] = useState<'idle' | 'analyzing' | 'executing'>('idle');

    React.useEffect(() => {
        const loop = async () => {
            while (true) {
                setStep('idle');
                await new Promise(r => setTimeout(r, 1500));
                setStep('analyzing');
                await new Promise(r => setTimeout(r, 2500)); // Show prompts
                setStep('executing');
                await new Promise(r => setTimeout(r, 6000)); // Show result
            }
        };
        loop();
    }, []);

    return (
        <div className="relative w-[1000px] h-[600px] rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-100 flex flex-col items-center pt-12">
            {/* Background mockup */}
            <MockDesktop />

            {/* Overlay removed as requested ("not blurry") */}
            {/* <div className="absolute inset-0 z-0 bg-white/10 backdrop-blur-[1px]" /> */}

            <motion.div
                animate={{
                    width: step === 'executing' ? 460 : step === 'analyzing' ? 280 : 48,
                    height: step === 'executing' ? 280 : step === 'analyzing' ? 180 : 48,
                    borderRadius: step === 'executing' ? 12 : 24
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="flex flex-col overflow-hidden relative z-10"
                style={{
                    background: 'rgba(10, 10, 10, 0.95)',
                    backdropFilter: 'blur(48px)',
                    WebkitBackdropFilter: 'blur(48px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                }}
            >
                {/* 1. Idle/Analyzing State: Circular Pulse centered */}
                <AnimatePresence mode="wait">
                    {step !== 'executing' && (
                        <motion.div
                            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                            exit={{ opacity: 0 }}
                        >
                            {/* The glowing circle */}
                            <div className="relative">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.5, 0.8, 0.5],
                                        boxShadow: [
                                            '0 0 0px rgba(59, 130, 246, 0)',
                                            '0 0 30px rgba(59, 130, 246, 0.5)',
                                            '0 0 0px rgba(59, 130, 246, 0)',
                                        ]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center z-10"
                                >
                                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </motion.div>

                                {/* Scanning ripples */}
                                {step === 'analyzing' && (
                                    <>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 1 }}
                                            animate={{ opacity: 0, scale: 3 }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                            className="absolute inset-0 rounded-full border border-blue-500/30"
                                        />
                                        <motion.div
                                            initial={{ opacity: 0, scale: 1 }}
                                            animate={{ opacity: 0, scale: 3 }}
                                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                                            className="absolute inset-0 rounded-full border border-blue-500/20"
                                        />
                                    </>
                                )}
                            </div>

                            {/* Prompts appearing when analyzing */}
                            {step === 'analyzing' && (
                                <motion.div
                                    className="mt-6 space-y-1.5 w-full px-4 relative"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {['Analyze Q3 Financial Performance', 'Create chart from data', 'Draft email to CFO'].map((text, i) => (
                                        <motion.div
                                            key={text}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.5 + i * 0.1 }}
                                            className={`border py-1.5 px-2 rounded-lg text-[10px] flex items-center gap-2 cursor-pointer ${i === 0 ? 'bg-blue-500/20 border-blue-500/50 text-white' : 'bg-white/5 border-white/10 text-gray-300'
                                                }`}
                                        >
                                            <div className={`w-1 h-1 rounded-full ${i === 0 ? 'bg-blue-400' : 'bg-gray-500'}`} />
                                            {text}
                                        </motion.div>
                                    ))}

                                    {/* Precise Mouse cursor */}
                                    <motion.div
                                        initial={{ opacity: 0, right: -40, bottom: -80 }}
                                        animate={{ opacity: 1, right: 80, bottom: 68 }} // Adjusted for smaller bar
                                        transition={{ duration: 0.8, delay: 1.5, ease: "easeInOut" }}
                                        className="absolute z-50 pointer-events-none"
                                    >
                                        <svg className="w-4 h-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M5.5 3.21l12.7 12.7-5.9 1.1L8.5 21.8l-1.9-6.3-4.4 2.3V3.21z" />
                                            <path d="M0 0l5.5 16.5 1.9-6.3 6.3-2.3L0 0z" fill="black" opacity="0.2" transform="translate(1, 1)" />
                                        </svg>

                                        {/* Click effect */}
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1.5, opacity: [0.5, 0] }}
                                            transition={{ delay: 2.3, duration: 0.4 }}
                                            className="absolute -top-1 -left-1 w-6 h-6 rounded-full border-2 border-white/50 bg-white/20"
                                        />
                                    </motion.div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 3. Execution State: Full overlay interface */}
                <AnimatePresence>
                    {step === 'executing' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col h-full"
                        >
                            {/* Header */}
                            <div className="flex items-center p-4 border-b border-white/5">
                                <div className="w-6 h-6 rounded-md bg-blue-500/20 flex items-center justify-center mr-3">
                                    <svg className="w-3.5 h-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-white">Analyze Q3 Financial Performance</span>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="space-y-4"
                                >
                                    <div className="flex items-center justify-between pb-2 border-b border-white/5">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-gray-200">Execution Plan</span>
                                            <span className="text-[10px] bg-green-500/10 text-green-400 px-1.5 py-0.5 rounded border border-green-500/20">Active Spreadsheet</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mt-0.5">
                                                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-xs font-medium text-gray-300">Read "Annual_Report_2025.xlsx"</div>
                                                <div className="text-[10px] text-gray-500">Processed 5 columns and 8 rows of financial data</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mt-0.5">
                                                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-xs font-medium text-gray-300">Generated Insights</div>
                                                <div className="text-[10px] text-gray-400 mt-1 bg-white/5 p-2 rounded border border-white/5 font-mono leading-relaxed">
                                                    • <strong className="text-white">Q3 Revenue ($15.2M)</strong> exceeded projections by 12%<br />
                                                    • <strong className="text-white">Net Income</strong> reached a record $4.5M (30% margin)<br />
                                                    • <strong className="text-white">Growth Trend</strong>: Accelerating (+10.1% YoY)
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

const MockPPT = () => (
    <div className="absolute inset-0 z-0 bg-[#E0E0E0] overflow-hidden font-sans select-none pointer-events-none">
        {/* Browser Header */}
        <div className="h-10 bg-white border-b border-slate-300 flex items-center px-4 gap-4">
            <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <div className="w-3 h-3 rounded-full bg-slate-200" />
            </div>
            <div className="flex-1 max-w-md h-6 bg-slate-100 rounded-md border border-slate-200 flex items-center px-3 gap-2">
                <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                <span className="text-[10px] text-slate-500">app.stealth.ai/roadmap-2026</span>
            </div>
        </div>

        {/* PPT Canvas */}
        <div className="absolute inset-0 top-10 p-12 flex flex-col items-center bg-[#F5F5F5]">
            <div className="w-full max-w-4xl aspect-[16/9] bg-white border border-slate-300 shadow-xl flex overflow-hidden">
                {/* PPT Navigation */}
                <div className="w-48 bg-[#2B2B2B] p-4 space-y-3">
                    <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-4">Slides</div>
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className={`aspect-video rounded border ${i === 2 ? 'border-orange-500 bg-orange-500/10' : 'border-neutral-700 bg-neutral-800'}`} />
                    ))}
                </div>

                {/* Main Slide Content */}
                <div className="flex-1 p-12 relative">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-1 bg-orange-500 rounded-full" />
                        <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Confidential Roadmap</span>
                    </div>

                    <h1 className="text-4xl font-black text-slate-800 mb-6 leading-tight">
                        Product Roadmap <br /><span className="text-orange-500">2026 Strategy</span>
                    </h1>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Q3 Key Initiatives</h3>
                            <ul className="space-y-3">
                                {[
                                    { t: 'Self-Healing Integrations', s: 'AI-driven connector maintenance' },
                                    { t: 'Universal Search v2', s: 'Multi-hop context retrieval' },
                                    { t: 'Stealth OS Beta', s: 'Native desktop orchestration layer' }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5" />
                                        <div>
                                            <div className="text-xs font-bold text-slate-700">{item.t}</div>
                                            <div className="text-[10px] text-slate-500">{item.s}</div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-slate-50 rounded-xl border border-slate-100 p-6 flex flex-col justify-center">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">Engagement Growth</div>
                            <div className="h-24 flex items-end gap-3 justify-center mb-2">
                                <div className="w-4 bg-slate-200 h-[40%] rounded-t-sm" />
                                <div className="w-4 bg-slate-300 h-[55%] rounded-t-sm" />
                                <div className="w-4 bg-orange-400 h-[85%] rounded-t-sm" />
                            </div>
                            <div className="text-[9px] text-center text-slate-500 font-medium">Projected 42% YoY Increase</div>
                        </div>
                    </div>

                    {/* Footer decoration */}
                    <div className="absolute bottom-6 right-8 text-[9px] font-medium text-slate-300">
                        Slide 2 of 14 | Confidential & Proprietary
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const LaunchScreenAnimation = () => {
    const [step, setStep] = useState<'initial' | 'mouseToLeft' | 'showLeft' | 'moveToRight' | 'clickSlack' | 'showChat' | 'typing'>('initial');

    React.useEffect(() => {
        const loop = async () => {
            while (true) {
                setStep('initial');
                await new Promise(r => setTimeout(r, 2000));

                setStep('mouseToLeft');
                await new Promise(r => setTimeout(r, 1000));

                setStep('showLeft');
                await new Promise(r => setTimeout(r, 2000));

                setStep('moveToRight');
                await new Promise(r => setTimeout(r, 1500));

                setStep('clickSlack');
                await new Promise(r => setTimeout(r, 800));

                setStep('showChat');
                await new Promise(r => setTimeout(r, 1500));

                setStep('typing');
                await new Promise(r => setTimeout(r, 6000));
            }
        };
        loop();
    }, []);

    const showLeft = step !== 'initial' && step !== 'mouseToLeft';
    const showRight = step === 'moveToRight' || step === 'clickSlack' || step === 'showChat' || step === 'typing';

    return (
        <div className="relative w-[1100px] h-[650px] rounded-3xl overflow-hidden shadow-2xl bg-white border border-slate-200 group">
            {/* Background: PPT Presentation */}
            <MockPPT />

            {/* Left Panel: Appears when mouse goes left */}
            <motion.div
                initial={{ x: -300 }}
                animate={{ x: showLeft ? 0 : -300 }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className="absolute left-0 top-0 bottom-0 z-20"
            >
                <LaunchLeftPanel isAnimated activeItem={showLeft ? 'Roadmap' : 'Chat'} />
            </motion.div>

            {/* Right Panel: Appears when mouse goes right */}
            <motion.div
                initial={{ x: 350 }}
                animate={{ x: showRight ? 0 : 350 }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className="absolute right-0 top-0 bottom-0 z-20"
            >
                <LaunchRightPanel isAnimated step={step} />
            </motion.div>

            {/* Scripted Mouse Cursor */}
            <motion.div
                className="absolute z-50 pointer-events-none"
                initial={{ x: 550, y: 325, opacity: 0 }}
                animate={{
                    x: step === 'initial' ? 550 :
                        step === 'mouseToLeft' ? 20 :
                            step === 'showLeft' ? 140 :
                                step === 'moveToRight' ? 1000 :
                                    step === 'clickSlack' ? 900 : 900,
                    y: step === 'initial' ? 325 :
                        step === 'mouseToLeft' ? 300 :
                            step === 'showLeft' ? 200 :
                                step === 'moveToRight' ? 300 :
                                    step === 'clickSlack' ? 180 : 500,
                    opacity: 1
                }}
                transition={{ duration: 1, ease: "easeInOut" }}
            >
                <svg className="w-5 h-5 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5.5 3.21l12.7 12.7-5.9 1.1L8.5 21.8l-1.9-6.3-4.4 2.3V3.21z" />
                    <path d="M0 0l5.5 16.5 1.9-6.3 6.3-2.3L0 0z" fill="black" opacity="0.2" transform="translate(1, 1)" />
                </svg>

                {/* Click animation for Slack channel */}
                <AnimatePresence>
                    {step === 'clickSlack' && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 2, opacity: [0.5, 0] }}
                            transition={{ duration: 0.4 }}
                            className="absolute -top-1 -left-1 w-8 h-8 rounded-full border-2 border-white/50 bg-white/20"
                        />
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Shield to prevent interaction */}
            <div className="absolute inset-0 z-40 bg-transparent" />
        </div>
    );
};

/** Cursor positions (x, y) and click moments for Discovery animation. Container 1000x560. */
const DISCOVERY_CURSOR = {
    pipeline: [
        { x: 75, y: 98, label: 'Pipeline' },
        { x: 358, y: 268, label: 'Research Intake — add files', click: true },
        { x: 355, y: 318, label: 'Synthesize Insights', click: true },
        { x: 520, y: 285, label: 'Synthesis Output' },
        { x: 720, y: 348, label: 'Delegate to Engineers', click: true },
    ],
    prd: [
        { x: 75, y: 148, label: 'PRD & Specs', click: true },
        { x: 480, y: 208, label: 'Generate full PRD', click: true },
        { x: 580, y: 320, label: 'PRD content' },
    ],
    delegate: [
        { x: 570, y: 340, label: 'Select tasks' },
        { x: 570, y: 418, label: 'Delegate 2 Tasks', click: true },
    ],
};

/** Discovery Hub animation - PRD generation & delegate to engineers. Matches app: src/renderer/components/DiscoveryHub.tsx */
const DiscoveryAnimation = () => {
    const [step, setStep] = useState<'pipeline' | 'prd' | 'delegate'>('pipeline');
    const [cursorIndex, setCursorIndex] = useState(0);
    const [showClick, setShowClick] = useState(false);

    const cursorSteps = DISCOVERY_CURSOR[step];
    const cursorPos = cursorSteps[cursorIndex] ?? cursorSteps[0];
    const isClick = cursorPos?.click ?? false;
    const intakeHasFiles = step === 'pipeline' && cursorIndex >= 2;

    React.useEffect(() => {
        setCursorIndex(0);
        setShowClick(false);
    }, [step]);

    React.useEffect(() => {
        const t = 2400;
        const timer = setInterval(() => {
            setShowClick(false);
            setCursorIndex((i) => {
                const steps = DISCOVERY_CURSOR[step];
                const next = i + 1;
                if (next >= steps.length) {
                    if (step === 'pipeline') setStep('prd');
                    else if (step === 'prd') setStep('delegate');
                    else setStep('pipeline');
                    return 0;
                }
                return next;
            });
        }, t);
        return () => clearInterval(timer);
    }, [step]);

    // Show click ripple when landing on a click target
    React.useEffect(() => {
        if (cursorPos?.click) {
            setShowClick(true);
            const id = setTimeout(() => setShowClick(false), 500);
            return () => clearTimeout(id);
        }
    }, [step, cursorIndex]);

    const bg = '#1a1a1a';
    return (
        <div className="relative w-[1000px] h-[560px] rounded-2xl overflow-hidden border border-slate-200 shadow-2xl flex" style={{ background: bg }}>
            {/* Sidebar - matches DiscoveryHub nav (Pipeline, PRD & Specs, Share & Comments only) */}
            <nav className="flex-shrink-0 w-[140px] border-r border-white/[0.08] bg-white/[0.02] flex flex-col py-3 pl-2 gap-0.5">
                <div className="text-[9px] font-bold uppercase tracking-wider text-white/40 px-2 mb-1">Tools</div>
                {[
                    { id: 'pipeline', label: 'Pipeline', d: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
                    { id: 'prd', label: 'PRD & Specs', d: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                    { id: 'share', label: 'Share & Comments', d: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z' },
                ].map((item) => {
                    const isActive = item.id === 'prd' ? step === 'prd' : item.id === 'pipeline';
                    return (
                        <div
                            key={item.id}
                            className={cn(
                                'flex items-center gap-2 px-2 py-2 rounded-lg text-left text-[11px] font-medium transition-colors',
                                isActive ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-white/50 border border-transparent'
                            )}
                        >
                            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d={item.d} />
                            </svg>
                            <span>{item.label}</span>
                        </div>
                    );
                })}
            </nav>

            <div className="flex-1 min-h-0 flex flex-col overflow-hidden gap-4 pl-5 pr-5 pt-4 pb-4">
                {/* Header */}
                <div className="flex items-center justify-between flex-shrink-0">
                    <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/35 font-black">Discovery Hub</div>
                        <h2 className="text-lg font-semibold text-white tracking-tight mt-0.5">Product Exploration Pipeline</h2>
                        <p className="text-xs text-white/45 mt-0.5">Consolidate research, synthesize insights, and ship clear next steps.</p>
                    </div>
                    <div className="px-3 h-8 rounded-lg bg-blue-600 text-white text-[11px] font-bold flex items-center border border-blue-500/30">New Initiative</div>
                </div>

                <AnimatePresence mode="wait">
                    {(step === 'pipeline' || step === 'delegate') && (
                        <motion.div
                            key="pipeline"
                            initial={{ opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -8 }}
                            transition={{ duration: 0.25 }}
                            className="flex-1 min-h-0 flex flex-col gap-3"
                        >
                            <div className="flex gap-2 flex-shrink-0">
                                <div className="flex-1 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center gap-2 px-2">
                                    <svg className="w-3.5 h-3.5 text-white/35" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 9 9 0 0114 0z" /></svg>
                                    <span className="text-[10px] text-white/40">Search initiatives, themes, or evidence...</span>
                                </div>
                                <span className="px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] text-white/40">All</span>
                                <span className="px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] text-white/40">Active</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
                                <div className="p-4 bg-white/[0.03] border border-white/10 rounded-xl flex flex-col">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                                                <svg className="w-3 h-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">Research Intake</span>
                                        </div>
                                        <span className="text-[9px] text-white/30">{intakeHasFiles ? '2 items' : '0 items'}</span>
                                    </div>
                                    <div className="flex-1 border border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center p-4 bg-white/[0.02]">
                                        {intakeHasFiles ? (
                                            <>
                                                <span className="text-xs font-medium text-emerald-400">2 files staged</span>
                                                <span className="text-[9px] text-white/20 mt-1">Ready for synthesis</span>
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-8 h-8 text-white/20 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                                <span className="text-sm font-medium text-white/35">Drop research data, transcripts, or logs</span>
                                                <span className="text-[10px] text-white/20 mt-2 uppercase tracking-wide mb-3">Supports .txt, .json, .csv, .pdf, .doc, .md, .xlsx</span>
                                                <div className="px-4 py-2 rounded-lg bg-blue-600/20 border border-blue-500/30 text-xs font-medium text-blue-400">Browse Files</div>
                                            </>
                                        )}
                                    </div>
                                    <div className="mt-3 w-full h-9 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-blue-500/30">
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                        Synthesize Insights
                                    </div>
                                </div>
                                <div className="p-4 bg-white/[0.03] border border-white/10 rounded-xl flex flex-col">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-6 h-6 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                                            <svg className="w-3 h-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">Synthesis Output</span>
                                    </div>
                                    <div className="flex-1 min-h-0 overflow-hidden flex flex-col gap-2">
                                        <div className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Proposed Initiative</div>
                                        <div className="text-sm font-bold text-white">Unified Search v2</div>
                                        <div className="text-[10px] text-white/55 line-clamp-2">Single search across docs, Jira, and Slack with filters and saved views.</div>
                                        <div className="flex gap-2 mt-1">
                                            <div className="flex-1 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[9px] font-bold text-white/60 flex items-center justify-center gap-1">Export to Product Plan</div>
                                            <div className="flex-1 py-1.5 rounded-lg bg-blue-600/20 border border-blue-500/30 text-[9px] font-bold text-blue-400 flex items-center justify-center gap-1">Delegate to Engineers</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-2 flex-shrink-0">
                                {['Intake', 'Synthesis', 'Validation', 'Execution'].map((name, i) => (
                                    <div key={name} className="p-2 bg-white/[0.03] border border-white/10 rounded-lg">
                                        <div className="text-[9px] font-semibold text-white/80">{name}</div>
                                        <div className="text-[8px] text-white/30 mt-0.5">{i === 0 ? (intakeHasFiles ? '2' : '0') : '0'} items</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 'prd' && (
                        <motion.div
                            key="prd"
                            initial={{ opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -8 }}
                            transition={{ duration: 0.25 }}
                            className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden"
                        >
                            <div>
                                <h2 className="text-lg font-semibold text-white tracking-tight">PRD & Specs</h2>
                                <p className="text-xs text-white/45 mt-0.5">One-click PRD and user stories from &quot;Unified Search v2&quot;</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <div className="px-3 py-2 rounded-lg bg-blue-600 text-white text-xs font-medium border border-blue-500/30 flex items-center gap-2">
                                    <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Generate full PRD
                                </div>
                                <div className="px-3 py-2 rounded-lg bg-blue-600 text-white text-xs font-medium border border-blue-500/30">Generate user stories & ACs</div>
                            </div>
                            <div className="flex-1 min-h-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-4">
                                <div className="text-[9px] font-bold uppercase tracking-wider text-white/50 mb-2">PRD</div>
                                <pre className="text-[10px] text-white/75 whitespace-pre-wrap font-sans leading-relaxed overflow-y-auto max-h-full">
{`1. Problem & Opportunity
   Single search across tools; users waste time switching context.

2. Users & Use Cases
   PMs, engineers, support — one query for docs, tickets, and messages.

3. Success Metrics
   Time-to-answer -40%; search usage +25%.

4. Scope
   In: full-text search, filters, saved views. Out: real-time sync in v1.`}
                                </pre>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

            {/* Delegate modal overlay - covers full mock, positioned in outer container */}
            <AnimatePresence>
                {step === 'delegate' && (
                    <motion.div
                        key="delegate-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-black/60"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="w-[340px] rounded-xl border border-white/10 shadow-xl overflow-hidden flex flex-col"
                            style={{ background: bg }}
                        >
                            <div className="flex items-center justify-between p-4 border-b border-white/[0.08]">
                                <h3 className="text-sm font-bold text-white">Select Tasks to Delegate</h3>
                                <span className="text-white/40 text-lg leading-none">×</span>
                            </div>
                            <div className="p-4 space-y-3">
                                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                    <span className="text-xs font-medium text-white/80">Jira Connected</span>
                                </div>
                                <div className="text-[10px] font-medium text-white/50">Select Tasks</div>
                                {['Add search API endpoint', 'Build filter UI', 'Saved views backend'].map((task, i) => (
                                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                                        <div className={cn('w-3.5 h-3.5 rounded border flex-shrink-0', i < 2 ? 'bg-blue-500 border-blue-400' : 'border-white/20')} />
                                        <span className="text-xs text-white/80">{task}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-2 p-4 border-t border-white/[0.06]">
                                <div className="flex-1 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-white/60 text-center">Cancel</div>
                                <div className="flex-1 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold border border-blue-500/30 flex items-center justify-center gap-2">
                                    <span className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    Delegate 2 Tasks
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scripted cursor - so users can track where and what's happening */}
            <motion.div
                className="absolute z-30 pointer-events-none"
                initial={false}
                animate={{
                    x: cursorPos?.x ?? 0,
                    y: cursorPos?.y ?? 0,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            >
                <svg className="w-5 h-5 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5.5 3.21l12.7 12.7-5.9 1.1L8.5 21.8l-1.9-6.3-4.4 2.3V3.21z" />
                    <path d="M0 0l5.5 16.5 1.9-6.3 6.3-2.3L0 0z" fill="black" opacity="0.2" transform="translate(1, 1)" />
                </svg>
                <AnimatePresence>
                    {showClick && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0.8 }}
                            animate={{ scale: 2.5, opacity: 0 }}
                            transition={{ duration: 0.45 }}
                            className="absolute -top-1 -left-1 w-8 h-8 rounded-full border-2 border-white bg-white/30"
                        />
                    )}
                </AnimatePresence>
                {/* Label so users see explicitly what's happening */}
                <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={`${step}-${cursorIndex}`}
                    className="absolute top-6 left-0 whitespace-nowrap px-2.5 py-1.5 rounded-lg bg-slate-900/95 text-white text-[11px] font-medium shadow-lg border border-white/10"
                >
                    {cursorPos?.label ?? '—'}
                </motion.div>
            </motion.div>

            {/* Block interaction so demo doesn't capture clicks; cursor stays on top */}
            <div className="absolute inset-0 z-[25] pointer-events-auto cursor-default" aria-hidden />
        </div>
    );
};

export default ProductShowcase;
