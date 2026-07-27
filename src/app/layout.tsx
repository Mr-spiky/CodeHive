import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", weight: ["600", "700", "800"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "CodeHive - Build. Connect. Grow Together.",
  description: "CodeHive is a student-driven developer community where ideas turn into impact.",
};

import { SmoothScroll } from "@/components/shared/SmoothScroll";
import { HivePreloader } from "@/components/shared/HivePreloader";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { AmbientParticles } from "@/components/shared/AmbientParticles";
import { HiveNetwork } from "@/components/shared/HiveNetwork";
import { VisitorBadge } from "@/components/shared/VisitorBadge";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body className="bg-[#05050F] antialiased">
        <CustomCursor />
        <HiveNetwork />
        <AmbientParticles />
        <VisitorBadge />
        <HivePreloader />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
