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
  // ISO dates, e.g. '2026-05-01'. Shown as a range when both are set; endDate 'present' for ongoing work.
  startDate?: string
  endDate?: string | 'present'
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
