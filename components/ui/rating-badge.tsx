interface RatingBadgeProps {
  rating: number
  className?: string
}

export function RatingBadge({ rating, className = "" }: RatingBadgeProps) {
  const getColor = (rating: number) => {
    if (rating >= 8) return 'text-[var(--success)]'
    if (rating >= 6) return 'text-[var(--warning)]'
    return 'text-[var(--accent)]'
  }

  return (
    <div className={`
      flex items-center justify-center
      w-12 h-12 rounded-full
      bg-black/80 backdrop-blur-sm
      border-2 border-white/20
      ${getColor(rating)}
      font-bold text-sm
      ${className}
    `}>
      {rating.toFixed(1)}
    </div>
  )
}