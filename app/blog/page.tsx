import { getAllPosts, getAllTags } from '@/lib/content'
import { BlogListing } from '@/components/blog-listing'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Blog' }

export default function BlogPage() {
  const posts = getAllPosts('ko')
  const tags = getAllTags('ko')

  return <BlogListing posts={posts} tags={tags} />
}
