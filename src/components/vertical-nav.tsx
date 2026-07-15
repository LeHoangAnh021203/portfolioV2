"use client"

import { FaFacebookF, FaLinkedinIn } from "react-icons/fa"
import { SiGithub, SiGmail, SiZalo } from "react-icons/si"

const socialLinks = [
    {
        href: "https://zalo.me/0342988398",
        label: "Zalo 0342988398",
        Icon: SiZalo,
        className: "bg-white text-[#0068ff] shadow-[0_8px_18px_rgba(0,104,255,0.25)]",
        iconClassName: "h-5 w-5",
    },
    {
        href: "https://www.facebook.com/hoanganh.lee.5205",
        label: "Facebook",
        Icon: FaFacebookF,
        className: "bg-[#1877f2] text-white shadow-[0_8px_18px_rgba(24,119,242,0.28)]",
        iconClassName: "h-5 w-5",
    },
    {
        href: "https://www.linkedin.com/in/hoanganhle0212/",
        label: "LinkedIn",
        Icon: FaLinkedinIn,
        className: "bg-[#0a66c2] text-white shadow-[0_8px_18px_rgba(10,102,194,0.28)]",
        iconClassName: "h-5 w-5",
    },
    {
        href: "https://github.com/repos",
        label: "GitHub",
        Icon: SiGithub,
        className: "bg-[#181717] text-white shadow-[0_8px_18px_rgba(0,0,0,0.24)]",
        iconClassName: "h-5 w-5",
    },
    {
        href: "mailto:hoanganhle0203@gmail.com",
        label: "Gmail",
        Icon: SiGmail,
        className: "bg-transparent text-[#ea4335]",
        iconClassName: "h-8 w-8",
    },
]

export function VerticalNav() {
    return (
        <nav
            aria-label="Social links"
            className="fixed left-3 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center rounded-[2rem] border border-white/10 bg-[#1b2636]/92 px-3 py-8 shadow-[0_22px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:left-5 md:left-7"
        >
            <div className="flex flex-col items-center gap-7">
                {socialLinks.map(({ href, label, Icon, className, iconClassName }) => (
                    <a
                        key={label}
                        data-cursor-hover
                        href={href}
                        aria-label={label}
                        title={label}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noreferrer" : undefined}
                        className={`flex h-10 w-10 items-center justify-center rounded-full transition hover:scale-110 ${className}`}
                    >
                        <Icon className={iconClassName} aria-hidden="true" />
                    </a>
                ))}
            </div>
        </nav>
    )
}
