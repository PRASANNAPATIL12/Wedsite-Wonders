import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import TemplatesSection from '@/components/sections/TemplatesSection';
import Showcase3DSection from '@/components/sections/Showcase3DSection';
import PricingSection from '@/components/sections/PricingSection';
import AiLayoutToolSection from '@/components/sections/AiLayoutToolSection';
import FloatingHearts from '@/components/FloatingHearts'; // Import the new component

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <TemplatesSection />
        <AiLayoutToolSection />
        <Showcase3DSection />
        <PricingSection />
      </main>
      <Footer />
      <FloatingHearts />
    </>
  );
}
