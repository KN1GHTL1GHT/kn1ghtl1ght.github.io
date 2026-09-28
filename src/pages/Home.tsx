import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import aboutPhoto from '../assets/about-photo.jpg'
import './Home.scss'

const FOCUS_AREAS = ['Full-Stack Development', 'Mobile Development', 'Cloud Integration', 'AI/ML Integration']

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
            Hello! I'm Amogh, a software engineer based in Portland, Oregon. I specialize in building full-stack
            applications with a strong focus on mobile development and cloud integration. My approach to software
            engineering combines technical precision with user-centered design, always striving to create solutions
            that are both powerful and intuitive. I'm particularly skilled at integrating complex systems—from Google
            Cloud APIs to machine learning frameworks—while maintaining clean, maintainable code.
          </p>
          <p>
            When I'm not coding, you'll find me cheering on my favorite sports teams (Trailblazers and Seahawks),
            exploring Portland's incredible food scene, or spending time with my dog. I believe the best software comes
            from developers who maintain balance and curiosity in all aspects of life. My strengths lie in rapid
            prototyping, problem-solving under constraints, and bridging the gap between technical capabilities and user
            needs. Whether it's Android development in Kotlin, building scalable web applications, or integrating AI/ML
            features, I thrive on turning complex challenges into elegant solutions. Check out my{' '}
            <Link to="/portfolio">portfolio</Link> and <Link to="/devlogs">devlogs</Link> to see what I've been building!
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
        </div>
      </section>
    </main>
  )
}
