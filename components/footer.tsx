import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t py-8 mt-auto">
      <div className="container-fluid flex flex-wrap items-center justify-between gap-[var(--sp-2)] text-fluid-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} joonmo.you</p>
        <div className="flex gap-4">
          <Link href="/rss.xml" className="hover:text-foreground transition-colors">
            RSS
          </Link>
          <a
            href="https://github.com/joonmo-you"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
