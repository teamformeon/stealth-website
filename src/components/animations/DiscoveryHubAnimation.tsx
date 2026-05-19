'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Paperclip, ArrowUp, Mic, Sparkles, Clock, Search, FileText } from 'lucide-react';
import { AnimationFrame, ease, useReducedMotion } from './shared';

const discoveryChips = [
    { icon: Sparkles, label: 'Explore idea' },
    { icon: Clock, label: 'Past decisions' },
    { icon: Search, label: 'Similarity check' },
    { icon: FileText, label: 'Generate brief' },
];

const PROMPT = 'Should we prioritize SSO for enterprise?';

export default function DiscoveryHubAnimation() {
    const reducedMotion = useReducedMotion();
    const [typed, setTyped] = useState('');
    const [cycle, setCycle] = useState(0);

    useEffect(() => {
        if (reducedMotion) {
            setTyped(PROMPT);
            return;
        }
        setTyped('');
        let i = 0;
        const id = setInterval(() => {
            i += 1;
            setTyped(PROMPT.slice(0, i));
            if (i >= PROMPT.length) clearInterval(id);
        }, 48);
        const reset = setTimeout(() => setCycle((c) => c + 1), 9000);
        return () => {
            clearInterval(id);
            clearTimeout(reset);
        };
    }, [cycle, reducedMotion]);

    return (
        <AnimationFrame activeNav="discovery" maxHeight="max-h-[320px] md:max-h-[520px]">
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 pb-3">
                <motion.div
                    className="flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease }}
                >
                    <Image src="/formeon-logo.png" alt="" width={40} height={40} className="mx-auto mb-3" />
                    <p className="font-serif-display text-[17px] sm:text-xl text-slate-900 mb-4">
                        How can I help you today?
                    </p>
                    <motion.div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-5">
                        {discoveryChips.map((chip, i) => (
                            <motion.span
                                key={chip.label}
                                initial={{ opacity: 0, scale: 0.92 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + i * 0.08, duration: 0.4, ease }}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-[#E8E8E8] bg-white text-[10px] sm:text-[11px] text-slate-600 shadow-sm"
                            >
                                <chip.icon className="w-3 h-3 text-[#6366F1]" strokeWidth={2} />
                                {chip.label}
                            </motion.span>
                        ))}
                    </motion.div>
                </motion.div>

                <motion.div
                    className="w-full max-w-md"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.5, ease }}
                >
                    <div className="rounded-2xl border border-[#E4E4E7] bg-white px-3 py-2.5 shadow-sm flex items-center gap-2">
                        <Paperclip className="w-4 h-4 text-slate-400 shrink-0" strokeWidth={1.75} />
                        <span className="text-[12px] sm:text-sm text-slate-600 flex-1 truncate">
                            {typed || <span className="text-slate-400">Message Formeon…</span>}
                            {typed && !reducedMotion && (
                                <motion.span
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ repeat: Infinity, duration: 0.75 }}
                                    className="inline-block w-0.5 h-3.5 bg-[#6366F1] ml-0.5 align-middle"
                                />
                            )}
                        </span>
                        <Mic className="w-4 h-4 text-slate-400 hidden sm:block" strokeWidth={1.75} />
                        <div className="w-8 h-8 rounded-full bg-[#6366F1] flex items-center justify-center shrink-0">
                            <ArrowUp className="w-4 h-4 text-white" strokeWidth={2.5} />
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimationFrame>
    );
}
