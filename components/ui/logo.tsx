import { Film } from 'lucide-react'

interface LogoProps {
  className?: string
  showText?: boolean
}

export function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Film className="h-8 w-8 text-[var(--accent)]" />
      {showText && (
        <span className="text-xl font-bold text-[var(--accent)]">
          MOVIEREVIEW
        </span>
      )}
    </div>
  )
}