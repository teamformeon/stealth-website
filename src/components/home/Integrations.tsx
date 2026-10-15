'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { springSnappy, viewport } from '@/lib/motion';
import { Reveal } from './motion';
import { eyebrow } from './type';

const tools = [
    { name: 'Jira', logo: '/logos/jira.svg' },
    { name: 'Linear', logo: '/logos/linear.svg' },
    { name: 'Confluence', logo: '/logos/confluence.svg' },
    { name: 'Slack', logo: '/logos/slack.svg' },
    { name: 'Gmail', logo: '/logos/gmail.svg' },
    { name: 'Google Drive', logo: '/logos/google.svg' },
    { name: 'Notion', logo: '/logos/notion.svg' },
];

const Integrations = () => (
    <section className="px-6 pt-16 pb-6">
        <div className="max-w-[1120px] mx-auto text-center">
            <Reveal>
                <div className={eyebrow}>Works with your stack</div>
                <div className="font-serif text-[clamp(24px,2.6vw,30px)] mt-2.5">Built on the tools your team already lives in</div>
            </Reveal>
            <motion.div
                className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3 mt-8"
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            >
                {tools.map((t) => (
                    <motion.div
                        key={t.name}
                        variants={{ hidden: { opacity: 0, y: 14, scale: 0.92 }, visible: { opacity: 1, y: 0, scale: 1, transition: springSnappy } }}
                        className="flex items-center justify-center gap-2.5 h-[72px] bg-white border border-ink/7 rounded-[14px] font-medium transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(27,26,24,0.08)]"
                    >
                        <Image src={t.logo} alt="" width={22} height={22} />
                        {t.name}
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </section>
);

export default Integrations;
