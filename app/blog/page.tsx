import { getAllPosts, getAllTags } from '@/lib/content'
import { BlogListing } from '@/components/blog-listing'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Blog' }

export default function BlogPage() {
  const enPosts = getAllPosts('en')
  const koPosts = getAllPosts('ko')
  const enTags = getAllTags('en')
  const koTags = getAllTags('ko')

  return (
    <BlogListing
      enPosts={enPosts}
      koPosts={koPosts}
      enTags={enTags}
      koTags={koTags}
    />
  )
}
