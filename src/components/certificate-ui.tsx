"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { ArrowRight, ChevronDown, ExternalLink, ShieldCheck, X } from "lucide-react"

const linkedinProfile = "https://www.linkedin.com/in/hoanganhle0212/"
const diplomaIcon = "https://img.icons8.com/?size=100&id=Y87spUd4rez7&format=png&color=FFFFFF"
const uvaLogo =
    "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-university-assets.s3.amazonaws.com/f2/9b83af4f4a200e807feeb2969f02c9/uva_logo.png?auto=format%2Ccompress&dpr=2&w=80&h=80"
const freeCodeCampLogo =
    "https://media.licdn.com/dms/image/v2/C4E0BAQGLKj3JHcof0w/company-logo_100_100/company-logo_100_100/0/1630639684997/free_code_camp_logo?e=1784764800&v=beta&t=orpAH9V0fLc6lyQlgFnt8CjfzErOv3xV-Aw_9n7RmTM"
const usydLogo =
    "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-university-assets.s3.amazonaws.com/b6/1c7980e65b11e585a5d1c2a17c7763/USY_Mono_Stacked_Logo_360x360.png?auto=format%2Ccompress&dpr=2&w=80&h=80"
const cuBoulderLogo =
    "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-university-assets.s3.amazonaws.com/f7/06e620f1a111e38144319a9c8ed320/cu-stand-alone_1_.png?auto=format%2Ccompress&dpr=1&w=80&h=80"
const productAnalyticsPreview =
    "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~W5KH3I2VPZYP/CERTIFICATE_LANDING_PAGE~W5KH3I2VPZYP.jpeg"
const hypothesisDrivenPreview =
    "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~ZPUXJET6L7UE/CERTIFICATE_LANDING_PAGE~ZPUXJET6L7UE.jpeg"
const managingAgileTeamPreview =
    "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~ZAZ4LYNDHGTO/CERTIFICATE_LANDING_PAGE~ZAZ4LYNDHGTO.jpeg"
const responsiveWebDesignPreview = "/certificates/responsive-web-design-cert-4.png"
const academicSkillsForUniversitySuccessPreview =
    "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~HJ3685XCT5FE/CERTIFICATE_LANDING_PAGE~HJ3685XCT5FE.jpeg"
const agileMeetsDesignThinkingPreview =
    "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~VZ66H3XGT7V4/CERTIFICATE_LANDING_PAGE~VZ66H3XGT7V4.jpeg"
