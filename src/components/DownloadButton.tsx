'use client';

import React from 'react';
import { motion } from 'framer-motion';

const DOWNLOAD_URL = 'https://github.com/alakhjagtap/stealthpublicreleases/releases/latest/download/Stealth-Setup-1.0.0.exe';

const WindowsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
        <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
);

const DownloadButton = () => {
    return (
        <motion.a
            href={DOWNLOAD_URL}
            download
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-sm text-white overflow-hidden cursor-pointer no-underline"
            style={{
                background: 'linear-gradient(135deg, #0078D4 0%, #005A9E 50%, #003F72 100%)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.1) inset, 0 4px 20px rgba(0,120,212,0.25), 0 1px 3px rgba(0,0,0,0.2)',
            }}
            whileHover={{
                scale: 1.03,
                boxShadow: '0 0 0 1px rgba(255,255,255,0.2) inset, 0 8px 40px rgba(0,120,212,0.45), 0 2px 8px rgba(0,0,0,0.3)',
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
            {/* Animated shimmer overlay */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 55%, transparent 80%)',
                    animation: 'shimmer 2s ease-in-out infinite',
                }}
            />

            {/* Glow ring on hover */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(100,180,255,0.2) 0%, transparent 60%)',
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex items-center gap-3">
                <div className="relative">
                    <WindowsIcon />
                    {/* Subtle glow behind icon */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md"
                        style={{ background: 'rgba(100,180,255,0.6)' }}
                    />
                </div>

                <div className="flex flex-col items-start leading-tight">
                    <span className="text-[13px] font-bold tracking-wide">Download for Windows</span>
                    <span className="text-[10px] text-blue-200/70 font-medium">v1.0.0 · Windows 10+</span>
                </div>

                {/* Download arrow icon */}
                <motion.svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1 opacity-60 group-hover:opacity-100 transition-opacity"
                    animate={{ y: [0, 2, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                </motion.svg>
            </div>
        </motion.a>
    );
};

export default DownloadButton;
