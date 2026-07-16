"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { SentientSphere } from "./sentient-sphere"

export function Hero() {
    const containerRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    })

    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.94])
    const handleInitializeClick = () => {
        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <section id="home" ref={containerRef} className="relative h-screen min-h-[640px] w-full overflow-hidden bg-[#050505] sm:min-h-[760px]">
            <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:56px_56px]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_63%_52%,rgba(255,255,255,0.04)_0,transparent_38%,rgba(5,5,5,0.84)_82%)]" />
            <div className="absolute inset-0 z-0">
                <SentientSphere />
            </div>

            <motion.div style={{ opacity, scale }} className="relative z-10 h-full px-4 py-8 sm:px-6 md:px-14 md:py-12">
                <motion.div
                    className="hero-reveal absolute left-4 top-[17%] max-w-[20rem] sm:left-6 sm:top-[19%] sm:max-w-[45rem] md:left-14"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <p className="mb-4 text-xs font-semibold uppercase tracking-normal text-white/55 sm:mb-5 sm:text-sm">
                        01 <span className="mx-5">-</span> Discipline
                    </p>
                    <h1 className="font-sans text-[clamp(3.1rem,14vw,9.3rem)] font-black uppercase leading-[0.82] tracking-normal text-white">
                        System
                        <br />
                        <span className="italic">Architect</span>
                    </h1>
                </motion.div>

                <motion.div
                    className="hero-reveal absolute left-1/2 top-[57%] z-20 -translate-x-1/2 -translate-y-1/2 sm:left-[63%] sm:top-[52%]"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <motion.button
                        data-cursor-hover
                        whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.94)", color: "#050505" }}
                        whileTap={{ scale: 0.96 }}
                        type="button"
                        onClick={handleInitializeClick}
                        className="relative rounded-full border border-white/20 bg-[#090909]/60 px-8 py-4 text-xs font-semibold uppercase tracking-normal text-white shadow-[0_0_55px_rgba(255,255,255,0.06)] backdrop-blur-md transition-colors sm:px-11 sm:py-5 sm:text-sm"
                    >
                        Initialize
                        <span className="absolute -right-1 top-0 h-2.5 w-2.5 rounded-full bg-blue-600" />
                    </motion.button>
                </motion.div>

                <motion.div
                    className="hero-reveal absolute bottom-[12%] right-4 text-right sm:bottom-[8%] sm:right-6 md:right-14"
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <p className="mb-4 text-xs font-semibold uppercase tracking-normal text-white/55 sm:mb-5 sm:text-sm">
                        02 <span className="mx-5">-</span> Craft
                    </p>
                    <h2 className="font-sans text-[clamp(2.9rem,13vw,8.8rem)] font-black uppercase leading-[0.82] tracking-normal text-white">
                        Interface
                        <br />
                        <span className="italic">Designer</span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                    className="hero-reveal absolute bottom-6 left-1/2 z-10 -translate-x-1/2 sm:bottom-9"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-[10px] font-semibold uppercase tracking-normal text-white/35">Scroll</span>
                        <div className="h-8 w-px bg-gradient-to-b from-white/35 to-transparent" />
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    )
}
