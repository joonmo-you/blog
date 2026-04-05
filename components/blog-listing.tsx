'use client'

import { useState } from 'react'
import { useLang } from '@/context/lang-context'
import { PostCard } from '@/components/post-card'
import { TagFilter } from '@/components/tag-filter'
import { SearchBar } from '@/components/search-bar'
import type { Post } from '@/lib/types'

interface BlogListingProps {
  enPosts: Post[]
  koPosts: Post[]
  enTags: string[]
  koTags: string[]
}

export function BlogListing({ enPosts, koPosts, enTags, koTags }: BlogListingProps) {
  const { lang } = useLang()
  const posts = lang === 'ko' ? koPosts : enPosts
  const tags = lang === 'ko' ? koTags : enTags
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filtered = selectedTag
    ? posts.filter((p) => p.frontmatter.tags?.includes(selectedTag))
    : posts

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="text-muted-foreground">
          {lang === 'ko'
            ? '프론트엔드 개발, React, TypeScript, 그리고 웹 플랫폼에 관한 글.'
            : 'Thoughts on frontend development, React, TypeScript, and the web platform.'}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <TagFilter tags={tags} selected={selectedTag} onSelect={setSelectedTag} />
        <SearchBar />
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          {lang === 'ko' ? '게시물이 없습니다.' : 'No posts found.'}
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((post) => (
            <PostCard
              key={post.slug}
              slug={post.slug}
              frontmatter={post.frontmatter}
              href={`/blog/${post.slug}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
