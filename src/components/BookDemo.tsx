'use client';

import React, { useState } from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { Check, ChevronRight, Send } from 'lucide-react';

const BookDemo = () => {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('submitting');
        setErrorMessage(null);

        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                setErrorMessage(result.error?.message || result.error || 'Failed to send request');
                throw new Error('Failed to send request');
            }

            setFormState('success');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                company: '',
                message: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            setFormState('error');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <Section id="book-demo" className="relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2" />

            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                {/* Left Column: Copy */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[11px] font-medium tracking-wide mb-6 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                            Schedule a Call
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-black leading-tight">
                            Ship faster with <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Product Intelligence.</span>
                        </h2>

                        <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
                            Book a demo to see how Stealth consolidates Jira, Slack, and your entire PM workflow.
                        </p>

                        <ul className="space-y-4 mb-10">
                            {[
                                'Jira & Slack deep-integration setup',
                                'PRD generation and syncing',
                                'Team-wide productivity insights',
                                'Priority early access'
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-700">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                                        <Check size={12} strokeWidth={3} />
                                    </div>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Right Column: Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative"
                >
                    <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                        {formState === 'success' ? (
                            <div className="text-center py-16">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Check size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Received!</h3>
                                <p className="text-slate-500">We&apos;ll be in touch shortly to schedule your demo.</p>
                                <button
                                    onClick={() => setFormState('idle')}
                                    className="mt-8 text-sm text-blue-600 font-semibold hover:text-blue-700"
                                >
                                    Send another request
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {formState === 'error' && (
                                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm mb-4 text-center font-medium">
                                        {errorMessage || 'Something went wrong. Please try again.'}
                                    </div>
                                )}
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">First Name</label>
                                        <input
                                            required
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            type="text"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400"
                                            placeholder="Jane"
                                            suppressHydrationWarning
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Last Name</label>
                                        <input
                                            required
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            type="text"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400"
                                            placeholder="Doe"
                                            suppressHydrationWarning
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Work Email</label>
                                    <input
                                        required
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        type="email"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400"
                                        placeholder="jane@company.com"
                                        suppressHydrationWarning
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Company</label>
                                    <input
                                        name="company"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        type="text"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400"
                                        placeholder="Acme Inc."
                                        suppressHydrationWarning
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Message <span className="text-slate-300 font-normal normal-case tracking-normal">(Optional)</span></label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400 resize-none"
                                        placeholder="Tell us about your team's needs..."
                                        suppressHydrationWarning
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={formState === 'submitting'}
                                    className="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-neutral-800 transition-all shadow-lg shadow-black/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group mt-2"
                                >
                                    {formState === 'submitting' ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Schedule Demo
                                            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Decorative Elements around form */}
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full blur-2xl opacity-20 -z-10" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-2xl opacity-20 -z-10" />
                </motion.div>
            </div>
        </Section>
    );
};

export default BookDemo;
