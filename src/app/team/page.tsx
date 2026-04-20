import { Navbar } from "@/components/codehive/Navbar";
import { TeamTabs } from "@/components/codehive/TeamTabs";
import { Footer } from "@/components/codehive/Footer";

export const metadata = {
  title: "Team | CodeHive",
  description: "Meet the core team behind India's most execution-driven student-led tech community.",
};

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <Navbar />
      
      {/* Top padding to account for fixed navbar */}
      <div className="pt-20 flex-grow">
        <TeamTabs />
      </div>

      <Footer />
    </main>
  );
}
