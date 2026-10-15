'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { easeOut } from '@/lib/motion';
import { MAC_DOWNLOAD_URL, WINDOWS_DOWNLOAD_URL } from '@/lib/links';
import { AppleIcon, WindowsIcon, useDesktopPlatform } from './motion';
import ProductWindow from './ProductWindow';

const HEADLINE = 'Your team’s decisions, remembered.';

const rise = (delay: number): Variants => ({
    hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: easeOut, delay } },
});

const Hero = () => {
    const platform = useDesktopPlatform();
    const windows = platform === 'windows';

    return (
        <section id="top" className="pt-[88px] px-6 text-center">
        <motion.div initial="hidden" animate="visible" className="max-w-[860px] mx-auto flex flex-col items-center gap-[22px]">
            <motion.div variants={rise(0)} className="text-[13px] tracking-[0.08em] uppercase text-moss font-semibold">
                Decision intelligence for product teams
            </motion.div>
            <h1 className="m-0 font-serif font-medium text-[clamp(44px,7vw,84px)] leading-[1.02] tracking-[-0.025em]">
                {HEADLINE.split(' ').map((word, i) => (
                    <motion.span key={i} variants={rise(0.1 + i * 0.08)} className="inline-block">
                        {word}
                        {i < HEADLINE.split(' ').length - 1 && ' '}
                    </motion.span>
                ))}
            </h1>
            <motion.p variants={rise(0.5)} className="m-0 text-[clamp(18px,2vw,21px)] leading-normal text-muted max-w-[620px]">
                Proposals, outcomes and lessons — captured from the tools you already use.{' '}
                <span className="text-ink">No new workflow.</span>
            </motion.p>
            <motion.div variants={rise(0.62)} className="flex gap-3 flex-wrap justify-center mt-2">
                <a
                    href={windows ? WINDOWS_DOWNLOAD_URL : MAC_DOWNLOAD_URL}
                    className="group inline-flex items-center gap-2.5 text-[17px] font-medium px-7 py-4 rounded-full bg-ink text-white hover:bg-black min-h-11 transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(27,26,24,0.22)]"
                >
                    <span className="transition-transform duration-300 group-hover:-translate-y-px">
                        {windows ? <WindowsIcon /> : <AppleIcon />}
                    </span>
                    {windows ? 'Download for Windows' : 'Download for Mac'}
                </a>
                <a
                    href="#how"
                    className="inline-flex items-center text-[17px] font-medium px-7 py-4 rounded-full border border-ink/14 bg-white text-ink hover:border-ink/28 min-h-11 transition-[border-color,transform] duration-300 hover:-translate-y-0.5"
                >
                    See how it works
                </a>
            </motion.div>
            <motion.div variants={rise(0.72)} className="text-sm text-subtle">
                {windows ? 'Windows installer' : 'macOS installer'}
            </motion.div>
        </motion.div>

            <ProductWindow />
        </section>
    );
};

export default Hero;
