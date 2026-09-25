import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type TransitionEvent,
} from 'react'
import { Link } from 'react-router'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBook,
  faChessKnight,
  faHome,
  faLaptopCode,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import './Navbar.scss'

// Each phase ends on a CSS transitionend, so the timing lives in Navbar.scss:
// idle -> settling (cube morphs into the box) -> expanding (box grows) -> expanded (menu fades in)
// -> collapsing (menu fades out) -> cubeCollapsing (box shrinks) -> unsettling (box morphs into the cube) -> idle
type Phase =
  | 'idle'
  | 'settling'
  | 'expanding'
  | 'expanded'
  | 'collapsing'
  | 'cubeCollapsing'
  | 'unsettling'

const BOX_PHASES: Phase[] = ['expanding', 'expanded', 'collapsing', 'cubeCollapsing']

// While hovered, the spin pauses when it passes a corner (every 90deg from the resting angle)
const STOP_TOLERANCE = 5

const LINKS: { to: string; label: string; icon: IconDefinition }[] = [
  { to: '/', label: 'HOME', icon: faHome },
  { to: '/portfolio', label: 'PORTFOLIO', icon: faLaptopCode },
  { to: '/devlogs', label: 'DEVLOGS', icon: faBook },
]

function mod(n: number, m: number): number {
  return ((n % m) + m) % m
}

function getRotationY(matrix: DOMMatrix): number {
  // Y rotation of rotateX(a) rotateY(b), unaffected by the X tilt
  return Math.atan2(matrix.m31, matrix.m11) * (180 / Math.PI)
}

export default function Navbar() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [rotationPaused, setRotationPaused] = useState(false)

  // The rAF loop is started once, so it reads live values through refs
  const phaseRef = useRef(phase)
  const hoveringRef = useRef(false)
  // Whether the cube settles on its back face (half a turn from rest) instead of its front
  const flippedRef = useRef(false)
  const restYRef = useRef(0)
  const navRef = useRef<HTMLElement>(null)
  const cubeRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    phaseRef.current = phase
  }, [phase])

  // Measure the menu so the box grows to exactly its size
  useLayoutEffect(() => {
    const nav = navRef.current
    const menu = menuRef.current
    if (!nav || !menu) return

    restYRef.current = parseFloat(getComputedStyle(nav).getPropertyValue('--cube-rest-y'))

    const measure = () => {
      // Computed size is unrounded and ignores the skew
      const { width, height } = getComputedStyle(menu)
      nav.style.setProperty('--menu-width', width)
      nav.style.setProperty('--menu-height', height)
    }
    measure()
    // Re-measure when the size changes, e.g. once the font loads
    const observer = new ResizeObserver(measure)
    observer.observe(menu)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let frameId: number

    const checkRotation = () => {
      const cube = cubeRef.current
      if (cube && hoveringRef.current && phaseRef.current === 'idle') {
        const transform = getComputedStyle(cube).transform
        if (transform && transform !== 'none') {
          const offset = mod(getRotationY(new DOMMatrix(transform)) - restYRef.current, 90)
          if (offset < STOP_TOLERANCE || offset > 90 - STOP_TOLERANCE) {
            setRotationPaused(true)
          }
        }
      }
      frameId = requestAnimationFrame(checkRotation)
    }

    checkRotation()
    return () => cancelAnimationFrame(frameId)
  }, [])

  // Drive the cube's inline transform for the morphs
  useLayoutEffect(() => {
    const cube = cubeRef.current
    if (!cube) return
    const flip = flippedRef.current ? ' rotateY(180deg)' : ''

    if (phase === 'settling') {
      // Commit the frozen pose so the transition starts from it
      cube.getBoundingClientRect()
      cube.style.transition = ''
      cube.style.transform = `var(--cube-box)${flip}`
    } else if (phase === 'unsettling') {
      cube.style.transform = `var(--cube-rest)${flip}`
    } else if (phase === 'idle') {
      // Half a turn from rest looks identical, so dropping the flip here is invisible
      cube.style.transform = ''
    }
  }, [phase])

  const onCubeHover = (hovering: boolean) => {
    hoveringRef.current = hovering
    if (!hovering) setRotationPaused(false)
  }

  // Both ignore clicks while an expand/collapse animation is running
  const openMenu = () => {
    if (phase !== 'idle') return
    const cube = cubeRef.current
    if (!cube) return
    // Freeze the spin where it is, then morph from there to whichever face is nearer
    const transform = getComputedStyle(cube).transform
    const turns = Math.round((getRotationY(new DOMMatrix(transform)) - restYRef.current) / 180)
    flippedRef.current = mod(turns, 2) === 1
    cube.style.transition = 'none'
    cube.style.transform = transform
    setPhase('settling')
  }

  const closeMenu = () => {
    if (phase === 'expanded') setPhase('collapsing')
  }

  // While open, a click anywhere outside the navbar closes it
  useEffect(() => {
    if (phase !== 'expanded') return
    const onDocumentClick = (e: MouseEvent) => {
      const nav = navRef.current
      const target = e.target as Node
      // The nav element itself is just the transparent box around the menu
      if (nav && target !== nav && nav.contains(target)) return
      setPhase('collapsing')
    }
    document.addEventListener('click', onDocumentClick)
    return () => document.removeEventListener('click', onDocumentClick)
  }, [phase])

  const onCubeTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return
    if (phase === 'settling') setPhase('expanding')
    else if (phase === 'unsettling') setPhase('idle')
  }

  const onBoxTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return
    if (phase === 'expanding' && e.propertyName === 'height') setPhase('expanded')
    else if (phase === 'cubeCollapsing' && e.propertyName === 'width') setPhase('unsettling')
  }

  const onMenuTransitionEnd = (e: TransitionEvent<HTMLUListElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== 'opacity') return
    if (phase === 'collapsing') setPhase('cubeCollapsing')
  }

  const isExpanded = phase === 'expanded'
  const showBox = BOX_PHASES.includes(phase)

  return (
    <div className="navbar-anchor">
      <nav ref={navRef} className={clsx('navbar', isExpanded && 'expanded')}>
        <div
          className={clsx('cube-trigger', phase === 'idle' && 'interactive')}
          onClick={openMenu}
          onMouseEnter={() => onCubeHover(true)}
          onMouseLeave={() => onCubeHover(false)}
        >
          {/* 3D Cube for rotation (hidden while the box is shown) */}
          <div
            ref={cubeRef}
            className={clsx(
              'cube-container',
              phase === 'idle' && 'rotating',
              rotationPaused && 'paused',
              (phase === 'settling' || phase === 'unsettling') && 'morphing',
              phase === 'settling' && 'blank',
              showBox && 'hidden',
            )}
            onTransitionEnd={onCubeTransitionEnd}
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

          {/* Isometric box that grows into the menu (no content) */}
          <div
            className={clsx(
              'isometric-cube',
              showBox && 'visible',
              (phase === 'expanding' || phase === 'expanded' || phase === 'collapsing') && 'open',
              phase === 'cubeCollapsing' && 'closing',
            )}
            onTransitionEnd={onBoxTransitionEnd}
          ></div>
        </div>

        <ul ref={menuRef} className={clsx(isExpanded && 'show')} onTransitionEnd={onMenuTransitionEnd}>
          {LINKS.map(({ to, label, icon }, index) => (
            <li key={to} style={{ '--i': LINKS.length - index } as CSSProperties}>
              <Link to={to} onClick={closeMenu}>
                <span className="icon">
                  <FontAwesomeIcon icon={icon} />
                </span>
                <span className="label">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
