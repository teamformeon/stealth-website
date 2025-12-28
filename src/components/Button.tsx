import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
    className?: string;
    glowColor?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', glowColor, ...props }, ref) => {
        const variants = {
            primary: 'bg-white text-black hover:bg-neutral-200 transition-colors',
            secondary: 'bg-stealth-gray text-white hover:bg-neutral-800 transition-colors',
            outline: 'bg-transparent border border-neutral-800 hover:border-neutral-600 text-white transition-colors',
            ghost: 'bg-transparent hover:bg-white/5 text-white transition-colors',
            glow: 'bg-white text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300',
        };

        const sizes = {
            sm: 'px-4 py-1.5 text-xs font-medium rounded-full',
            md: 'px-6 py-2.5 text-sm font-medium rounded-full',
            lg: 'px-8 py-3.5 text-base font-semibold rounded-full',
        };

        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center relative overflow-hidden active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';

export default Button;
