import Link from "next/link";
import { getAllPosts, getAllBooks } from "@/lib/content";
import { PostCard, BookCard } from "@/components/post-card";

export default function HomePage() {
  const posts = getAllPosts("en").slice(0, 3);
  const books = getAllBooks("en").slice(0, 3);

  return (
    <div className="container-fluid py-[var(--sp-16)] space-y-[var(--sp-20)]">
      {/* Hero */}
      <section className="space-y-[var(--sp-4)]">
        <h1 className="text-fluid-5xl font-extrabold tracking-tight">This is Joonmo</h1>
        <p className="text-fluid-xl text-muted-foreground max-w-2xl">
          Current: Web developer.
          <br />
          Fueled by good coffee — not optional, essential.
          <br />
          Text addict, yeah… I judge books by the cover and still get hooked.
          <br />
          Drawn to a life of late-night pages and occasional beats.
        </p>
        <p className="mt-2 text-fluid-xl text-muted-foreground max-w-2xl">
          Code, caffeine, words, and music.
          <br />
          That's the loop I live in.
        </p>
        <div className="flex flex-wrap gap-[var(--sp-2)]">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-fluid-sm font-medium hover:bg-primary/90 transition-colors">
            Read the blog
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center rounded-md border px-4 py-2 text-fluid-sm font-medium hover:bg-accent transition-colors">
            About me
          </Link>
        </div>
      </section>

      {/* Recent Posts */}
      {posts.length > 0 && (
        <section className="space-y-[var(--sp-6)]">
          <div className="flex items-center justify-between">
            <h2 className="text-fluid-2xl font-semibold">Recent Posts</h2>
            <Link href="/blog" className="text-fluid-sm text-muted-foreground hover:text-foreground transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-auto-fill-md gap-[var(--sp-4)]">
            {posts.map((post) => (
              <PostCard key={post.slug} slug={post.slug} frontmatter={post.frontmatter} href={`/blog/${post.slug}`} />
            ))}
          </div>
        </section>
      )}

      {/* Recent Books */}
      {books.length > 0 && (
        <section className="space-y-[var(--sp-6)]">
          <div className="flex items-center justify-between">
            <h2 className="text-fluid-2xl font-semibold">Recent Book Reviews</h2>
            <Link href="/books" className="text-fluid-sm text-muted-foreground hover:text-foreground transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-auto-fill-md gap-[var(--sp-4)]">
            {books.map((book) => (
              <BookCard key={book.slug} slug={book.slug} frontmatter={book.frontmatter} href={`/books/${book.slug}`} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
