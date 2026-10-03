import type { Project } from './types'
import algobrick from './articles/algobrick'
import videoGame from './articles/videoGame'
import tripAgenda from './articles/tripAgenda'

// Newest first; this is the order of the cards on the Portfolio page
export const PROJECTS: Project[] = [algobrick, videoGame, tripAgenda]

export function findProject(slug: string | undefined): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug)
}

// The three sections every article has, in order
export const ARTICLE_SECTIONS = [
  { id: 'problem-statement', title: 'Problem Statement', key: 'problem' },
  { id: 'artifacts', title: 'Artifacts', key: 'artifacts' },
  { id: 'work-reflection', title: 'Work Reflection', key: 'reflection' },
] as const

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

// "May 1, 2026 – September 6, 2026", "May 1, 2026 – Present", or a single date
export function formatDateRange({ startDate, endDate }: Pick<Project, 'startDate' | 'endDate'>): string | undefined {
  const start = startDate && formatDate(startDate)
  const end = endDate === 'present' ? 'Present' : endDate && formatDate(endDate)
  if (start && end) return `${start} – ${end}`
  return start || end || undefined
}
