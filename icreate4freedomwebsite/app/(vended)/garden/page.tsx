import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Garden — ICreate4Freedom" };

export default function GardenPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#14241a] text-[#e9f5ea]">
      <h1 className="text-4xl font-bold">Garden</h1>
      <p className="opacity-70">The GROW can. Page under construction.</p>
      <Link href="/" className="underline underline-offset-4">
        ← back to the machine
      </Link>
    </main>
  );
}
