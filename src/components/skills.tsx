"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import type { IconType } from "react-icons"
import {
    SiBootstrap,
    SiCss,
    SiFigma,
    SiGithub,
    SiGitlab,
    SiHtml5,
    SiJavascript,
    SiMongodb,
    SiNestjs,
    SiNextdotjs,
    SiNodedotjs,
    SiPostman,
    SiReact,
    SiRender,
    SiTailwindcss,
    SiTypescript,
    SiVercel,
} from "react-icons/si"
import { VscVscode } from "react-icons/vsc"

type SkillKey = {
    label: string
    name: string
    category: "frontend" | "backend" | "other"
    level: number
    color: string
    description: string
    icon?: IconType
    image?: string
    text?: string
}

const filters = [
    { label: "All Skills", value: "all" },
    { label: "Frontend", value: "frontend" },
    { label: "Backend", value: "backend" },
    { label: "Tools/Apps", value: "other" },
] as const

type FilterValue = (typeof filters)[number]["value"]

const skillRows: SkillKey[][] = [
    [
        { label: "React", name: "ReactJS", category: "frontend", level: 95, color: "#22d3ee", icon: SiReact, description: "Build interactive UI with reusable components, hooks, state handling, and smooth client-side experiences." },
        { label: "Next", name: "NextJS", category: "frontend", level: 93, color: "#f8fafc", icon: SiNextdotjs, text: "#0f172a", description: "Create production React apps with routing, server rendering, metadata, API routes, and deployment-ready performance." },
        { label: "TW", name: "TailwindCSS", category: "frontend", level: 92, color: "#14b8a6", icon: SiTailwindcss, description: "Style interfaces quickly with utility classes, responsive layouts, design tokens, and consistent visual systems." },
        { label: "BS", name: "Bootstrap", category: "frontend", level: 86, color: "#7c3aed", icon: SiBootstrap, description: "Use ready-made layout grids, components, and responsive patterns for fast interface prototyping." },
    ],
    [
        { label: "HTML", name: "HTML5", category: "frontend", level: 92, color: "#ef4444", icon: SiHtml5, description: "Structure accessible web pages with semantic markup, forms, media, and SEO-friendly document flow." },
        { label: "CSS", name: "CSS3", category: "frontend", level: 90, color: "#2563eb", icon: SiCss, description: "Craft responsive layouts, animation, visual hierarchy, and polished browser-native styling." },
        { label: "UI", name: "UI/UX", category: "frontend", level: 88, color: "#a855f7", icon: SiFigma, description: "Design user flows, wireframes, interface states, and practical experiences that are clear to use." },
        { label: "JS", name: "Javascript", category: "frontend", level: 90, color: "#f97316", icon: SiJavascript, description: "Add dynamic behavior, data handling, browser APIs, and application logic across the frontend." },
        { label: "TS", name: "Typescript", category: "frontend", level: 88, color: "#0ea5e9", icon: SiTypescript, description: "Write safer JavaScript with typed models, predictable contracts, and maintainable application code." },
    ],
    [
        { label: "Node", name: "NodeJS", category: "backend", level: 86, color: "#15803d", icon: SiNodedotjs, description: "Build backend services, REST APIs, scripts, authentication flows, and server-side integrations." },
        { label: "Nest", name: "NestJS", category: "backend", level: 80, color: "#e11d48", icon: SiNestjs, description: "Create structured Node.js APIs with modules, controllers, providers, validation, and scalable architecture." },
        { label: "VS", name: "Visual Studio Code", category: "other", level: 94, color: "#0ea5e9", icon: VscVscode, description: "Primary editor for coding, debugging, extensions, formatting, Git workflow, and project navigation." },
        { label: "Cursor", name: "Cursor", category: "other", level: 90, color: "#f8fafc", image: "/icons/cursor.png", text: "#0f172a", description: "AI-assisted coding editor used for faster refactoring, code generation, and understanding project context." },
        { label: "Mongo", name: "MongoDB", category: "other", level: 84, color: "#16a34a", icon: SiMongodb, description: "Store flexible document data, model collections, query records, and support app features with NoSQL data." },
    ],
    [
        { label: "Atlas", name: "MongoAtlas", category: "other", level: 82, color: "#10b981", icon: SiMongodb, description: "Manage hosted MongoDB clusters, connection strings, backups, monitoring, and cloud database access." },
        { label: "GH", name: "Github", category: "other", level: 90, color: "#111827", icon: SiGithub, description: "Manage repositories, branches, pull requests, issues, releases, and collaborative source control." },
        { label: "GL", name: "Gitlab", category: "other", level: 82, color: "#f97316", icon: SiGitlab, description: "Handle Git repositories, merge requests, CI/CD pipelines, and team development workflows." },
        { label: "POST", name: "Postman", category: "other", level: 86, color: "#fb923c", icon: SiPostman, description: "Test APIs, organize request collections, inspect responses, and document backend endpoints." },
        { label: "Vercel", name: "Vercel", category: "other", level: 88, color: "#f8fafc", icon: SiVercel, text: "#0f172a", description: "Deploy Next.js apps, preview branches, manage domains, environment variables, and production builds." },
    ],
    [
        { label: "Render", name: "Render", category: "other", level: 78, color: "#22d3ee", icon: SiRender, description: "Deploy web services, static sites, background workers, and backend apps with simple cloud hosting." },
        { label: "v0", name: "v0", category: "other", level: 85, color: "#f8fafc", image: "/icons/v0.png", text: "#0f172a", description: "Generate and iterate UI ideas quickly from prompts, then adapt the output into production code." },
    ],
]

