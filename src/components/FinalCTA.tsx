'use client';

import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';

const FinalCTA = () => {
    const [loading, setLoading] = React.useState(false);
    const [email, setEmail] = React.useState('');

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !email.includes('@')) {
            alert('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert('Checkout failed. Please try again.');
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Section id="explore" className="pb-48">
            <div className="relative p-12 md:p-32 rounded-[3.5rem] bg-[#0f1114] border border-white/5 overflow-hidden text-center shadow-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-50 pointer-events-none" />
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full" />

                <div className="relative z-10 max-w-2xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-7xl font-black mb-8 tracking-tighter text-white"
                    >
                        Ready for AI That <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Adapts to You?</span>
                    </motion.h2>

                    <p className="text-gray-400 text-xl mb-6 leading-relaxed">
                        Stealth gives PMs one place to upload meeting transcripts and logs, then delegate tasks straight to engineers via Jira. System-wide AI with natural language—press a hotkey and get moving.
                    </p>

                    <p className="text-blue-400 text-lg mb-12 font-semibold">
                        Upload transcripts & logs · Delegate to SWEs via Jira · One hotkey, zero context loss
                    </p>

                    <form onSubmit={handleCheckout} className="relative max-w-md mx-auto group">
                        <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl transition-all duration-300 group-focus-within:border-blue-500/50 group-focus-within:bg-white/10">
                            <input
                                type="email"
                                placeholder="name@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 bg-transparent px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none text-lg"
                                required
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 active:scale-95 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Get Access
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-12 flex items-center justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">Supports</span>
                        <div className="flex gap-6">
                            <span className="text-white font-bold tracking-tight">Windows 11</span>
                            <span className="text-white font-bold tracking-tight">macOS Sequoia</span>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default FinalCTA;
