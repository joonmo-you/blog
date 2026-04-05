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
    <div className="container mx-auto max-w-4xl px-4 py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Books</h1>
        <p className="text-muted-foreground">
          {lang === 'ko'
            ? '읽은 책들에 대한 리뷰와 감상.'
            : 'Reviews and notes on books I have read.'}
        </p>
      </div>

      <TagFilter tags={tags} selected={selectedTag} onSelect={setSelectedTag} />

      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          {lang === 'ko' ? '리뷰가 없습니다.' : 'No reviews found.'}
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
