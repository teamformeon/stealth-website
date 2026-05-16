'use client';

import React from 'react';
import Link from 'next/link';
import Section from './Section';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const plans = [
    {
        name: 'Starter',
        price: 'Free',
        subtitle: 'For early product exploration',
        features: ['Basic PRD generation', 'Manual context input', 'Limited history'],
        cta: 'Start free',
        href: '/#contact',
        highlighted: false,
    },
    {
        name: 'Team',
        price: '$49',
        priceSuffix: '/user/month',
        subtitle: 'For growing product teams',
        features: [
            'Slack, Jira & Notion integrations',
            'Company memory layer',
            'PRD, ticket, and spec generation',
            'Shared product history',
        ],
        cta: 'Book a demo',
        href: '/#contact',
        highlighted: true,
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        subtitle: 'For larger teams with complex workflows',
        features: [
            'Custom integrations',
            'Dedicated company database',
            'Security review support',
            'Advanced permissions',
            'Priority support',
        ],
        cta: 'Contact us',
        href: '/#contact',
        highlighted: false,
    },
];

const Pricing = () => {
    return (
        <Section id="pricing" className="py-24 md:py-32">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="font-serif-display text-3xl md:text-[2.75rem] leading-tight tracking-tight text-[#171717] mb-4">
                    Pricing
                </h2>
                <p className="text-[#6b6b6b] text-lg">Start free. Scale when your team is ready.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {plans.map((plan, i) => (
                    <motion.div
                        key={plan.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className={cn(
                            'premium-card p-8 flex flex-col',
                            plan.highlighted && 'ring-2 ring-[#1c2033] ring-offset-2 ring-offset-[#F4F5FA] relative'
                        )}
                    >
                        {plan.highlighted && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#1c2033] text-white text-[11px] font-medium">
                                Most popular
                            </span>
                        )}
                        <p className="text-sm font-medium text-[#6b6b6b] mb-1">{plan.name}</p>
                        <div className="flex items-baseline gap-1 mb-1">
                            <span className="text-4xl font-semibold tracking-tight text-[#171717]">{plan.price}</span>
                            {plan.priceSuffix && (
                                <span className="text-[#6b6b6b] text-sm">{plan.priceSuffix}</span>
                            )}
                        </div>
                        <p className="text-[#6b6b6b] text-sm mb-8">{plan.subtitle}</p>

                        <ul className="space-y-3 mb-8 flex-grow">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-2.5 text-sm text-[#525252]">
                                    <Check className="w-4 h-4 text-[#1c2033] shrink-0 mt-0.5" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <Link
                            href={plan.href}
                            className={cn(
                                'w-full text-center rounded-full py-3 text-sm font-medium transition-colors block',
                                plan.highlighted ? 'btn-primary' : 'btn-secondary'
                            )}
                        >
                            {plan.cta}
                        </Link>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

export default Pricing;
