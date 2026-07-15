"use client"

import { useEffect, useState } from "react"

const navItems = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#journey", label: "Journey" },
    { href: "#works", label: "Works" },
    { href: "#certifications", label: "Certs" },
    { href: "#contact", label: "Contact" },
]

export function SiteHeader() {
    const [activeSection, setActiveSection] = useState(navItems[0].href)

    useEffect(() => {
        const sections = navItems
            .map((item) => document.querySelector<HTMLElement>(item.href))
            .filter((section): section is HTMLElement => Boolean(section))

        if (!sections.length) return

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntry = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

                if (visibleEntry?.target.id) {
                    setActiveSection(`#${visibleEntry.target.id}`)
                }
            },
            {
                rootMargin: "-34% 0px -52% 0px",
                threshold: [0.08, 0.18, 0.32, 0.5],
            },
        )

        sections.forEach((section) => observer.observe(section))

        return () => observer.disconnect()
    }, [])

    return (
        <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#050505]/72 text-white shadow-[0_18px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <div className="mx-auto flex min-h-[72px] w-full max-w-[1920px] flex-col justify-center gap-3 px-5 py-4 sm:px-8 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-8 lg:px-10 lg:py-0">
                <a
                    data-cursor-hover
                    className="inline-flex w-fit items-center gap-3 text-sm font-semibold uppercase tracking-normal text-white/58 transition hover:text-white"
                    href="#home"
                    aria-label="Back to top"
                >
                    Portfolio
                    <span className="h-2 w-2 rounded-full bg-blue-600 shadow-[0_0_18px_rgba(37,99,235,0.75)]" />
                </a>

                <nav
                    aria-label="Primary navigation"
                    className="flex max-w-full items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold uppercase tracking-normal text-white/46 [scrollbar-width:none] sm:gap-3 lg:justify-center lg:overflow-visible lg:pb-0"
                >
                    {navItems.map((item, index) => {
                        const isActive = activeSection === item.href

                        return (
                            <a
                                data-cursor-hover
                                key={item.href}
                                href={item.href}
                                className={`shrink-0 rounded-full border px-3 py-2 transition sm:px-4 ${
                                    isActive
                                        ? "border-blue-500/60 bg-blue-500/10 text-white"
                                        : "border-transparent hover:border-white/15 hover:bg-white/[0.04] hover:text-white"
                                }`}
                            >
                                <span className={isActive ? "text-blue-400" : "text-blue-600"}>
                                    {String(index + 1).padStart(2, "0")}
                                </span>{" "}
                                {item.label}
                            </a>
                        )
                    })}
                </nav>

                <a
                    data-cursor-hover
                    className="hidden w-fit items-center gap-3 justify-self-end text-sm font-semibold uppercase tracking-normal text-white/58 transition hover:text-white md:inline-flex"
                    href="#contact"
                >
                    <span className="h-2 w-2 rounded-full bg-blue-600 shadow-[0_0_18px_rgba(37,99,235,0.75)]" />
                    Available for work
                </a>
            </div>
        </header>
    )
}
