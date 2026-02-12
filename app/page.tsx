import Link from "next/link";
import { ArrowRight, Check, Sparkles, Target, Zap, Shield, TrendingUp } from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { StatsSection } from "@/components/sections/stats-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { BenefitsSection } from "@/components/sections/benefits-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FAQPreview } from "@/components/sections/faq-preview";
import { PricingPreviewSection } from "@/components/sections/pricing-preview-section";
import { CTASection } from "@/components/sections/cta-section";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <BenefitsSection />
      <TestimonialsSection />
      <FAQPreview />
      <PricingPreviewSection />
      <CTASection />
    </div>
  );
}
