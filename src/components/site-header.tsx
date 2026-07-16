"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "works", label: "Works" },
  { id: "certifications", label: "Certs" },
  { id: "contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [visible, setVisible] = useState(true);
  const [activeId, setActiveId] = useState<string>("about");
  const [onLight, setOnLight] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoveringRef = useRef(false);

  useEffect(() => {
    const clearHideTimer = () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };

    const scheduleHide = () => {
      clearHideTimer();
      hideTimerRef.current = setTimeout(() => {
        if (!hoveringRef.current && window.scrollY > 80) {
          setVisible(false);
        }
      }, 2000);
    };

    const onScroll = () => {
      setVisible(true);
      if (window.scrollY <= 80) {
        clearHideTimer();
        setVisible(true);
        return;
      }
      scheduleHide();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearHideTimer();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]?.target.id) {
          setActiveId(visibleEntries[0].target.id);
          const theme = (visibleEntries[0].target as HTMLElement).dataset
            .navTheme;
          setOnLight(theme === "light");
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.08, 0.2, 0.4, 0.6],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const textMuted = onLight ? "text-black/45" : "text-white/45";
  const textActive = onLight ? "text-black" : "text-white";
  const accent = "text-blue-600";

  return (
    <header
      onMouseEnter={() => {
        hoveringRef.current = true;
        setVisible(true);
      }}
      onMouseLeave={() => {
        hoveringRef.current = false;
        if (window.scrollY > 80) {
          if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
          hideTimerRef.current = setTimeout(() => setVisible(false), 2000);
        }
      }}
      className={[
        "fixed inset-x-0 top-0 z-[60] transition-all duration-500 ease-out",
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none",
        onLight
          ? "bg-[#e8e8e6]/85 backdrop-blur-md"
          : "bg-[#050505]/70 backdrop-blur-md",
      ].join(" ")}
    >
      <div
        className={[
          "mx-auto flex min-h-[62px] w-full max-w-[1920px] flex-col justify-center gap-2 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] sm:px-8 sm:py-4 sm:text-[11px] md:min-h-[72px] md:flex-row md:items-center md:gap-6 md:px-10 md:py-0 lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-8",
          textMuted,
        ].join(" ")}
      >
        <a
          href="#home"
          data-cursor-hover
          className={`inline-flex w-fit shrink-0 items-center gap-2 transition ${textActive} hover:opacity-80`}
        >
          Portfolio
          <span className="inline-block h-2 w-2 rounded-full bg-blue-600" />
        </a>

        <nav
          aria-label="Primary navigation"
          className="flex max-w-full items-center gap-3 overflow-x-auto pb-0.5 [scrollbar-width:none] md:justify-center md:gap-4 lg:gap-6 xl:gap-8 [&::-webkit-scrollbar]:hidden"
        >
          {sections.map((section, index) => {
            const isActive = activeId === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                data-cursor-hover
                className={`shrink-0 transition ${
                  isActive ? textActive : "opacity-70 hover:opacity-100"
                }`}
              >
                <span className={accent}>
                  {String(index + 1).padStart(2, "0")}
                </span>{" "}
                {section.label}
              </a>
            );
          })}
        </nav>

        <a
          href="#contact"
          data-cursor-hover
          className="hidden w-fit shrink-0 items-center gap-3 justify-self-end transition hover:opacity-80 md:inline-flex"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-blue-600" />
          Available for work
        </a>
      </div>
    </header>
  );
}
