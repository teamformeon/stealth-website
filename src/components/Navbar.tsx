'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from './Logo';

const navLinks = [
    { href: '/#product', label: 'Product' },
    { href: '/#use-cases', label: 'Use Cases' },
    { href: '/#contact', label: 'Contact' },
];

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 pt-5 px-4 md:px-6">
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                    'pill-nav mx-auto max-w-3xl rounded-full px-4 md:px-6 py-2.5 flex items-center justify-between transition-shadow duration-300',
                    scrolled && 'shadow-md'
                )}
            >
                <Logo showText size="sm" textColor="black" />

                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="px-3.5 py-2 text-[14px] text-[#525252] hover:text-[#171717] transition-colors rounded-full hover:bg-black/[0.03]"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <a 
                        href="https://github.com/alakhjagtap/formeonpublicreleases/releases/download/v10/Formeon-Setup-1.0.19.exe" 
                        className="text-[14px] font-medium text-[#525252] hover:text-[#171717] transition-colors"
                    >
                        Download App
                    </a>
                    <Link href="/#contact" className="btn-primary text-[14px] py-2.5 px-5">
                        Book a demo
                    </Link>
                </div>

                <button
                    type="button"
                    className="md:hidden p-2 text-[#171717]"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </motion.nav>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="md:hidden fixed inset-0 z-40 bg-[#F4F5FA] pt-24 px-8"
                    >
                        <button
                            type="button"
                            className="absolute top-7 right-6 p-2"
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <X size={24} />
                        </button>
                        <div className="flex flex-col gap-6 text-2xl font-medium">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <a
                                href="https://github.com/alakhjagtap/formeonpublicreleases/releases/download/v10/Formeon-Setup-1.0.19.exe"
                                onClick={() => setMobileMenuOpen(false)}
                                className="btn-secondary w-fit mt-4"
                            >
                                Download App
                            </a>
                            <Link
                                href="/#contact"
                                onClick={() => setMobileMenuOpen(false)}
                                className="btn-primary w-fit mt-2"
                            >
                                Book a demo
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
