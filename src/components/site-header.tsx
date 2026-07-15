"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "works", label: "Works" },
  { id: "certifications", label: "Certs" },
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
          "grid grid-cols-3 items-center px-6 py-5 font-mono text-xs uppercase tracking-[0.24em] md:px-14 md:py-6",
          textMuted,
        ].join(" ")}
      >
        <a
          href="#home"
          data-cursor-hover
          className={`justify-self-start transition ${textActive} hover:opacity-80`}
        >
          Portfolio{" "}
          <span className="ml-2 inline-block h-2 w-2 rounded-full bg-blue-600" />
        </a>

        <nav className="hidden justify-self-center gap-6 lg:flex xl:gap-10">
          {sections.map((section, index) => {
            const isActive = activeId === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                data-cursor-hover
                className={`transition ${isActive ? textActive : "hover:opacity-100"} ${
                  isActive ? "" : "opacity-70 hover:opacity-100"
                }`}
              >
                <span className={accent}>
                  {String(index + 1).padStart(2, "0")}
                </span>{" "}
                <span className={isActive ? textActive : undefined}>
                  {section.label}
                </span>
              </a>
            );
          })}
        </nav>

        <p className="hidden justify-self-end md:block">
          <span className="mr-4 inline-block h-2 w-2 rounded-full bg-blue-600" />
          Available for work
        </p>
      </div>
    </header>
  );
}
