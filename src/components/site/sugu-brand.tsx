import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function LogoMark({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      role="img"
      aria-label="Logo SUGU"
      className={className}
    >
      <defs>
        <filter id="suguLogoShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.12" />
        </filter>
      </defs>
      <g filter="url(#suguLogoShadow)">
        <rect x="8" y="8" width="43" height="43" rx="12" fill="#E63329" />
        <path d="M58 20 Q58 8 70 8 H101 V51 H58 Z" fill="#0B3D91" />
        <rect x="109" y="8" width="43" height="43" rx="12" fill="#0A9A49" />
        <path
          d="M8 68 Q8 58 18 58 H43 Q51 58 51 66 V103 H74 Q86 103 88 115 L90 126 L72 111 H20 Q8 111 8 99 Z"
          fill="#0A9A49"
        />
        <rect x="58" y="58" width="43" height="43" rx="12" fill="#F7C600" />
        <rect x="109" y="58" width="43" height="43" rx="12" fill="#0B3D91" />
        <rect x="8" y="109" width="43" height="43" rx="12" fill="#F7C600" />
        <rect x="58" y="109" width="43" height="43" rx="12" fill="#F5821F" />
        <path d="M109 109 H152 V140 Q152 152 140 152 H109 Z" fill="#E63329" />
      </g>
    </svg>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <LogoMark size={compact ? 32 : 42} />
      <div className="leading-none">
        <div
          className={`${compact ? "text-2xl" : "text-3xl"} font-black tracking-tight text-[#0B2D6D]`}
        >
          sugu
        </div>
        {!compact && (
          <div className="mt-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#0B2D6D]/65">
            <span className="h-0.5 w-6 bg-[#F7C600]" />
            app multi-secteurs
            <span className="h-0.5 w-6 bg-[#0A9A49]" />
          </div>
        )}
      </div>
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "light" | "sector";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#F5821F] text-white shadow-[0_16px_35px_rgba(245,130,31,0.25)] hover:-translate-y-0.5 hover:bg-[#e87413]",
  secondary:
    "border border-[#0B2D6D]/15 bg-white text-[#0B2D6D] shadow-[0_14px_35px_rgba(11,45,109,0.08)] hover:-translate-y-0.5 hover:border-[#0B2D6D]/25 hover:shadow-[0_18px_40px_rgba(11,45,109,0.12)]",
  light:
    "bg-white text-[#0B2D6D] shadow-[0_16px_35px_rgba(255,255,255,0.18)] hover:-translate-y-0.5",
  sector: "text-white hover:-translate-y-0.5",
};

const baseButton =
  "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-extrabold transition duration-300";

/** Ancre externe / lien hash */
export function ButtonAnchor({
  children,
  href,
  variant = "primary",
  className = "",
  style,
}: {
  children: ReactNode;
  href: string;
  variant?: ButtonVariant;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <a
      href={href}
      style={style}
      className={`${baseButton} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

export { Link };
export const buttonBase = baseButton;
export const buttonVariants = variantClasses;

