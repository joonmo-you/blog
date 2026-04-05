export type Lang = 'en' | 'ko'

export interface PostFrontmatter {
  title: string
  description: string
  date: string
  tags: string[]
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  content: string
}

export interface BookFrontmatter {
  title: string
  author: string
  description: string
  date: string
  rating: number
  coverImage?: string
  tags: string[]
}

export interface Book {
  slug: string
  frontmatter: BookFrontmatter
  content: string
}
