"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Mail } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { SiGithub } from "react-icons/si";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/LeHoangAnh021203",
    icon: SiGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hoanganhle0212",
    icon: FaLinkedinIn,
  },
  {
    label: "Email",
    href: "mailto:hoanganhle.work.dev@gmail.com",
    icon: Mail,
  },
] as const;

function parseRgb(color: string): [number, number, number] | null {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!match) return null;
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

function getAlpha(color: string) {
  const match = color.match(/rgba?\([^)]*,\s*([0-9.]+)\)/i);
  return match ? Number(match[1]) : 1;
}

function isLightBackgroundAt(x: number, y: number) {
  let el = document.elementFromPoint(x, y) as HTMLElement | null;

  while (el && el !== document.documentElement) {
    if (el.dataset.navTheme === "light") return true;
    if (el.dataset.navTheme === "dark") return false;

    const bg = getComputedStyle(el).backgroundColor;
    const rgb = parseRgb(bg);
    if (rgb && getAlpha(bg) >= 0.45) {
      const luma = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
      return luma > 0.72;
    }

    el = el.parentElement;
  }

  return false;
}

function useNavOnLightBackground() {
  const [onLight, setOnLight] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const docks = document.querySelectorAll<HTMLElement>("[data-social-dock]");
        docks.forEach((dock) => {
          dock.style.pointerEvents = "none";
        });

        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        const x = isMobile
          ? window.innerWidth / 2
          : Math.max(8, window.innerWidth - 72);
        const y = isMobile
          ? Math.max(8, window.innerHeight - 56)
          : window.innerHeight / 2;

        setOnLight(isLightBackgroundAt(x, y));

        docks.forEach((dock) => {
          dock.style.pointerEvents = "";
        });
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return onLight;
}

function TooltipLabel({
  label,
  side,
  onLight,
}: {
  label: string;
  side: "left" | "top";
  onLight: boolean;
}) {
  return (
    <span
      role="tooltip"
      className={[
        "pointer-events-none absolute whitespace-nowrap rounded-md px-2.5 py-1 text-[11px] font-semibold tracking-wide opacity-0 shadow-lg transition duration-150 group-hover:opacity-100 group-focus-visible:opacity-100",
        side === "left"
          ? "right-full top-1/2 mr-3 -translate-y-1/2"
          : "bottom-full left-1/2 mb-2.5 -translate-x-1/2",
        onLight ? "bg-[#111111] text-white" : "bg-white text-[#12161f]",
      ].join(" ")}
    >
      {label}
    </span>
  );
}

function NavIcon({
  label,
  href,
  icon: Icon,
  tooltipSide,
  onLight,
}: {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  tooltipSide: "left" | "top";
  onLight: boolean;
}) {
  const isMail = href.startsWith("mailto:");

  return (
    <a
      href={href}
      target={isMail ? undefined : "_blank"}
      rel={isMail ? undefined : "noreferrer"}
      data-cursor-hover
      aria-label={label}
      className={[
        "group relative flex h-11 w-11 items-center justify-center rounded-2xl transition focus-visible:outline-none",
        onLight
          ? "text-black/80 hover:bg-black/8 hover:text-black focus-visible:bg-black/8 focus-visible:text-black"
          : "text-white/80 hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:text-white",
      ].join(" ")}
    >
      <Icon className="h-[1.15rem] w-[1.15rem]" aria-hidden={true} />
      <TooltipLabel label={label} side={tooltipSide} onLight={onLight} />
    </a>
  );
}

function NavInner({
  orientation,
  onLight,
}: {
  orientation: "vertical" | "horizontal";
  onLight: boolean;
}) {
  const isVertical = orientation === "vertical";
  const tooltipSide = isVertical ? "left" : "top";

  return (
    <nav
      className={[
        "flex items-center gap-1 border transition-colors duration-300",
        isVertical
          ? "flex-col rounded-[1.75rem] px-2.5 py-3"
          : "flex-row rounded-full px-3 py-2",
        onLight
          ? "border-black bg-white/92 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-md"
          : "border-white/10 bg-[#12161f]/88 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md",
      ].join(" ")}
    >
      {socialLinks.map((item) => (
        <NavIcon
          key={item.label}
          {...item}
          tooltipSide={tooltipSide}
          onLight={onLight}
        />
      ))}

      <div
        className={[
          isVertical ? "my-1.5 h-px w-6" : "mx-1.5 h-6 w-px",
          onLight ? "bg-black/30" : "bg-white/20",
        ].join(" ")}
        role="separator"
        aria-hidden="true"
      />

      <Link
        href="/cv"
        data-cursor-hover
        aria-label="CV"
        className={[
          "group relative flex h-11 w-11 items-center justify-center rounded-2xl transition focus-visible:outline-none",
          onLight
            ? "text-black/80 hover:bg-black/8 hover:text-black focus-visible:bg-black/8 focus-visible:text-black"
            : "text-white/80 hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:text-white",
        ].join(" ")}
      >
        <FileText
          className="h-[1.15rem] w-[1.15rem]"
          strokeWidth={1.75}
          aria-hidden="true"
        />
        <TooltipLabel label="CV" side={tooltipSide} onLight={onLight} />
      </Link>
    </nav>
  );
}

export function SideSocialNav() {
  const onLight = useNavOnLightBackground();

  return (
    <>
      <aside
        className="pointer-events-none fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 md:block lg:right-6"
        aria-label="Social links"
      >
        <div data-social-dock className="pointer-events-auto">
          <NavInner orientation="vertical" onLight={onLight} />
        </div>
      </aside>

      <aside
        className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center md:hidden"
        aria-label="Social links"
      >
        <div data-social-dock className="pointer-events-auto">
          <NavInner orientation="horizontal" onLight={onLight} />
        </div>
      </aside>
    </>
  );
}
