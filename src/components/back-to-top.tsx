"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      data-cursor-hover
      aria-label="Back to top"
      title="Back to top"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className={[
        "group fixed bottom-5 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#12161f]/90 shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 hover:bg-white md:bottom-8 md:right-6",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      ].join(" ")}
    >
      <Image
        src="/icons/collapse-arrow.png"
        alt=""
        width={22}
        height={22}
        className="h-[22px] w-[22px] group-hover:hidden"
        aria-hidden="true"
      />
      <Image
        src="/icons/collapse-arrow-dark.png"
        alt=""
        width={22}
        height={22}
        className="hidden h-[22px] w-[22px] group-hover:block"
        aria-hidden="true"
      />
    </button>
  );
}
