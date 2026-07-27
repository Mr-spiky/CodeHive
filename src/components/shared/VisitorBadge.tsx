"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Award, Compass, ArrowDownCircle, Clock } from "lucide-react";
import { usePathname } from "next/navigation";

const RANKS = [
  { level: 1, title: "Visitor", maxXp: 150 },
  { level: 2, title: "Member", maxXp: 350 },
  { level: 3, title: "Active Bee", maxXp: 700 },
  { level: 4, title: "Builder", maxXp: 1200 },
  { level: 5, title: "Core Leader", maxXp: 2000 },
];

export function VisitorBadge() {
  const [xp, setXp] = useState(40);
  const [rankIndex, setRankIndex] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [recentGain, setRecentGain] = useState<{ amount: number; reason: string } | null>(null);
  const pathname = usePathname();

  // Load initial state
  useEffect(() => {
    const savedXp = localStorage.getItem("codehive_user_xp");
    const savedRank = localStorage.getItem("codehive_user_rank");
    if (savedXp) setXp(parseInt(savedXp, 10));
    if (savedRank) setRankIndex(parseInt(savedRank, 10));
  }, []);

  // Helper to add XP with notification
  const addXp = (amount: number, reason: string) => {
    setXp((prev) => {
      const newXp = prev + amount;
      const currentRank = RANKS[rankIndex] || RANKS[RANKS.length - 1];

      if (newXp >= currentRank.maxXp && rankIndex < RANKS.length - 1) {
        setRankIndex((r) => {
          const next = r + 1;
          localStorage.setItem("codehive_user_rank", next.toString());
          return next;
        });
        setShowLevelUp(true);
        setTimeout(() => setShowLevelUp(false), 3500);
      }

      localStorage.setItem("codehive_user_xp", newXp.toString());
      return newXp;
    });

    setRecentGain({ amount, reason });
    setTimeout(() => setRecentGain(null), 2500);
  };

  // Criterion 1: Route Exploration (+100 XP for unique routes)
  useEffect(() => {
    if (!pathname) return;
    const visited = JSON.parse(localStorage.getItem("codehive_visited_routes") || "[]");
    if (!visited.includes(pathname)) {
      visited.push(pathname);
      localStorage.setItem("codehive_visited_routes", JSON.stringify(visited));
      // Delay slightly so it doesn't fire instantly on reload
      const timer = setTimeout(() => {
        addXp(100, `Explored Zone: ${pathname === "/" ? "Home" : pathname}`);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Criterion 2: Scroll Depth (+50 XP for reaching bottom of page)
  useEffect(() => {
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 150) {
        const scrolledPages = JSON.parse(localStorage.getItem("codehive_scrolled_pages") || "[]");
        if (!scrolledPages.includes(pathname)) {
          scrolledPages.push(pathname);
          localStorage.setItem("codehive_scrolled_pages", JSON.stringify(scrolledPages));
          addXp(50, "Full Page Exploration");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Criterion 3: Time Spent (+20 XP every 45 seconds of active presence)
  useEffect(() => {
    const interval = setInterval(() => {
      addXp(20, "Active Presence");
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  const currentRank = RANKS[rankIndex] || RANKS[RANKS.length - 1];
  const progressPercent = Math.min(100, (xp / currentRank.maxXp) * 100);

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sora select-none">
      {/* Level Up Banner */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -50, scale: 1 }}
            exit={{ opacity: 0, y: -70 }}
            className="absolute -top-12 right-0 bg-gradient-to-r from-[var(--ch-gold-500)] to-[var(--ch-gold-700)] text-[#05050F] px-4 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,215,0,0.8)] whitespace-nowrap"
          >
            <Award className="w-4 h-4" /> LEVEL UP! RANK: {RANKS[rankIndex]?.title.toUpperCase()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent XP Gain Popup */}
      <AnimatePresence>
        {recentGain && !showLevelUp && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -top-8 right-0 bg-[#05050F] border border-[var(--ch-gold-500)]/60 text-[var(--ch-gold-300)] px-3 py-1 rounded text-[11px] font-mono flex items-center gap-1.5 shadow-lg whitespace-nowrap"
          >
            <Compass className="w-3 h-3 text-[var(--ch-gold-500)]" />
            <span>+{recentGain.amount} XP</span>
            <span className="text-gray-400">({recentGain.reason})</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-[#05050F]/90 backdrop-blur-md border border-[var(--ch-gold-500)]/40 rounded-lg p-3 shadow-[0_4px_20px_rgba(0,0,0,0.8)] flex items-center gap-3 w-72">
        <div 
          onClick={() => addXp(10, "Manual Boost")}
          title="Click for +10 XP Manual Boost"
          className="w-10 h-10 bg-[var(--ch-gold-500)]/10 border border-[var(--ch-gold-500)]/30 rounded flex items-center justify-center cursor-pointer hover:bg-[var(--ch-gold-500)]/20 transition-colors group"
        >
          <Zap className="w-5 h-5 text-[var(--ch-gold-500)] group-hover:scale-110 transition-transform" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-white tracking-wider uppercase truncate">
              LVL {currentRank.level}: {currentRank.title}
            </span>
            <span className="text-[10px] text-[var(--ch-gold-500)] font-mono">{xp} / {currentRank.maxXp}</span>
          </div>

          {/* XP Bar */}
          <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--ch-gold-700)] to-[var(--ch-gold-500)]"
              style={{ width: `${progressPercent}%` }}
              layout
            />
          </div>
        </div>
      </div>
    </div>
  );
}
