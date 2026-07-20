import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Projects — ICreate4Freedom" };

export default function ProjectsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0e1c2e] text-[#eaf2fb]">
      <h1 className="text-4xl font-bold">Projects</h1>
      <p className="opacity-70">The DEV can. Page under construction.</p>
      <Link href="/" className="underline underline-offset-4">
        ← back to the machine
      </Link>
    </main>
  );
}
