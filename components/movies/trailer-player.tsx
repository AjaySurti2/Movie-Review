'use client'

interface TrailerPlayerProps {
  youtubeId?: string
  title: string
  posterUrl: string
}

export function TrailerPlayer({ youtubeId, title, posterUrl }: TrailerPlayerProps) {
  if (!youtubeId) {
    return (
      <div className="aspect-video rounded-xl overflow-hidden bg-[var(--panel)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-[var(--panel-dark)] rounded-xl flex items-center justify-center mb-4 mx-auto">
            <span className="text-[var(--text-muted)] text-2xl">🎬</span>
          </div>
          <p className="text-[var(--text-muted)]">No trailer available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="aspect-video rounded-xl overflow-hidden">
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?rel=0&showinfo=0&modestbranding=1`}
        title={`${title} Trailer`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  )
}