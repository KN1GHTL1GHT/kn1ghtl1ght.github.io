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
