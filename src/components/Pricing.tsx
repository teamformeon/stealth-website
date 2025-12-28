'use client';

import React from 'react';
import Section from './Section';
import Button from './Button';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const tiers = [
    {
        name: 'Starter',
        price: '$0',
        desc: 'For individual power users.',
        features: ['Standard Engine', 'Global Hotkey', 'Local Storage', 'Basic Integrations'],
    },
    {
        name: 'Pro',
        price: '$29',
        desc: 'Maximum performance for teams.',
        features: ['Advanced LLM Access', 'Deep OS Integration', 'Multi-tool Pipelines', 'Voice Command Engine', 'Priority Local Sync'],
        popular: true,
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        desc: 'Dedicated private deployments.',
        features: ['Air-gapped Support', 'Custom Local LLMs', 'IAM Integration', 'Audit Provisioning', '24/7 Support'],
    },
];

const Pricing = () => {
    return (
        <Section id="pricing" className="bg-neutral-900/10">
            <div className="max-w-2xl text-center mx-auto mb-24">
                <h2 className="text-4xl md:text-6xl font-bold mb-8">Simple <span className="text-neutral-500 italic">Scale.</span></h2>
                <p className="text-neutral-500 text-xl">Choose the plan that fits your professional needs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {tiers.map((tier, idx) => (
                    <motion.div
                        key={tier.name}
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className={tier.popular ? "relative z-10" : ""}
                    >
                        <div className={`h-full flex flex-col p-12 premium-card ${tier.popular ? 'border-stealth-accent/30 bg-[#080808]' : ''
                            }`}>
                            {tier.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-stealth-accent text-black text-[10px] font-black uppercase tracking-widest rounded-full">
                                    Recommended
                                </div>
                            )}

                            <div className="mb-10">
                                <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest mb-4">{tier.name}</div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-black">{tier.price}</span>
                                    {tier.price !== 'Custom' && <span className="text-neutral-600 font-medium font-mono text-sm">/mo</span>}
                                </div>
                                <p className="mt-4 text-neutral-500 text-sm">{tier.desc}</p>
                            </div>

                            <div className="h-px bg-white/5 w-full mb-10" />

                            <ul className="space-y-5 mb-12 grow">
                                {tier.features.map(f => (
                                    <li key={f} className="flex items-center gap-3 text-sm text-neutral-400">
                                        <Check size={14} className="text-stealth-accent flex-shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <Button
                                variant={tier.popular ? 'glow' : 'outline'}
                                className="w-full h-14 font-bold tracking-tight text-base"
                            >
                                {tier.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

export default Pricing;