function SkillTile({
    active,
    index,
    onSelect,
    skill,
}: {
    active: boolean
    index: number
    onSelect: (skill: SkillKey) => void
    skill: SkillKey
}) {
    return (
        <motion.button
            type="button"
            data-cursor-hover
            aria-pressed={active}
            className="group relative h-20 w-20 text-left outline-none sm:h-24 sm:w-24"
            initial={{ opacity: 0, y: 44, rotateX: 55 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: index * 0.035, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -18, rotateX: -12, rotateY: 10, scale: 1.08 }}
            onClick={() => onSelect(skill)}
        >
            <div
                className={`skill-key relative h-full w-full rounded-2xl border p-[2px] shadow-[0_18px_30px_rgba(0,0,0,0.55)] transition ${
                    active ? "border-white/80 shadow-[0_0_34px_rgba(34,211,238,0.55)]" : "border-white/10"
                }`}
                style={{
                    background: `linear-gradient(145deg, ${skill.color}, rgba(255,255,255,0.14))`,
                    animationDelay: `${index * 110}ms`,
                }}
            >
                <div
                    className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[0.9rem] border border-white/15 bg-black/10"
                    style={{ color: skill.text ?? "#ffffff" }}
                >
                    <span className="absolute inset-x-3 top-2 h-px bg-white/35" />
                    {skill.image ? (
                        <Image src={skill.image} alt="" width={42} height={42} className="h-10 w-10 object-contain" />
                    ) : skill.icon ? (
                        <skill.icon className="text-3xl sm:text-4xl" aria-hidden="true" />
                    ) : (
                        <span className="text-center text-base font-black uppercase leading-none tracking-normal sm:text-lg">
                            {skill.label}
                        </span>
                    )}
                    <span className="mt-2 max-w-full px-2 text-center text-[9px] font-semibold uppercase tracking-[0.14em] opacity-75">
                        {skill.level}%
                    </span>
                </div>
            </div>
        </motion.button>
    )
}

function categoryLabel(category: SkillKey["category"]) {
    if (category === "frontend") return "Frontend"
    if (category === "backend") return "Backend"
    return "Tools/Apps"
}

