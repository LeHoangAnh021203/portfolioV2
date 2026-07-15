import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV — Le Hoang Anh | Frontend Developer",
  description:
    "Resume of Le Hoang Anh — Frontend Developer (React, Next.js, TypeScript).",
};

export default function CVLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
