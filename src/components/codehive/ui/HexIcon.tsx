import { DynamicIcon } from "../../DynamicIcon";

interface HexIconProps {
  /** Lucide icon name to display inside the hexagon */
  icon?: string;
  /** Short text to display inside the hexagon (e.g., "CH" for logo) */
  text?: string;
  /** Size in pixels (both width and height) */
  size?: number;
  /** Font size for text content */
  fontSize?: number;
  /** Extra classes on the wrapper div */
  className?: string;
}

export function HexIcon({
  icon,
  text,
  size = 64,
  fontSize = 12,
  className = "",
}: HexIconProps) {
  return (
    <div className={`relative flex-shrink-0 ${className} group`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 64 64"
        className="absolute inset-0 w-full h-full"
        fill="none"
        aria-hidden="true"
      >
        {/* Fill polygon */}
        <polygon
          points="32,2 60,17 60,47 32,62 4,47 4,17"
          fill="rgba(201,162,39,0.08)"
          className="group-hover:fill-[rgba(201,162,39,0.18)] transition-all duration-300"
        />
        {/* Border polygon */}
        <polygon
          points="32,2 60,17 60,47 32,62 4,47 4,17"
          stroke="#C9A227"
          strokeWidth="1.5"
          fill="none"
          className="group-hover:stroke-[#E5C84A] transition-colors duration-300"
        />
        {/* Optional text label (e.g. "CH" logo) */}
        {text && (
          <text
            x="50%"
            y="54%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="#C9A227"
            fontSize={fontSize}
            fontFamily="Sora, sans-serif"
            fontWeight="700"
          >
            {text}
          </text>
        )}
      </svg>

      {/* Icon overlay */}
      {icon && (
        <div className="absolute inset-0 flex items-center justify-center select-none text-[#C9A227]">
          <DynamicIcon name={icon} size={size * 0.45} strokeWidth={1.5} />
        </div>
      )}
    </div>
  );
}
