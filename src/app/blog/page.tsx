'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BlogPage = () => {
    return (
        <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
            <Navbar />

            {/* Hero Section - Simplified */}
            <section className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8">
                            Insights <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Coming Soon.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-500 leading-relaxed max-w-2xl mx-auto font-medium">
                            Deep dives into AI, product management, and the future of work are on the way.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="mt-16 flex flex-col items-center"
                    >
                        <div className="w-px h-24 bg-gradient-to-b from-blue-600 to-transparent opacity-20" />
                        <span className="mt-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                            Stay Tuned
                        </span>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default BlogPage;
