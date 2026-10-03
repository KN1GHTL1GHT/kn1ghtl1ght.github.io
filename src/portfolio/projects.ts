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

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
