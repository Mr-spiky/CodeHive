"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const springX = useSpring(mouseX, { stiffness: 400, damping: 28, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 28, mass: 0.5 });
  
  // Offset by -12 to center the 24x24 cursor
  const cursorX = useTransform(springX, (v) => v - 12);
  const cursorY = useTransform(springY, (v) => v - 12);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(hover: hover)").matches) {
      setIsTouch(false);
    }

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY]);

  if (isTouch) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 border-2 border-[var(--ch-gold-500)] pointer-events-none z-[10000] mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
      }}
      animate={{
        scale: isClicked ? 0.5 : isHovering ? 2 : 1,
        rotate: isClicked ? -45 : isHovering ? 90 : 0,
        backgroundColor: isHovering || isClicked ? "rgba(255, 215, 0, 0.9)" : "transparent",
        boxShadow: isClicked ? "0 0 20px 5px rgba(255, 215, 0, 1)" : "none"
      }}
      transition={{
        type: "spring",
        stiffness: isClicked ? 800 : 400,
        damping: isClicked ? 10 : 28,
        mass: 0.5,
      }}
    />
  );
}
