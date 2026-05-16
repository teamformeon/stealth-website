'use client';

import React, { useState } from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';

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
        <Section id="contact" className="relative overflow-hidden pb-32 pt-4">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                {/* Left Column: Copy */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="font-serif-display text-3xl md:text-4xl tracking-tight mb-5 text-[#171717] leading-tight">
                            Book a demo
                        </h2>

                        <p className="text-[#6b6b6b] mb-8 leading-relaxed">
                            Tell us about your product team. We&apos;ll show you how Formeon fits your workflow.
                        </p>

                        <ul className="space-y-4 mb-10">
                            {[
                                'See Formeon pull context from your tools',
                                'Walk through PRD and ticket generation',
                                'Discuss team rollout and integrations',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-[#525252]">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-[#eef0f8] flex items-center justify-center flex-shrink-0 text-[#4f5dff]">
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
                    <div className="premium-card p-8 md:p-10 rounded-[1.5rem]">
                        {formState === 'success' ? (
                            <div className="text-center py-16">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Check size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Inquiry Received!</h3>
                                <p className="text-slate-500">We&apos;ll reach out shortly with enterprise details.</p>
                                <button suppressHydrationWarning
                                    onClick={() => setFormState('idle')}
                                    className="mt-8 text-sm text-blue-600 font-semibold hover:text-blue-700"
                                >
                                    Send another inquiry
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

                                <button suppressHydrationWarning
                                    type="submit"
                                    disabled={formState === 'submitting'}
                                    className="w-full py-4 btn-primary rounded-full font-medium flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group mt-2"
                                >
                                    {formState === 'submitting' ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Book a demo
                                            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Decorative Elements around form */}
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-neutral-900 rounded-full blur-2xl opacity-20 -z-10" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-neutral-900 rounded-full blur-2xl opacity-20 -z-10" />
                </motion.div>
            </div>
        </Section>
    );
};

export default BookDemo;
