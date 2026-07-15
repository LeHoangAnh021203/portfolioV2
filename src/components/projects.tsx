"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"
import { SiGithub } from "react-icons/si"

type Project = {
    title: string
    eyebrow: string
    description: string
    image: string
    previewImage?: string
    accent: string
    tech: string[]
    github: string
    demo?: string
}

const projects: Project[] = [
    {
        title: "FWF Zalo Mini App",
        eyebrow: "Campaign / Zalo Mini App",
        description: "Engineered a Zalo Mini App voucher campaign with reward issuance, user voucher wallets, admin controls, Supabase data storage, and campaign governance workflows.",
        image: "/projects/project-lake.png",
        accent: "#f97316",
        tech: ["React", "TypeScript", "Zalo Mini App", "Supabase"],
        github: "https://github.com/LeHoangAnh021203/FWF_ZaloMiniApp",
        demo: "https://zalo.me/s/3731967213863127552/?utm_source=zalo-qr",
    },
    {
        title: "FWF Events",
        eyebrow: "Campaign / Landing Page",
        description: "Delivered a production campaign landing page platform for Face Wash Fox events with voucher checkout, customer acquisition flows, and MoMo API payment integration for time-sensitive marketing execution.",
        image: "/projects/Event/Screenshot 2026-06-29 at 17.41.06.png",
        previewImage: "/projects/Event/Screenshot 2026-06-29 at 17.40.08.png",
        accent: "#fb7185",
        tech: ["React", "TypeScript", "MoMo API", "Vercel"],
        github: "https://github.com/LeHoangAnh021203/20_10_Events",
        demo: "https://event.facewashfox.com/",
    },
    {
        title: "Dolic Web",
        eyebrow: "Corporate / Product Website",
        description: "Built a corporate aquaculture equipment website with product catalog browsing, farm/solution pages, B2B and dealer flows, DOCX/XLSX content extraction, Google Maps embed, and Zalo/Facebook/TikTok contact integrations.",
        image: "/projects/Dolic/Screenshot 2026-06-30 at 11.51.55.png",
        previewImage: "/projects/Dolic/Screenshot 2026-06-30 at 11.52.14.png",
        accent: "#06b6d4",
        tech: ["Next.js 16", "React 19", "Tailwind CSS", "Radix UI", "GSAP"],
        github: "https://github.com/dolicwebsite-hub/dolic_web",
        demo: "https://www.dolic.vn/",
    },
    {
        title: "FWF KPI",
        eyebrow: "Dashboard / Operations",
        description: "Built an OTP-secured KPI and e-learning platform with reporting views, protected access, operational metrics, learning content workflows, and production deployment for staff performance monitoring.",
        image: "/projects/KPI/Screenshot 2026-06-29 at 10.48.08.png",
        previewImage: "/projects/KPI/Screenshot 2026-06-29 at 10.58.27.png",
        accent: "#d946ef",
        tech: ["Next.js", "TypeScript", "OTP Auth", "E-Learning Module"],
        github: "https://github.com/LeHoangAnh021203/FWF_KPI",
        demo: "https://kpi.facewashfox.com/login",
    },
    {
        title: "FWF Map",
        eyebrow: "Booking / Location",
        description: "Implemented a booking and branch locator for 50 branches with Leaflet maps, city/service filters, form validation, Google Sheets sync, email delivery, and Zalo OA notifications.",
        image: "/projects/Map/Screenshot 2026-06-29 at 11.05.06.png",
        previewImage: "/projects/Map/Screenshot 2026-06-29 at 11.05.32.png",
        accent: "#84cc16",
        tech: ["Next.js", "TypeScript", "Leaflet", "Google Sheets", "Zalo OA"],
        github: "https://github.com/LeHoangAnh021203/FWF_Map",
        demo: "https://cuahang.facewashfox.com/",
    },
    {
        title: "CRM FWF",
        eyebrow: "CRM / Reports",
        description: "Developed a CRM reporting dashboard for orders, customers, services, accounting, role-ready operations, API-connected reports, and AI-assisted workflows.",
        image: "/projects/Report/Screenshot 2026-06-29 at 11.15.31.png",
        previewImage: "/projects/Report/Screenshot 2026-06-29 at 11.16.06.png",
        accent: "#22d3ee",
        tech: ["TypeScript", "React", "CRM", "API Integration"],
        github: "https://github.com/LeHoangAnh021203/CRM_FWF",
        demo: "https://report.facewashfox.com",
    },
    {
        title: "Scrape Data",
        eyebrow: "Backend / Automation",
        description: "Designed a Node.js automation service with Puppeteer scraping, MongoDB idempotent upserts, Express sync APIs, health checks, and scrape status tracking.",
        image: "/projects/project-mist.png",
        accent: "#38bdf8",
        tech: ["JavaScript", "Node.js", "Puppeteer", "MongoDB", "Express"],
        github: "https://github.com/LeHoangAnh021203/Scrape_Data",
    },
    {
        title: "Exotic Stamp",
        eyebrow: "Mobile / Loyalty Platform",
        description: "Built a Metro Stamp loyalty app monorepo with Flutter mobile flows for auth, station discovery, QR scanning, stamp book, rewards, and a Spring Boot API with RBAC, JWT security, mail queue, storage, and database migrations.",
        image: "/projects/Exotic/Screenshot 2026-06-30 at 15.10.12.png",
        previewImage: "/projects/Exotic/z7687728521614_f4909865b353a3c10628835e013b05b1.jpg",
        accent: "#14b8a6",
        tech: ["Flutter", "Java 21", "Spring Boot", "PostgreSQL", "MongoDB", "Redis"],
        github: "https://github.com/itdept-studio/EXOTIC_STAMP",
        demo: "https://exotic-stamp.vercel.app/",
    },
    {
        title: "Football Manager",
        eyebrow: "Product / Team Tool",
        description: "Built a team operations app with player management, match scheduling, local chat, image crop, Google Sheets sync, and balanced team generation.",
        image: "/projects/project-falls.png",
        accent: "#facc15",
        tech: ["Next.js", "TypeScript", "Google Sheets", "Team Algorithm"],
        github: "https://github.com/LeHoangAnh021203/Football_Manager",
        demo: "https://football-manager-pi.vercel.app",
    },
]


