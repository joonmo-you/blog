import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="scroll-m-20 text-fluid-4xl font-extrabold tracking-tight mt-8 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="scroll-m-20 border-b pb-2 text-fluid-3xl font-semibold tracking-tight mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="scroll-m-20 text-fluid-2xl font-semibold tracking-tight mt-8 mb-3">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-fluid-base leading-7 [&:not(:first-child)]:mt-6">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
    ),
    code: ({ children }) => (
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-fluid-sm">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4">
        {children}
      </pre>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="font-medium underline underline-offset-4 hover:text-primary"
      >
        {children}
      </a>
    ),
    ...components,
  }
}
