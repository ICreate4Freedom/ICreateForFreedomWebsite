import type { Metadata } from "next";
import Link from "next/link";
import { PageFade } from "@/components/PageFade";

export const metadata: Metadata = { title: "About — ICreate4Freedom" };

export default function AboutPage() {
  return (
    <PageFade>
      <main className="flex min-h-[calc(100dvh-2.5rem)] flex-col items-center justify-center gap-4 bg-[#e9e7df] text-[#4a463e]">
        <h1 className="text-4xl font-bold">About</h1>
        <p className="opacity-70">The ME can. Page under construction.</p>
        <Link href="/" className="underline underline-offset-4">
          ← back to the machine
        </Link>
      </main>
    </PageFade>
  );
}
