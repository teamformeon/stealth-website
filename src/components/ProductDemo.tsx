'use client';

import React, { useRef } from 'react';
import Section from './Section';
import { motion, useInView } from 'framer-motion';
import { MessageSquare, History, FileText, ListTodo, AlertTriangle } from 'lucide-react';
import { fadeUp, fadeUpChild, scaleIn, staggerContainer, viewport } from '@/lib/motion';

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

            <motion.div
                ref={ref}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={scaleIn}
                className="product-window max-w-4xl mx-auto relative"
            >
                <motion.div
                    className="p-6 md:p-8 border-b border-[#ebebeb] bg-[#fafafa] relative overflow-hidden"
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4f5dff]/5 to-transparent"
                        animate={isInView ? { x: ['-100%', '200%'] } : {}}
                        transition={{ repeat: Infinity, duration: 3, ease: 'linear', repeatDelay: 2 }}
                    />
                    <p className="text-[11px] font-medium uppercase tracking-wider text-[#9a9ca8] mb-3 relative">
                        Your prompt
                    </p>
                    <p className="text-[#12141c] text-lg md:text-xl font-medium leading-snug relative">
                        &ldquo;Look at what&apos;s happening in Slack and generate a PRD for this feature request.&rdquo;
                    </p>
                </motion.div>

                <div className="p-6 md:p-8 relative">
                    <motion.div
                        className="absolute left-10 top-8 bottom-8 w-px bg-gradient-to-b from-[#4f5dff]/40 via-[#4f5dff]/20 to-transparent hidden md:block"
                        initial={{ scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : {}}
                        transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        style={{ originY: 0 }}
                    />
                    <p className="text-[11px] font-medium uppercase tracking-wider text-[#9a9ca8] mb-4">
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
                                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                                className={`flex gap-4 p-4 rounded-xl border relative md:ml-2 ${
                                    item.warn
                                        ? 'bg-amber-50/80 border-amber-100'
                                        : 'bg-white border-[#ebebeb]'
                                }`}
                            >
                                <motion.div
                                    className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${
                                        item.warn ? 'bg-amber-100 text-amber-700' : 'bg-[#eef0f8] text-[#4f5dff]'
                                    }`}
                                    whileHover={{ rotate: [0, -10, 10, 0] }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <item.icon className="w-4 h-4" />
                                </motion.div>
                                <div>
                                    <p className="font-medium text-[#12141c] text-sm mb-0.5">{item.label}</p>
                                    <p className="text-[#64687a] text-sm leading-relaxed">{item.detail}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </Section>
    );
};

export default ProductDemo;
