// ─── GoldText ─────────────────────────────────────────────────
// Inline gold gradient text span.
// Usage: <GoldText>Connect.</GoldText>

interface GoldTextProps {
  children: React.ReactNode;
  className?: string;
}

export function GoldText({ children, className = "" }: GoldTextProps) {
  return (
    <span
      className={`text-transparent bg-clip-text bg-gradient-to-r from-[#C9A227] to-[#E5C84A] ${className}`}
    >
      {children}
    </span>
  );
}
