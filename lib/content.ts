import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Lang, Post, PostFrontmatter, Book, BookFrontmatter } from './types'

const CONTENT_DIR = path.join(process.cwd(), 'content')

function getFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
}

// ── Blog posts ──────────────────────────────────────────────────────────────

export function getAllPosts(lang: Lang): Post[] {
  const dir = path.join(CONTENT_DIR, 'blog')
  return getFiles(dir)
    .filter((f) => f.endsWith(`.${lang}.mdx`))
    .map((f) => {
      const slug = f.replace(`.${lang}.mdx`, '')
      return getPostBySlug(slug, lang)
    })
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1))
}

export function getPostBySlug(slug: string, lang: Lang): Post | null {
  const filePath = path.join(CONTENT_DIR, 'blog', `${slug}.${lang}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { slug, frontmatter: data as PostFrontmatter, content }
}

export function getAllPostSlugs(): string[] {
  const dir = path.join(CONTENT_DIR, 'blog')
  return getFiles(dir)
    .filter((f) => f.endsWith('.en.mdx'))
    .map((f) => f.replace('.en.mdx', ''))
}

// ── Book reviews ─────────────────────────────────────────────────────────────

export function getAllBooks(lang: Lang): Book[] {
  const dir = path.join(CONTENT_DIR, 'books')
  return getFiles(dir)
    .filter((f) => f.endsWith(`.${lang}.mdx`))
    .map((f) => {
      const slug = f.replace(`.${lang}.mdx`, '')
      return getBookBySlug(slug, lang)
    })
    .filter((b): b is Book => b !== null)
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1))
}

export function getBookBySlug(slug: string, lang: Lang): Book | null {
  const filePath = path.join(CONTENT_DIR, 'books', `${slug}.${lang}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { slug, frontmatter: data as BookFrontmatter, content }
}

export function getAllBookSlugs(): string[] {
  const dir = path.join(CONTENT_DIR, 'books')
  return getFiles(dir)
    .filter((f) => f.endsWith('.en.mdx'))
    .map((f) => f.replace('.en.mdx', ''))
}

// ── Tags ─────────────────────────────────────────────────────────────────────

export function getAllTags(lang: Lang): string[] {
  const posts = getAllPosts(lang)
  const books = getAllBooks(lang)
  const tags = new Set<string>()
  for (const p of posts) p.frontmatter.tags?.forEach((t) => tags.add(t))
  for (const b of books) b.frontmatter.tags?.forEach((t) => tags.add(t))
  return Array.from(tags).sort()
}
