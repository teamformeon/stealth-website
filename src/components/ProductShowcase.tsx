'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ProductShowcase - Animations based on the exact Stealth Electron product overlay.
 * Styling matches: src/renderer/App.tsx, CommandBar, LaunchScreen
 */
const ProductShowcase = () => {
    const [view, setView] = useState<'overlay' | 'launch'>('overlay');

    return (
        <section className="py-24 bg-slate-50 border-y border-slate-200 overflow-hidden">
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

                {/* View Toggle */}
                <div className="flex justify-center gap-2 mb-12">
                    <button
                        onClick={() => setView('overlay')}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                            view === 'overlay'
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25'
                                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                    >
                        Command Overlay
                    </button>
                    <button
                        onClick={() => setView('launch')}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                            view === 'launch'
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25'
                                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                    >
                        Launch Screen
                    </button>
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
                        {view === 'overlay' ? (
                            <OverlayAnimation key="overlay" />
                        ) : (
                            <LaunchScreenAnimation key="launch" />
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

/** Command overlay animation - matches App.tsx expanded overlay exactly */
const OverlayAnimation = () => (
    <motion.div
        initial={{ width: 48, borderRadius: 24 }}
        animate={{ width: 520, borderRadius: 12 }}
        transition={{ type: 'spring', stiffness: 400, damping: 35, delay: 0.3 }}
        className="h-[280px] min-h-[280px] flex flex-col overflow-hidden"
        style={{
            background: 'rgba(10, 10, 10, 0.9)',
            backdropFilter: 'blur(48px)',
            WebkitBackdropFilter: 'blur(48px)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 0 40px rgba(0,0,0,0.6)',
            boxSizing: 'border-box',
        }}
    >
        {/* Top Row: Icon + Input */}
        <div className="flex items-end pb-3 pt-4 px-2">
            <motion.div
                animate={{
                    boxShadow: [
                        '0 0 0px rgba(59, 130, 246, 0)',
                        '0 0 20px rgba(59, 130, 246, 0.6)',
                        '0 0 0px rgba(59, 130, 246, 0)',
                    ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="flex-shrink-0 w-12 h-12 flex items-center justify-center"
            >
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex-1 ml-2 pb-1"
            >
                <div className="text-white/30 text-lg font-medium tracking-wide">
                    Summarize my day
                </div>
            </motion.div>
        </div>

        {/* Typing cursor */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="px-4"
        >
            <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-5 bg-blue-400 rounded-sm"
            />
        </motion.div>

        {/* Response area */}
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex-1 mt-4 border-t border-gray-800 px-4 py-4 overflow-hidden"
        >
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="text-sm text-gray-400 leading-relaxed"
            >
                <span className="text-white/90">Here&apos;s your day at a glance:</span>
                <br />
                • 3 meetings completed
                <br />
                • 12 emails handled
                <br />
                • 2 tasks from standup done
            </motion.div>
        </motion.div>
    </motion.div>
);

/** Launch screen mock - matches LaunchScreen.tsx layout */
const LaunchScreenAnimation = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-[900px] max-w-full h-[500px] rounded-[24px] overflow-hidden shadow-2xl flex bg-[#FAFAFA]"
    >
        {/* Left Panel */}
        <div className="flex-1 flex flex-col p-8">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/25">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <div>
                    <span className="block font-bold text-xl tracking-tight text-neutral-900">Stealth</span>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest">Assistant</span>
                </div>
            </div>

            <div className="space-y-6 flex-1">
                <div>
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">Environment</h3>
                    <div className="flex gap-1 p-1 bg-white border border-neutral-200 rounded-xl">
                        <div className="flex-1 py-2.5 text-xs font-bold rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">Work</div>
                        <div className="flex-1 py-2.5 text-xs font-bold rounded-lg text-neutral-500 text-center">Personal</div>
                    </div>
                </div>
                <div>
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">Connected Apps</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {['Microsoft 365', 'Jira', 'Slack', 'Google'].map((name, i) => (
                            <motion.div
                                key={name}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * i }}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                            >
                                <span className="text-[11px] font-bold">{name}</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 ml-auto" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pt-4 border-t border-neutral-200">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm flex items-center justify-center gap-2"
                >
                    Enter Digital Brain
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </motion.button>
            </div>
        </div>

        {/* Right Panel */}
        <div className="w-[320px] bg-white border-l border-neutral-200 flex flex-col p-8">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-4">Quick Actions</h3>
            <div className="space-y-2">
                {['Summarize Day', 'Deep Work', 'Unread Brief'].map((label, i) => (
                    <motion.div
                        key={label}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="flex items-center justify-between px-4 py-3 bg-white border border-neutral-200 rounded-xl"
                    >
                        <span className="text-sm font-medium text-neutral-700">{label}</span>
                        <svg className="w-4 h-4 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </motion.div>
                ))}
            </div>
            <div className="flex-1 rounded-2xl bg-neutral-50 border border-neutral-100 flex flex-col items-center justify-center mt-6">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
                <div className="text-xs font-bold text-neutral-900 uppercase">System Active</div>
                <div className="text-[10px] text-neutral-400">Ready for instruction</div>
            </div>
        </div>
    </motion.div>
);

export default ProductShowcase;
