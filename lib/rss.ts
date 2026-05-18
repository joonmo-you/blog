import { Feed } from 'feed'
import { getAllPosts } from './content'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://joonmo.you'

export function generateRssFeed(): string {
  const posts = getAllPosts('ko')

  const feed = new Feed({
    title: "joonmo.you — 프론트엔드 개발 블로그",
    description: "프론트엔드 개발과 책 리뷰에 관한 글",
    id: SITE_URL,
    link: SITE_URL,
    language: 'ko',
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
