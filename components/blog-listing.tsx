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
    <div className="container-fluid py-[var(--sp-12)] space-y-[var(--sp-8)]">
      <div className="space-y-[var(--sp-2)]">
        <h1 className="text-fluid-3xl font-bold tracking-tight">Blog</h1>
        <p className="text-fluid-base text-muted-foreground">
          {lang === 'ko'
            ? '프론트엔드 개발, React, TypeScript, 그리고 웹 플랫폼에 관한 글.'
            : 'Thoughts on frontend development, React, TypeScript, and the web platform.'}
        </p>
      </div>

      <div className="flex flex-wrap gap-[var(--sp-4)] items-start justify-between">
        <TagFilter tags={tags} selected={selectedTag} onSelect={setSelectedTag} />
        <SearchBar />
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-fluid-sm">
          {lang === 'ko' ? '게시물이 없습니다.' : 'No posts found.'}
        </p>
      ) : (
        <div className="grid grid-auto-fill-md gap-[var(--sp-4)]">
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
