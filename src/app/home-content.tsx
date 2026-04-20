'use client';

import { useState, useEffect } from 'react';
import { LoadingScreen } from "@/components/codehive/LoadingScreen";
import { Navbar } from "@/components/codehive/Navbar";
import { HeroSection } from "@/components/codehive/HeroSection";
import { SponsorSection } from "@/components/codehive/SponsorSection";
import { AboutSection } from "@/components/codehive/AboutSection";
import { VisionMissionSection } from "@/components/codehive/VisionMissionSection";
import { CommunityGroupsSection } from "@/components/codehive/CommunityGroupsSection";
import { TractionSection } from "@/components/codehive/TractionSection";
import { WhatsCodeHiveDifferentSection } from "@/components/codehive/WhatsCodeHiveDifferentSection";
import { Footer } from "@/components/codehive/Footer";

export function HomeContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 3200);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <>
      <LoadingScreen isVisible={isLoading} />
      <main 
        className={`min-h-screen bg-[#0A0A0A] transition-all duration-1000 ${
          showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <Navbar />
        <HeroSection />
        <SponsorSection />
        <AboutSection />
        <VisionMissionSection />
        <CommunityGroupsSection />
        <TractionSection />
        <WhatsCodeHiveDifferentSection />
        <Footer />
      </main>
    </>
  );
}
