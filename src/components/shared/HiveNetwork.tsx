"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, MotionValue } from "framer-motion";

interface Node {
  id: number;
  x: number; // Percentage
  y: number; // Percentage
  size: number;
}

function NetworkNode({ node, mouseX, mouseY, windowWidth, windowHeight }: { node: Node, mouseX: MotionValue<number>, mouseY: MotionValue<number>, windowWidth: number, windowHeight: number }) {
  const px = (node.x / 100) * windowWidth;
  const py = (node.y / 100) * windowHeight;
  const maxDist = 300;

  const dist = useTransform(() => {
    return Math.hypot(mouseX.get() - px, mouseY.get() - py);
  });

  const scale = useTransform(dist, (d) => d < maxDist ? 1.5 : 1);
  const nodeOpacity = useTransform(dist, (d) => d < maxDist ? 1 : 0.3);
  
  const lineOpacity = useTransform(dist, (d) => d < maxDist ? (1 - d / maxDist) * 0.6 : 0);
  const strokeWidth = useTransform(dist, (d) => d < maxDist ? 1.5 : 0);

  return (
    <div className="absolute inset-0">
      <motion.div
        className="absolute bg-[var(--ch-gold-500)] shadow-[0_0_10px_rgba(255,215,0,0.8)]"
        style={{
          left: `${node.x}%`,
          top: `${node.y}%`,
          width: node.size,
          height: node.size,
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          scale,
          opacity: nodeOpacity,
        }}
      />
      <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
        <motion.line
          x1={mouseX}
          y1={mouseY}
          x2={px + node.size / 2}
          y2={py + node.size / 2}
          stroke="var(--ch-gold-500)"
          strokeDasharray="4 2"
          style={{ opacity: lineOpacity, strokeWidth }}
        />
      </svg>
    </div>
  );
}

export function HiveNetwork() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    // Generate fixed constellation of nodes
    const generated = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 90 + 5, // 5% to 95%
      y: Math.random() * 90 + 5,
      size: Math.random() * 8 + 4,
    }));
    setNodes(generated);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [mouseX, mouseY]);

  if (windowSize.width === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {nodes.map((node) => (
        <NetworkNode 
          key={node.id} 
          node={node} 
          mouseX={mouseX} 
          mouseY={mouseY} 
          windowWidth={windowSize.width} 
          windowHeight={windowSize.height} 
        />
      ))}
    </div>
  );
}
