'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { springSnappy, viewport } from '@/lib/motion';

const QUESTIONS = [
    'Why did we pick Gong for Riverstone?',
    'What did we decide about enterprise SSO?',
    'What changed in the streaming ASR design?',
];

const chips = ['Explore idea', 'Past decisions', 'Similarity check', 'Generate brief', 'Prep for next meeting'];

// Types a question, holds it, erases it, moves to the next — like a person asking.
const useTypewriter = (start: boolean, still: boolean) => {
    const [qi, setQi] = useState(0);
    const [n, setN] = useState(0);
    const [erasing, setErasing] = useState(false);
    const q = QUESTIONS[qi];

    useEffect(() => {
        if (!start) return;
        let t: ReturnType<typeof setTimeout>;
        // reduced motion: show the first question whole and stay there
        if (still) t = setTimeout(() => setN(q.length), 0);
        else if (!erasing && n < q.length) t = setTimeout(() => setN(n + 1), 42);
        else if (!erasing) t = setTimeout(() => setErasing(true), 2600);
        else if (n > 0) t = setTimeout(() => setN(n - 1), 16);
        else
            t = setTimeout(() => {
                setErasing(false);
                setQi((qi + 1) % QUESTIONS.length);
            }, 350);
        return () => clearTimeout(t);
    }, [start, still, n, erasing, q.length, qi]);

    return { text: q.slice(0, n), done: !erasing && n === q.length };
};

const DiscoveryHub = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });
    const still = useReducedMotion() ?? false;
    const { text, done } = useTypewriter(inView, still);

    return (
        <div className="bg-white rounded-2xl border border-ink/8 px-6 py-7 shadow-[0_10px_30px_rgba(27,26,24,0.06)] text-center">
            <Image src="/formeon-mark.png" alt="" width={36} height={36} className="object-contain mx-auto" />
            <div className="font-serif text-[26px] font-medium mt-2">Good evening, Maya</div>
            <div
                ref={ref}
                className={`mt-[18px] border rounded-[14px] px-4 py-3.5 text-left text-[15px] flex items-center justify-between gap-3 transition-[border-color,box-shadow] duration-500 ${done ? 'border-moss/40 shadow-[0_0_0_4px_rgba(47,107,79,0.08)]' : 'border-ink/12'}`}
            >
                <span className="min-h-[1.5em]">
                    <span className="sr-only">{QUESTIONS[0]}</span>
                    <span aria-hidden="true">
                        {text}
                        {!done && <span className="fm-caret text-moss" />}
                    </span>
                </span>
                <motion.span
                    className="shrink-0 size-8 rounded-full bg-ink text-white flex items-center justify-center"
                    animate={done && !still ? { scale: [1, 1.14, 1] } : { scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 19V5" />
                        <path d="m5 12 7-7 7 7" />
                    </svg>
                </motion.span>
            </div>
            <motion.div
                className="flex flex-wrap gap-2 justify-center mt-4 text-[13px]"
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.4 } } }}
            >
                {chips.map((chip) => (
                    <motion.span
                        key={chip}
                        variants={{ hidden: { opacity: 0, y: 8, scale: 0.9 }, visible: { opacity: 1, y: 0, scale: 1, transition: springSnappy } }}
                        className="border border-ink/12 rounded-full px-3 py-1.5 transition-colors hover:border-moss/40 hover:bg-moss-tint/60"
                    >
                        {chip}
                    </motion.span>
                ))}
            </motion.div>
        </div>
    );
};

export default DiscoveryHub;
