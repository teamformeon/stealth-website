'use client';

import React from 'react';
import Section from './Section';
import { Activity, Fingerprint, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const Vision = () => {
    return (
        <Section id="vision" className="border-t border-slate-200 bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-10 tracking-tight text-black">The <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Vision.</span></h2>
                    <div className="space-y-12">
                        <div className="flex gap-6">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                                <Activity size={20} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-black">Upload & Delegate</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">PMs upload meeting transcripts or logs. Stealth extracts tasks and creates Jira tickets you can assign to engineers—all from one place.</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                                <Fingerprint size={20} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-black">System-Wide Integration</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">Works across your entire workflow: email, calendar, tasks, notes, Notion, Slack, and more. Context flows seamlessly between tools.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="premium-card p-12 bg-white border border-slate-200 shadow-lg">
                    <div className="flex flex-col items-center text-center gap-6">
                        <Activity className="w-16 h-16 text-blue-600 mb-4" />
                        <h3 className="text-2xl font-bold text-black">Our Mission</h3>
                        <p className="text-slate-600 text-sm max-w-sm leading-relaxed">
                            To build AI that helps PMs move faster: upload transcripts and logs, delegate to engineers via Jira, and keep everything in one workflow—without the friction of scattered tabs.
                        </p>
                        <div className="mt-8 pt-8 border-t border-slate-200 w-full flex justify-center gap-8">
                            <Activity size={16} className="text-blue-600" />
                            <Fingerprint size={16} className="text-blue-600" />
                            <Settings size={16} className="text-blue-600" />
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Vision;
