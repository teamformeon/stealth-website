'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface LogoProps {
    className?: string;
    showText?: boolean;
    size?: 'sm' | 'md' | 'lg';
    textColor?: 'black' | 'white';
}

const Logo = ({ className = '', showText = true, size = 'md', textColor = 'black' }: LogoProps) => {
    const sizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    const textSizeClasses = {
        sm: 'text-base',
        md: 'text-xl',
        lg: 'text-2xl'
    };

    return (
        <Link href="/" className={`flex items-center gap-3 active:scale-95 transition-transform ${className}`}>
            <motion.div
                className={`${sizeClasses[size]} relative`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
            >
                <Image
                    src="/stealth-logo.png"
                    alt="Stealth Technologies Logo"
                    width={size === 'sm' ? 24 : size === 'md' ? 32 : 48}
                    height={size === 'sm' ? 24 : size === 'md' ? 32 : 48}
                    className="w-full h-full object-contain"
                    priority
                />
            </motion.div>
            
            {showText && (
                <span className={`font-bold tracking-tighter ${textColor === 'white' ? 'text-white' : 'text-black'} ${textSizeClasses[size]}`}>
                    Stealth Technologies
                </span>
            )}
        </Link>
    );
};

export default Logo;

