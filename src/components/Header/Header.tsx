import { useState } from 'react'
import clsx from 'clsx'
import Navbar, { type NavbarPhase } from '../Navbar/Navbar'
import './Header.scss'

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
        <figure className="header-quote">
          <blockquote>“Play is the highest form of research.”</blockquote>
          <figcaption className="header-quote-author">Albert Einstein</figcaption>
        </figure>
      </div>

      <div className="header-dog" aria-hidden={!revealed}>
        <div className="header-dog-image" role="img" aria-label="Sketch of a fluffy dog holding a sword" />
      </div>
    </header>
  )
}
