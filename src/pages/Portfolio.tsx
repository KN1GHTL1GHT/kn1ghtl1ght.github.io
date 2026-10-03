import { useRef } from 'react'
import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { PROJECTS, formatDateRange } from '../portfolio/projects'
import type { Project } from '../portfolio/types'
import { useAutoplay } from '../portfolio/useAutoplay'
import './Portfolio.scss'

// Title cards, newest first; each opens its article
export default function Portfolio() {
  return (
    <main className="portfolio">
      <h2 className="section-label">Portfolio</h2>

      <ul className="project-cards">
        {PROJECTS.map((project) => (
          <li key={project.slug}>
            <Link to={`/portfolio/${project.slug}`} className="project-card">
              <div className="project-card-image">
                <CardMedia project={project} />
              </div>

              <div className="project-card-body">
                <p className="project-card-kicker">{project.kicker}</p>
                <h3 className="project-card-title">{project.title}</h3>
                {formatDateRange(project) && <p className="project-card-date">{formatDateRange(project)}</p>}
                {project.summary && <p className="project-card-summary">{project.summary}</p>}
                {project.tags && (
                  <ul className="project-tags">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                )}
                <span className="project-card-more">Read more →</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

// A looping clip, a still image, or a placeholder icon when there's neither
function CardMedia({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  useAutoplay(videoRef)

  if (project.thumbnailVideo) {
    return (
      <video
        ref={videoRef}
        src={project.thumbnailVideo}
        poster={project.thumbnail}
        aria-label={project.thumbnailAlt}
        muted
        loop
        playsInline
        preload="metadata"
      />
    )
  }
  if (project.thumbnail) return <img src={project.thumbnail} alt={project.thumbnailAlt ?? ''} loading="lazy" />
  return <FontAwesomeIcon icon={faImage} className="project-card-placeholder" />
}
