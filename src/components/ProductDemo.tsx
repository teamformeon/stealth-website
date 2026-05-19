'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import Section from './Section';
import { motion, useInView } from 'framer-motion';
import { MessageSquare, History, FileText, ListTodo, AlertTriangle } from 'lucide-react';
import { fadeUp, fadeUpChild, staggerContainer, viewport } from '@/lib/motion';

const GeneratedBriefAnimation = dynamic(() => import('@/components/animations/GeneratedBriefAnimation'), {
    ssr: false,
    loading: () => <motion.div className="w-full aspect-[4/3] max-h-[360px] rounded-2xl bg-white border border-black/[0.06] animate-pulse" />,
});

const outputs = [
    {
        icon: MessageSquare,
        label: 'Relevant Slack context found',
        detail: '12 messages across #product and #customer-success about enterprise auth blockers.',
    },
    {
        icon: History,
        label: 'Similar past feature from company history',
        detail: 'Q1 “Team SSO” launch — 78% adoption, 2 post-launch incidents documented.',
    },
    {
        icon: FileText,
        label: 'Generated PRD',
        detail: 'Problem statement, goals, scope, and rollout plan with links to source threads.',
    },
    {
        icon: ListTodo,
        label: 'Suggested Jira tickets',
        detail: 'Backend auth service, admin console, migration playbook — with story point estimates.',
    },
    {
        icon: AlertTriangle,
        label: 'Missing acceptance criteria warning',
        detail: 'Security review and SCIM requirements not defined in source context.',
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
                    From Slack thread to structured product work
                </h2>
                <p className="text-[#64687a] text-lg">
                    Ask Formeon in plain language. It pulls company context and returns specs your team can ship.
                </p>
            </motion.div>

            <motion.div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-6xl mx-auto mb-10">
                <GeneratedBriefAnimation />
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55 }}
                    className="product-window"
                >
                    <motion.div className="p-5 md:p-6 border-b border-[#ebebeb] bg-[#fafafa]">
                        <p className="text-[11px] font-medium uppercase tracking-wider text-[#9a9ca8] mb-2">
                            Your prompt
                        </p>
                        <p className="text-[#12141c] text-base md:text-lg font-medium leading-snug">
                            &ldquo;Look at what&apos;s happening in Slack and generate a PRD for this feature request.&rdquo;
                        </p>
                    </motion.div>
                    <motion.div className="p-5 md:p-6">
                        <p className="text-[11px] font-medium uppercase tracking-wider text-[#9a9ca8] mb-3">
                            Formeon output
                        </p>
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            className="space-y-2.5"
                        >
                            {outputs.map((item) => (
                                <motion.div
                                    key={item.label}
                                    variants={fadeUpChild}
                                    className={`flex gap-3 p-3.5 rounded-xl border ${
                                        item.warn
                                            ? 'bg-amber-50/80 border-amber-100'
                                            : 'bg-white border-[#ebebeb]'
                                    }`}
                                >
                                    <motion.div
                                        className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                                            item.warn ? 'bg-amber-100 text-amber-700' : 'bg-[#eef0f8] text-[#4f5dff]'
                                        }`}
                                    >
                                        <item.icon className="w-4 h-4" />
                                    </motion.div>
                                    <motion.div>
                                        <p className="font-medium text-[#12141c] text-sm mb-0.5">{item.label}</p>
                                        <p className="text-[#64687a] text-sm leading-relaxed">{item.detail}</p>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </Section>
    );
};

export default ProductDemo;
