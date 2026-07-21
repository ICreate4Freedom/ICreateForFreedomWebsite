import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { SLOTS } from "@/components/vending-machine/slots";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* Production URL for absolute OG/twitter image links: set NEXT_PUBLIC_SITE_URL
   once a domain exists; VERCEL_PROJECT_PRODUCTION_URL covers Vercel deploys. */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ICreate4Freedom",
  description: "Michael's corner of the internet — pick a can, vend a page.",
  openGraph: {
    title: "ICreate4Freedom",
    description: "A vending machine in a quiet alley. Pick a can, vend a page.",
    siteName: "ICreate4Freedom",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="flex-1">{children}</div>
        {/* plain-text fallback for the vending-machine nav */}
        {/* fixed h-10 (2.5rem): pages size themselves with calc(100dvh-2.5rem) */}
        <footer className="flex h-10 items-center justify-center bg-neutral-950 font-mono text-xs text-neutral-400">
          <nav aria-label="Site navigation">
            <Link href="/" className="mx-2 hover:text-neutral-300">
              home
            </Link>
            {SLOTS.map((slot) => (
              <Link
                key={slot.id}
                href={slot.route}
                className="mx-2 hover:text-neutral-300"
              >
                {slot.id}
              </Link>
            ))}
          </nav>
        </footer>
      </body>
    </html>
  );
}
