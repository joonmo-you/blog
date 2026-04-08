'use client'

import { useState } from 'react'
import { useLang } from '@/context/lang-context'
import { BookCard } from '@/components/post-card'
import { TagFilter } from '@/components/tag-filter'
import type { Book } from '@/lib/types'

interface BooksListingProps {
  enBooks: Book[]
  koBooks: Book[]
  enTags: string[]
  koTags: string[]
}

export function BooksListing({ enBooks, koBooks, enTags, koTags }: BooksListingProps) {
  const { lang } = useLang()
  const books = lang === 'ko' ? koBooks : enBooks
  const tags = lang === 'ko' ? koTags : enTags
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filtered = selectedTag
    ? books.filter((b) => b.frontmatter.tags?.includes(selectedTag))
    : books

  return (
    <div className="container-fluid py-[var(--sp-12)] space-y-[var(--sp-8)]">
      <div className="space-y-[var(--sp-2)]">
        <h1 className="text-fluid-3xl font-bold tracking-tight">Books</h1>
        <p className="text-fluid-base text-muted-foreground">
          {lang === 'ko'
            ? '읽은 책들에 대한 리뷰와 감상.'
            : 'Reviews and notes on books I have read.'}
        </p>
      </div>

      <TagFilter tags={tags} selected={selectedTag} onSelect={setSelectedTag} />

      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-fluid-sm">
          {lang === 'ko' ? '리뷰가 없습니다.' : 'No reviews found.'}
        </p>
      ) : (
        <div className="grid grid-auto-fill-md gap-[var(--sp-4)]">
          {filtered.map((book) => (
            <BookCard
              key={book.slug}
              slug={book.slug}
              frontmatter={book.frontmatter}
              href={`/books/${book.slug}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
