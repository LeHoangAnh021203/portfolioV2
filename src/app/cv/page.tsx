"use client";

import { cv } from "@/data/cv";
import Link from "next/link";

function ContactSep() {
  return (
    <span className="text-[#b0b6bd] print:text-[#999]" aria-hidden>
      |
    </span>
  );
}

function CvLink({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <a href={href} className={`underline underline-offset-2 ${className}`}>
      {label}
    </a>
  );
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function HighlightedText({
  text,
  highlights,
}: {
  text: string;
  highlights: readonly string[];
}) {
  const activeHighlights = [...highlights]
    .filter((highlight) => text.includes(highlight))
    .sort((a, b) => b.length - a.length);

  if (activeHighlights.length === 0) {
    return <>{text}</>;
  }

  const pattern = new RegExp(
    `(${activeHighlights.map(escapeRegExp).join("|")})`,
    "g",
  );

  return (
    <>
      {text.split(pattern).map((part, index) =>
        activeHighlights.includes(part) ? (
          <strong key={`${part}-${index}`} className="font-bold text-[#15803d]">
            {part}
          </strong>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        ),
      )}
    </>
  );
}

function SkillList({
  skills,
  highlights,
}: {
  skills: readonly string[];
  highlights: readonly string[];
}) {
  return (
    <>
      {skills.map((skill, index) => (
        <span key={skill}>
          {highlights.includes(skill) ? (
            <strong className="font-bold text-[#15803d]">{skill}</strong>
          ) : (
            skill
          )}
          {index < skills.length - 1 ? ", " : ""}
        </span>
      ))}
    </>
  );
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
              <a
                href={`tel:${cv.phone.replace(/\s/g, "")}`}
                className="underline underline-offset-2"
              >
                {cv.phone}
              </a>
              <ContactSep />
              <a
                href={`mailto:${cv.email}`}
                className="underline underline-offset-2"
              >
                {cv.email}
              </a>
              <ContactSep />
              <CvLink href={cv.githubUrl} label="GitHub" />
              <ContactSep />
              <CvLink href={cv.linkedinUrl} label="LinkedIn" />
              <ContactSep />
              <CvLink href={cv.websiteUrl} label={cv.website} />
            </p>
          </header>

          <div className="mt-4 space-y-3.5">
            <section>
              <h2 className="cv-section">Professional Summary</h2>
              <p className="mt-1.5 text-[12.5px] leading-[1.55] text-[#1f2937]">
                <HighlightedText
                  text={cv.summary}
                  highlights={cv.summaryHighlights}
                />
              </p>
            </section>

            <section>
              <h2 className="cv-section">Technical Skills</h2>
              <dl className="mt-1.5 space-y-1 text-[12.5px] leading-snug">
                <div className="grid grid-cols-[6.25rem_1fr] gap-x-2">
                  <dt className="font-semibold text-[#111827]">Frontend</dt>
                  <dd className="text-[#1f2937]">
                    <SkillList
                      skills={cv.skills.frontend}
                      highlights={cv.highlightSkills}
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-[6.25rem_1fr] gap-x-2">
                  <dt className="font-semibold text-[#111827]">Backend</dt>
                  <dd className="text-[#1f2937]">
                    <SkillList
                      skills={cv.skills.backend}
                      highlights={cv.highlightSkills}
                    />
                  </dd>
                </div>
                <div className="grid grid-cols-[6.25rem_1fr] gap-x-2">
                  <dt className="font-semibold text-[#111827]">Tools</dt>
                  <dd className="text-[#1f2937]">
                    <SkillList
                      skills={cv.skills.tools}
                      highlights={cv.highlightSkills}
                    />
                  </dd>
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
                        <li key={b}>
                          <HighlightedText
                            text={b}
                            highlights={cv.contentHighlights}
                          />
                        </li>
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
                      <div className="flex flex-wrap gap-x-2.5 gap-y-0.5 text-[11px] font-medium">
                        {p.demo && (
                          <CvLink
                            href={p.demo}
                            label="Live"
                            className="text-[#111827]"
                          />
                        )}
                        {p.github && (
                          <CvLink
                            href={p.github}
                            label="GitHub"
                            className="text-[#111827]"
                          />
                        )}
                      </div>
                    </div>
                    <p className="text-[11px] text-[#6b7280]">{p.stack}</p>
                    <ul className="mt-0.5 list-disc space-y-0.5 pl-[1.1rem] text-[12px] leading-[1.45] text-[#1f2937]">
                      {p.bullets.map((b) => (
                        <li key={b}>
                          <HighlightedText
                            text={b}
                            highlights={cv.contentHighlights}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-1.5 text-[11.5px] text-[#4b5563]">
                <CvLink
                  href={cv.projectsMoreUrl}
                  label="See more on GitHub"
                  className="font-medium text-[#111827]"
                />
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
                  <li
                    key={c.title}
                    className="flex flex-wrap items-baseline gap-x-2"
                  >
                    <span>
                      <span className="font-semibold text-[#111827]">
                        {c.title}
                      </span>
                      <span className="text-[#4b5563]">
                        {" "}
                        — {c.issuer} ({c.issued})
                      </span>
                    </span>
                    <CvLink
                      href={c.url}
                      label="Credential"
                      className="shrink-0 text-[11px] font-medium text-[#111827]"
                    />
                  </li>
                ))}
              </ul>
              <p className="mt-1.5 text-[11.5px] text-[#4b5563]">
                <CvLink
                  href={cv.certificationsMoreUrl}
                  label="See more on LinkedIn"
                  className="font-medium text-[#111827]"
                />
                <span> — full licenses & certifications list</span>
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
