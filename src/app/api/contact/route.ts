import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { existsSync } from "node:fs"
import { join } from "node:path"

export const runtime = "nodejs"

const maxAttachmentSize = 8 * 1024 * 1024
const signatureAvatarPath = join(process.cwd(), "public", "avt.jpg")

function getRequiredEnv(name: string) {
    const value = process.env[name]

    if (!value) {
        throw new Error(`Missing ${name}`)
    }

    return value
}

function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const email = String(formData.get("email") ?? "").trim()
        const companyName = String(formData.get("companyName") ?? "").trim()
        const attachment = formData.get("attachment")

        if (!isValidEmail(email)) {
            return NextResponse.json({ message: "Invalid email address." }, { status: 400 })
        }

        if (!companyName) {
            return NextResponse.json({ message: "Company name is required." }, { status: 400 })
        }

        const smtpHost = getRequiredEnv("SMTP_HOST")
        const smtpPort = Number(getRequiredEnv("SMTP_PORT"))
        const smtpUser = getRequiredEnv("SMTP_USER")
        const smtpPass = getRequiredEnv("SMTP_PASS")
        const mailFrom = process.env.SMTP_FROM || smtpUser
        const mailTo = process.env.CONTACT_TO || smtpUser
        const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : smtpPort === 465

        if (!Number.isFinite(smtpPort)) {
            return NextResponse.json({ message: "Invalid SMTP_PORT." }, { status: 500 })
        }

        const attachments = []

        if (attachment instanceof File && attachment.name && attachment.size > 0) {
            if (attachment.size > maxAttachmentSize) {
                return NextResponse.json({ message: "Attachment must be 8MB or smaller." }, { status: 413 })
            }

            attachments.push({
                filename: attachment.name,
                content: Buffer.from(await attachment.arrayBuffer()),
                contentType: attachment.type || undefined,
            })
        }

        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure,
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
        })

        await transporter.sendMail({
            from: mailFrom,
            to: mailTo,
            replyTo: email,
            subject: `Portfolio contact - ${companyName}`,
            text: [
                "New portfolio contact submission",
                "",
                `Email: ${email}`,
                `Company name: ${companyName}`,
                attachments.length ? `Attachment: ${attachments[0].filename}` : "Attachment: none",
            ].join("\n"),
            html: `
                <h2>New portfolio contact submission</h2>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Company name:</strong> ${companyName}</p>
                <p><strong>Attachment:</strong> ${attachments.length ? attachments[0].filename : "none"}</p>
            `,
            attachments,
        })

        await transporter.sendMail({
            from: mailFrom,
            to: email,
            subject: "We received your message",
            text: [
                "Cam on vi da gui mail cho toi, toi da nhan thong tin va se phan hoi trong thoi gian som nhat co the nhe!!!",
                "",
                "Thank you for sending me an email. I have received your information and will respond as soon as possible.",
                "",
                "Best regards,",
                "Hoang Anh Le",
                "Portfolio Contact",
            ].join("\n"),
            html: `
                <div style="font-family: Arial, sans-serif; color: #202124; font-size: 16px; line-height: 1.6;">
                    <p>Cảm ơn vì đã gửi mail cho tôi, tôi đã nhận thông tin và sẽ phản hồi trong thời gian sớm nhất có thể nhé!!!</p>
                    <p>Thank you for sending me an email. I have received your information and will respond as soon as possible.</p>

                    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top: 28px; border-top: 1px solid #e5e7eb; padding-top: 18px;">
                        <tr>
                            ${
                                existsSync(signatureAvatarPath)
                                    ? `<td style="padding-right: 14px; vertical-align: top;">
                                        <img src="cid:portfolio-avatar" alt="Hoang Anh Le" width="56" height="56" style="display: block; width: 56px; height: 56px; border-radius: 50%; object-fit: cover;" />
                                    </td>`
                                    : ""
                            }
                            <td style="vertical-align: top;">
                                <p style="margin: 0; font-size: 16px; font-weight: 700; color: #111827;">Hoang Anh Le</p>
                                <p style="margin: 2px 0 0; color: #4b5563;">Portfolio Contact</p>
                                <p style="margin: 8px 0 0; color: #4b5563;">
                                    Email: <a href="mailto:${mailTo}" style="color: #2563eb; text-decoration: none;">${mailTo}</a>
                                </p>
                            </td>
                        </tr>
                    </table>
                </div>
            `,
            attachments: existsSync(signatureAvatarPath)
                ? [
                      {
                          filename: "avatar.jpg",
                          path: signatureAvatarPath,
                          cid: "portfolio-avatar",
                      },
                  ]
                : [],
        })

        return NextResponse.json({ message: "Message sent successfully." })
    } catch (error) {
        console.error("Contact email failed:", error)

        return NextResponse.json(
            { message: "Unable to send message. Please check SMTP configuration." },
            { status: 500 },
        )
    }
}
