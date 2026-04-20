import { Navbar } from "@/components/codehive/Navbar";
import { AboutSection } from "@/components/codehive/AboutSection";
import { VisionMissionSection } from "@/components/codehive/VisionMissionSection";
import { TractionSection } from "@/components/codehive/TractionSection";
import { WhatsCodeHiveDifferentSection } from "@/components/codehive/WhatsCodeHiveDifferentSection";
import { Footer } from "@/components/codehive/Footer";

export const metadata = {
  title: "About Us | CodeHive",
  description: "Learn what drives India's most execution-driven tech community.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <Navbar />
      
      {/* Top padding to account for fixed navbar */}
      <div className="pt-16 flex-grow">
        <AboutSection />
        <VisionMissionSection />
        <TractionSection />
        <WhatsCodeHiveDifferentSection />
      </div>

      <Footer />
    </main>
  );
}
