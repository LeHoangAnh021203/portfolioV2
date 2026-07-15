"use client"

import { FormEvent, useState } from "react"
import { motion } from "framer-motion"
import { Building2, Mail, MapPin, Paperclip, Phone, Send, Upload } from "lucide-react"

export function Contact() {
    const [selectedFileName, setSelectedFileName] = useState("")
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
    const [statusMessage, setStatusMessage] = useState("")

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const form = event.currentTarget
        const formData = new FormData(form)

        setStatus("sending")
        setStatusMessage("Sending message...")

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                body: formData,
            })
            const data = (await response.json()) as { message?: string }

            if (!response.ok) {
                throw new Error(data.message || "Unable to send message.")
            }

            form.reset()
            setSelectedFileName("")
            setStatus("success")
            setStatusMessage("Message sent successfully.")
        } catch (error) {
            setStatus("error")
            setStatusMessage(error instanceof Error ? error.message : "Unable to send message.")
        }
    }

    return (
        <section
            id="contact"
            className="relative min-h-screen overflow-hidden bg-[#111226] px-5 pb-10 pt-28 text-white sm:px-8 lg:px-12"
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_48%_28%,rgba(95,79,255,0.3),transparent_26%),radial-gradient(circle_at_56%_48%,rgba(244,63,190,0.16),transparent_24%),linear-gradient(180deg,#121428,#17172d_48%,#101224)]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:74px_74px]" />
            <div className="pointer-events-none absolute left-1/2 top-[46%] h-px w-[78%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="pointer-events-none absolute bottom-32 left-1/2 h-24 w-[58%] -translate-x-1/2 rounded-full bg-violet-400/16 blur-3xl" />

            <div className="relative z-10 mx-auto flex min-h-[calc(100vh-9.5rem)] max-w-7xl flex-col justify-center">
                <div className="mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-[1.08fr_0.92fr]">
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-120px" }}
                        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="text-center text-sm font-semibold text-white/86">Contact Info Section</p>
                        <div className="relative overflow-hidden rounded-[1.4rem] border border-white/18 bg-white/[0.09] p-7 shadow-[0_0_40px_rgba(168,85,247,0.16)] backdrop-blur-xl sm:p-9">
                            <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-violet-300/20 blur-3xl" />
                            <h2 className="text-4xl font-black leading-none tracking-normal sm:text-5xl">Get in Touch</h2>
                            <p className="mt-5 max-w-md text-base font-medium leading-6 text-white/82 sm:text-lg">
                                We are here to discuss your project and bring your ideas to life with premium design and development.
                            </p>

                            <div className="mt-8 space-y-4 text-sm font-medium text-white/78 sm:text-base">
                                <a data-cursor-hover href="mailto:hoanganhle.work.dev@gmail.com" className="flex items-center gap-4 transition hover:text-white">
                                    <Mail className="h-5 w-5 text-cyan-200" aria-hidden="true" />
                                    hoanganhle.work.dev@gmail.com
                                </a>
                                <p className="flex items-center gap-4">
                                    <MapPin className="h-5 w-5 text-cyan-200" aria-hidden="true" />
                                    Ho Chi Minh City, Viet Nam
                                </p>
                                <a data-cursor-hover href="tel:0342988398" className="flex items-center gap-4 transition hover:text-white">
                                    <Phone className="h-5 w-5 text-cyan-200" aria-hidden="true" />
                                    0342 988 398
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-120px" }}
                        transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="text-center text-sm font-semibold text-white/86">Contact Form</p>
                        <form
                            onSubmit={handleSubmit}
                            className="relative overflow-hidden rounded-[1.4rem] border border-white/18 bg-white/[0.09] p-6 shadow-[0_0_40px_rgba(168,85,247,0.16)] backdrop-blur-xl sm:p-8"
                        >
                            <div className="pointer-events-none absolute -left-20 -top-20 h-44 w-44 rounded-full bg-white/14 blur-3xl" />
                            <div className="relative space-y-4">
                                <label className="sr-only" htmlFor="contact-email">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        id="contact-email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="Email Address*"
                                        className="h-14 w-full rounded-full border border-white/8 bg-white px-6 pr-12 text-sm font-semibold text-[#17172d] caret-violet-600 outline-none transition placeholder:text-slate-400 focus:border-violet-300/70 focus:bg-white"
                                    />
                                    <Mail className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                                </div>

                                <label className="sr-only" htmlFor="contact-company-name">
                                    Company Name
                                </label>
                                <div className="relative">
                                    <input
                                        id="contact-company-name"
                                        name="companyName"
                                        placeholder="Company Name*"
                                        required
                                        className="h-14 w-full rounded-full border border-white/8 bg-white px-6 pr-12 text-sm font-semibold text-[#17172d] caret-violet-600 outline-none transition placeholder:text-slate-400 focus:border-violet-300/70 focus:bg-white"
                                    />
                                    <Building2 className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                                </div>

                                <div>
                                    <label
                                        data-cursor-hover
                                        htmlFor="contact-attachment"
                                        className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 rounded-full border border-white/8 bg-white/14 px-6 text-sm font-semibold text-white transition hover:bg-white/18"
                                    >
                                        <span className="min-w-0 truncate text-white/76">
                                            {selectedFileName || "Upload file (CV / JD / Brief)"}
                                        </span>
                                        <span className="flex shrink-0 items-center gap-2 text-white/70">
                                            <Paperclip className="h-4 w-4" aria-hidden="true" />
                                            <Upload className="h-4 w-4" aria-hidden="true" />
                                        </span>
                                    </label>
                                    <input
                                        id="contact-attachment"
                                        name="attachment"
                                        type="file"
                                        className="sr-only"
                                        accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                                        onChange={(event) => setSelectedFileName(event.currentTarget.files?.[0]?.name ?? "")}
                                    />
                                </div>

                                <button
                                    data-cursor-hover
                                    type="submit"
                                    disabled={status === "sending"}
                                    className="mx-auto flex h-14 w-full max-w-[18rem] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500 px-8 text-base font-black text-white shadow-[0_18px_34px_rgba(217,70,239,0.25)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-65"
                                >
                                    {status === "sending" ? "Sending..." : "Send Message"}
                                    <Send className="h-4 w-4" aria-hidden="true" />
                                </button>

                                {statusMessage ? (
                                    <p
                                        className={`text-center text-sm font-semibold ${
                                            status === "success"
                                                ? "text-emerald-200"
                                                : status === "error"
                                                  ? "text-rose-200"
                                                  : "text-white/70"
                                        }`}
                                    >
                                        {statusMessage}
                                    </p>
                                ) : null}
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
