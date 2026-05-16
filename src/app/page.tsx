import Hero from "@/components/Hero";
import ProductDemo from "@/components/ProductDemo";
import PainPoints from "@/components/PainPoints";
import Solution from "@/components/Solution";
import SocialProof from "@/components/SocialProof";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";
import BookDemo from "@/components/BookDemo";

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
