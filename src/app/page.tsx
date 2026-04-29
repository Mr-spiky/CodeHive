import { Navbar } from "@/components/codehive/Navbar";
import { HeroSection } from "@/components/codehive/HeroSection";
import { SponsorSection } from "@/components/codehive/SponsorSection";
import { AboutSection } from "@/components/codehive/AboutSection";
import { WhatsCodeHiveDifferentSection } from "@/components/codehive/WhatsCodeHiveDifferentSection";
import { TractionSection } from "@/components/codehive/TractionSection";
import { UpcomingEventSection } from "@/components/codehive/UpcomingEventSection";
import { CoreTeamSection } from "@/components/codehive/CoreTeamSection";
import { EventCallToActions } from "@/components/codehive/EventCallToActions";
import { Footer } from "@/components/codehive/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <HeroSection />
      <SponsorSection />
      <AboutSection />
      <WhatsCodeHiveDifferentSection />
      <TractionSection />
      <UpcomingEventSection />
      <EventCallToActions />
      <CoreTeamSection limit={4} isPreview={true} />
      <Footer />
    </main>
  );
}
