import { Navbar } from "@/components/codehive/Navbar";
import { HeroSection } from "@/components/codehive/HeroSection";
import { SponsorSection } from "@/components/codehive/SponsorSection";
import { AboutSection } from "@/components/codehive/AboutSection";
import { VisionMissionSection } from "@/components/codehive/VisionMissionSection";
import { CommunityGroupsSection } from "@/components/codehive/CommunityGroupsSection";
import { TractionSection } from "@/components/codehive/TractionSection";
import { WhatsCodeHiveDifferentSection } from "@/components/codehive/WhatsCodeHiveDifferentSection";
import { Footer } from "@/components/codehive/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
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
  );
}
