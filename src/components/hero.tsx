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

    return (
        <section ref={containerRef} className="relative h-screen min-h-[760px] w-full overflow-hidden bg-[#050505]">
            <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:56px_56px]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_63%_52%,rgba(255,255,255,0.04)_0,transparent_38%,rgba(5,5,5,0.84)_82%)]" />
            <div className="absolute inset-0 z-0">
                <SentientSphere />
            </div>

            <motion.div style={{ opacity, scale }} className="relative z-10 h-full px-6 py-8 md:px-14 md:py-12">
                <header className="hero-reveal grid grid-cols-3 items-center font-mono text-xs uppercase tracking-[0.24em] text-white/45">
                    <a className="justify-self-start transition hover:text-white" href="#">
                        Portfolio <span className="ml-2 inline-block h-2 w-2 rounded-full bg-blue-600" />
                    </a>
                    <nav className="hidden justify-self-center gap-12 md:flex">
                        <a className="transition hover:text-white" href="#about">
                            <span className="text-blue-600">01</span> About
                        </a>
                        <a className="transition hover:text-white" href="#works">
                            <span className="text-blue-600">02</span> Works
                        </a>
                        <a className="transition hover:text-white" href="#contact">
                            <span className="text-blue-600">03</span> Contact
                        </a>
                    </nav>
                    <p className="hidden justify-self-end md:block">
                        <span className="mr-4 inline-block h-2 w-2 rounded-full bg-blue-600" />
                        Available for work
                    </p>
                </header>

                <motion.div
                    className="hero-reveal absolute left-6 top-[19%] max-w-[45rem] md:left-14"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <p className="mb-5 font-mono text-sm uppercase tracking-[0.42em] text-white/55">
                        01 <span className="mx-5">-</span> Discipline
                    </p>
                    <h1 className="font-serif text-[clamp(4.2rem,9vw,9.3rem)] font-normal uppercase leading-[0.82] tracking-normal text-white">
                        System
                        <br />
                        <span className="italic">Architect</span>
                    </h1>
                </motion.div>

                <motion.div
                    className="hero-reveal absolute left-[63%] top-[52%] z-20 -translate-x-1/2 -translate-y-1/2"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <motion.button
                        data-cursor-hover
                        whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.94)", color: "#050505" }}
                        whileTap={{ scale: 0.96 }}
                        className="relative rounded-full border border-white/20 bg-[#090909]/60 px-11 py-5 font-mono text-sm uppercase tracking-[0.24em] text-white shadow-[0_0_55px_rgba(255,255,255,0.06)] backdrop-blur-md transition-colors"
                    >
                        Initialize
                        <span className="absolute -right-1 top-0 h-2.5 w-2.5 rounded-full bg-blue-600" />
                    </motion.button>
                </motion.div>

                <motion.div
                    className="hero-reveal absolute bottom-[8%] right-6 text-right md:right-14"
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <p className="mb-5 font-mono text-sm uppercase tracking-[0.42em] text-white/55">
                        02 <span className="mx-5">-</span> Craft
                    </p>
                    <h2 className="font-serif text-[clamp(4rem,8.4vw,8.8rem)] font-normal uppercase leading-[0.82] tracking-normal text-white">
                        Interface
                        <br />
                        <span className="italic">Designer</span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                    className="hero-reveal absolute bottom-9 left-1/2 z-10 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">Scroll</span>
                        <div className="h-8 w-px bg-gradient-to-b from-white/35 to-transparent" />
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    )
}
