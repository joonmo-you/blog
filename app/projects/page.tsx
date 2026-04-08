import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Projects' }

const PROJECTS = [
  {
    name: 'joonmo.you',
    description: 'This blog — built with Next.js, Tailwind CSS, and shadcn/ui.',
    href: 'https://github.com/joonmo-you/blog',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
  },
]

export default function ProjectsPage() {
  return (
    <div className="container-fluid py-[var(--sp-12)] space-y-[var(--sp-8)]">
      <div className="space-y-[var(--sp-2)]">
        <h1 className="text-fluid-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-fluid-base text-muted-foreground">Side projects and open-source work.</p>
      </div>

      <div className="grid grid-auto-fill-md gap-[var(--sp-4)]">
        {PROJECTS.map((project) => (
          <a
            key={project.name}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-lg border p-5 hover:shadow-md transition-shadow"
          >
            <h2 className="text-fluid-base font-semibold group-hover:text-primary transition-colors">
              {project.name}
            </h2>
            <p className="mt-1 text-fluid-sm text-muted-foreground">{project.description}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-secondary text-secondary-foreground px-2 py-0.5 text-fluid-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
