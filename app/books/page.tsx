import { getAllBooks, getAllTags } from '@/lib/content'
import { BooksListing } from '@/components/books-listing'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Books' }

export default function BooksPage() {
  const enBooks = getAllBooks('en')
  const koBooks = getAllBooks('ko')
  const enTags = getAllTags('en')
  const koTags = getAllTags('ko')

  return (
    <BooksListing
      enBooks={enBooks}
      koBooks={koBooks}
      enTags={enTags}
      koTags={koTags}
    />
  )
}
