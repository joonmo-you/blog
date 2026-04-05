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
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10 space-y-4">
        <div className="flex flex-wrap gap-1">
          {frontmatter.tags?.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
          {frontmatter.title}
        </h1>
        <p className="text-muted-foreground">{frontmatter.description}</p>
        <time className="text-sm text-muted-foreground">
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
