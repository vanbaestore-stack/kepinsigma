import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ValueProps } from './components/ValueProps';
import { PriceCalculator } from './components/PriceCalculator';
import { PricelistCatalog } from './components/PricelistCatalog';
import { SecurityCenter } from './components/SecurityCenter';
import { OrderWorkflow } from './components/OrderWorkflow';
import { AdminVerifier } from './components/AdminVerifier';
import { TestimonialGallery } from './components/TestimonialGallery';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { RedSnowRain } from './components/RedSnowRain';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-red-600 selection:text-white relative">
        {/* Red Snow Rain Effect */}
        <RedSnowRain />

        {/* Web Atmospheric Background Image */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
          <img
            src="/bg-bloxfruits.webp"
            alt="Blox Fruits Dragon Background"
            className="w-full h-full object-cover object-top opacity-30 filter saturate-150 contrast-110"
            referrerPolicy="no-referrer"
          />
          {/* Dark gradient & vignette overlay so it's not glaring while keeping vibrant neon aura */}
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/80 to-zinc-950/95"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#09090b_90%)]"></div>
        </div>

        {/* Top Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-grow relative z-10">
          <Hero />
          <ValueProps />
          <PriceCalculator />
          <PricelistCatalog />
          <SecurityCenter />
          <OrderWorkflow />
          <AdminVerifier />
          <TestimonialGallery />
          <FaqSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </LanguageProvider>
  );
}
