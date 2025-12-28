'use client';

import React from 'react';
import Button from './Button';
import { Apple, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DownloadButtonsProps {
    className?: string;
    variant?: 'hero' | 'nav';
}

const DownloadButtons = ({ className, variant = 'hero' }: DownloadButtonsProps) => {
    if (variant === 'nav') {
        return (
            <div className={cn("flex items-center gap-2", className)}>
                <Button variant="outline" size="sm" className="h-9 px-4 border-white/10 hover:bg-white/5">
                    <Apple size={14} className="mr-2" />
                    Mac
                </Button>
                <Button variant="primary" size="sm" className="h-9 px-4 bg-white text-black hover:bg-neutral-200">
                    <Monitor size={14} className="mr-2" />
                    Win
                </Button>
            </div>
        );
    }

    return (
        <div className={cn("flex flex-wrap items-center gap-4", className)}>
            <Button variant="glow" size="lg" className="h-[56px] px-8 bg-white text-black hover:bg-neutral-200 shadow-xl group">
                <Apple className="w-5 h-5 mr-3" />
                <div className="text-left">
                    <div className="text-[10px] uppercase tracking-wider font-bold opacity-60 leading-none mb-0.5">Download for</div>
                    <div className="text-base font-bold leading-none">macOS</div>
                </div>
            </Button>
            <Button variant="outline" size="lg" className="h-[56px] px-8 border-white/10 bg-black hover:bg-white/5 group">
                <Monitor className="w-5 h-5 mr-3 text-white/70" />
                <div className="text-left">
                    <div className="text-[10px] uppercase tracking-wider font-bold opacity-60 leading-none mb-0.5">Download for</div>
                    <div className="text-base font-bold leading-none">Windows</div>
                </div>
            </Button>
        </div>
    );
};

export default DownloadButtons;
