"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { CalendarDays, Mail, MapPin, Phone, UserRound } from "lucide-react"
import { FaLinkedin } from "react-icons/fa"
import { SiGithub } from "react-icons/si"

export function Card() {
    const [rotation, setRotation] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const [isPaused, setIsPaused] = useState(false)

    useEffect(() => {
        const interval = window.setInterval(() => {
            if (!isPaused) {
                const speed = isHovered ? 0.5 : 1
                setRotation((prev) => prev + speed)
            }
        }, 16)

        return () => window.clearInterval(interval)
    }, [isHovered, isPaused])

    function stopCardToggle(event: React.MouseEvent<HTMLAnchorElement>) {
        event.stopPropagation()
    }

    return (
        <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black">
            <div className="relative scale-[0.45] sm:scale-[0.62] md:scale-[0.82] lg:scale-100" style={{ perspective: "1400px" }}>
                <div
                    className="relative cursor-pointer"
                    data-cursor-hover
                    style={{
                        width: "820px",
                        height: "420px",
                        transformStyle: "preserve-3d",
                        transform: `rotateX(6deg) rotateZ(2deg) rotateY(${rotation}deg)`,
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => setIsPaused(!isPaused)}
                >
                    <div
                        className="absolute inset-0 select-text rounded-xl bg-white px-8 py-8 text-[#333333] shadow-2xl"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        <div className="grid h-full grid-cols-[1fr_150px] gap-8">
                            <div className="flex min-w-0 flex-col justify-center">
                                <h2 className="text-[54px] font-black uppercase leading-none tracking-normal text-[#0b7440]">
                                    Le Hoang Anh
                                </h2>
                                <p className="mt-3 text-[26px] font-bold tracking-[0.08em] text-[#6f6f6f]">
                                    Fullstack Developer
                                </p>

                                <div className="mt-7 grid grid-cols-[220px_minmax(0,1fr)] gap-x-8 gap-y-4 text-[19px] leading-none text-[#363636]">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <CalendarDays className="h-6 w-6 shrink-0 text-black" strokeWidth={1.8} />
                                        <span>02/12/2003</span>
                                    </div>
                                    <div className="flex min-w-0 items-center gap-3">
                                        <MapPin className="h-6 w-6 shrink-0 text-black" strokeWidth={2} />
                                        <span>Ho Chi Minh</span>
                                    </div>
                                    <div className="flex min-w-0 items-center gap-3">
                                        <UserRound className="h-6 w-6 shrink-0 text-black" strokeWidth={1.8} />
                                        <span>Male</span>
                                    </div>
                                    <div className="flex min-w-0 items-center gap-3">
                                        <SiGithub className="h-6 w-6 shrink-0 text-black" aria-hidden="true" />
                                        <a
                                            className="min-w-0 truncate underline underline-offset-2"
                                            href="https://github.com/LeHoangAnh021203"
                                            rel="noreferrer"
                                            target="_blank"
                                            onClick={stopCardToggle}
                                        >
                                            github.com/LeHoangAnh021203
                                        </a>
                                    </div>
                                    <div className="flex min-w-0 items-center gap-3">
                                        <Phone className="h-6 w-6 shrink-0 text-black" strokeWidth={1.8} />
                                        <a href="tel:0342988398" onClick={stopCardToggle}>
                                            0342 988 398
                                        </a>
                                    </div>
                                    <div className="flex min-w-0 items-center gap-3">
                                        <Mail className="h-6 w-6 shrink-0 text-black" strokeWidth={1.8} />
                                        <a
                                            className="min-w-0 truncate underline underline-offset-2"
                                            href="mailto:hoanganhle.work.dev@gmail.com"
                                            onClick={stopCardToggle}
                                        >
                                            hoanganhle.work.dev@gmail.com
                                        </a>
                                    </div>
                                    <div className="col-start-2 flex min-w-0 items-center gap-3">
                                        <FaLinkedin className="h-5 w-5 shrink-0 text-black" aria-hidden="true" />
                                        <a
                                            className="min-w-0 truncate underline underline-offset-2"
                                            href="https://www.linkedin.com/in/hoanganhle0212"
                                            rel="noreferrer"
                                            target="_blank"
                                            onClick={stopCardToggle}
                                        >
                                            linkedIn.com/in/hoanganhle0212
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-center">
                                <Image
                                    src="/avt.jpg"
                                    alt="Le Hoang Anh"
                                    width={145}
                                    height={145}
                                    className="h-[145px] w-[145px] rounded-full object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    <div
                        className="absolute inset-0 select-text rounded-xl bg-white px-9 py-9 text-[#6f6f6f] shadow-2xl"
                        style={{
                            backfaceVisibility: "hidden",
                            transform: "rotateY(180deg)",
                        }}
                    >
                        <h2 className="text-3xl font-black uppercase leading-none text-black">Targets:</h2>
                        <ul className="mt-3 list-disc space-y-2 pl-8 text-[25px] leading-tight">
                            <li>
                                Passionate developer transitioning from a strong 3-year Front-End foundation to a
                                Full-Stack role over the past year. Equipped with fluent English communication and
                                hands-on experience in modern stacks-including MongoDB and Vercel deployments-I am
                                looking for opportunities to engage in impactful real-world projects. I thrive in
                                collaborative environments where I can contribute actively and push my personal
                                development further.
                            </li>
                            <li>Good at English communication.</li>
                            <li>3 years experience in front - end developer .</li>
                            <li>1 year experience in fullstack developer.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 text-center font-mono text-sm text-white/40">
                <p>Hover to slow down · Click to {isPaused ? "resume" : "pause"} · Click a link to visit it</p>
            </div>
        </section>
    )
}
