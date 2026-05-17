import Hero from "@/components/Hero";
import ProductDemo from "@/components/ProductDemo";
import PainPoints from "@/components/PainPoints";
import Solution from "@/components/Solution";
import SocialProof from "@/components/SocialProof";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";
import BookDemo from "@/components/BookDemo";

// Hero: looping product animation is lazy-loaded in Hero.tsx via HeroProductAnimation
export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <ProductDemo />
      <PainPoints />
      <Solution />
      <SocialProof />
      <Pricing />
      <FinalCTA />
      <BookDemo />
    </div>
  );
}
