'use client';

import React from 'react';
import Section from '@/components/Section';
import { Shield, Lock, Eye, CheckCircle, Server } from 'lucide-react';
import { motion } from 'framer-motion';

const SecurityPage = () => {
    const securityFeatures = [
        {
            title: 'Data Encryption',
            description: 'All data is encrypted in transit using industry-standard TLS 1.3 and at rest using AES-256 encryption. We ensure your information is protected both while moving and when stored.',
            icon: <Lock size={24} />,
        },
        {
            title: 'Secure Access Controls',
            description: 'We implement robust authentication protocols and identity management to ensure that only authorized users can access sensitive features and data.',
            icon: <Shield size={24} />,
        },
        {
            title: 'Principle of Least Privilege',
            description: 'The app operates with minimal necessary permissions. We only request access to the tools and data required to execute your specific tasks, reducing the attack surface.',
            icon: <Eye size={24} />,
        },
        {
            title: 'Data Sovereignty',
            description: 'We do not engage in unauthorized data sharing. Your workspace context and execution logs are used strictly for your benefit and are never sold or shared with third parties.',
            icon: <Server size={24} />,
        },
        {
            title: 'Continuous Monitoring',
            description: 'We follow security best practices, including regular infrastructure audits and real-time monitoring to detect and respond to potential threats.',
            icon: <CheckCircle size={24} />,
        },
    ];

    return (
        <div className="pt-40 min-h-screen bg-white">
            <Section className="py-20">
                <div className="max-w-4xl mb-24">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-black mb-8 italic uppercase tracking-tighter text-black"
                    >
                        Security <br /> <span className="text-formeon-accent underline decoration-slate-200 underline-offset-8">Infrastructure.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-600 text-xl leading-relaxed max-w-2xl"
                    >
                        Formeon Technologies is built on a foundation of trust. We prioritize the security of your professional workspace through rigorous engineering and transparent protocols.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {securityFeatures.map((feature, idx) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all group lg:min-h-[300px] flex flex-col justify-between"
                        >
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-formeon-accent/10 border border-formeon-accent/20 flex items-center justify-center text-formeon-accent mb-8 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight text-black">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-32 p-12 rounded-[3.5rem] bg-slate-50 border border-slate-200 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-hero-gradient opacity-5 pointer-events-none" />
                    <h2 className="text-3xl font-bold mb-6 uppercase text-black">Questions about Security?</h2>
                    <p className="text-slate-600 mb-8 max-w-xl mx-auto">
                        If you have specific questions about our security posture or require an enterprise security audit, please reach out directly.
                    </p>
                    <a
                        href="mailto:formeonassistant1@gmail.com"
                        className="inline-block px-10 py-5 bg-black text-white font-black uppercase text-xs tracking-[0.2em] rounded-full hover:bg-slate-800 transition-all"
                    >
                        Contact Security Team
                    </a>
                </div>
            </Section>
        </div>
    );
};

export default SecurityPage;
