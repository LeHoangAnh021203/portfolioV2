"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, ExternalLink } from "lucide-react"

const linkedinProfile = "https://www.linkedin.com/in/hoanganhle0212/"
const diplomaIcon = "https://img.icons8.com/?size=100&id=Y87spUd4rez7&format=png&color=FFFFFF"
const uvaLogo = "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-university-assets.s3.amazonaws.com/f2/9b83af4f4a200e807feeb2969f02c9/uva_logo.png?auto=format%2Ccompress&dpr=2&w=80&h=80"
const productAnalyticsPreview = "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~W5KH3I2VPZYP/CERTIFICATE_LANDING_PAGE~W5KH3I2VPZYP.jpeg"

const certifications = [
    {
        title: "Product Analytics and AI",
        issuer: "University of Virginia",
        issued: "Issued Apr 2026",
        credentialId: "W5KH3I2VPZYP",
        credentialUrl: "https://www.coursera.org/account/accomplishments/verify/W5KH3I2VPZYP",
        logo: uvaLogo,
        previewImage: productAnalyticsPreview,
        skills: "Agile Software Development, Demand Planning and +10 skills",
    },
    {
        title: "Hypothesis-Driven Development",
        issuer: "University of Virginia",
        issued: "Issued Mar 2026",
        credentialId: "ZPUXJET6L7UE",
        credentialUrl: linkedinProfile,
        skills: "Product Testing, DevOps and +9 skills",
    },
]

function IssuerLogo({ src }: { src?: string }) {
    return (
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-[#ef7300] sm:h-20 sm:w-20">
            <Image src={src ?? diplomaIcon} alt="" width={64} height={64} className="h-12 w-12 object-contain sm:h-16 sm:w-16" />
        </div>
    )
}

export function Certifications() {
    return (
        <section id="certifications" className="bg-[#e8e8e6] px-4 pb-24 text-[#1f1f1f] sm:px-8 lg:pb-32">
            <div className="mx-auto max-w-7xl">
                <motion.div
                    className="overflow-hidden rounded-2xl border border-black/12 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.08)]"
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="px-6 pb-8 pt-8 sm:px-10 sm:pt-10">
                        <h2 className="text-3xl font-black tracking-normal sm:text-4xl">Licenses & certifications (13)</h2>
                    </div>

                    <div>
                        {certifications.map((cert, index) => (
                            <article key={cert.credentialId} className="px-6 sm:px-10">
                                <div className="grid gap-4 py-8 sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-5">
                                    <IssuerLogo src={cert.logo} />
                                    <div className="min-w-0">
                                        <h3 className="text-2xl font-black leading-tight tracking-normal">{cert.title}</h3>
                                        <p className="mt-1 text-xl leading-7 text-black/90">{cert.issuer}</p>
                                        <p className="mt-2 text-lg leading-7 text-black/58">{cert.issued}</p>
                                        <p className="text-lg leading-7 text-black/58">Credential ID {cert.credentialId}</p>

                                        {cert.previewImage ? (
                                            <a
                                                data-cursor-hover
                                                href={cert.credentialUrl}
                                                rel="noreferrer"
                                                target="_blank"
                                                className="mt-6 block max-w-xl overflow-hidden rounded-lg border border-black/12 bg-black/[0.03] transition hover:border-black/28"
                                                aria-label={`Open credential preview for ${cert.title}`}
                                            >
                                                <Image
                                                    src={cert.previewImage}
                                                    alt={`${cert.title} certificate preview`}
                                                    width={960}
                                                    height={540}
                                                    className="h-auto w-full object-cover"
                                                />
                                            </a>
                                        ) : null}

                                        <a
                                            data-cursor-hover
                                            href={cert.credentialUrl}
                                            rel="noreferrer"
                                            target="_blank"
                                            className="mt-7 inline-flex items-center gap-2 rounded-full border-2 border-black/70 px-5 py-2.5 text-lg font-black text-black/74 transition hover:border-black hover:text-black"
                                        >
                                            Show credential
                                            <ExternalLink className="h-5 w-5" aria-hidden="true" />
                                        </a>

                                        <div className="mt-7 flex items-center gap-2 text-lg font-black leading-7 text-black">
                                            <span className="h-4 w-4 rotate-45 border-2 border-black/72" aria-hidden="true" />
                                            <span>{cert.skills}</span>
                                        </div>
                                    </div>
                                </div>
                                {index < certifications.length - 1 ? <div className="border-t border-black/12" /> : null}
                            </article>
                        ))}
                    </div>

                    <a
                        data-cursor-hover
                        href={linkedinProfile}
                        rel="noreferrer"
                        target="_blank"
                        className="flex items-center justify-center gap-2 border-t border-black/12 px-6 py-7 text-xl font-black text-black/76 transition hover:bg-black/[0.04] hover:text-black"
                    >
                        Show all 13 licenses
                        <ArrowRight className="h-6 w-6" aria-hidden="true" />
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
