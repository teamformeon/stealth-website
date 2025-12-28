'use client';

import React, { useState } from 'react';
import Section from './Section';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
    {
        question: 'How does Stealth access other apps?',
        answer: 'Stealth utilizes native OS accessibility APIs to observe context within your active workspace. It does not record your screen or store visual data.',
    },
    {
        question: 'Is my data shared with training sets?',
        answer: 'Never. Data processed by Stealth—including local LLM prompts—is solely for your interaction. We prioritize privacy-preserving local models wherever possible.',
    },
    {
        question: 'Does it support multi-user licenses?',
        answer: 'Yes. Our Pro and Enterprise tiers include specialized license management for organizations and collaborative teams.',
    },
    {
        question: 'Can I bring my own LLM keys?',
        answer: 'Absolutely. Stealth provides a unified interface for OpenAI, Anthropic, and local Llama instances via your own private API secrets.',
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <Section id="faq" className="border-t border-white/5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                <div className="lg:col-span-4">
                    <h2 className="text-4xl md:text-6xl font-black mb-8 italic">FAQs.</h2>
                    <p className="text-neutral-500 text-lg leading-relaxed">
                        Quick answers to the most common questions about the Stealth engine.
                    </p>
                </div>

                <div className="lg:col-span-8 flex flex-col gap-4">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                "premium-card transition-all duration-500",
                                openIndex === idx ? "border-white/10 bg-white/[0.02]" : "hover:border-white/10"
                            )}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full flex items-center justify-between p-8 text-left"
                            >
                                <span className="text-xl font-bold tracking-tight">{faq.question}</span>
                                <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center text-neutral-500">
                                    {openIndex === idx ? <Minus size={14} /> : <Plus size={14} />}
                                </div>
                            </button>
                            <AnimatePresence>
                                {openIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <div className="px-8 pb-10 text-neutral-500 leading-relaxed text-base max-w-2xl">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default FAQ;
