import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    containerClassName?: string;
}

const Section = ({ children, className, id, containerClassName }: SectionProps) => {
    return (
        <section
            id={id}
            className={cn('py-32 px-6', className)}
        >
            <div className={cn('max-w-6xl mx-auto', containerClassName)}>
                {children}
            </div>
        </section>
    );
};

export default Section;
