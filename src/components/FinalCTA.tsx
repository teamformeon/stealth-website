'use client';

import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';

const FinalCTA = () => {
    const [loading, setLoading] = React.useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        const email = prompt("Enter your email to receive the download link and access:");
        if (!email) {
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert('Checkout failed. Please try again.');
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Section id="explore" className="pb-48">
            <div className="relative p-12 md:p-32 rounded-[3rem] bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 overflow-hidden text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-indigo-100/20 opacity-50 pointer-events-none" />

                <div className="relative z-10 max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-7xl font-black mb-10 tracking-tighter text-black">
                        Ready for AI That <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Adapts to You?</span>
                    </h2>
                    <p className="text-slate-600 text-xl mb-6 leading-relaxed">
                        Stealth is system-wide AI with two ways to work: automatic screen analysis with suggestions, or natural language commands. Press a hotkey, get intelligent help your way.
                    </p>
                    <p className="text-blue-600 text-lg mb-12 font-semibold">
                        Available now: Choose prompt-free automatic suggestions or type commands—both modes work seamlessly
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleCheckout}
                            disabled={loading}
                            className="px-10 py-4 bg-black text-white text-sm font-semibold rounded-2xl hover:bg-neutral-800 transition-colors shadow-lg shadow-black/20 inline-block text-center disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : 'Buy Stealth Limited Access'}
                        </button>
                        <a href="/#vision" className="px-10 py-4 bg-white border border-slate-200 text-slate-900 text-sm font-semibold rounded-2xl hover:bg-slate-50 transition-colors hover:border-slate-300 inline-block text-center">
                            Learn More
                        </a>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default FinalCTA;
