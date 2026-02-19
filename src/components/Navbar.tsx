'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import Logo from './Logo';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Smooth scroll-synced values
    const { scrollY } = useScroll();

    // We'll transition over a range of 0 to 100 pixels
    const scrollRange = [0, 100];

    // Use MotionValueEvent to update binary state at the end of the range
    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 10 && !isScrolled) setIsScrolled(true);
        if (latest <= 10 && isScrolled) setIsScrolled(false);
    });

    // Transform values directly tied to scroll position for absolute smoothness
    const rawPaddingTop = useTransform(scrollY, scrollRange, [0, 16]);
    const rawPaddingSide = useTransform(scrollY, scrollRange, [0, 16]);
    const rawBorderRadius = useTransform(scrollY, scrollRange, ['0px', '9999px']);
    const rawBorderWidth = useTransform(scrollY, scrollRange, ['0px', '1px']);
    const rawBgOpacity = useTransform(scrollY, scrollRange, [0, 0.95]);
    const rawBlur = useTransform(scrollY, scrollRange, [0, 16]);
    const rawInnerPaddingX = useTransform(scrollY, scrollRange, [32, 24]);
    const rawInnerPaddingY = useTransform(scrollY, scrollRange, [24, 12]);
    const rawShadowOpacity = useTransform(scrollY, scrollRange, [0, 0.05]);
    const rawBorderBottomOpacity = useTransform(scrollY, [0, 20, 100], [0.1, 0, 0]);
    const rawFullBorderOpacity = useTransform(scrollY, [0, 20, 100], [0, 1, 1]);

    // Use springs to smooth out the scroll input
    const springConfig = { stiffness: 100, damping: 30, mass: 0.8 };
    const paddingTop = useSpring(rawPaddingTop, springConfig);
    const paddingLeft = useSpring(rawPaddingSide, springConfig);
    const paddingRight = useSpring(rawPaddingSide, springConfig);
    const innerPaddingX = useSpring(rawInnerPaddingX, springConfig);
    const innerPaddingY = useSpring(rawInnerPaddingY, springConfig);
    const borderRadius = useSpring(rawBorderRadius, { stiffness: 120, damping: 30 });

    return (
        <motion.div
            style={{
                paddingTop,
                paddingLeft,
                paddingRight,
            }}
            className="fixed top-0 left-0 right-0 z-[60] flex justify-center pointer-events-none"
        >
            <motion.nav
                layout
                style={{
                    width: isScrolled ? 'fit-content' : '100%',
                    backgroundColor: useTransform(rawBgOpacity, (o) => `rgba(255, 255, 255, ${o})`),
                    backdropFilter: useTransform(rawBlur, (b) => `blur(${b}px)`),
                    borderRadius,
                    borderStyle: 'solid',
                    borderColor: useTransform(scrollY, [0, 20, 100], [
                        'rgba(226, 232, 240, 0.8)', // Clear separator at top
                        'rgba(226, 232, 240, 0.6)',
                        'rgba(226, 232, 240, 0.6)'
                    ]),
                    borderWidth: useTransform(scrollY, [0, 1, 20, 100], [
                        '0px 0px 1px 0px', // Only bottom border at top
                        '1px 1px 1px 1px',
                        '1px 1px 1px 1px',
                        '1px 1px 1px 1px'
                    ]),
                    boxShadow: useTransform(rawShadowOpacity, (o) => `0 20px 25px -5px rgba(0, 0, 0, ${o}), 0 8px 10px -6px rgba(0, 0, 0, ${o})`),
                    paddingLeft: innerPaddingX,
                    paddingRight: innerPaddingX,
                    paddingTop: innerPaddingY,
                    paddingBottom: innerPaddingY,
                }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 30,
                    mass: 0.8
                }}
                className={cn(
                    'pointer-events-auto flex items-center justify-center overflow-hidden',
                    !isScrolled && 'container-wide w-full px-0'
                )}
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
