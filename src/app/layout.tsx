import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CodeHive — Build. Connect. Grow.",
  description:
    "CodeHive is India's most execution-driven student-led tech community. Join 2000+ members across India for hackathons, internships, networking, and career growth.",
  keywords: [
    "CodeHive", "tech community India", "student tech community Delhi NCR",
    "hackathons India", "coding community", "internships tech students",
  ],
  openGraph: {
    title: "CodeHive — Build. Connect. Grow.",
    description: "India's most execution-driven student-led tech community. 2000+ active members.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${sora.variable} ${inter.variable} antialiased bg-[#0A0A0A] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
