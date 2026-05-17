'use client';

import React from 'react';
import Link from 'next/link';
import Section from './Section';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fadeUp, fadeUpChild, springSnappy, staggerContainer, viewport } from '@/lib/motion';

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
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUp}
                className="text-center max-w-2xl mx-auto mb-16"
            >
                <h2 className="font-serif-display text-3xl md:text-[2.75rem] leading-tight tracking-tight text-[#12141c] mb-4">
                    Pricing
                </h2>
                <p className="text-[#64687a] text-lg">Start free. Scale when your team is ready.</p>
            </motion.div>

            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch"
            >
                {plans.map((plan) => (
                    <motion.div
                        key={plan.name}
                        variants={fadeUpChild}
                        whileHover={{ y: plan.highlighted ? -10 : -6, transition: springSnappy }}
                        className={cn(
                            'premium-card p-8 flex flex-col relative',
                            plan.highlighted && 'ring-2 ring-[#4f5dff]/40 ring-offset-2 ring-offset-[#F4F5FA] md:scale-[1.03] z-10'
                        )}
                    >
                        {plan.highlighted && (
                            <>
                                <motion.div
                                    className="absolute -inset-px rounded-[21px] bg-gradient-to-b from-[#4f5dff]/20 to-transparent -z-10"
                                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                                />
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#1c2033] text-white text-[11px] font-medium">
                                    Most popular
                                </span>
                            </>
                        )}
                        <p className="text-sm font-medium text-[#64687a] mb-1">{plan.name}</p>
                        <div className="flex items-baseline gap-1 mb-1">
                            <span className="text-4xl font-semibold tracking-tight text-[#12141c]">{plan.price}</span>
                            {plan.priceSuffix && (
                                <span className="text-[#64687a] text-sm">{plan.priceSuffix}</span>
                            )}
                        </div>
                        <p className="text-[#64687a] text-sm mb-8">{plan.subtitle}</p>

                        <ul className="space-y-3 mb-8 flex-grow">
                            {plan.features.map((feature, fi) => (
                                <motion.li
                                    key={feature}
                                    initial={{ opacity: 0, x: -8 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + fi * 0.06 }}
                                    className="flex items-start gap-2.5 text-sm text-[#52556a]"
                                >
                                    <Check className="w-4 h-4 text-[#4f5dff] shrink-0 mt-0.5" />
                                    {feature}
                                </motion.li>
                            ))}
                        </ul>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={springSnappy}>
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
                    </motion.div>
                ))}
            </motion.div>
        </Section>
    );
};

export default Pricing;
