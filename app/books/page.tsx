import { getAllBooks, getAllTags } from '@/lib/content'
import { BooksListing } from '@/components/books-listing'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Books' }

export default function BooksPage() {
  const books = getAllBooks('ko')
  const tags = getAllTags('ko')

  return <BooksListing books={books} tags={tags} />
}
