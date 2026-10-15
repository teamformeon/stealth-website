'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { easeOut, viewport } from '@/lib/motion';
import { MAC_DOWNLOAD_URL } from '@/lib/links';
import { AppleIcon } from './motion';

const plans = [
    { name: 'Starter', blurb: 'Unlimited capture, every agent finding', price: '$39', featured: false },
    { name: 'Growth', blurb: 'Audience briefs, priority models, calibration', price: '$69', featured: true },
    { name: 'Scale', blurb: 'For larger orgs — talk to us', price: '$79+', featured: false },
];

const PricingCTA = () => (
    <section id="pricing" className="px-6 pt-[120px] pb-20 scroll-mt-16">
        <motion.div
            id="download"
            className="max-w-[1120px] mx-auto bg-ink text-paper rounded-[28px] px-[clamp(24px,5vw,72px)] py-[clamp(40px,6vw,80px)] flex flex-wrap gap-12 items-center scroll-mt-24"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={{
                hidden: { opacity: 0, y: 40, scale: 0.98 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: easeOut, staggerChildren: 0.1, delayChildren: 0.35 } },
            }}
        >
            <div className="flex-[1_1_380px]">
                <h2 className="m-0 font-serif font-medium text-[clamp(34px,4.4vw,54px)] leading-[1.04] tracking-[-0.02em]">
                    Start free. Upgrade when your team does.
                </h2>
                <p className="mt-[18px] text-[17px] leading-[1.55] text-dim max-w-[460px]">
                    A free workspace gets you connected and capturing today. Paid plans unlock every agent finding and team-wide memory.
                </p>
                <div className="flex flex-wrap gap-3 mt-7">
                    <a
                        href={MAC_DOWNLOAD_URL}
                        className="inline-flex items-center gap-2.5 text-base font-medium px-6 py-3.5 rounded-full bg-paper text-ink hover:bg-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5"
                    >
                        <AppleIcon size={17} />
                        Download for free
                    </a>
                    <a
                        href="#pricing"
                        className="inline-flex items-center text-base font-medium px-6 py-3.5 rounded-full border border-paper/30 text-paper hover:border-paper/60 transition-colors"
                    >
                        View pricing
                    </a>
                </div>
            </div>
            <div className="flex-[1_1_340px] flex flex-col gap-2.5">
                {plans.map((p) => (
                    <motion.div
                        key={p.name}
                        variants={{ hidden: { opacity: 0, x: 24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easeOut } } }}
                        className={`flex justify-between items-baseline gap-4 border rounded-2xl px-5 py-[18px] transition-colors duration-300 hover:bg-paper/8 ${p.featured ? 'border-paper/40 bg-paper/6' : 'border-paper/14'}`}
                    >
                        <div>
                            <div className="font-semibold text-[17px]">{p.name}</div>
                            <div className="text-sm text-dim mt-0.5">{p.blurb}</div>
                        </div>
                        <div className="font-serif text-[28px] whitespace-nowrap">
                            {p.price}
                            <span className="font-sans text-[13px] text-dim"> /seat</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    </section>
);

export default PricingCTA;
