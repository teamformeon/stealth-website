'use client';

import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { MessageSquare, History, FileText, ListTodo, AlertTriangle } from 'lucide-react';

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
    return (
        <Section id="product" className="py-24 md:py-32">
            <div className="text-center max-w-2xl mx-auto mb-14">
                <h2 className="font-serif-display text-3xl md:text-[2.75rem] leading-tight tracking-tight text-[#171717] mb-4">
                    From Slack thread to structured product work
                </h2>
                <p className="text-[#6b6b6b] text-lg">
                    Ask Formeon in plain language. It pulls company context and returns specs your team can ship.
                </p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="product-window max-w-4xl mx-auto"
            >
                <div className="p-6 md:p-8 border-b border-[#ebebeb] bg-[#fafafa]">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-[#9a9a9a] mb-3">
                        Your prompt
                    </p>
                    <p className="text-[#171717] text-lg md:text-xl font-medium leading-snug">
                        &ldquo;Look at what&apos;s happening in Slack and generate a PRD for this feature request.&rdquo;
                    </p>
                </div>

                <div className="p-6 md:p-8 space-y-3">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-[#9a9a9a] mb-4">
                        Formeon output
                    </p>
                    {outputs.map((item, i) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06 }}
                            className={`flex gap-4 p-4 rounded-xl border ${
                                item.warn
                                    ? 'bg-amber-50/80 border-amber-100'
                                    : 'bg-white border-[#ebebeb]'
                            }`}
                        >
                            <div
                                className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${
                                    item.warn ? 'bg-amber-100 text-amber-700' : 'bg-[#eef0f8] text-[#4f5dff]'
                                }`}
                            >
                                <item.icon className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="font-medium text-[#171717] text-sm mb-0.5">{item.label}</p>
                                <p className="text-[#6b6b6b] text-sm leading-relaxed">{item.detail}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </Section>
    );
};

export default ProductDemo;
