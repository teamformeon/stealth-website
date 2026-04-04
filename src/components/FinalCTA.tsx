'use client';

import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';

const individualFeatures = [
    'Stealth desktop app access for 30 days',
    'Transcript + logs upload and analysis',
    'Delegate tasks to engineering through Jira',
    'System-wide AI hotkey workflow',
];

const enterpriseFeatures = [
    'Custom pricing and procurement support',
    'Security and deployment review',
    'Priority onboarding for your team',
    'Dedicated enterprise support',
];

const FinalCTA = () => {
    const [loading, setLoading] = React.useState(false);

    const handleCheckout = async () => {
        if (loading) {
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({}),
            });

            const data = (await res.json()) as { url?: string; error?: string };
            if (data.url) {
                window.location.href = data.url;
                return;
            }

            alert(data.error || 'Checkout failed. Please try again.');
        } catch (error) {
            console.error('Checkout error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const jumpToEnterpriseInquiry = () => {
        const inquirySection = document.getElementById('company-inquiry');
        if (inquirySection) {
            inquirySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }

        window.location.href = '/#company-inquiry';
    };

    return (
        <Section id="pricing" className="pb-36">
            <div className="relative p-10 md:p-20 rounded-[3rem] bg-[#0f1114] border border-white/5 overflow-hidden shadow-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-50 pointer-events-none" />
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full" />

                <div className="relative z-10 max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black mb-4 tracking-tighter text-white text-center"
                    >
                        Pricing
                    </motion.h2>

                    <p className="text-gray-400 text-lg md:text-xl mb-12 text-center">
                        Choose the plan that fits your team.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-10"
                        >
                            <p className="text-emerald-300 font-semibold mb-4">Free</p>
                            <div className="flex items-end gap-3 mb-6">
                                <span className="text-6xl font-black text-white leading-none">$0</span>
                                <span className="text-slate-300 text-lg mb-1">forever</span>
                            </div>

                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start gap-3 text-slate-200">
                                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                                        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                                    </span>
                                    <span>20 AI Prompts per day</span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-200">
                                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                                        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                                    </span>
                                    <span>Core Stealth Desktop App</span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-200">
                                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                                        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                                    </span>
                                    <span>System-wide Hotkey</span>
                                </li>
                            </ul>

                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="w-full px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all active:scale-[0.99] flex items-center justify-center gap-2 border border-white/10"
                            >
                                Download Free
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="rounded-3xl border border-blue-500/30 bg-blue-500/5 backdrop-blur-xl p-8 md:p-10 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest">Most Popular</div>
                            <p className="text-blue-300 font-semibold mb-4">Pro Plan</p>
                            <div className="flex items-end gap-3 mb-6">
                                <span className="text-6xl font-black text-white leading-none">$25</span>
                                <span className="text-slate-300 text-lg mb-1">per month</span>
                            </div>

                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start gap-3 text-slate-200">
                                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-blue-300">
                                        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                                    </span>
                                    <span>Unlimited AI Prompts</span>
                                </li>
                                {individualFeatures.slice(1).map((feature) => (
                                    <li key={feature} className="flex items-start gap-3 text-slate-200">
                                        <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-blue-300">
                                            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                                        </span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="https://buy.stripe.com/14AeVdcbrgGKcmb5JdcfK00"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.99] flex items-center justify-center gap-2"
                            >
                                Get Pro Access
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="rounded-3xl border border-amber-300/30 bg-amber-50/5 backdrop-blur-xl p-8 md:p-10"
                        >
                            <p className="text-amber-300 font-semibold mb-4">Enterprise</p>
                            <div className="flex items-end gap-3 mb-6">
                                <span className="text-5xl font-black text-white leading-none">Custom</span>
                                <span className="text-slate-300 text-lg mb-1">pricing</span>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {enterpriseFeatures.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3 text-slate-200">
                                        <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-300">
                                            <svg
                                                className="h-3 w-3"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                type="button"
                                onClick={jumpToEnterpriseInquiry}
                                className="w-full px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-all shadow-lg shadow-black/10 active:scale-[0.99] flex items-center justify-center gap-2"
                            >
                                Contact Sales
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default FinalCTA;
