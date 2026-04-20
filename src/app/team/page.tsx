import { Navbar } from "@/components/codehive/Navbar";
import { CoreTeamSection } from "@/components/codehive/CoreTeamSection";
import { Footer } from "@/components/codehive/Footer";
import { Lanyard } from "@/components/codehive/ui/Lanyard";

export const metadata = {
  title: "Team | CodeHive",
  description: "Meet the core team behind India's most execution-driven student-led tech community.",
};

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col overflow-x-hidden">
      <Navbar />
      
      {/* Interactive 3D Lanyard Section */}
      <div className="pt-24 h-[500px] sm:h-[600px] w-full relative z-10">
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 pt-10">
          <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight text-center">
            The <span className="text-[#C9A227]">Core</span> Team
          </h1>
          <p className="text-gray-400 mt-4 text-center max-w-md px-4">
            Interactive ID: Click and drag the lanyard to play with it.
          </p>
        </div>
        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
      </div>

      <div className="flex-grow">
        <CoreTeamSection />
      </div>

      <Footer />
    </main>
  );
}
