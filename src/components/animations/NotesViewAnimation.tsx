'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Plus } from 'lucide-react';
import { AnimationFrame, ease } from './shared';

export default function NotesViewAnimation() {
    const ref = React.useRef(null);
    const inView = useInView(ref, { once: false, margin: '-60px', amount: 0.3 });

    return (
        <motion.div ref={ref} className="w-full">
            <AnimationFrame activeNav="mic" aspect="aspect-[4/3]" maxHeight="max-h-[280px] md:max-h-[360px]">
                <motion.div
                    className="absolute inset-0 flex flex-col px-4 sm:px-5 py-3"
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
                >
                    <motion.div
                        variants={{ hidden: { opacity: 0, y: -6 }, visible: { opacity: 1, y: 0 } }}
                        className="flex items-center justify-between mb-3"
                    >
                        <h3 className="font-serif-display text-base sm:text-lg text-slate-900">Coming up</h3>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#6366F1] text-white text-[10px] font-medium">
                            <Plus className="w-3 h-3" />
                            New Note
                        </span>
                    </motion.div>

                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                        className="rounded-xl border border-[#EBEBEB] bg-white p-3 flex gap-3 shadow-sm mb-4"
                    >
                        <div className="shrink-0 text-center">
                            <p className="text-[10px] font-semibold text-slate-400">18</p>
                            <p className="text-[11px] font-bold text-slate-800">MAY</p>
                            <p className="text-[9px] text-slate-500">MON</p>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500">
                            <Calendar className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                            <motion.div>
                                <p className="text-[11px] text-slate-700">No upcoming events</p>
                                <p className="text-[9px] text-slate-400">Check your visible calendars</p>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                        className="flex-1 flex flex-col items-center justify-center text-center"
                    >
                        <div className="w-10 h-10 rounded-lg border border-dashed border-slate-200 mb-2 rotate-45" />
                        <p className="text-sm text-slate-600 font-medium">No meetings yet</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Click New Note to start one</p>
                    </motion.div>
                </motion.div>
            </AnimationFrame>
        </motion.div>
    );
}
