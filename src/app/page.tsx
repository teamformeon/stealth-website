import Hero from "@/components/Hero";
import ProductDemo from "@/components/ProductDemo";
import PainPoints from "@/components/PainPoints";
import Solution from "@/components/Solution";
import SocialProof from "@/components/SocialProof";
import BookDemo from "@/components/BookDemo";

// Hero + sections each lazy-load their own product animation showcase
export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <ProductDemo />
      <PainPoints />
      <Solution />
      <SocialProof />
      <BookDemo />
    </div>
  );
}
