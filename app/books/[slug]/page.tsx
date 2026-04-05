import { notFound } from 'next/navigation'
import { getAllBookSlugs, getBookBySlug } from '@/lib/content'
import { LocalizedContent } from '@/components/localized-content'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllBookSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const book = getBookBySlug(slug, 'en')
  if (!book) return {}
  return {
    title: book.frontmatter.title,
    description: book.frontmatter.description,
  }
}

export default async function BookReviewPage({ params }: Props) {
  const { slug } = await params

  const enBook = getBookBySlug(slug, 'en')
  if (!enBook) notFound()

  const koBook = getBookBySlug(slug, 'ko')
  const { frontmatter } = enBook

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
        <p className="text-sm text-muted-foreground">
          by {frontmatter.author} ·{' '}
          <span className="text-yellow-500">
            {'★'.repeat(frontmatter.rating)}{'☆'.repeat(5 - frontmatter.rating)}
          </span>
        </p>
        <p className="text-muted-foreground">{frontmatter.description}</p>
        <time className="text-sm text-muted-foreground">
          {format(new Date(frontmatter.date), 'MMMM d, yyyy')}
        </time>
      </div>

      <LocalizedContent
        enContent={enBook.content}
        koContent={koBook?.content ?? null}
      />
    </div>
  )
}
