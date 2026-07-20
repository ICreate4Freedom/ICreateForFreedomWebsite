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

export const metadata: Metadata = {
  title: "ICreate4Freedom",
  description: "Michael's corner of the internet — pick a can, vend a page.",
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
        <footer className="bg-neutral-950 py-3 text-center font-mono text-xs text-neutral-500">
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