const computerCommunicationsPreview =
    "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~MKVNHFZ874E5/CERTIFICATE_LANDING_PAGE~MKVNHFZ874E5.jpeg"

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
        skillList: [
            "Agile Software Development",
            "Demand Planning",
            "Customer Analysis",
            "Product Testing",
            "A/B Testing",
            "Data-driven Decision Making",
            "Predictive Analytics",
            "Customer Insight",
            "Product Management",
            "User Experience (UX)",
            "Agile Methodologies",
            "Business Analytics",
        ],
    },
    {
        title: "Hypothesis-Driven Development",
        issuer: "University of Virginia",
        issued: "Issued Mar 2026",
        credentialId: "ZPUXJET6L7UE",
        credentialUrl: "https://www.coursera.org/account/accomplishments/verify/ZPUXJET6L7UE",
        logo: uvaLogo,
        previewImage: hypothesisDrivenPreview,
        skills: "Product Testing, DevOps and +9 skills",
        skillList: [
            "Product Testing",
            "DevOps",
            "User Research",
            "Prototyping",
            "Continuous Delivery (CD)",
            "Usability Testing",
            "Product Innovation",
            "Agile Project Management",
            "Product Development",
            "Lean Methodologies",
            "Agile Methodologies",
        ],
    },
    {
        title: "Managing an Agile Team",
        issuer: "University of Virginia",
        issued: "Issued Apr 2026",
        credentialId: "ZAZ4LYNDHGTO",
        credentialUrl: "https://www.coursera.org/account/accomplishments/verify/ZAZ4LYNDHGTO",
        logo: uvaLogo,
        previewImage: managingAgileTeamPreview,
        skills: "Agile Software Development, Agile Methodologies and +12 skills",
        skillList: [
            "Agile Software Development",
            "Agile Methodologies",
            "Team Leadership",
            "Team Management",
            "Team Building",
            "Team Performance",
            "Backlog Management",
            "Goal Setting",
            "Feature Prioritization",
            "Sales Presentations",
            "Lean Methodologies",
            "Product Innovation",
            "Discussion Facilitation",
            "Kanban",
        ],
    },
    {
        title: "Responsive Web Design",
        issuer: "freeCodeCamp",
        issued: "Issued via freeCodeCamp",
        credentialId: "FCC-RESPONSIVE-WEB-DESIGN",
        credentialUrl: "https://www.freecodecamp.org/certification/lehoanganh/responsive-web-design",
        logo: freeCodeCampLogo,
        previewImage: responsiveWebDesignPreview,
        skills: "Web Design, Web Development and +1 skill",
        skillList: ["Web Design", "Web Development", "Web Interface Design"],
    },
    {
        title: "Academic Skills for University Success Specialization",
        issuer: "The University of Sydney",
        issued: "Issued Aug 2022",
        credentialId: "HJ3685XCT5FE",
        credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/HJ3685XCT5FE",
        logo: usydLogo,
        previewImage: academicSkillsForUniversitySuccessPreview,
        skills: "University Recruitment, Information Technology and +9 skills",
        skillList: [
            "University Recruitment",
            "Information Technology",
            "Problem Solving",
            "Public Speaking",
            "Logical Reasoning",
            "Research Skills",
            "Creative Problem Solving",
            "Editing",
            "Analytical Skills",
            "Proofreading",
            "Deductive Reasoning",
        ],
    },
    {
        title: "Agile Meets Design Thinking",
        issuer: "University of Virginia",
        issued: "Issued Feb 2026",
        credentialId: "VZ66H3XGT7V4",
        credentialUrl: "https://coursera.org/account/accomplishments/verify/VZ66H3XGT7V4",
        logo: uvaLogo,
        previewImage: agileMeetsDesignThinkingPreview,
        skills: "Agile Software Development, Product Innovation and +9 skills",
        skillList: [
            "Agile Software Development",
            "Product Innovation",
            "Discussion Facilitation",
            "Product Development",
            "User Research",
            "Design Thinking",
            "User-centered Design",
            "User Stories",
            "Product Design",
            "Product Management",
            "Personal Development",
        ],
    },
    {
        title: "Computer Communications",
        issuer: "University of Colorado Boulder",
        issued: "Issued Nov 2022",
        credentialId: "MKVNHFZ874E5",
        credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/MKVNHFZ874E5",
        logo: cuBoulderLogo,
        previewImage: computerCommunicationsPreview,
        skills: "Network Performance Management, OSI Models and +10 skills",
        skillList: [
            "Network Performance Management",
            "OSI Models",
            "Network Routing",
            "Routing Protocols",
            "Network Security",
            "Network Routers",
            "Dynamic Host Configuration Protocol (DHCP)",
            "TCP/IP",
            "Open Shortest Path First (OSPF)",
            "General Networking",
            "Virtual Networking",
            "Network Planning And Design",
        ],
    },
]

function IssuerLogo({ src }: { src: string }) {
    return (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/18 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.2)]">
            <Image src={src} alt="" width={42} height={42} className="h-10 w-10 object-contain" />
        </div>
    )
}

