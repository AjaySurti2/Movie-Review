'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PosterCard } from './poster-card'

interface Movie {
  id: string
  title: string
  posterUrl: string
  rating: number
}

interface HorizontalCarouselProps {
  title: string
  movies: Movie[]
  className?: string
}

export function HorizontalCarousel({ title, movies, className = "" }: HorizontalCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('left')}
            className="h-8 w-8 bg-white/10 hover:bg-white/20 focus-ring"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('right')}
            className="h-8 w-8 bg-white/10 hover:bg-white/20 focus-ring"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative">
        <ScrollArea>
          <div
            ref={scrollRef}
            className="flex space-x-4 pb-4 overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {movies.map((movie) => (
              <PosterCard
                key={movie.id}
                movie={movie}
                className="flex-none w-48"
              />
            ))}
          </div>
        </ScrollArea>
        
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-[var(--bg)] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-[var(--bg)] to-transparent pointer-events-none" />
      </div>
    </section>
  )
}