import Link from "next/link";
import { getAllPosts, getAllBooks } from "@/lib/content";
import { PostCard, BookCard } from "@/components/post-card";

export default function HomePage() {
  const posts = getAllPosts("en").slice(0, 3);
  const books = getAllBooks("en").slice(0, 3);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 space-y-20">
      {/* Hero */}
      <section className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Hi, I&apos;m Joonmo</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Current: Web developer.
          <br />
          Fueled by good coffee — not optional, essential.
          <br />
          Text addict, yeah… I judge books by the cover and still get hooked.
          <br />
          Trying to quit work and spend the rest of my life reading books, making music here and there.
        </p>
        <p className="mt-2 text-xl text-muted-foreground max-w-2xl">
          Code, caffeine, words, and music.
          <br />
          That’s the loop I live in.
        </p>
        <div className="flex gap-3">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors">
            Read the blog
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent transition-colors">
            About me
          </Link>
        </div>
      </section>

      {/* Recent Posts */}
      {posts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Recent Posts</h2>
            <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} slug={post.slug} frontmatter={post.frontmatter} href={`/blog/${post.slug}`} />
            ))}
          </div>
        </section>
      )}

      {/* Recent Books */}
      {books.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Recent Book Reviews</h2>
            <Link href="/books" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard key={book.slug} slug={book.slug} frontmatter={book.frontmatter} href={`/books/${book.slug}`} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
