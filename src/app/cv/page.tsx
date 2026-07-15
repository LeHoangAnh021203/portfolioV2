"use client";

import { cv } from "@/data/cv";
import Link from "next/link";

function ContactSep() {
  return <span className="text-[#b0b6bd] print:text-[#999]" aria-hidden>|</span>;
}

export default function CVPage() {
  return (
    <div className="min-h-screen bg-[#eceae5] text-[#111827] print:bg-white">
      <div className="mx-auto flex max-w-[210mm] flex-col gap-3 px-4 py-5 print:max-w-none print:gap-0 print:p-0">
        <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
          <Link
            href="/"
            className="rounded border border-[#111827]/15 bg-white px-3 py-1.5 text-sm font-medium text-[#111827] transition hover:bg-white/80"
          >
            ← Portfolio
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded bg-[#111827] px-4 py-1.5 text-sm font-medium text-white transition hover:bg-[#1f2937]"
          >
            Print / Save as PDF
          </button>
        </div>

        <article className="cv-sheet bg-white px-9 py-7 shadow-[0_8px_28px_rgba(17,24,39,0.08)] print:px-0 print:py-0 print:shadow-none">
          {/* Header — ATS-friendly, single column */}
          <header className="border-b border-[#111827] pb-3.5">
            <h1 className="text-[1.75rem] font-bold leading-none tracking-tight text-[#111827]">
              {cv.name}
            </h1>
            <p className="mt-1.5 text-[13.5px] font-semibold text-[#111827]">
              {cv.title}
              <span className="font-normal text-[#4b5563]">
                {" "}
                | {cv.subtitle}
              </span>
            </p>
            <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11.5px] leading-relaxed text-[#374151]">
              <span>{cv.location}</span>
              <ContactSep />
              <a href={`tel:${cv.phone.replace(/\s/g, "")}`}>{cv.phone}</a>
              <ContactSep />
              <a href={`mailto:${cv.email}`}>{cv.email}</a>
              <ContactSep />
              <a href={cv.githubUrl} target="_blank" rel="noreferrer">
                {cv.github}
              </a>
              <ContactSep />
              <a href={cv.linkedinUrl} target="_blank" rel="noreferrer">
                {cv.linkedin}
              </a>
              <ContactSep />
              <a href={cv.websiteUrl} target="_blank" rel="noreferrer">
                {cv.website}
              </a>
            </p>
          </header>

          <div className="mt-4 space-y-3.5">
            <section>
              <h2 className="cv-section">Professional Summary</h2>
              <p className="mt-1.5 text-[12.5px] leading-[1.55] text-[#1f2937]">
                {cv.summary}
              </p>
            </section>

            <section>
              <h2 className="cv-section">Technical Skills</h2>
              <dl className="mt-1.5 space-y-1 text-[12.5px] leading-snug">
                <div className="grid grid-cols-[6.25rem_1fr] gap-x-2">
                  <dt className="font-semibold text-[#111827]">Frontend</dt>
                  <dd className="text-[#1f2937]">{cv.skills.frontend.join(", ")}</dd>
                </div>
                <div className="grid grid-cols-[6.25rem_1fr] gap-x-2">
                  <dt className="font-semibold text-[#111827]">Backend</dt>
                  <dd className="text-[#1f2937]">{cv.skills.backend.join(", ")}</dd>
                </div>
                <div className="grid grid-cols-[6.25rem_1fr] gap-x-2">
                  <dt className="font-semibold text-[#111827]">Tools</dt>
                  <dd className="text-[#1f2937]">{cv.skills.tools.join(", ")}</dd>
                </div>
                <div className="grid grid-cols-[6.25rem_1fr] gap-x-2">
                  <dt className="font-semibold text-[#111827]">Languages</dt>
                  <dd className="text-[#1f2937]">{cv.languages}</dd>
                </div>
              </dl>
            </section>

            <section>
              <h2 className="cv-section">Work Experience</h2>
              <div className="mt-2 space-y-3">
                {cv.experience.map((job) => (
                  <div key={`${job.company}-${job.period}`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <h3 className="text-[13px] font-bold text-[#111827]">
                        {job.role}{" "}
                        <span className="font-semibold text-[#374151]">
                          | {job.company}
                        </span>
                      </h3>
                      <span className="shrink-0 text-[11.5px] font-medium tabular-nums text-[#4b5563]">
                        {job.period}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6b7280]">{job.location}</p>
                    <ul className="mt-1 list-disc space-y-0.5 pl-[1.1rem] text-[12px] leading-[1.45] text-[#1f2937]">
                      {job.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="cv-section">Projects</h2>
              <div className="mt-2 space-y-2.5">
                {cv.projects.map((p) => (
                  <div key={p.name}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <h3 className="text-[13px] font-bold text-[#111827]">
                        {p.name}
                        <span className="font-normal text-[#4b5563]">
                          {" "}
                          — {p.type}
                        </span>
                      </h3>
                      <div className="flex gap-2.5 text-[11px] font-medium">
                        {p.demo && (
                          <a
                            href={p.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#111827] underline underline-offset-2"
                          >
                            Live
                          </a>
                        )}
                        {p.github && (
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#111827] underline underline-offset-2"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-[11px] text-[#6b7280]">{p.stack}</p>
                    <ul className="mt-0.5 list-disc space-y-0.5 pl-[1.1rem] text-[12px] leading-[1.45] text-[#1f2937]">
                      {p.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-1.5 text-[11.5px] text-[#4b5563]">
                <a
                  href={cv.projectsMoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-[#111827] underline underline-offset-2"
                >
                  See more on GitHub
                </a>
                <span> — full repositories list</span>
              </p>
            </section>

            <section>
              <h2 className="cv-section">Education</h2>
              <div className="mt-2 space-y-2">
                {cv.education.map((ed) => (
                  <div key={ed.school}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <h3 className="text-[13px] font-bold text-[#111827]">
                        {ed.degree}
                      </h3>
                      <span className="text-[11.5px] font-medium tabular-nums text-[#4b5563]">
                        {ed.period}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#374151]">{ed.school}</p>
                    <p className="text-[12px] leading-snug text-[#1f2937]">
                      {ed.details}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="cv-section">Certifications</h2>
              <ul className="mt-1.5 space-y-0.5 text-[12px] leading-snug text-[#1f2937]">
                {cv.certifications.map((c) => (
                  <li key={c.title} className="flex flex-wrap items-baseline gap-x-2">
                    <span>
                      <span className="font-semibold text-[#111827]">{c.title}</span>
                      <span className="text-[#4b5563]">
                        {" "}
                        — {c.issuer} ({c.issued})
                      </span>
                    </span>
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 text-[11px] font-medium text-[#111827] underline underline-offset-2"
                    >
                      Credential
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-1.5 text-[11.5px] text-[#4b5563]">
                <a
                  href={cv.certificationsMoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-[#111827] underline underline-offset-2"
                >
                  See more on LinkedIn
                </a>
                <span> — full licenses & certifications list</span>
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
