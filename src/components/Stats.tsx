'use client';

import React, { useEffect, useState } from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { TrendingUp, Users, FileText, Clock } from 'lucide-react';

interface Stat {
    value: string;
    label: string;
    icon: React.ReactNode;
    suffix?: string;
}

const Stats = () => {
    const [stats, setStats] = useState<Stat[]>([
        { value: '0', label: 'PRDs Generated', icon: <FileText size={24} /> },
        { value: '0', label: 'Hours Saved', icon: <Clock size={24} /> },
        { value: '0', label: 'Active PMs', icon: <Users size={24} /> },
        { value: '0%', label: 'Faster Discovery', icon: <TrendingUp size={24} /> },
    ]);

    useEffect(() => {
        // Simulate fetching stats - replace with actual API call
        const fetchStats = async () => {
            try {
                // In production, replace with actual API endpoint
                // const response = await fetch('/api/stats');
                // const data = await response.json();
                
                // For now, use mock data with realistic numbers
                const mockStats: Stat[] = [
                    { value: '2.4K', label: 'PRDs Generated', icon: <FileText size={24} /> },
                    { value: '15K+', label: 'Hours Saved', icon: <Clock size={24} /> },
                    { value: '850+', label: 'Active PMs', icon: <Users size={24} /> },
                    { value: '10x', label: 'Faster Discovery', icon: <TrendingUp size={24} /> },
                ];
                
                // Animate numbers
                mockStats.forEach((stat, index) => {
                    setTimeout(() => {
                        setStats(prev => {
                            const newStats = [...prev];
                            newStats[index] = stat;
                            return newStats;
                        });
                    }, index * 200);
                });
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            }
        };

        fetchStats();
    }, []);

    return (
        <Section className="bg-gradient-to-b from-white to-slate-50/50 py-24">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">
                        Trusted by Product Teams
                    </h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        Join hundreds of PMs who are shipping faster with AI-powered product discovery
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: idx * 0.1, duration: 0.5, type: "spring", stiffness: 100 }}
                            className="text-center p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-center mb-4 text-blue-600">
                                {stat.icon}
                            </div>
                            <motion.div
                                key={stat.value}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-4xl md:text-5xl font-black text-black mb-2"
                            >
                                {stat.value}
                            </motion.div>
                            <div className="text-slate-600 text-sm font-medium uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default Stats;

