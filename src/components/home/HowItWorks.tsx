import React from 'react';
import { Reveal } from './motion';
import { eyebrow, h2Big, h3 } from './type';
import IntelligenceGraph from './IntelligenceGraph';
import DiscoveryHub from './DiscoveryHub';
import CrossTeam from './CrossTeam';

const body = 'mt-4 text-[17px] leading-[1.55] text-muted max-w-[440px]';

const HowItWorks = () => (
    <section id="how" className="px-6 pt-[120px] pb-10 scroll-mt-16">
        <div className="max-w-[1120px] mx-auto">
            <Reveal>
                <h2 className={`${h2Big} mx-auto max-w-[760px] text-center`}>Formeon helps before, during and after every decision.</h2>
            </Reveal>

            {/* Before: Intelligence Graph */}
            <div className="mt-[88px]">
                <Reveal className="flex flex-wrap gap-x-14 gap-y-4 items-end justify-between">
                    <div className="flex-[1_1_420px]">
                        <div className={eyebrow}>Before · Intelligence Graph</div>
                        <h3 className={`${h3} mb-0`}>See how every decision connects</h3>
                    </div>
                    <p className="flex-[1_1_380px] m-0 text-[17px] leading-[1.55] text-muted max-w-[480px]">
                        Every project becomes a living map — decisions linked to the Jira tickets, meeting notes, Confluence pages and Slack threads
                        behind them. Start with the full picture, not a blank page.
                    </p>
                </Reveal>
                <Reveal delay={0.1}>
                    <IntelligenceGraph />
                </Reveal>
            </div>

            {/* During */}
            <div className="flex flex-wrap-reverse items-center gap-14 mt-28">
                <Reveal className="flex-[1_1_480px] min-w-0 bg-moss-tint rounded-3xl p-8">
                    <DiscoveryHub />
                </Reveal>
                <Reveal className="flex-[1_1_340px]" delay={0.12}>
                    <div className={eyebrow}>During</div>
                    <h3 className={h3}>Ask anything across all your projects</h3>
                    <p className={body}>
                        Discovery Hub answers with sources from Jira, Slack, Confluence and email — not guesses. Save any prompt as a workflow your team can
                        reuse.
                    </p>
                </Reveal>
            </div>

            {/* After */}
            <div className="flex flex-wrap items-center gap-14 mt-28">
                <Reveal className="flex-[1_1_340px]">
                    <div className={eyebrow}>After</div>
                    <h3 className={h3}>Catch conflicts before they ship</h3>
                    <p className={body}>
                        Agents run daily across every team, flagging decisions that contradict each other, work that’s gone stale, and teams that should be
                        talking.
                    </p>
                </Reveal>
                <Reveal className="flex-[1_1_480px] min-w-0 bg-stone rounded-3xl p-8" delay={0.12}>
                    <CrossTeam />
                </Reveal>
            </div>
        </div>
    </section>
);

export default HowItWorks;
