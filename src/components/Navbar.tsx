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
        <motion.div
            animate={{
                paddingTop: isScrolled ? '16px' : '0px',
                paddingLeft: isScrolled ? '16px' : '0px',
                paddingRight: isScrolled ? '16px' : '0px',
            }}
            transition={{
                type: "spring",
                stiffness: 80,
                damping: 25
            }}
            className="fixed top-0 left-0 right-0 z-[60] flex justify-center pointer-events-none"
        >
            <motion.nav
                layout
                initial={false}
                animate={{
                    width: isScrolled ? 'auto' : '100%',
                    backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0)',
                    backdropFilter: isScrolled ? 'blur(16px)' : 'blur(0px)',
                    borderRadius: isScrolled ? '9999px' : '0px',
                    borderWidth: isScrolled ? '1px' : '0px',
                    paddingLeft: isScrolled ? '24px' : '32px',
                    paddingRight: isScrolled ? '24px' : '32px',
                    paddingTop: isScrolled ? '12px' : '24px',
                    paddingBottom: isScrolled ? '12px' : '24px',
                }}
                transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 22,
                    mass: 1
                }}
                className={cn(
                    'pointer-events-auto border-slate-200/60 shadow-xl shadow-black/5 flex items-center justify-center',
                    !isScrolled && 'container-wide w-full'
                )}
                style={{
                    maxWidth: isScrolled ? 'fit-content' : '100%',
                }}
            >
                <div className={cn(
                    "flex items-center justify-between w-full whitespace-nowrap",
                    isScrolled ? "gap-12" : ""
                )}>
                    <div className="flex-shrink-0 flex items-center">
                        <Logo showText={!isScrolled} size="md" textColor="black" />
                    </div>

                    {/* Desktop Links - Minimal & Spacious */}
                    <div className="hidden md:flex items-center gap-10 flex-shrink-0">
                        <div className={cn(
                            "flex items-center gap-8 text-[13px] font-medium uppercase tracking-widest transition-colors",
                            isScrolled ? "text-slate-600" : "text-slate-900"
                        )}>
                            <Link href="/#features" className="hover:opacity-70 transition-opacity hover:text-black">Features</Link>
                            <Link href="/#process" className="hover:opacity-70 transition-opacity hover:text-black">Process</Link>
                        </div>
                        <div className="h-4 w-px bg-slate-200" />
                        <div className="flex items-center">
                            <Link
                                href="/#book-demo"
                                className="text-[13px] font-bold uppercase tracking-widest hover:opacity-70 transition-opacity whitespace-nowrap text-black"
                            >
                                Try Stealth Out
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden flex-shrink-0">
                        <button
                            className="p-2 text-black"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
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
                                <Link href="/#process" onClick={() => setMobileMenuOpen(false)}>Process</Link>
                            </div>

                            <div className="mt-16 w-full max-w-xs space-y-4">
                                <Link
                                    href="/#book-demo"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block w-full text-center py-4 bg-white text-black text-xs font-bold uppercase tracking-widest"
                                >
                                    Try Stealth Out
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </motion.div>
    );
};

export default Navbar;
