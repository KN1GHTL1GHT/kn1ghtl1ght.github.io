import { useEffect, useRef } from 'react'

// Small pieces articles are written with

type FigureProps = {
  src: string
  alt: string
  // The image's pixel size, so its space is reserved before it loads
  // (otherwise lazy-loaded images shift the page and table-of-contents jumps land short)
  width: number
  height: number
  caption?: string
}

// Screenshot or diagram; opens full size in a new tab
export function Figure({ src, alt, width, height, caption }: FigureProps) {
  return (
    <figure className="article-figure">
      <a href={src} target="_blank" rel="noopener noreferrer">
        <img src={src} alt={alt} width={width} height={height} loading="lazy" />
      </a>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

type ClipProps = {
  src: string
  poster: string // first frame, shown while loading and when not autoplaying
  label: string // describes the clip for screen readers
  // Pixel size, so the space is reserved before it loads (like Figure)
  width: number
  height: number
  caption?: string
}

// Short silent screen recording that plays on a loop like a GIF.
// People who ask for reduced motion get a paused first frame with play controls instead.
export function Clip({ src, poster, label, width, height, caption }: ClipProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.controls = true
      return
    }
    // Set muted on the element itself: browsers only allow autoplay for muted video,
    // and React doesn't always reflect the muted prop before playback is attempted
    video.muted = true
    video.play().catch(() => {
      video.controls = true // autoplay blocked; let the reader start it
    })
  }, [])

  return (
    <figure className="article-figure">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        width={width}
        height={height}
        aria-label={label}
        muted
        loop
        playsInline
        preload="metadata"
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

type YouTubeProps = {
  id: string
  title: string
}

export function YouTube({ id, title }: YouTubeProps) {
  return (
    <div className="article-video">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
