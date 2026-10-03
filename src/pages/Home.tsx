import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons'
import aboutPhoto from '../assets/about-photo.jpg'
import './Home.scss'

const FOCUS_AREAS = ['Human-in-the-Loop Design', 'Frontend Engineering', 'UX Research', 'Interactive Systems']

// Served from public/; replace that file to update it
const RESUME_URL = `${import.meta.env.BASE_URL}Amogh_Patki_Resume.pdf`

const LINKS = [
  { href: 'https://github.com/KN1GHTL1GHT', label: 'GitHub', icon: faGithub },
  { href: 'https://linkedin.com/in/amogh-patki', label: 'LinkedIn', icon: faLinkedin },
]

export default function Home() {
  return (
    <main className="home">
      <section className="about" aria-labelledby="about-label">
        <h2 id="about-label" className="section-label">About</h2>

        <img className="about-photo" src={aboutPhoto} alt="Selfie in Barcelona" />

        <div className="about-body">
          <p>
            Hi! I'm Amogh, a UX engineer and HCI master's student at the University of Maryland. I design and build
            interfaces for people doing skilled, high-stakes work, with a focus on how experts actually use their tools:
            the habits in their hands, the attention they can spare, and what happens when automation gets it wrong.
          </p>
          <p>
            Most recently, I built the human review layer for an AI construction takeoff platform, turning an AI's first
            draft into something estimators could check and correct at full speed. Before that, I studied software
            engineering and game development, and I now run a solo indie studio where I build games in Rust,
            experimenting with AI-driven development along the way. Games taught me that good interaction design is felt
            before it's understood, and that lesson shapes everything I build.
          </p>
          <p>
            I'm especially interested in human factors and operator interfaces: tools where a person and a system share
            the work, and the interface decides whether that partnership holds up under pressure.
          </p>
          <p>
            Outside of work, I'm cheering on the Trail Blazers and Seahawks, cooking, or spending time with my dog.
          </p>
          <p>
            Check out my <Link to="/portfolio">portfolio</Link> and <Link to="/devlogs">devlogs</Link> to see what I've
            been building.
          </p>

          <ul className="about-focus">
            {FOCUS_AREAS.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>

        <div className="about-links">
          {LINKS.map(({ href, label, icon }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="link-button">
              <FontAwesomeIcon icon={icon} />
              <span>{label}</span>
            </a>
          ))}
          <a href={RESUME_URL} download className="link-button">
            <FontAwesomeIcon icon={faFileArrowDown} />
            <span>Resume</span>
          </a>
        </div>
      </section>
    </main>
  )
}
