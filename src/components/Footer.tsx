import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DEMO_URL, LINKEDIN_URL } from '@/lib/links';

const columns = [
    {
        title: 'Product',
        links: [
            { href: '/#product', label: 'Overview' },
            { href: '/#how', label: 'How it works' },
            { href: '/#pricing', label: 'Pricing' },
            { href: '/#download', label: 'Download' },
        ],
    },
    {
        title: 'Company',
        links: [
            { href: '/blog', label: 'Blog' },
            { href: 'mailto:teamformeon@gmail.com', label: 'Contact' },
            { href: DEMO_URL, label: 'Book a demo' },
        ],
    },
    {
        title: 'Legal',
        links: [
            { href: '/security', label: 'Security' },
            { href: '/privacy', label: 'Privacy' },
            { href: '/terms', label: 'Terms' },
        ],
    },
];

const Footer = () => (
    <footer id="contact" className="leading-[normal] border-t border-ink/8 px-6 pt-16 pb-10">
        <div className="max-w-[1120px] mx-auto flex flex-wrap gap-10 justify-between">
            <div className="flex-[1_1_260px]">
                <div className="flex items-center gap-2.5">
                    <Image src="/formeon-mark.png" alt="" width={28} height={28} className="object-contain" />
                    <span className="font-serif text-xl font-semibold">Formeon</span>
                </div>
                <p className="mt-3.5 text-subtle text-[15px] leading-normal max-w-[280px]">The memory layer for product teams.</p>
            </div>
            <div className="flex-[2_1_480px] grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-6 text-[15px]">
                {columns.map((col) => (
                    <div key={col.title} className="flex flex-col gap-2.5">
                        <div className="font-semibold">{col.title}</div>
                        {col.links.map((link) => (
                            <Link key={link.label} href={link.href} className="text-muted hover:text-moss transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                ))}
            </div>
        </div>
        <div className="max-w-[1120px] mx-auto mt-12 pt-5 border-t border-ink/8 flex flex-wrap justify-between gap-3 text-sm text-subtle">
            <span>© Formeon {new Date().getFullYear()}</span>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-subtle hover:text-moss transition-colors">
                LinkedIn
            </a>
        </div>
    </footer>
);

export default Footer;
