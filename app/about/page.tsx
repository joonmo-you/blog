import type { Metadata } from "next";
import { electrolize } from "@/app/fonts";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">About</h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4">
        <p className="text-lg leading-7">
          Hi, I&apos;m <span className={`${electrolize.className}`}>joonmo.you</span>. I&apos;m a frontend developer
          with a focus on React and TypeScript.
        </p>
        <p className="leading-7 text-muted-foreground">
          I write about things I learn in my day-to-day work — component design, performance, accessibility, and
          developer experience. I also read a lot and share brief reviews here.
        </p>
        <p className="leading-7 text-muted-foreground">
          This blog is bilingual. You can switch between English and Korean using the toggle in the header.
        </p>
      </div>
    </div>
  );
}
