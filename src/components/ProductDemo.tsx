'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import Section from './Section';
import { motion, useInView } from 'framer-motion';
import { FileText, AlertTriangle } from 'lucide-react';
import { fadeUp, fadeUpChild, staggerContainer, viewport } from '@/lib/motion';
import { AppIconRow } from '@/components/animations/AppIcon';

const UniversalStackAnimation = dynamic(() => import('@/components/animations/UniversalStackAnimation'), {
    ssr: false,
    loading: () => (
        <div className="w-full aspect-[4/3] max-h-[340px] rounded-2xl bg-white border border-black/[0.06] animate-pulse" />
    ),
});

const outputs = [
    {
        icon: FileText,
        label: 'Generated PRD',
        detail: 'Problem, goals, and rollout — cited from Slack, Jira, Teams, Gmail, and Notion.',
    },
    {
        icon: AlertTriangle,
        label: 'Gap flagged',
        detail: 'SCIM requirement in Gmail not reflected in Jira FEAT-284.',
        warn: true,
    },
];

const ProductDemo = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <Section id="product" className="py-24 md:py-32">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUp}
                className="text-center max-w-2xl mx-auto mb-14"
            >
                <h2 className="font-serif-display text-3xl md:text-[2.75rem] leading-tight tracking-tight text-[#12141c] mb-4">
                    Your whole stack, turned into product work
                </h2>
                <p className="text-[#64687a] text-lg">
                    One prompt. Formeon pulls from every tool your team uses and returns work you can ship.
                </p>
            </motion.div>

            <motion.div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start max-w-5xl mx-auto">
                <UniversalStackAnimation />
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55 }}
                    className="product-window"
                >
                    <div className="p-5 md:p-6 border-b border-[#ebebeb] bg-[#fafafa]">
                        <p className="text-[11px] font-medium uppercase tracking-wider text-[#9a9ca8] mb-2">
                            Your prompt
                        </p>
                        <p className="text-[#12141c] text-base md:text-lg font-medium leading-snug mb-4">
                            &ldquo;Draft a PRD for enterprise SSO using context from our tools.&rdquo;
                        </p>
                        <AppIconRow ids={['slack', 'jira', 'microsoft', 'gmail', 'notion', 'linear']} size="sm" />
                    </div>
                    <div className="p-5 md:p-6">
                        <p className="text-[11px] font-medium uppercase tracking-wider text-[#9a9ca8] mb-3">
                            Formeon output
                        </p>
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            className="space-y-3"
                        >
                            {outputs.map((item) => (
                                <motion.div
                                    key={item.label}
                                    variants={fadeUpChild}
                                    className={`flex gap-3 p-4 rounded-xl border ${
                                        item.warn
                                            ? 'bg-amber-50/80 border-amber-100'
                                            : 'bg-white border-[#ebebeb]'
                                    }`}
                                >
                                    <div
                                        className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                                            item.warn ? 'bg-amber-100 text-amber-700' : 'bg-[#eef0f8] text-[#4f5dff]'
                                        }`}
                                    >
                                        <item.icon className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#12141c] text-sm mb-0.5">{item.label}</p>
                                        <p className="text-[#64687a] text-sm leading-relaxed">{item.detail}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </Section>
    );
};

export default ProductDemo;
