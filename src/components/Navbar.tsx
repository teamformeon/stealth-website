'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Button from './Button';
import DownloadButtons from './DownloadButtons';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-[60] transition-all duration-500',
                isScrolled ? 'glass-nav py-4' : 'bg-transparent py-8'
            )}
        >
            <div className="container-wide flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 active:scale-95 transition-transform">
                    <div className="w-6 h-6 bg-white rounded-sm rotate-45 flex-shrink-0" />
                    <span className="text-xl font-bold tracking-tighter">Stealth</span>
                </Link>

                {/* Desktop Links - Minimal & Spacious */}
                <div className="hidden md:flex items-center gap-10">
                    <div className="flex items-center gap-8 text-[13px] font-medium text-neutral-500 uppercase tracking-widest">
                        <Link href="#features" className="hover:text-white transition-colors">Features</Link>
                        <Link href="#how-it-works" className="hover:text-white transition-colors">Process</Link>
                        <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
                    </div>
                    <div className="h-4 w-px bg-white/10" />
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white">
                            Log in
                        </Button>
                        <DownloadButtons variant="nav" />
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Menu - Full Screenish */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 md:hidden"
                    >
                        <button
                            className="absolute top-8 right-8 text-neutral-500 hover:text-white"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <X size={32} />
                        </button>

                        <div className="flex flex-col items-center gap-12 text-center text-4xl font-black tracking-tighter uppercase">
                            <Link href="#features" onClick={() => setMobileMenuOpen(false)}>Features</Link>
                            <Link href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>Process</Link>
                            <Link href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
                        </div>

                        <div className="mt-16 w-full max-w-xs space-y-4">
                            <DownloadButtons className="flex-col w-full" />
                            <Button variant="ghost" className="w-full text-neutral-500">Sign In</Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
