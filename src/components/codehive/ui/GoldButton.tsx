// ─── GoldButton ───────────────────────────────────────────────
// Primary CTA button with gold gradient background.
// Renders as <a> for external links or <button> for actions.
//
// Usage (link):
//   <GoldButton href="#groups">Join Community →</GoldButton>
//
// Usage (button):
//   <GoldButton as="button" onClick={fn}>Submit</GoldButton>

interface GoldButtonBaseProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

interface GoldButtonLinkProps extends GoldButtonBaseProps {
  as?: "a";
  href: string;
  target?: string;
  rel?: string;
}

interface GoldButtonActionProps extends GoldButtonBaseProps {
  as: "button";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  href?: never;
}

type GoldButtonProps = GoldButtonLinkProps | GoldButtonActionProps;

const BASE_CLASSES =
  "inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-[#0A0A0A] bg-gradient-to-r from-[#C9A227] to-[#E5C84A] rounded-full hover:shadow-[0_0_40px_rgba(201,162,39,0.5)] hover:scale-105 transition-all duration-300 active:scale-95";

export function GoldButton(props: GoldButtonProps) {
  const { children, className = "", id } = props;
  const combinedClass = `${BASE_CLASSES} ${className}`;

  if (props.as === "button") {
    return (
      <button
        id={id}
        type={props.type ?? "button"}
        onClick={props.onClick}
        className={combinedClass}
      >
        {children}
      </button>
    );
  }

  return (
    <a
      id={id}
      href={props.href}
      target={props.target}
      rel={props.rel}
      className={combinedClass}
    >
      {children}
    </a>
  );
}
