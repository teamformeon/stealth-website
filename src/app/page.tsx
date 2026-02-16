import Hero from "@/components/Hero";
import ProblemStatement from "@/components/ProblemStatement";
import Stats from "@/components/Stats";
import VisionSection from "@/components/VisionSection";
import AIFeatures from "@/components/AIFeatures";
import ProductStory from "@/components/ProductStory";
import UseCases from "@/components/UseCases";
import Vision from "@/components/Vision";
import BookDemo from "@/components/BookDemo";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <ProblemStatement />
      <Stats />
      <VisionSection />
      <AIFeatures />
      <ProductStory />
      <UseCases />
      <Vision />
      <BookDemo />
      <FinalCTA />
    </div>
  );
}
