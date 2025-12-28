'use client';

import React from 'react';
import Section from './Section';
import { ShieldAlert, Fingerprint, Lock, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const Security = () => {
    return (
        <Section className="border-t border-white/5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-10 tracking-tight">Serious about <br /><span className="text-neutral-500">Security.</span></h2>
                    <div className="space-y-12">
                        <div className="flex gap-6">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-stealth-light-gray flex items-center justify-center text-stealth-accent">
                                <Lock size={20} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 uppercase tracking-widest text-[11px] text-neutral-400">Local Sovereignty</h3>
                                <p className="text-neutral-500 leading-relaxed text-sm">All sensitive data remains on your machine. We use sandboxed execution for every local process.</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-stealth-light-gray flex items-center justify-center text-stealth-accent">
                                <Activity size={20} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 uppercase tracking-widest text-[11px] text-neutral-400">Complete Audiability</h3>
                                <p className="text-neutral-500 leading-relaxed text-sm">Full transparency logs of every action the utility takes. No hidden background telemetry.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="premium-card p-12 bg-white/[0.02]">
                    <div className="flex flex-col items-center text-center gap-6">
                        <ShieldAlert className="w-16 h-16 text-stealth-accent opacity-40 mb-4" />
                        <h3 className="text-2xl font-bold">Enterprise Posture</h3>
                        <p className="text-neutral-500 text-sm max-w-sm leading-relaxed">
                            Stealth is designed for highly controlled environments, meeting requirements for high-stakes professional data handling.
                        </p>
                        <div className="mt-8 pt-8 border-t border-white/5 w-full flex justify-center gap-8 opacity-40">
                            <Lock size={16} />
                            <Fingerprint size={16} />
                            <Activity size={16} />
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Security;
