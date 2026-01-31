'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const copyEmail = () => {
        navigator.clipboard.writeText('stealthassistant1@gmail.com');
    };

    return (
        <footer className="bg-black pt-32 pb-16 px-6 border-t border-white/5">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
                    <div className="md:col-span-5">
                        <Link href="/" className="flex items-center gap-3 mb-8 group">
                            <div className="w-5 h-5 bg-white rounded-sm rotate-45" />
                            <span className="text-2xl font-black tracking-tighter uppercase">Stealth Technologies</span>
                        </Link>
                        <p className="text-neutral-500 text-lg leading-relaxed max-w-sm mb-10">
                            Designed for high-performance builders who demand more from their professional workspace.
                        </p>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-8">Platform</h4>
                        <ul className="space-y-4 text-sm text-neutral-500">
                            <li><Link href="/#features" className="hover:text-white">Features</Link></li>
                            <li><Link href="/#how-it-works" className="hover:text-white">Process</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-8">Company</h4>
                        <ul className="space-y-4 text-sm text-neutral-500">
                            <li><Link href="#" className="hover:text-white">About</Link></li>
                            <li><Link href="/security" className="hover:text-white">Security</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-3">
                        <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-8">Support</h4>
                        <button
                            onClick={copyEmail}
                            className="group flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 w-full hover:border-white/10 transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <Mail size={16} className="text-neutral-500" />
                                <span className="text-sm">stealthassistant1@gmail.com</span>
                            </div>
                            <Copy size={14} className="text-neutral-600 group-hover:text-white transition-colors" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-[11px] font-bold text-neutral-700 uppercase tracking-widest pt-12 border-t border-white/5">
                    <div>© {currentYear} Stealth Technologies Corp.</div>
                    <div className="flex gap-10">
                        <span>Status: All Systems Go</span>
                        <Link href="#" className="hover:text-white transition-colors">Press Kit</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
