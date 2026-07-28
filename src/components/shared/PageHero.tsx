"use client";
import { ReactNode, useState, useEffect } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";

import { DecodeText } from "@/components/shared/DecodeText";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  children?: ReactNode; // CTAs / badges
  illustration?: ReactNode;
}

export function PageHero({ eyebrow, title, subtitle, children, illustration }: PageHeroProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Calculate parallax offsets based on mouse position relative to center
  const parallaxX = useTransform(springX, [0, windowSize.width || 1000], [-30, 30]);
  const parallaxY = useTransform(springY, [0, windowSize.height || 800], [-30, 30]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="relative overflow-hidden bg-[#05050F] pt-36 pb-16">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          style={{ x: parallaxX, y: parallaxY }}
          className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[var(--ch-gold-700)]/10 rounded-full blur-[150px]" 
        />
        <motion.div 
          animate={{ y: ["-3%", "3%"] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          style={{ x: useTransform(parallaxX, v => -v) }}
          className="absolute bottom-[-10%] left-[5%] w-[300px] h-[300px] bg-[var(--ch-gold-500)]/5 rounded-full blur-[100px]" 
        />
      </div>

      <div className={`relative max-w-7xl mx-auto px-6 lg:px-10 grid ${illustration ? "lg:grid-cols-2 text-center lg:text-left" : "grid-cols-1 text-center"} gap-12 items-center`}>
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className={!illustration ? "flex flex-col items-center" : ""}>
          <motion.span variants={itemVariants} className="text-xs font-bold tracking-widest uppercase text-[var(--ch-gold-500)] mb-4 block">
            <DecodeText text={eyebrow} speed={25} />
          </motion.span>
          <motion.h1 variants={itemVariants} className="font-sora text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
            {typeof title === "string" ? <DecodeText text={title} speed={35} /> : title}
          </motion.h1>
          <motion.p variants={itemVariants} className={`text-gray-400 text-lg max-w-lg mb-8 ${!illustration ? "mx-auto" : "mx-auto lg:mx-0"}`}>
            {subtitle}
          </motion.p>
          {children && <motion.div variants={itemVariants}>{children}</motion.div>}
        </motion.div>
        
        {illustration && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            {illustration}
          </motion.div>
        )}
      </div>
    </section>
  );
}

