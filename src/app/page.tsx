import Hero from "@/components/Hero";
import ProductStory from "@/components/ProductStory";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import UseCases from "@/components/UseCases";
import WhoItFor from "@/components/WhoItFor";
import Vision from "@/components/Vision";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <ProductStory />
      <Features />
      <HowItWorks />
      <UseCases />
      <WhoItFor />
      <Vision />
      <FinalCTA />
    </div>
  );
}
