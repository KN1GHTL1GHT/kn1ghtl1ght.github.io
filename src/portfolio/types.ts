import type { ReactNode } from 'react'
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'

// A titled part of a section; shows up nested under its section in the table of contents
export type Subsection = {
  id: string
  title: string
  content: ReactNode
}

export type SectionContent = {
  intro?: ReactNode
  subsections?: Subsection[]
}

export type ProjectLink = {
  label: string
  href: string
  icon: IconDefinition
}

export type Project = {
  slug: string // the article lives at /portfolio/<slug>
  title: string
  kicker: string // small category line above the title
  date?: string // ISO date, e.g. '2025-10-30'
  summary?: string
  tags?: string[]
  thumbnail?: string
  thumbnailAlt?: string
  links?: ProjectLink[]
  // Every article has the same three sections, in this order
  problem: SectionContent
  artifacts: SectionContent
  reflection: SectionContent
}
