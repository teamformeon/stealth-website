import Hero from "@/components/Hero";
import CompanyLogos from "@/components/CompanyLogos";
import ProductShowcase from "@/components/ProductShowcase";
import ProblemStatement from "@/components/ProblemStatement";
import VisionSection from "@/components/VisionSection";
import AIFeatures from "@/components/AIFeatures";
import UseCases from "@/components/UseCases";
import Vision from "@/components/Vision";
import ScrollRevealSection from "@/components/ScrollRevealSection";
import BookDemo from "@/components/BookDemo";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <CompanyLogos />
      <ProductShowcase />
      <ProblemStatement />
      <VisionSection />
      <AIFeatures />
      <UseCases />
      <ScrollRevealSection />
      <Vision />
      <BookDemo />
      <FinalCTA />
    </div>
  );
}