function wrapIndex(index: number, length: number) {
    return (index + length) % length
}


export function Projects() {
    const [activeIndex, setActiveIndex] = useState(0)

    const visibleProjects = projects

    const activeProject = visibleProjects[activeIndex] ?? visibleProjects[0]

    const previewProjects = useMemo(
        () =>
            [1, 2, 3].map((offset) => ({
                project: visibleProjects[wrapIndex(activeIndex + offset, visibleProjects.length)],
                index: wrapIndex(activeIndex + offset, visibleProjects.length),
            })),
        [activeIndex, visibleProjects],
    )

    function goNext() {
        setActiveIndex((current) => wrapIndex(current + 1, visibleProjects.length))
    }

    function goPrevious() {
        setActiveIndex((current) => wrapIndex(current - 1, visibleProjects.length))
    }

    return (
        <section id="works" data-nav-theme="light" className="relative overflow-hidden bg-[#e8e8e6] px-4 py-24 text-[#111111] sm:px-8 lg:py-32">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(232,232,230,0.85))]" />
            <div className="relative z-10 mx-auto max-w-7xl">
                <motion.div
                    className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.38em] text-black/45">Selected work</p>
                        <h2 className="mt-4 font-serif text-[clamp(3.4rem,8vw,7.5rem)] font-black uppercase leading-[0.84] tracking-normal">
                            Projects
                        </h2>
                    </div>
                    <p className="max-w-md text-base leading-8 text-black/58 md:text-right">
                        A focused carousel of selected projects with production links, source code, and real project visuals.{" "}
                        <a
                            data-cursor-hover
                            href="https://github.com/LeHoangAnh021203"
                            rel="noreferrer"
                            target="_blank"
                            className="font-bold text-black underline decoration-black/25 underline-offset-4 transition hover:decoration-black"
                        >
                            See more in GitHub.
                        </a>
                    </p>
                </motion.div>

                <motion.div
                    className="relative min-h-[620px] overflow-visible rounded-none md:min-h-[640px]"
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-90px" }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="relative mx-auto h-[620px] max-w-[1120px] shadow-[0_32px_90px_rgba(0,0,0,0.18)] md:h-[640px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProject.image}
                                className="absolute inset-0 overflow-hidden"
                                initial={{ opacity: 0, scale: 1.08, x: 120 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.96, x: -80 }}
                                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <Image
                                    src={activeProject.image}
                                    alt=""
                                    fill
                                    sizes="(min-width: 1280px) 1120px, 100vw"
                                    className="object-cover"
                                    priority={activeIndex === 0}
                                />
                            </motion.div>
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/24 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/45 to-transparent" />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProject.title}
                                className="absolute left-6 top-16 max-w-[25rem] text-white sm:left-10 md:left-20 md:top-40"
                                initial={{ opacity: 0, x: -34 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 24 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <p className="font-mono text-xs uppercase tracking-[0.32em] text-white/62">{activeProject.eyebrow}</p>
                                <h3 className="mt-5 text-4xl font-black leading-none tracking-normal sm:text-5xl md:text-6xl">
                                    {activeProject.title}
                                </h3>
                                <p className="mt-5 text-base leading-7 text-white/78 sm:text-lg">{activeProject.description}</p>
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {activeProject.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-full border border-white/18 bg-white/12 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white/82 backdrop-blur"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-8 flex flex-wrap gap-3">
                                    <a
                                        data-cursor-hover
                                        href={activeProject.github}
                                        rel="noreferrer"
                                        target="_blank"
                                        className="inline-flex items-center gap-2 bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-black hover:text-white"
                                    >
                                        GitHub
                                        <SiGithub className="h-4 w-4" aria-hidden="true" />
                                    </a>
                                    {activeProject.demo ? (
                                        <a
                                            data-cursor-hover
                                            href={activeProject.demo}
                                            rel="noreferrer"
                                            target="_blank"
                                            className="inline-flex items-center gap-2 border border-white/35 bg-white/10 px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-white backdrop-blur transition hover:bg-white hover:text-black"
                                        >
                                            Production
                                            <ExternalLink className="h-4 w-4" aria-hidden="true" />
                                        </a>
                                    ) : null}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <div className="absolute bottom-28 left-1/2 z-20 flex -translate-x-1/2 gap-3 md:bottom-12">
                            <button
                                type="button"
                                data-cursor-hover
                                aria-label="Previous project"
                                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition hover:scale-105"
                                onClick={goPrevious}
                            >
                                <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                data-cursor-hover
                                aria-label="Next project"
                                className="flex h-12 w-12 items-center justify-center rounded-full text-black shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition hover:scale-105"
                                style={{ backgroundColor: activeProject.accent }}
                                onClick={goNext}
                            >
                                <ArrowRight className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>

                        <div className="absolute bottom-8 left-6 right-6 z-20 grid grid-cols-3 gap-3 sm:left-auto sm:right-[-4rem] sm:top-1/2 sm:w-[34rem] sm:-translate-y-1/2 sm:grid-cols-3 sm:gap-4">
                            {previewProjects.map(({ project, index }, order) => (
                                <motion.button
                                    type="button"
                                    data-cursor-hover
                                    key={project.title}
                                    aria-label={`Open ${project.title}`}
                                    className="group relative h-32 overflow-hidden rounded-2xl bg-black text-left shadow-[18px_22px_45px_rgba(0,0,0,0.24)] outline-none sm:h-64"
                                    initial={{ opacity: 0, x: 80, scale: 0.9 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    transition={{ duration: 0.45, delay: order * 0.06, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -10, scale: 1.035 }}
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <Image
                                        src={project.previewImage ?? project.image}
                                        alt=""
                                        fill
                                        sizes="(min-width: 640px) 180px, 33vw"
                                        className="object-cover transition duration-500 group-hover:scale-110"
                                    />
                                    <span className="absolute inset-0 bg-gradient-to-t from-black/62 via-black/0 to-transparent" />
                                    <span className="absolute bottom-3 left-3 right-3 text-sm font-black leading-tight text-white sm:text-base">
                                        {project.title}
                                    </span>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    )
}
