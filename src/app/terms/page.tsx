'use client';

import React from 'react';
import Section from '@/components/Section';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
    return (
        <main className="bg-white min-h-screen">
            <div className="fixed top-0 left-0 right-0 z-50">
                <Navbar />
            </div>
            <Section className="pt-48 pb-24">
                <div className="max-w-3xl mx-auto prose prose-slate prose-lg">
                    <h1 className="text-4xl font-black text-black mb-8">Terms of Service</h1>
                    <p className="text-slate-500 text-sm mb-12">Last updated: {new Date().toLocaleDateString()}</p>

                    <h3>1. Agreement to Terms</h3>
                    <p>
                        By accessing our website and using our application, you agree to be bound by these Terms of Service. If you do not agree to these terms, placed do not use our services.
                    </p>

                    <h3>2. Use License</h3>
                    <p>
                        Permission is granted to temporarily download one copy of the materials (information or software) on Stealth's website for personal, non-commercial transitory viewing only.
                    </p>

                    <h3>3. Disclaimer</h3>
                    <p>
                        The materials on Stealth's website are provided on an 'as is' basis. Stealth makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>

                    <h3>4. Limitations</h3>
                    <p>
                        In no event shall Stealth or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Stealth's website.
                    </p>

                    <h3>5. Governing Law</h3>
                    <p>
                        These terms and conditions are governed by and construed in accordance with the laws of California and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                    </p>
                </div>
            </Section>
            <Footer />
        </main>
    );
}
