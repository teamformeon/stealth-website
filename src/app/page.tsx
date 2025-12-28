import Hero from "@/components/Hero";
import ProductStory from "@/components/ProductStory";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import UseCases from "@/components/UseCases";
import Security from "@/components/Security";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <ProductStory />
      <Features />
      <HowItWorks />
      <UseCases />
      <Security />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </div>
  );
}
