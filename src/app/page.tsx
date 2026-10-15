import Hero from "@/components/home/Hero";
import LogoMarquee from "@/components/home/LogoMarquee";
import ValueProps from "@/components/home/ValueProps";
import ContextFlow from "@/components/home/ContextFlow";
import Integrations from "@/components/home/Integrations";
import HowItWorks from "@/components/home/HowItWorks";
import WhatWeHeard from "@/components/home/WhatWeHeard";
import FeatureList from "@/components/home/FeatureList";
import PricingCTA from "@/components/home/PricingCTA";
import { MotionRoot } from "@/components/home/motion";

export default function Home() {
  return (
    <MotionRoot>
      {/* the design sets no line-height, so match the browser default rather than Tailwind's 1.5 */}
      <div className="leading-[normal]">
        <Hero />
        <LogoMarquee />
        <ValueProps />
        <ContextFlow />
        <Integrations />
        <HowItWorks />
        <WhatWeHeard />
        <FeatureList />
        <PricingCTA />
      </div>
    </MotionRoot>
  );
}