function SkillProgress({ active, skill, index }: { active: boolean; skill: SkillKey; index: number }) {
    return (
        <motion.button
            type="button"
            data-cursor-hover
            className={`group rounded-lg border p-4 text-left transition ${
                active
                    ? "border-cyan-300/70 bg-white/[0.045] shadow-[0_0_34px_rgba(34,211,238,0.18)]"
                    : "border-white/0 hover:border-white/10 hover:bg-white/[0.025]"
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: index * 0.04 }}
        >
            <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-bold text-white sm:text-xl">{skill.name}</h3>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/65">
                    {categoryLabel(skill.category)}
                </span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    animate={active ? { width: [`${Math.max(skill.level - 10, 0)}%`, `${skill.level}%`] } : undefined}
                    viewport={{ once: false }}
                    transition={{ duration: active ? 0.55 : 0.9, ease: "easeOut" }}
                />
            </div>
            <div className="mt-2 flex items-center justify-between text-sm text-white/45">
                <span>{active ? "Selected from keyboard" : "Click a key to select"}</span>
                <span className="text-base font-bold text-white/65">{skill.level}%</span>
            </div>
        </motion.button>
    )
}

export function Skills() {
    let tileIndex = 0
    const allSkills = useMemo(() => skillRows.flat(), [])
    const [activeFilter, setActiveFilter] = useState<FilterValue>("all")
    const [activeSkill, setActiveSkill] = useState<SkillKey>(allSkills[0])

    const filteredSkills = allSkills.filter((skill) => activeFilter === "all" || skill.category === activeFilter)
    const displayedSkills = [
        ...filteredSkills.filter((skill) => skill.name === activeSkill.name),
        ...filteredSkills.filter((skill) => skill.name !== activeSkill.name),
    ]

    function handleSelectSkill(skill: SkillKey) {
        setActiveSkill(skill)
        setActiveFilter(skill.category)
    }

    return (
        <section id="skills" className="relative min-h-screen overflow-hidden bg-[#050505] px-5 py-24 text-white sm:px-10">
            <div className="pointer-events-none absolute inset-0 opacity-[0.11] [background-image:radial-gradient(circle,rgba(255,255,255,0.65)_1px,transparent_1px)] [background-size:70px_70px]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_58%_44%,rgba(37,99,235,0.18),transparent_28%),radial-gradient(circle_at_52%_58%,rgba(20,184,166,0.1),transparent_34%),linear-gradient(180deg,#050505,#020202)]" />

            <div className="relative z-10 mx-auto grid max-w-7xl gap-8">
                <motion.div
                    className="max-w-3xl"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="font-mono text-sm uppercase tracking-[0.42em] text-white/45">
                        Front End / Back End / Tools & Apps.
                    </p>
                    <h2 className="mt-7 font-serif text-[clamp(4.2rem,11vw,9.5rem)] font-black uppercase leading-[0.78] text-white">
                        Skills
                    </h2>
                    <p className="mt-5 max-w-sm font-mono text-xs uppercase tracking-[0.18em] text-white/42">
                        Hint: press a logo key to update the panel.
                    </p>
                </motion.div>

                <div className="grid min-h-[650px] gap-6 xl:grid-cols-[0.92fr_1.08fr]">
                    <div className="relative min-h-[680px] overflow-hidden rounded-2xl border border-white/10 bg-black/35 p-5 sm:p-8 xl:min-h-[640px]">
                        <motion.div
                            key={activeSkill.name}
                            className="relative z-20 max-w-[22rem] -rotate-[5deg] rounded-xl border border-white/10 bg-black/55 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur sm:-rotate-[8deg] sm:p-6"
                            initial={{ opacity: 0, rotate: -18, x: -30, y: 12 }}
                            animate={{ opacity: 1, rotate: -8, x: 0, y: 0 }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-white/38">
                                {categoryLabel(activeSkill.category)}
                            </p>
                            <h3 className="mt-3 text-3xl font-black leading-tight text-white md:text-4xl">
                                {activeSkill.name}
                            </h3>
                            <p className="mt-5 text-base leading-8 text-white/70">{activeSkill.description}</p>
                        </motion.div>

                        <div className="relative mt-8 h-[390px] sm:mt-10 sm:h-[430px] lg:h-[460px]">
                            <div className="absolute left-1/2 top-1/2 w-max -translate-x-1/2 -translate-y-1/2 scale-[0.66] sm:scale-[0.82] lg:scale-90 xl:scale-95">
                                <motion.div
                                    className="skills-board-wrap w-max"
                                    initial={{ opacity: 0, scale: 0.72 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <div className="skills-board-iso grid gap-3">
                                        {skillRows.map((row, rowIndex) => (
                                            <div className="flex gap-3" key={rowIndex}>
                                                <div style={{ width: `${rowIndex * 26}px` }} />
                                                {row.map((skill) => {
                                                    tileIndex += 1
                                                    return (
                                                        <SkillTile
                                                            active={activeSkill.name === skill.name}
                                                            index={tileIndex}
                                                            key={`${rowIndex}-${skill.name}`}
                                                            onSelect={handleSelectSkill}
                                                            skill={skill}
                                                        />
                                                    )
                                                })}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        className="rounded-2xl border border-white/10 bg-black/45 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur md:p-6"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <p className="font-mono text-xs uppercase tracking-[0.28em] text-white/40">Selected</p>
                                <h3 className="mt-2 text-3xl font-black text-white">{activeSkill.name}</h3>
                            </div>
                            <div className="flex w-fit rounded-md border border-white/15 bg-white/[0.035] p-1">
                                {filters.map((filter) => (
                                    <button
                                        type="button"
                                        data-cursor-hover
                                        className={`rounded px-3 py-2 text-xs font-bold transition sm:px-4 sm:text-sm ${
                                            activeFilter === filter.value
                                                ? "bg-gradient-to-r from-violet-500 to-cyan-500 text-white"
                                                : "text-white/45 hover:text-white"
                                        }`}
                                        key={filter.value}
                                        onClick={() => setActiveFilter(filter.value)}
                                    >
                                        {filter.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="max-h-[520px] overflow-y-auto pr-2 [scrollbar-color:rgba(34,211,238,0.45)_rgba(255,255,255,0.08)] [scrollbar-width:thin]">
                            <div className="grid gap-4">
                                {displayedSkills.map((skill, index) => (
                                    <SkillProgress active={activeSkill.name === skill.name} index={index} key={skill.name} skill={skill} />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
