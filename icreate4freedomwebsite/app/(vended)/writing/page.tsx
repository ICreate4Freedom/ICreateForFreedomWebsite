import type { Metadata } from "next";
import { Room } from "@/components/room/Room";
import { POSTS } from "@/content/writing";

export const metadata: Metadata = { title: "Writing — ICreate4Freedom" };

export default function WritingPage() {
  return (
    <Room slotId="writing" lede="The reading room. Essays, when they're ready.">
      <ul className="divide-y divide-[var(--room-line)]">
        {POSTS.map((post) => (
          <li key={post.title} className="py-6 first:pt-0">
            <p className="font-mono text-xs tracking-[0.2em] text-[var(--room-muted)]">{post.date}</p>
            {post.href ? (
              <a href={post.href} className="mt-1.5 block font-mincho text-xl font-bold text-[var(--room-accent)] underline-offset-4 hover:underline">
                {post.title}
              </a>
            ) : (
              <h2 className="mt-1.5 font-mincho text-xl font-bold">
                {post.title}
                <span className="ml-3 align-middle font-mono text-[0.6rem] font-normal tracking-[0.2em] text-[var(--room-muted)]">
                  UPCOMING
                </span>
              </h2>
            )}
            <p className="mt-2 leading-relaxed text-[var(--room-muted)]">{post.summary}</p>
          </li>
        ))}
      </ul>
    </Room>
  );
}
