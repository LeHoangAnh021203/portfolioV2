"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "@/components/preloader";
import { Card } from "@/components/Card";
import { CustomCursor } from "@/components/custom-cursor"
import { Hero } from "@/components/hero";
import { Skills } from "@/components/skills";
import Timeline from "@/components/Timeline";
import { Projects } from "@/components/projects";
import CertificateUI from "@/components/certificate-ui";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 24,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <CustomCursor />
      <Preloader />

      <main className="relative z-10">
        <Hero />
        <Card />
        <Skills />
        <Timeline/>
        <Projects />
        <CertificateUI />
      </main>
    </div>
  );
}
