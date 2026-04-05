'use client'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface TagFilterProps {
  tags: string[]
  selected: string | null
  onSelect: (tag: string | null) => void
}

export function TagFilter({ tags, selected, onSelect }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={() => onSelect(null)}>
        <Badge
          variant={selected === null ? 'default' : 'outline'}
          className="cursor-pointer hover:bg-primary/10 transition-colors"
        >
          All
        </Badge>
      </button>
      {tags.map((tag) => (
        <button key={tag} onClick={() => onSelect(tag === selected ? null : tag)}>
          <Badge
            variant={selected === tag ? 'default' : 'outline'}
            className="cursor-pointer hover:bg-primary/10 transition-colors"
          >
            {tag}
          </Badge>
        </button>
      ))}
    </div>
  )
}
