import { useEffect, useState, type MouseEvent } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ARTICLE_SECTIONS, findProject, formatDateRange } from '../portfolio/projects'
import './Portfolio.scss'

// A heading counts as "current" once it scrolls above this line (px from the top of the window)
const ACTIVE_LINE = 140

type TocEntry = { id: string; title: string; level: 1 | 2 }

export default function PortfolioArticle() {
  const { slug } = useParams()
  const project = findProject(slug)

  const sections = project
    ? ARTICLE_SECTIONS.map((section) => ({ ...section, content: project[section.key] }))
    : []
  const toc: TocEntry[] = sections.flatMap((section) => [
    { id: section.id, title: section.title, level: 1 as const },
    ...(section.content.subsections ?? []).map((sub) => ({ id: sub.id, title: sub.title, level: 2 as const })),
  ])

  const [activeId, setActiveId] = useState(toc[0]?.id)

  // Highlight the last heading that has scrolled past the active line
  const tocKey = toc.map((entry) => entry.id).join(',')
  useEffect(() => {
    const ids = tocKey.split(',')
    // Cheap enough (a handful of headings) to run on every scroll event
    const update = () => {
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= ACTIVE_LINE) current = id
      }
      // The last sections can be too short to scroll up to the line; at the bottom of the page, it's the last one
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom) current = ids[ids.length - 1]
      setActiveId(current)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [tocKey])

  // Opening a link with #section jumps straight to it
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [slug])

  if (!project) return <Navigate to="/portfolio" replace />

  const jumpTo = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    history.replaceState(history.state, '', `#${id}`)
  }

  return (
    <main className="article">
      <header className="article-header">
        <p className="project-card-kicker">{project.kicker}</p>
        <h2 className="article-title">{project.title}</h2>
        <div className="article-meta">
          {formatDateRange(project) && <span className="project-card-date">{formatDateRange(project)}</span>}
          {project.tags && (
            <ul className="project-tags">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
        </div>
        {project.links && (
          <div className="article-links">
            {project.links.map(({ label, href, icon }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="link-button">
                <FontAwesomeIcon icon={icon} />
                <span>{label}</span>
              </a>
            ))}
          </div>
        )}
      </header>

      <div className="article-layout">
        {/* Back link and contents stay together on the left as the article scrolls */}
        <aside className="article-aside">
          <Link to="/portfolio" className="article-back">
            ← All projects
          </Link>

          <nav className="article-toc" aria-label="Contents">
            <p className="article-toc-label">Contents</p>
            <ol>
              {toc.map((entry) => (
                <li key={entry.id} className={clsx(`level-${entry.level}`, entry.id === activeId && 'active')}>
                  <a href={`#${entry.id}`} onClick={(e) => jumpTo(e, entry.id)}>
                    {entry.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="article-body">
          {sections.map(({ id, title, content }) => (
            <section key={id} className="article-section" aria-labelledby={id}>
              <h3 id={id} className="article-section-title">
                {title}
              </h3>
              {content.intro}
              {content.subsections?.map((sub) => (
                <div key={sub.id} className="article-subsection">
                  <h4 id={sub.id}>{sub.title}</h4>
                  {sub.content}
                </div>
              ))}
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
