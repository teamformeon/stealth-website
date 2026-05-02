'use client';

import React from 'react';
import { motion } from 'framer-motion';

const PURCHASED_SESSION_STORAGE_KEY = 'stealth_paid_session_id';
const DEFAULT_LOCK_MESSAGE = 'Complete payment to unlock the download.';

const WindowsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
        <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
);

const AppleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
        <path d="M17.05 20.28c-.98.95-2.05 1.79-3.48 1.79-1.42 0-1.88-.87-3.57-.87-1.69 0-2.2.85-3.56.87-1.33.02-2.39-.84-3.41-1.83-2.07-2.01-3.66-5.69-3.66-9.15 0-3.43 1.72-5.24 3.39-5.24 1.63 0 2.54 1.01 3.77 1.01 1.21 0 2.21-1.04 3.96-1.04 1.48 0 3.33.79 4.38 2.26-2.73 1.64-2.29 5.38.48 6.5-.59 1.49-1.37 2.97-2.3 4.29zm-4.75-15.35c-.15-2.07 1.64-3.89 3.52-4.11.19 2.22-1.84 4.09-3.52 4.11z" />
    </svg>
);

const LockIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <path d="M7 11V8a5 5 0 1 1 10 0v3" />
    </svg>
);

type VerificationResponse = {
    success?: boolean;
    urls?: {
        windows: string;
        mac: string;
    };
    error?: string;
};

type VerifiedSessionResponse = {
    success: true;
    urls: {
        windows: string;
        mac: string;
    };
};

const WINDOWS_DOWNLOAD_URL = 'https://github.com/alakhjagtap/stealthpublicreleases/releases/download/v10/Formeon-Setup-1.0.19.exe';
const MAC_DOWNLOAD_URL = 'https://github.com/alakhjagtap/stealthpublicreleases/releases/latest/download/Stealth-1.0.11-arm64.dmg';

interface DownloadButtonProps {
    platform?: 'windows' | 'mac';
}

const DownloadButton = ({ platform = 'windows' }: DownloadButtonProps) => {
    const handleDownload = () => {
        const downloadUrl = platform === 'mac' ? MAC_DOWNLOAD_URL : WINDOWS_DOWNLOAD_URL;
        window.location.href = downloadUrl;
    };

    const platformName = platform === 'mac' ? 'macOS' : 'Windows';
    const platformDisplay = platform === 'mac' ? 'v1.0.11 · macOS (Apple Silicon)' : 'v1.0.19 · Windows 10+';

    return (
        <div className="inline-flex flex-col items-start gap-3">
            <motion.button
                type="button"
                onClick={handleDownload}
                className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-sm text-white overflow-hidden no-underline transition-opacity cursor-pointer`}
                style={{
                    background: platform === 'mac'
                        ? 'linear-gradient(135deg, #333333 0%, #1a1a1a 50%, #000000 100%)'
                        : 'linear-gradient(135deg, #0078D4 0%, #005A9E 50%, #003F72 100%)',
                    boxShadow: platform === 'mac'
                        ? '0 0 0 1px rgba(255,255,255,0.1) inset, 0 4px 20px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.2)'
                        : '0 0 0 1px rgba(255,255,255,0.1) inset, 0 4px 20px rgba(0,120,212,0.25), 0 1px 3px rgba(0,0,0,0.2)',
                }}
                whileHover={{
                    scale: 1.03,
                    boxShadow: platform === 'mac'
                        ? '0 0 0 1px rgba(255,255,255,0.2) inset, 0 8px 40px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.3)'
                        : '0 0 0 1px rgba(255,255,255,0.2) inset, 0 8px 40px rgba(0,120,212,0.45), 0 2px 8px rgba(0,0,0,0.3)',
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 55%, transparent 80%)',
                        animation: 'shimmer 2s ease-in-out infinite',
                    }}
                />

                <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: platform === 'mac'
                            ? 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.1) 0%, transparent 60%)'
                            : 'radial-gradient(ellipse at 50% 0%, rgba(100,180,255,0.2) 0%, transparent 60%)',
                    }}
                />

                <div className="relative z-10 flex items-center gap-3">
                    <div className="relative">
                        {platform === 'mac' ? <AppleIcon /> : <WindowsIcon />}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md"
                            style={{ background: platform === 'mac' ? 'rgba(255,255,255,0.4)' : 'rgba(100,180,255,0.6)' }}
                        />
                    </div>

                    <div className="flex flex-col items-start leading-tight">
                        <span className="text-[13px] font-bold tracking-wide">
                            Download for {platformName}
                        </span>
                        <span className={`text-[10px] font-medium ${platform === 'mac' ? 'text-slate-400' : 'text-blue-200/70'}`}>
                            {platformDisplay}
                        </span>
                    </div>

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
            </motion.button>
        </div>
    );
};

export default DownloadButton;
