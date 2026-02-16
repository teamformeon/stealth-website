'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

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
                isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200 py-4' : 'bg-transparent py-8'
            )}
        >
            <div className="container-wide flex items-center justify-between">
                <Logo showText={true} size="md" textColor={isScrolled ? "black" : "white"} />

                {/* Desktop Links - Minimal & Spacious */}
                <div className="hidden md:flex items-center gap-10">
                    <div className={cn("flex items-center gap-8 text-[13px] font-medium uppercase tracking-widest transition-colors", isScrolled ? "text-slate-600" : "text-white/80")}>
                        <Link href="/#features" className={cn("hover:opacity-70 transition-opacity", isScrolled ? "hover:text-black" : "hover:text-white")}>Features</Link>
                        <Link href="/#how-it-works" className={cn("hover:opacity-70 transition-opacity", isScrolled ? "hover:text-black" : "hover:text-white")}>Process</Link>
                    </div>
                    <div className={cn("h-4 w-px transition-colors", isScrolled ? "bg-slate-300" : "bg-white/20")} />
                    <div className="flex items-center gap-4">
                        <Link href="/#explore" className={cn("text-[13px] font-bold uppercase tracking-widest hover:opacity-70 transition-opacity", isScrolled ? "text-black" : "text-white")}>
                            Explore the Product
                        </Link>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={cn("md:hidden p-2 transition-colors", isScrolled ? "text-black" : "text-white")}
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
                            <Link href="/#features" onClick={() => setMobileMenuOpen(false)}>Features</Link>
                            <Link href="/#how-it-works" onClick={() => setMobileMenuOpen(false)}>Process</Link>
                        </div>

                        <div className="mt-16 w-full max-w-xs space-y-4">
                            <Link
                                href="/#explore"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block w-full text-center py-4 bg-white text-black text-xs font-bold uppercase tracking-widest"
                            >
                                Explore Product
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
