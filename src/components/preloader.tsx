"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"

export default function Preloader() {
    const preloaderRef = useRef<HTMLDivElement>(null)
    const progressBarRef = useRef<HTMLDivElement>(null)
    const avatarRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        gsap.set(avatarRef.current, {
            autoAlpha: 1,
            scale: 1,
            y: 0,
        })
        gsap.set(progressBarRef.current, { width: "0%" })

        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(preloaderRef.current, {
                    autoAlpha: 0,
                    scale: 0.96,
                    duration: 0.7,
                    ease: "power2.inOut",
                    onComplete: () => {
                        if (preloaderRef.current) {
                            preloaderRef.current.style.display = "none"
                        }
                    },
                })
            },
        })

        tl.fromTo(
            avatarRef.current,
            {
                autoAlpha: 0,
                scale: 0.82,
                y: 14,
            },
            {
                autoAlpha: 1,
                scale: 1,
                y: 0,
                duration: 0.75,
                ease: "power2.out",
            },
        )

        tl.to(
            progressBarRef.current,
            {
                width: "100%",
                duration: 2.2,
                ease: "power2.out",
            },
            "-=0.25",
        )

        tl.to({}, { duration: 0.35 })

        return () => {
            tl.kill()
        }
    }, [])

    return (
        <div ref={preloaderRef} className="fixed inset-0 bg-slate-950 z-50 flex flex-col items-center justify-center">
            <div ref={avatarRef} className="mb-7 flex flex-col items-center">
                <div className="relative h-48 w-48 rounded-full bg-gradient-to-br from-blue-400 via-cyan-300 to-fuchsia-500 p-[3px] shadow-[0_0_45px_rgba(34,211,238,0.35)]">
                    <Image
                        src="/avt.jpg"
                        alt="Avatar"
                        width={192}
                        height={192}
                        className="h-full w-full rounded-full border border-white/10 bg-white object-contain p-2"
                    />
                    <span className="absolute -bottom-1 left-1/2 h-2 w-16 -translate-x-1/2 rounded-full bg-cyan-300/70 blur-md" />
                </div>
                <p className="mt-4 text-sm font-medium uppercase tracking-normal text-cyan-100">
                    Le Hoang Anh
                </p>
            </div>

            {/* Progress bar container */}
            <div className="w-80 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div ref={progressBarRef} className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full w-0"></div>
            </div>

            {/* Loading text */}
            <p className="text-slate-400 mt-4 text-sm tracking-normal">Loading Experience...</p>
        </div>
    )
}