export default function CertificateUI() {
    const [activeCertification, setActiveCertification] = useState<(typeof certifications)[number]>(certifications[0])
    const [selectedCertification, setSelectedCertification] = useState<(typeof certifications)[number] | null>(null)
    const [expandedSkill, setExpandedSkill] = useState<string | null>(null)
    const getCertificationsBySkill = (skill: string) => certifications.filter((cert) => cert.skillList.includes(skill))

    return (
        <section id="certifications" className="relative min-h-screen overflow-hidden bg-[#050505] px-4 py-10 text-white sm:px-8 lg:py-12">
            <Image
                src={activeCertification.previewImage ?? diplomaIcon}
                alt=""
                fill
                sizes="100vw"
                className="scale-110 object-cover opacity-38 blur-2xl"
                aria-hidden="true"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_18%,rgba(255,242,180,0.38),transparent_28%),linear-gradient(90deg,rgba(5,5,5,0.58),rgba(65,48,18,0.2),rgba(5,5,5,0.66))]" />

            <motion.div
                className="relative mx-auto min-h-[720px] w-full max-w-[1780px] overflow-hidden rounded-[2rem] border border-white/18 bg-white/[0.11] shadow-[0_35px_120px_rgba(0,0,0,0.48)] backdrop-blur-2xl"
                initial={{ opacity: 0, scale: 0.96, y: 28 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.24),rgba(255,255,255,0.06)_46%,rgba(0,0,0,0.1))]" />
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />

                <div className="relative z-10 flex min-h-[720px] flex-col px-5 py-7 sm:px-8 lg:px-12 xl:px-14">
                    <div className="mb-8 flex items-center gap-5">
                        <Image src={diplomaIcon} alt="" width={52} height={52} className="h-12 w-12 object-contain sm:h-14 sm:w-14" />
                        <h2 className="text-4xl font-black tracking-normal sm:text-5xl">Certifications</h2>
                    </div>

                    <div className="grid flex-1 gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(340px,3fr)] xl:gap-10">
                        <div className="flex min-w-0 flex-col gap-5">
                            <a
                                data-cursor-hover
                                href={activeCertification.credentialUrl}
                                rel="noreferrer"
                                target="_blank"
                                className="group relative min-h-[520px] flex-1 overflow-hidden rounded-[2rem] border border-white/18 bg-black/34 shadow-[0_30px_80px_rgba(0,0,0,0.28)]"
                                aria-label={`Open credential preview for ${activeCertification.title}`}
                            >
                                <Image
                                    src={activeCertification.previewImage ?? diplomaIcon}
                                    alt={`${activeCertification.title} certificate preview`}
                                    fill
                                    sizes="(min-width: 1024px) 70vw, 100vw"
                                    className="object-cover transition duration-700 group-hover:scale-[1.025]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/18 to-black/8" />
                                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                                    <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/54 bg-black/18 px-5 py-3 text-sm font-black uppercase tracking-[0.28em] text-white/88 backdrop-blur-md">
                                        <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                                        Verified credential
                                    </div>
                                    <h3 className="text-4xl font-black leading-tight tracking-normal sm:text-5xl">{activeCertification.title}</h3>
                                    <p className="mt-4 text-2xl font-semibold text-white/84">{activeCertification.issuer}</p>
                                </div>
                            </a>

                            <div className="rounded-[2rem] border border-white/18 bg-white/16 px-6 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="min-w-0">
                                        <p className="text-xs font-black uppercase tracking-[0.28em] text-white/55">Featured</p>
                                        <h3 className="mt-1 truncate text-2xl font-black tracking-normal">{activeCertification.title}</h3>
                                    </div>
                                    <a
                                        data-cursor-hover
                                        href={activeCertification.credentialUrl}
                                        rel="noreferrer"
                                        target="_blank"
                                        className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-black text-black transition hover:scale-[1.03]"
                                    >
                                        Show credential
                                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="flex min-w-0 flex-col overflow-hidden rounded-[2rem] border border-white/24 bg-black/20 backdrop-blur-lg">
                            <div className="flex items-center justify-between gap-3 border-b border-white/12 px-4 py-4">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-[0.24em] text-white/50">Licenses</p>
                                    <h3 className="mt-1 text-xl font-black tracking-normal">All certificates</h3>
                                </div>
                                <span className="rounded-full border border-white/18 px-3 py-1 text-xs font-black text-white/64">4 total</span>
                            </div>

                            <div className="min-h-0 flex-1 overflow-y-auto">
                                {certifications.slice(0, 4).map((cert, index) => (
                                    <article key={cert.credentialId}>
                                        <div
                                            className={`p-4 transition ${activeCertification.credentialId === cert.credentialId ? "bg-white/10" : ""}`}
                                            onClick={() => setActiveCertification(cert)}
                                        >
                                            <div className="flex items-start gap-3">
                                                <IssuerLogo src={cert.logo} />
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <button
                                                            data-cursor-hover
                                                            type="button"
                                                            onClick={() => setActiveCertification(cert)}
                                                            className="min-w-0 text-left"
                                                        >
                                                            <h4 className="line-clamp-2 text-lg font-black leading-tight tracking-normal">{cert.title}</h4>
                                                            <p className="mt-1 truncate text-sm font-semibold text-white/76">{cert.issuer}</p>
                                                        </button>
                                                        <a
                                                            data-cursor-hover
                                                            href={cert.credentialUrl}
                                                            rel="noreferrer"
                                                            target="_blank"
                                                            onClick={(event) => event.stopPropagation()}
                                                            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/24 text-white/82 transition hover:border-white/46 hover:bg-white/10 hover:text-white"
                                                            aria-label={`Show credential for ${cert.title}`}
                                                        >
                                                            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                                                        </a>
                                                    </div>

                                                    <button
                                                        data-cursor-hover
                                                        type="button"
                                                        onClick={() => {
                                                            setActiveCertification(cert)
                                                            setSelectedCertification(cert)
                                                            setExpandedSkill(null)
                                                        }}
                                                        className="mt-3 flex w-full items-start gap-2 text-left text-sm font-bold leading-5 text-white/82 transition hover:text-white"
                                                    >
                                                        <span className="mt-1 h-3 w-3 shrink-0 rotate-45 border-2 border-white/62" aria-hidden="true" />
                                                        <span className="line-clamp-2">{cert.skills}</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {index < certifications.slice(0, 4).length - 1 ? <div className="border-t border-white/12" /> : null}
                                    </article>
                                ))}
                            </div>

                            <a
                                data-cursor-hover
                                href={linkedinProfile}
                                rel="noreferrer"
                                target="_blank"
                                className="flex items-center justify-center gap-2 border-t border-white/12 px-4 py-4 text-base font-black text-white/78 transition hover:bg-white/8 hover:text-white"
                            >
                                See more on LinkedIn
                                <ArrowRight className="h-5 w-5" aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>

            {selectedCertification ? (
                <div
                    className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-4 py-8 text-[#1f1f1f] backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="certification-skills-title"
                    onClick={() => {
                        setSelectedCertification(null)
                        setExpandedSkill(null)
                    }}
                >
                    <motion.div
                        className="flex max-h-[82vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-[0_30px_120px_rgba(0,0,0,0.36)]"
                        initial={{ opacity: 0, scale: 0.96, y: 18 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-center justify-between gap-4 border-b border-black/10 px-5 py-4 sm:px-7">
                            <h3 id="certification-skills-title" className="text-xl font-black leading-tight tracking-normal text-[#1f1f1f] sm:text-2xl">
                                Skills for {selectedCertification.title}
                            </h3>
                            <button
                                data-cursor-hover
                                type="button"
                                onClick={() => {
                                    setSelectedCertification(null)
                                    setExpandedSkill(null)
                                }}
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-black/70 transition hover:bg-black/6 hover:text-black"
                                aria-label="Close skills popup"
                            >
                                <X className="h-7 w-7" aria-hidden="true" />
                            </button>
                        </div>

                        <div className="overflow-y-auto px-5 pb-6 sm:px-7">
                            {selectedCertification.skillList.map((skill) => {
                                const isExpanded = expandedSkill === skill
                                const relatedCertifications = getCertificationsBySkill(skill)

                                return (
                                    <div key={skill} className="border-b border-black/10">
                                        <button
                                            type="button"
                                            onClick={() => setExpandedSkill(isExpanded ? null : skill)}
                                            className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-black text-[#1f1f1f] transition hover:bg-black/[0.025]"
                                            aria-expanded={isExpanded}
                                        >
                                            <span>{skill}</span>
                                            <ChevronDown
                                                className={`h-6 w-6 shrink-0 text-black/72 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                                                aria-hidden="true"
                                            />
                                        </button>

                                        {isExpanded ? (
                                            <div className="space-y-4 pb-5">
                                                {relatedCertifications.map((cert) => (
                                                    <a
                                                        data-cursor-hover
                                                        key={cert.credentialId}
                                                        href={cert.credentialUrl}
                                                        rel="noreferrer"
                                                        target="_blank"
                                                        className="flex items-center gap-4 rounded-lg py-1 text-[#1f1f1f] transition hover:bg-black/[0.035]"
                                                    >
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-black/10 bg-white shadow-[0_6px_18px_rgba(0,0,0,0.08)]">
                                                            <Image src={cert.logo} alt="" width={30} height={30} className="h-7 w-7 object-contain" />
                                                        </div>
                                                        <span className="text-lg font-semibold leading-tight">{cert.title}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        ) : null}
                                    </div>
                                )
                            })}
                        </div>
                    </motion.div>
                </div>
            ) : null}
        </section>
    )
}
