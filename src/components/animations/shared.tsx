'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    Home,
    Folder,
    LayoutGrid,
    GitBranch,
    FlaskConical,
    Mic,
    Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const ease = [0.16, 1, 0.3, 1] as const;

export const NAV = [
    { icon: Home, id: 'home' },
    { icon: Folder, id: 'folder' },
    { icon: LayoutGrid, id: 'grid' },
    { icon: GitBranch, id: 'graph' },
    { icon: FlaskConical, id: 'discovery' },
    { icon: Mic, id: 'mic' },
] as const;

export type NavId = (typeof NAV)[number]['id'];

export function useReducedMotion() {
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(mq.matches);
        const handler = () => setReducedMotion(mq.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    return reducedMotion;
}

export function AppSidebar({ activeNav }: { activeNav: NavId }) {
    return (
        <aside className="w-[48px] sm:w-[52px] shrink-0 border-r border-[#EBEBEB] flex flex-col items-center py-2.5 gap-0.5 bg-white z-10">
            <motion.div
                className="w-8 h-8 mb-1.5 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease }}
            >
                <Image src="/formeon-logo.png" alt="" width={22} height={22} className="rounded-sm" />
            </motion.div>
            {NAV.map(({ icon: Icon, id }, i) => {
                const active = activeNav === id;
                return (
                    <motion.div
                        key={id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + i * 0.04, duration: 0.35, ease }}
                        className={cn(
                            'relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg',
                            active && 'bg-[#EEF2FF]'
                        )}
                    >
                        {active && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2.5px] h-5 bg-[#6366F1] rounded-r" />
                        )}
                        <Icon
                            className={cn('w-[17px] h-[17px]', active ? 'text-[#6366F1]' : 'text-slate-400')}
                            strokeWidth={1.75}
                        />
                    </motion.div>
                );
            })}
            <motion.div
                className="mt-auto flex flex-col items-center gap-2 pt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
            >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white text-[11px] font-semibold shadow-sm">
                    A
                </div>
                <Settings className="w-4 h-4 text-slate-400" strokeWidth={1.75} />
            </motion.div>
        </aside>
    );
}

type AnimationFrameProps = {
    activeNav: NavId;
    children: React.ReactNode;
    className?: string;
    aspect?: string;
    maxHeight?: string;
};

export function AnimationFrame({
    activeNav,
    children,
    className,
    aspect = 'aspect-[16/10]',
    maxHeight = 'max-h-[280px] md:max-h-[420px]',
}: AnimationFrameProps) {
    return (
        <div
            className={cn(
                'relative w-full rounded-2xl overflow-hidden bg-white border border-black/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.06)]',
                aspect,
                maxHeight,
                className
            )}
            aria-hidden
        >
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[#6366F1]/[0.03] via-transparent to-transparent" />
            <div className="relative flex h-full min-h-[200px]">
                <AppSidebar activeNav={activeNav} />
                <main className="flex-1 min-w-0 relative overflow-hidden">{children}</main>
            </div>
        </div>
    );
}

export function CountUp({ target, delay }: { target: number; delay: number }) {
    const [n, setN] = useState(0);
    useEffect(() => {
        const t = setTimeout(() => {
            let cur = 0;
            const id = setInterval(() => {
                cur += 1;
                setN(cur);
                if (cur >= target) clearInterval(id);
            }, 120);
            return () => clearInterval(id);
        }, delay * 1000);
        return () => clearTimeout(t);
    }, [target, delay]);
    return <>{n}</>;
}
