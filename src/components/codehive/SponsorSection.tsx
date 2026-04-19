import Image from "next/image";
import { SPONSOR_LOGOS } from "@/lib/codehive/data";

export function SponsorSection() {
  // Duplicate the array to create a seamless infinite marquee loop
  const logos = [...SPONSOR_LOGOS, ...SPONSOR_LOGOS];

  return (
    <section className="py-5 border-y border-[#C9A227]/15 bg-[#060606] overflow-hidden relative">
      {/* Left/Right fading gradients to blend the marquee smoothly */}
      <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-[#060606] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[#060606] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex w-[100%] animate-marquee items-center group">
        {logos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex-shrink-0 w-[50%] sm:w-[33.333%] md:w-[25%] lg:w-[20%] flex items-center justify-center px-8"
          >
            <div className="relative h-12 w-32 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <Image
                src={logo.src}
                alt={logo.name}
                fill
                className="object-contain w-900px"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
