import { Feed } from 'feed'
import { getAllPosts } from './content'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://joonmo.you'

export function generateRssFeed(): string {
  const posts = getAllPosts('en')

  const feed = new Feed({
    title: "joonmo.you — Frontend Dev Blog",
    description: "Articles on frontend development and book reviews",
    id: SITE_URL,
    link: SITE_URL,
    language: 'en',
    copyright: `© ${new Date().getFullYear()} joonmo.you`,
    author: {
      name: 'joonmo.you',
      link: SITE_URL,
    },
  })

  for (const post of posts) {
    feed.addItem({
      title: post.frontmatter.title,
      id: `${SITE_URL}/blog/${post.slug}`,
      link: `${SITE_URL}/blog/${post.slug}`,
      description: post.frontmatter.description,
      date: new Date(post.frontmatter.date),
    })
  }

  return feed.rss2()
}
