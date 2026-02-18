'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Linkedin } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const email = 'stealthassistant1@gmail.com';
    const linkedinUrl = 'https://www.linkedin.com/company/112389227/';

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
                            <li><Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link></li>
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
                        <div className="flex items-center gap-3">
                            <a
                                href={linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-11 h-11 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md hover:text-blue-600 transition-all"
                                aria-label="Visit our LinkedIn"
                            >
                                <Linkedin size={20} className="text-black" />
                            </a>
                            <a
                                href={`mailto:${email}`}
                                className="flex items-center justify-center w-11 h-11 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md hover:text-blue-600 transition-all"
                                aria-label={`Email us at ${email}`}
                            >
                                <Mail size={20} className="text-black" />
                            </a>
                        </div>
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
