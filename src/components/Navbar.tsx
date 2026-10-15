'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { DEMO_URL } from '@/lib/links';

const navLinks = [
    { href: '/#product', label: 'Product' },
    { href: '/#how', label: 'How it works' },
    { href: '/#heard', label: 'Why Formeon' },
    { href: '/#pricing', label: 'Pricing' },
    { href: '/blog', label: 'Blog' },
];

const Announcement = () => (
    <div className="leading-[normal] bg-ink text-paper text-sm px-4 py-2.5 text-center">
        <span className="inline-flex flex-wrap items-center justify-center gap-2">
            <span className="bg-moss text-white rounded-full px-2.5 py-0.5 text-xs font-semibold">New</span>
            Project Briefing — get up to speed on any project instantly.
            <Link href="/#product" className="text-paper underline underline-offset-[3px] hover:text-sage">
                See how
            </Link>
        </span>
    </div>
);

const Navbar = () => {
    const isHome = usePathname() === '/';

    return (
        <>
            {isHome && <Announcement />}
            <header className="leading-[normal] sticky top-0 z-20 bg-paper/88 backdrop-blur-[14px] border-b border-ink/6">
                <nav className="max-w-[1200px] mx-auto px-6 py-3.5 flex items-center justify-between gap-6">
                    <Link href="/" className="flex items-center gap-2.5 text-ink">
                        <Image src="/formeon-mark.png" alt="" width={30} height={30} className="object-contain" priority />
                        <span className="font-serif text-[22px] font-semibold tracking-[-0.01em]">Formeon</span>
                    </Link>
                    <div className="fm-navlinks flex items-center gap-8 text-[15px]">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="text-muted hover:text-ink transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-2.5">
                        <a
                            href={DEMO_URL}
                            className="fm-hide-sm text-[15px] font-medium px-[18px] py-2.5 rounded-full border border-ink/14 bg-white text-ink hover:border-ink/28 transition-colors"
                        >
                            Book a demo
                        </a>
                        <Link
                            href="/#download"
                            className="text-[15px] font-medium px-5 py-[11px] rounded-full bg-ink text-white hover:bg-black transition-colors"
                        >
                            Download
                        </Link>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Navbar;
