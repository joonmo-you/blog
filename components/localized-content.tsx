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
  enContent: string
  koContent: string | null
}

export async function LocalizedContent({ enContent, koContent }: LocalizedContentProps) {
  const components = useMDXComponents({})

  return (
    <div className="mdx-body">
      {/* lang visibility is controlled via CSS + html[data-lang] attribute */}
      <article data-lang-content="en">
        <MDXRemote source={enContent} components={components} options={MDX_OPTIONS} />
      </article>
      {koContent && (
        <article data-lang-content="ko">
          <MDXRemote source={koContent} components={components} options={MDX_OPTIONS} />
        </article>
      )}
    </div>
  )
}
