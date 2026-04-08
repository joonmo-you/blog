import Link from 'next/link'
import { format } from 'date-fns'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { PostFrontmatter, BookFrontmatter } from '@/lib/types'

interface PostCardProps {
  slug: string
  frontmatter: PostFrontmatter
  href: string
}

export function PostCard({ slug, frontmatter, href }: PostCardProps) {
  return (
    <Link href={href} className="block group">
      <Card className="h-full transition-shadow group-hover:shadow-md">
        <CardHeader className="pb-2">
          <p className="text-fluid-xs text-muted-foreground">
            {format(new Date(frontmatter.date), 'MMM d, yyyy')}
          </p>
          <h2 className="text-fluid-base font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {frontmatter.title}
          </h2>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-fluid-sm text-muted-foreground line-clamp-2">
            {frontmatter.description}
          </p>
          {frontmatter.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {frontmatter.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-fluid-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

interface BookCardProps {
  slug: string
  frontmatter: BookFrontmatter
  href: string
}

export function BookCard({ slug, frontmatter, href }: BookCardProps) {
  return (
    <Link href={href} className="block group">
      <Card className="h-full transition-shadow group-hover:shadow-md">
        <CardHeader className="pb-2">
          <p className="text-fluid-xs text-muted-foreground">
            {format(new Date(frontmatter.date), 'MMM d, yyyy')} · by {frontmatter.author}
          </p>
          <h2 className="text-fluid-base font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {frontmatter.title}
          </h2>
          <div className="flex gap-0.5 text-yellow-500 text-fluid-sm">
            {'★'.repeat(frontmatter.rating)}{'☆'.repeat(5 - frontmatter.rating)}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-fluid-sm text-muted-foreground line-clamp-2">
            {frontmatter.description}
          </p>
          {frontmatter.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {frontmatter.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-fluid-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
