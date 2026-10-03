import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'
import { PROJECTS, formatDate } from '../portfolio/projects'
import './Portfolio.scss'

// Title cards, newest first; each opens its article
export default function Portfolio() {
  return (
    <main className="portfolio">
      <h2 className="section-label">Projects</h2>

      <ul className="project-cards">
        {PROJECTS.map((project) => (
          <li key={project.slug}>
            <Link to={`/portfolio/${project.slug}`} className="project-card">
              <div className="project-card-image">
                {project.thumbnail ? (
                  <img src={project.thumbnail} alt={project.thumbnailAlt ?? ''} loading="lazy" />
                ) : (
                  <FontAwesomeIcon icon={faGamepad} className="project-card-placeholder" />
                )}
              </div>

              <div className="project-card-body">
                <p className="project-card-kicker">{project.kicker}</p>
                <h3 className="project-card-title">{project.title}</h3>
                {project.date && <p className="project-card-date">{formatDate(project.date)}</p>}
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
