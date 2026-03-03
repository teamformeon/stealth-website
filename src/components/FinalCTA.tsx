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

                    <div className="grid md:grid-cols-2 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-10"
                        >
                            <p className="text-blue-300 font-semibold mb-4">Individual</p>
                            <div className="flex items-end gap-3 mb-6">
                                <span className="text-6xl font-black text-white leading-none">$25</span>
                                <span className="text-slate-300 text-lg mb-1">for 30 days</span>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {individualFeatures.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3 text-slate-200">
                                        <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
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
                                onClick={handleCheckout}
                                disabled={loading}
                                className="w-full px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 active:scale-[0.99] flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Buy Now for $25
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
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
                                Contact for Enterprise
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default FinalCTA;
