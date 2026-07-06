"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useSpring, useInView } from "framer-motion"

const timelineEvents = [
    {
        period: "09/2021 - 05/2025",
        title: "Software Engineering - Can Tho FPT University",
        description: "Studied software engineering with a GPA of 3.2 and built a foundation in programming and teamwork.",
        details:
            "Focused on C++, Java, JavaScript, TypeScript, OOP, databases, Java Web, MVC, Servlet, presentation skills, group work, and social activities.",
    },
    {
        period: "05/2023 - 07/2023",
        title: "Intern Front-End Developer - Vinaphone Office",
        description: "Worked on front-end interface tasks and practiced production-oriented UI development.",
        details:
            "Used HTML5, CSS3, Bootstrap, JavaScript, Tailwind CSS, and Figma to improve UI/UX, page structure, responsiveness, and display performance.",
    },
    {
        period: "01/2024 - 04/2024",
        title: "Intern Front-End Developer - FPT Software Ho Chi Minh",
        description: "Built front-end features with React and TypeScript while improving code quality and documentation habits.",
        details:
            "Practiced React, TypeScript, UI optimization, backend API integration, async JavaScript, error handling, project setup notes, architecture notes, and reasonable code comments.",
    },
    {
        period: "06/2025 - Now",
        title: "Fresher Fullstack Developer - FB Network",
        description: "Joined real projects as a fullstack developer and expanded from front-end work into backend and data processing.",
        details:
            "Worked with Next.js, TypeScript, JavaScript, GitHub, GitLab, Vercel, NestJS, data analysis, e-commerce data processing, and Lark for project management.",
    },
    {
        period: "01/2026 - Now",
        title: "MSBA - FPT School of Business & Technology",
        description: "Started a Master of Science in Business Analytics to connect business thinking with technology and data.",
        details:
            "Studying applied statistics, data visualization, machine learning, data management, business problem framing, presentations, teamwork, and strategic thinking.",
    },
]

export default function Timeline() {
    const [expandedEvent, setExpandedEvent] = useState<number | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    return (
        <section ref={containerRef} className="overflow-hidden bg-black py-24 text-white">
            <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
                <motion.div
                    className="mb-20 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl font-black tracking-normal text-white sm:text-5xl">My Journey</h2>
                    <p className="mt-6 text-lg text-white/75 sm:text-xl">
                        Education and work experience.
                    </p>
                </motion.div>

                <div className="relative pb-8">
                    <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/20 md:block" />
                    <motion.div
                        className="absolute left-1/2 top-0 hidden h-full w-px origin-top -translate-x-1/2 bg-white md:block"
                        style={{ scaleY }}
                    />

                    {timelineEvents.map((event, index) => (
                        <TimelineEvent
                            key={`${event.period}-${event.title}`}
                            event={event}
                            index={index}
                            isExpanded={expandedEvent === index}
                            onToggle={() => setExpandedEvent(expandedEvent === index ? null : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

function TimelineEvent({
    event,
    index,
    isExpanded,
    onToggle,
}: {
    event: (typeof timelineEvents)[number]
    index: number
    isExpanded: boolean
    onToggle: () => void
}) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.5 })

    return (
        <motion.div
            ref={ref}
            className={`relative mb-20 flex w-full flex-col gap-6 md:min-h-[180px] md:flex-row md:items-center md:justify-between ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
        >
            <div className="hidden md:block md:w-5/12" />
            <div className="z-20 hidden md:flex md:w-2/12 md:items-center md:justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_0_40px_rgba(255,255,255,0.18)]">
                    <div className="h-6 w-6 rounded-full bg-black" />
                </div>
            </div>
            <motion.div
                className="w-full cursor-pointer md:w-5/12"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={onToggle}
            >
                <div className="rounded-lg border border-white/75 bg-black p-6 shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
                    <span className="text-xl font-black text-white">{event.period}</span>
                    <h3 className="mb-3 mt-2 text-2xl font-black leading-tight text-white">{event.title}</h3>
                    <p className="text-lg leading-8 text-white/85">{event.description}</p>
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="mt-4 border-t border-white/20 pt-4 text-base leading-7 text-white/65">{event.details}</p>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    )
}
