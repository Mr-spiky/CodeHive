import { Navbar } from "@/components/codehive/Navbar";
import { UpcomingEventSection } from "@/components/codehive/UpcomingEventSection";
import { Footer } from "@/components/codehive/Footer";

export const metadata = {
  title: "Events | CodeHive",
  description: "Join upcoming hackathons, industry networking sessions, and meetups organized by CodeHive.",
};

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <Navbar />
      
      {/* Top padding to account for fixed navbar */}
      <div className="pt-20 flex-grow">
        <UpcomingEventSection />
      </div>

      <Footer />
    </main>
  );
}
