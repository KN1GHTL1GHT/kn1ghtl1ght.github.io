import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowTurnUp,
  faBook,
  faChessKnight,
  faEnvelope,
  faHome,
  faLaptopCode,
  faUser,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import './Navbar.scss'

type Phase = 'idle' | 'expanding' | 'expanded' | 'collapsing' | 'cubeCollapsing'

// Show ul after cube expands width and height (0.3s + 0.5s + 0.5s)
const EXPAND_MS = 1300
// Start cube collapse after navbar fades
const CUBE_COLLAPSE_DELAY_MS = 600
// Total collapse time (0.6s + 0.5s + 0.5s + 0.3s)
const COLLAPSE_MS = 1900

// Y angles (deg) the spinning cube pauses at while hovered, and the tolerance
const STOP_ANGLES = [40, 130, 220, 310]
const STOP_TOLERANCE = 5

const LINKS: { to: string; label: string; icon: IconDefinition }[] = [
  { to: '/', label: 'HOME', icon: faHome },
  { to: '/about', label: 'ABOUT', icon: faUser },
  { to: '/portfolio', label: 'PORTFOLIO', icon: faLaptopCode },
  { to: '/devlogs', label: 'DEVLOGS', icon: faBook },
  { to: '/contact', label: 'CONTACT', icon: faEnvelope },
]

function getRotationY(matrix: DOMMatrix): number {
  // Extract Y rotation from 3D transform matrix
  return Math.atan2(matrix.m13, matrix.m33) * (180 / Math.PI)
}

export default function Navbar() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [rotationPaused, setRotationPaused] = useState(false)

  // The rAF loop is started once, so it reads live values through refs
  const phaseRef = useRef(phase)
  const hoveringRef = useRef(false)
  const cubeRef = useRef<HTMLDivElement>(null)
  const timeoutsRef = useRef<number[]>([])

  useEffect(() => {
    phaseRef.current = phase
  }, [phase])

  useEffect(() => {
    let frameId: number

    const checkRotation = () => {
      const cube = cubeRef.current
      if (cube && hoveringRef.current && phaseRef.current === 'idle') {
        const transform = getComputedStyle(cube).transform
        if (transform && transform !== 'none') {
          // Normalize to 0-360 range
          const y = ((getRotationY(new DOMMatrix(transform)) % 360) + 360) % 360
          if (STOP_ANGLES.some((angle) => Math.abs(y - angle) < STOP_TOLERANCE)) {
            setRotationPaused(true)
          }
        }
      }
      frameId = requestAnimationFrame(checkRotation)
    }

    checkRotation()
    return () => cancelAnimationFrame(frameId)
  }, [])

  useEffect(() => {
    const timeouts = timeoutsRef.current
    return () => timeouts.forEach(clearTimeout)
  }, [])

  const schedule = (fn: () => void, ms: number) => {
    timeoutsRef.current.push(window.setTimeout(fn, ms))
  }

  const onCubeHover = (hovering: boolean) => {
    hoveringRef.current = hovering
    if (!hovering) setRotationPaused(false)
  }

  const toggleMenu = () => {
    // Ignore clicks while an expand/collapse animation is running
    if (phase === 'idle') {
      setPhase('expanding')
      schedule(() => setPhase('expanded'), EXPAND_MS)
    } else if (phase === 'expanded') {
      setPhase('collapsing')
      schedule(() => setPhase('cubeCollapsing'), CUBE_COLLAPSE_DELAY_MS)
      schedule(() => setPhase('idle'), COLLAPSE_MS)
    }
  }

  const isExpanded = phase === 'expanded'

  return (
    <nav className={clsx('navbar', isExpanded && 'expanded')}>
      <div
        className={clsx(
          'cube-trigger',
          phase === 'expanding' && 'expanding',
          phase === 'cubeCollapsing' && 'collapsing',
        )}
        onClick={toggleMenu}
        onMouseEnter={() => onCubeHover(true)}
        onMouseLeave={() => onCubeHover(false)}
      >
        {/* 3D Cube for rotation (hidden during expansion) */}
        <div
          ref={cubeRef}
          className={clsx(
            'cube-container',
            phase === 'idle' && 'rotating',
            rotationPaused && 'paused',
            phase !== 'idle' && 'hidden',
          )}
        >
          <div className="cube-face front">
            <span className="initials">AP</span>
          </div>
          <div className="cube-face back">
            <span className="initials">AP</span>
          </div>
          <div className="cube-face left">
            <span className="icon">
              <FontAwesomeIcon icon={faChessKnight} />
            </span>
          </div>
          <div className="cube-face right">
            <span className="icon">
              <FontAwesomeIcon icon={faChessKnight} />
            </span>
          </div>
          <div className="cube-face top"></div>
        </div>

        {/* Isometric cube for expansion (shown during expansion, no content) */}
        <div
          className={clsx(
            'isometric-cube',
            phase === 'expanding' && 'expanding-iso',
            (phase === 'expanded' || phase === 'collapsing') && 'expanded-iso',
            phase === 'cubeCollapsing' && 'collapsing-iso',
          )}
        ></div>
      </div>

      <ul className={clsx(isExpanded && 'show')}>
        {LINKS.map(({ to, label, icon }, index) => (
          <li key={to} style={{ '--i': LINKS.length - index } as CSSProperties}>
            <Link to={to} onClick={toggleMenu}>
              <span className="icon">
                <FontAwesomeIcon icon={icon} />
              </span>
              <span className="label">{label}</span>
            </Link>
          </li>
        ))}
      </ul>

      {isExpanded && (
        <div className="collapse-btn" onClick={toggleMenu}>
          <span className="icon">
            <FontAwesomeIcon icon={faArrowTurnUp} />
          </span>
        </div>
      )}
    </nav>
  )
}
