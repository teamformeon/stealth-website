'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from './Logo';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const copyEmail = () => {
        navigator.clipboard.writeText('stealthassistant1@gmail.com');
    };

    return (
        <footer className="bg-slate-50 pt-32 pb-16 px-6 border-t border-slate-200">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
                    <div className="md:col-span-3">
                        <div className="mb-8">
                            <Logo showText={true} size="md" textColor="black" />
                        </div>
                        <p className="text-slate-500 text-lg leading-relaxed max-w-sm mb-10">
                            Designed for high-performance project managers who demand more from their professional workspace.
                        </p>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-8">Platform</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><Link href="/#features" className="hover:text-blue-600 transition-colors">Features</Link></li>
                            <li><Link href="/#how-it-works" className="hover:text-blue-600 transition-colors">Process</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-8">Company</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><Link href="#" className="hover:text-blue-600 transition-colors">About</Link></li>
                            <li><Link href="/security" className="hover:text-blue-600 transition-colors">Security</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-8">Legal</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-3">
                        <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-8">Support</h4>
                        <button
                            onClick={copyEmail}
                            className="group inline-flex items-center gap-2 p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
                        >
                            <Mail size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                            <span className="text-xs text-slate-600 font-medium whitespace-nowrap">stealthassistant1@gmail.com</span>
                            <Copy size={12} className="text-slate-300 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest pt-12 border-t border-slate-200">
                    <div>© {currentYear} Stealth Technologies Corp.</div>
                    <div className="flex gap-10">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            All Systems Go
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
