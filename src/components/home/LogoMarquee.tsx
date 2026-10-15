import React from 'react';
import Image from 'next/image';

const logos = [
    { src: '/logos/google.svg', alt: 'Google', w: 40, h: 40 },
    { src: '/logos/uber.svg', alt: 'Uber', w: 125, h: 40 },
    { src: '/logos/microsoft.svg', alt: 'Microsoft', w: 38, h: 38 },
    { src: '/logos/apple.svg', alt: 'Apple', w: 33, h: 40 },
];

// Four logos are too few to fill a wide screen, so each half of the loop holds
// two sets; the track slides -50% and the second half picks up seamlessly.
const track = [...logos, ...logos, ...logos, ...logos];

const LogoMarquee = () => (
    <section className="pt-20 pb-4">
        <div className="text-center text-[13px] tracking-[0.1em] uppercase text-subtle font-semibold px-6">Curated with the help of teams at</div>
        <div className="fm-marquee-wrap overflow-hidden mt-7">
            <div className="fm-marquee gap-[72px] pl-[72px]">
                {track.map((logo, i) => (
                    <Image
                        key={i}
                        src={logo.src}
                        alt={i < logos.length ? logo.alt : ''}
                        aria-hidden={i >= logos.length || undefined}
                        width={logo.w}
                        height={logo.h}
                        style={{ height: logo.h, width: 'auto' }}
                        className="shrink-0"
                    />
                ))}
            </div>
        </div>
    </section>
);

export default LogoMarquee;
