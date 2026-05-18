import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { useMDXComponents } from '@/mdx-components'

const MDX_OPTIONS = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
}

interface LocalizedContentProps {
  content: string
}

export async function LocalizedContent({ content }: LocalizedContentProps) {
  const components = useMDXComponents({})

  return (
    <article className="mdx-body">
      <MDXRemote source={content} components={components} options={MDX_OPTIONS} />
    </article>
  )
}
