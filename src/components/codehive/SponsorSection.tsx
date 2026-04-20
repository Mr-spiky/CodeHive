import { SPONSOR_LOGOS } from "@/lib/codehive/data";
import { CurvedLoop } from "./ui";

export function SponsorSection() {
  // Extract names from our sponsor array and create a continuous string
  const marqueeText = SPONSOR_LOGOS.map((logo) => logo.name).join(" ✦ ") + " ✦ ";

  return (
    <section className="py-4 border-y border-[#C9A227]/15 bg-[#060606] overflow-hidden relative">
      <h3 className="text-center text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase mb-2 w-full block relative z-20">
        Trusted & Connected With
      </h3>

      {/* Curved Interactive Loop */}
      <div className="relative w-full py-4 overflow-hidden">
        {/* Left/Right fading gradients to blend the curved loop smoothly at the edges */}
        <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-[#060606] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[#060606] to-transparent z-10 pointer-events-none" />

        <CurvedLoop
          marqueeText={marqueeText}
          speed={3}
          curveAmount={0}
          direction="right"
          interactive={true}
          className="text-[#C9A227] opacity-80 mix-blend-screen"
        />
      </div>
    </section>
  );
}
