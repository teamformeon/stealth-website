'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LogoProps {
    className?: string;
    showText?: boolean;
    size?: 'sm' | 'md' | 'lg';
    textColor?: 'black' | 'white';
}

const Logo = ({ className = '', showText = true, size = 'md', textColor = 'black' }: LogoProps) => {
    const markSizes = {
        sm: 28,
        md: 32,
        lg: 40,
    };

    const textSizeClasses = {
        sm: 'text-[15px]',
        md: 'text-lg',
        lg: 'text-xl',
    };

    const px = markSizes[size];

    return (
        <Link
            href="/"
            className={cn('flex items-center gap-2.5 active:scale-[0.98] transition-transform', className)}
        >
            <motion.div
                whileHover={{ scale: 1.06, rotate: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                className="relative shrink-0"
                style={{ width: px, height: px }}
            >
                <Image
                    src="/formeon-logo.png"
                    alt="Formeon"
                    width={px}
                    height={px}
                    className="w-full h-full object-contain drop-shadow-sm"
                    priority
                />
            </motion.div>

            {showText && (
                <span
                    className={cn(
                        'font-semibold tracking-tight',
                        textColor === 'white' ? 'text-white' : 'text-[#12141c]',
                        textSizeClasses[size]
                    )}
                >
                    Formeon
                </span>
            )}
        </Link>
    );
};

export default Logo;
