'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

export const APPS = {
    slack: { id: 'slack', name: 'Slack', logo: '/logos/slack.png' },
    jira: { id: 'jira', name: 'Jira', logo: '/logos/jira.svg' },
    microsoft: { id: 'microsoft', name: 'Microsoft', logo: '/logos/microsoft.svg' },
    gmail: { id: 'gmail', name: 'Gmail', logo: '/logos/gmail.png' },
    notion: { id: 'notion', name: 'Notion', logo: '/logos/notion.svg' },
    linear: { id: 'linear', name: 'Linear', logo: '/logos/linear.svg' },
} as const;

export type AppId = keyof typeof APPS;

const containerSizes = {
    xs: 'w-5 h-5',
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11 sm:w-12 sm:h-12',
    badge: 'w-8 h-8',
};

const imageSizes = {
    xs: 14,
    sm: 18,
    md: 22,
    lg: 26,
    badge: 20,
};

export function AppIcon({
    appId,
    size = 'sm',
    className,
    shape = 'circle',
}: {
    appId: AppId;
    size?: keyof typeof containerSizes;
    className?: string;
    shape?: 'circle' | 'rounded';
}) {
    const app = APPS[appId];
    const px = imageSizes[size];
    const isRaster = app.logo.endsWith('.png');

    return (
        <div
            className={cn(
                'flex items-center justify-center shrink-0 overflow-hidden',
                isRaster ? 'bg-transparent' : 'bg-white shadow-sm border border-black/[0.06]',
                containerSizes[size],
                shape === 'circle' ? 'rounded-full' : 'rounded-lg',
                className
            )}
            title={app.name}
        >
            <Image
                src={app.logo}
                alt={app.name}
                width={isRaster ? Math.round(px * 1.12) : px}
                height={isRaster ? Math.round(px * 1.12) : px}
                className="object-contain"
            />
        </div>
    );
}

export function AppIconRow({ ids, size = 'xs' }: { ids: AppId[]; size?: keyof typeof containerSizes }) {
    return (
        <div className="flex items-center -space-x-1.5">
            {ids.map((id) => (
                <AppIcon key={id} appId={id} size={size} className="ring-2 ring-white" />
            ))}
        </div>
    );
}
