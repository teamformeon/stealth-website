'use client';

import React from 'react';
import Link from 'next/link';
import Logo from './Logo';

const footerLinks = {
    Product: [
        { href: '/#product', label: 'Product' },
        { href: '/#use-cases', label: 'Use Cases' },
        { href: '/#pricing', label: 'Pricing' },
    ],
    Company: [
        { href: '/#contact', label: 'Contact' },
        { href: '/privacy', label: 'Privacy' },
        { href: '/terms', label: 'Terms' },
    ],
};

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-[#ebebeb] bg-[#F4F5FA] pt-16 pb-10 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 mb-14">
                    <div>
                        <Logo showText size="md" textColor="black" />
                        <p className="mt-4 text-[#6b6b6b] text-sm max-w-xs leading-relaxed">
                            The memory layer for product teams.
                        </p>
                    </div>

                    <div className="flex gap-16">
                        {Object.entries(footerLinks).map(([group, links]) => (
                            <div key={group}>
                                <h4 className="text-xs font-medium uppercase tracking-wider text-[#9a9a9a] mb-4">
                                    {group}
                                </h4>
                                <ul className="space-y-3">
                                    {links.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="text-sm text-[#525252] hover:text-[#171717] transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-8 border-t border-[#ebebeb] text-sm text-[#9a9a9a]">
                    © {currentYear} Formeon
                </div>
            </div>
        </footer>
    );
};

export default Footer;
