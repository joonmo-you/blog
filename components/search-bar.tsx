'use client'

import { useEffect, useRef, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PagefindModule = any

interface SearchResult {
  id: string
  data: () => Promise<{ url: string; meta: { title: string }; excerpt: string }>
}

// Load Pagefind without going through the bundler (only exists post-build)
async function loadPagefind(): Promise<PagefindModule | null> {
  try {
    // new Function bypasses bundler static analysis
    const pf: PagefindModule = await new Function(
      'return import("/pagefind/pagefind.js")',
    )()
    await pf.init()
    return pf
  } catch {
    // Pagefind index not available in dev mode
    return null
  }
}

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [open, setOpen] = useState(false)
  const pagefindRef = useRef<PagefindModule | null>(null)

  useEffect(() => {
    loadPagefind().then((pf) => {
      pagefindRef.current = pf
    })
  }, [])

  async function handleSearch(q: string) {
    setQuery(q)
    if (!q.trim() || !pagefindRef.current) {
      setResults([])
      setOpen(false)
      return
    }
    const search = await pagefindRef.current.search(q)
    setResults(search.results.slice(0, 5))
    setOpen(true)
  }

  return (
    <div className="relative w-full max-w-sm">
      <input
        type="search"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onFocus={() => results.length > 0 && setOpen(true)}
        placeholder="Search…"
        className="w-full rounded-md border bg-background px-3 py-1.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
      />
      {open && results.length > 0 && <SearchResults results={results} />}
    </div>
  )
}

function SearchResults({ results }: { results: SearchResult[] }) {
  const [resolved, setResolved] = useState<
    { url: string; title: string; excerpt: string }[]
  >([])

  useEffect(() => {
    Promise.all(results.map((r) => r.data())).then((items) =>
      setResolved(
        items.map((item) => ({
          url: item.url,
          title: item.meta.title,
          excerpt: item.excerpt,
        })),
      ),
    )
  }, [results])

  return (
    <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-md">
      {resolved.map((item) => (
        <a
          key={item.url}
          href={item.url}
          className="block px-3 py-2 text-sm hover:bg-accent"
        >
          <p className="font-medium">{item.title}</p>
          <p
            className="text-xs text-muted-foreground line-clamp-1"
            dangerouslySetInnerHTML={{ __html: item.excerpt }}
          />
        </a>
      ))}
    </div>
  )
}
