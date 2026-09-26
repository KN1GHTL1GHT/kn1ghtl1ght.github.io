import { useState } from 'react'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import Navbar, { type NavbarPhase } from '../Navbar/Navbar'
import './Header.scss'

const LINKS = [
  { href: 'https://github.com/KN1GHTL1GHT', label: 'GitHub', icon: faGithub },
  { href: 'https://linkedin.com/in/amogh-patki', label: 'LinkedIn', icon: faLinkedin },
]

// Name and title beside the navbar. Opening the navbar pushes them aside and reveals the rest.
// Layout is a grid; see grid-template-areas in Header.scss.
export default function Header() {
  const [navPhase, setNavPhase] = useState<NavbarPhase>('idle')

  // Same phases the navbar's box uses, so the header moves in step with it
  const open = navPhase === 'expanding' || navPhase === 'expanded' || navPhase === 'collapsing'
  const revealed = navPhase === 'expanding' || navPhase === 'expanded'

  return (
    <header
      className={clsx(
        'site-header',
        open && 'open',
        navPhase === 'cubeCollapsing' && 'closing',
        revealed && 'revealed',
      )}
    >
      <Navbar onPhaseChange={setNavPhase} />

      <div className="header-intro">
        <h1 className="header-name">Amogh Patki</h1>
        <p className="header-title">
          <span>Masters Student</span>
          <span>Human Computer Interaction</span>
          <span>University of Maryland</span>
        </p>
      </div>

      {/* The blurb and dog stay collapsed until the navbar opens */}
      <div className="header-blurb" aria-hidden={!revealed}>
        <blockquote className="header-quote">
          “A stand-in quote will live here until a real one is picked.”
        </blockquote>
        <div className="header-links">
          {LINKS.map(({ href, label, icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="header-link"
              tabIndex={revealed ? undefined : -1}
            >
              <FontAwesomeIcon icon={icon} />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="header-dog" aria-hidden={!revealed}>
        <div className="header-dog-image" role="img" aria-label="Sketch of a fluffy dog holding a sword" />
      </div>
    </header>
  )
}
