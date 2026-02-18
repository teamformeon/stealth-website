import Hero from "@/components/Hero";
import CompanyLogos from "@/components/CompanyLogos";
import ProductShowcase from "@/components/ProductShowcase";
import ProblemStatement from "@/components/ProblemStatement";
import Stats from "@/components/Stats";
import VisionSection from "@/components/VisionSection";
import AIFeatures from "@/components/AIFeatures";
import UseCases from "@/components/UseCases";
import Vision from "@/components/Vision";
import BookDemo from "@/components/BookDemo";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <CompanyLogos />
      <ProductShowcase />
      <ProblemStatement />
      <Stats />
      <VisionSection />
      <AIFeatures />
      <UseCases />
      <Vision />
      <BookDemo />
      <FinalCTA />
    </div>
  );
}
