import { notFound } from 'next/navigation'
import { getAllPostSlugs, getPostBySlug } from '@/lib/content'
import { LocalizedContent } from '@/components/localized-content'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug, 'en')
  if (!post) return {}
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params

  const enPost = getPostBySlug(slug, 'en')
  if (!enPost) notFound()

  const koPost = getPostBySlug(slug, 'ko')
  const frontmatter = enPost.frontmatter

  return (
    <div className="container-fluid max-w-3xl py-[var(--sp-12)]">
      <div className="mb-[var(--sp-8)] space-y-[var(--sp-4)]">
        <div className="flex flex-wrap gap-1">
          {frontmatter.tags?.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="text-fluid-4xl font-extrabold tracking-tight">
          {frontmatter.title}
        </h1>
        <p className="text-fluid-base text-muted-foreground">{frontmatter.description}</p>
        <time className="text-fluid-sm text-muted-foreground">
          {format(new Date(frontmatter.date), 'MMMM d, yyyy')}
        </time>
      </div>

      <LocalizedContent
        enContent={enPost.content}
        koContent={koPost?.content ?? null}
      />
    </div>
  )
}
