import { useEffect, type RefObject } from 'react'

type Options = {
  // What to do instead when the reader prefers reduced motion or the browser blocks autoplay
  showControlsIfNotPlaying?: boolean
}

// Plays a short silent clip on a loop, like a GIF. People who ask for reduced motion get the
// paused first frame (the poster) instead.
export function useAutoplay(videoRef: RefObject<HTMLVideoElement | null>, { showControlsIfNotPlaying = false }: Options = {}) {
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.controls = showControlsIfNotPlaying
      return
    }
    // Set muted on the element itself: browsers only allow autoplay for muted video,
    // and React doesn't always reflect the muted prop before playback is attempted
    video.muted = true
    video.play().catch(() => {
      video.controls = showControlsIfNotPlaying // autoplay blocked
    })
  }, [videoRef, showControlsIfNotPlaying])
}
