'use client';

import React from 'react';
import Section from './Section';
import { Activity, Fingerprint, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const Vision = () => {
    return (
        <Section id="vision" className="border-t border-white/5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-10 tracking-tight uppercase">The <br /><span className="text-neutral-500 italic">Vision.</span></h2>
                    <div className="space-y-12">
                        <div className="flex gap-6">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-stealth-light-gray flex items-center justify-center text-stealth-accent">
                                <Activity size={20} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 uppercase tracking-widest text-[11px] text-neutral-400">Computational Trust</h3>
                                <p className="text-neutral-500 leading-relaxed text-sm">We are building an AI coordination layer that understands work as deeply as you do, with zero-compromise on data sovereignty.</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-stealth-light-gray flex items-center justify-center text-stealth-accent">
                                <Fingerprint size={20} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 uppercase tracking-widest text-[11px] text-neutral-400">Engineering First</h3>
                                <p className="text-neutral-500 leading-relaxed text-sm">Born from deep user research, Stealth Technologies is built for practitioners who need tools that solve fragmentation, not just add to it.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="premium-card p-12 bg-white/[0.02]">
                    <div className="flex flex-col items-center text-center gap-6">
                        <Activity className="w-16 h-16 text-stealth-accent opacity-40 mb-4" />
                        <h3 className="text-2xl font-bold uppercase tracking-tighter">Our Mission</h3>
                        <p className="text-neutral-500 text-sm max-w-sm leading-relaxed">
                            To reduce cognitive overhead at scale and create a world where software executes work, instead of just housing it.
                        </p>
                        <div className="mt-8 pt-8 border-t border-white/5 w-full flex justify-center gap-8 opacity-40">
                            <Activity size={16} />
                            <Fingerprint size={16} />
                            <Settings size={16} />
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Vision;
