"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Node {
  id: number;
  x: number; // Percentage
  y: number; // Percentage
  size: number;
}

export function HiveNetwork() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

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
      setMousePos({ x: e.clientX, y: e.clientY });
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
  }, []);

  if (windowSize.width === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Nodes */}
      {nodes.map((node) => {
        const px = (node.x / 100) * windowSize.width;
        const py = (node.y / 100) * windowSize.height;
        const dist = Math.hypot(mousePos.x - px, mousePos.y - py);
        const maxDist = 300;
        const isConnected = dist < maxDist;
        const lineOpacity = isConnected ? (1 - dist / maxDist) * 0.6 : 0;

        return (
          <div key={node.id}>
            {/* The Hex Node */}
            <motion.div
              className="absolute bg-[var(--ch-gold-500)] shadow-[0_0_10px_rgba(255,215,0,0.8)]"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                width: node.size,
                height: node.size,
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              }}
              animate={{
                scale: isConnected ? [1, 1.8, 1.2] : 1,
                opacity: isConnected ? 1 : 0.3,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Connecting Laser Line */}
            {isConnected && (
              <svg className="absolute inset-0 w-full h-full overflow-visible">
                <line
                  x1={mousePos.x}
                  y1={mousePos.y}
                  x2={px + node.size / 2}
                  y2={py + node.size / 2}
                  stroke="var(--ch-gold-500)"
                  strokeWidth="1.5"
                  strokeOpacity={lineOpacity}
                  strokeDasharray="4 2"
                />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}
