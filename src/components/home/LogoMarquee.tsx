import React from 'react';
import Image from 'next/image';

const logos = [
    { src: '/logos/google.svg', alt: 'Google', w: 36, h: 36 },
    { src: '/logos/uber.svg', alt: 'Uber', w: 88, h: 28 },
    { src: '/logos/microsoft.svg', alt: 'Microsoft', w: 32, h: 32 },
    { src: '/logos/apple.svg', alt: 'Apple', w: 28, h: 34 },
];

const LogoMarquee = () => (
    <section className="pt-16 pb-4 px-6">
        <div className="text-center text-[13px] tracking-[0.1em] uppercase text-subtle font-semibold">
            Curated with the help of teams at
        </div>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-16 gap-y-6">
            {logos.map((logo) => (
                <Image
                    key={logo.alt}
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.w}
                    height={logo.h}
                    className="shrink-0"
                />
            ))}
        </div>
    </section>
);

export default LogoMarquee;
