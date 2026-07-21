'use client';

import React from 'react';
import Section from '@/components/Section';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
    return (
        <main className="bg-white min-h-screen">
            <div className="fixed top-0 left-0 right-0 z-50">
                <Navbar />
            </div>
            <Section className="pt-48 pb-24">
                <div className="max-w-3xl mx-auto prose prose-slate prose-lg">
                    <h1 className="text-4xl font-black text-black mb-8">Privacy Policy</h1>
                    <p className="text-slate-500 text-sm mb-12">Last updated: July 21, 2026</p>

                    <h3>1. Introduction</h3>
                    <p>
                        Welcome to Formeon ("we", "our", or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and use our application.
                    </p>

                    <h3>2. Data We Collect</h3>
                    <p>
                        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                    </p>
                    <ul>
                        <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                        <li><strong>Contact Data:</strong> includes email address and telephone number.</li>
                        <li><strong>Usage Data:</strong> includes information about how you use our website and application.</li>
                    </ul>

                    <h3>3. How We Use Your Data</h3>
                    <p>
                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                    </p>
                    <ul>
                        <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                        <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                    </ul>

                    <h3>4. Data Security</h3>
                    <p>
                        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
                    </p>

                    <h3>5. Google User Data</h3>
                    <p>
                        When you connect your Google account to Formeon, we access the following Google data on a strictly read-only basis:
                    </p>
                    <ul>
                        <li><strong>Gmail messages (gmail.readonly):</strong> to extract product decisions and context from your emails.</li>
                        <li><strong>Drive files (drive.readonly):</strong> to read the files in your Google Drive so we can extract product context and match relevant documents to your workspace.</li>
                        <li><strong>Google Docs content (documents.readonly):</strong> to read your documents so we can extract decisions, context, and generate artifacts.</li>
                        <li><strong>Calendar events (calendar.readonly):</strong> to read event details that add timeline and context to your product memory.</li>
                    </ul>
                    <p>
                        All Google access is read-only. Formeon never sends, modifies, or deletes anything in your Google account.
                    </p>
                    <p>
                        Google user data is used solely to provide Formeon's user-facing features — extracting product decisions and context, building your memory layer, and generating artifacts. We do not use Google user data for advertising, and we do not sell it.
                    </p>

                    <h3>6. Data Sharing and Third-Party Processing</h3>
                    <p>
                        To provide our features, Formeon sends user content to third-party AI/LLM providers — specifically Anthropic (Claude) and OpenAI — to perform classification and generation. These providers do not use data submitted through their APIs to train their models, in accordance with their API terms. Formeon does not transfer or sell Google user data to data brokers or advertisers.
                    </p>

                    <h3>7. Data Retention and Deletion</h3>
                    <p>
                        You may disconnect any Google integration at any time, and you may request deletion of your data by contacting us at formeonassistant1@gmail.com. Upon request, we delete stored Google user data within 30 days.
                    </p>

                    <h3>8. Limited Use</h3>
                    <p>
                        Formeon's use and transfer of information received from Google APIs to any other app will adhere to the Google API Services User Data Policy (<a href="https://developers.google.com/terms/api-services-user-data-policy">https://developers.google.com/terms/api-services-user-data-policy</a>), including the Limited Use requirements.
                    </p>

                    <h3>9. Contact Us</h3>
                    <p>
                        If you have any questions about this privacy policy or our privacy practices, please contact us at formeonassistant1@gmail.com.
                    </p>
                </div>
            </Section>
            <Footer />
        </main>
    );
}
