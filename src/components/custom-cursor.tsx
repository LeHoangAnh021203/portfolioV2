"use client"

import { useEffect, useRef } from "react"

export function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)
    const frameRef = useRef<number | null>(null)
    const positionRef = useRef({ x: 0, y: 0 })
    const hoveringRef = useRef(false)
    const visibleRef = useRef(false)

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) {
            return
        }

        const render = () => {
            frameRef.current = null

            const { x, y } = positionRef.current
            const dot = dotRef.current
            const ring = ringRef.current
            const visibleOpacity = visibleRef.current ? "1" : "0"

            if (dot) {
                dot.style.opacity = visibleOpacity
                dot.style.transform = `translate3d(${x - 6}px, ${y - 6}px, 0) scale(${hoveringRef.current ? 0 : 1})`
            }

            if (ring) {
                ring.style.opacity = visibleOpacity
                ring.style.transform = `translate3d(${x - 24}px, ${y - 24}px, 0) scale(${hoveringRef.current ? 1 : 0})`
            }
        }

        const scheduleRender = () => {
            if (frameRef.current === null) {
                frameRef.current = window.requestAnimationFrame(render)
            }
        }

        const handleMouseMove = (event: MouseEvent) => {
            positionRef.current = { x: event.clientX, y: event.clientY }
            visibleRef.current = true
            scheduleRender()
        }

        const handleMouseEnter = () => {
            visibleRef.current = true
            scheduleRender()
        }

        const handleMouseLeave = () => {
            visibleRef.current = false
            scheduleRender()
        }

        const updateHoverState = (event: MouseEvent, isHovering: boolean) => {
            const target = event.target as HTMLElement
            if (target.closest("a, button, [data-cursor-hover]")) {
                hoveringRef.current = isHovering
                scheduleRender()
            }
        }

        const handleHoverStart = (event: MouseEvent) => updateHoverState(event, true)
        const handleHoverEnd = (event: MouseEvent) => updateHoverState(event, false)

        window.addEventListener("mousemove", handleMouseMove, { passive: true })
        document.addEventListener("mouseenter", handleMouseEnter)
        document.addEventListener("mouseleave", handleMouseLeave)
        document.addEventListener("mouseover", handleHoverStart)
        document.addEventListener("mouseout", handleHoverEnd)

        return () => {
            if (frameRef.current !== null) {
                window.cancelAnimationFrame(frameRef.current)
            }

            window.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseenter", handleMouseEnter)
            document.removeEventListener("mouseleave", handleMouseLeave)
            document.removeEventListener("mouseover", handleHoverStart)
            document.removeEventListener("mouseout", handleHoverEnd)
        }
    }, [])

    return (
        <>
            <div
                ref={dotRef}
                className="fixed left-0 top-0 z-[10000] h-3 w-3 rounded-full bg-white opacity-0 mix-blend-difference transition-transform duration-75 ease-out pointer-events-none"
            />
            <div
                ref={ringRef}
                className="fixed left-0 top-0 z-[10000] h-12 w-12 rounded-full border border-white opacity-0 mix-blend-difference transition-transform duration-100 ease-out pointer-events-none"
            />
        </>
    )
}
