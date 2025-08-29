'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Play, Plus, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RatingBadge } from '@/components/ui/rating-badge'

interface Movie {
  id: string
  title: string
  posterUrl: string
  rating: number
}

interface PosterCardProps {
  movie: Movie
  className?: string
}

export function PosterCard({ movie, className = "" }: PosterCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative group cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden">
        <Image
          src={movie.posterUrl}
          alt={movie.title}
          fill
          className="object-cover"
        />
        
        {/* Rating Badge */}
        <div className="absolute top-2 right-2">
          <RatingBadge rating={movie.rating} className="w-10 h-10 text-xs" />
        </div>

        {/* Hover Actions */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4"
            >
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-white font-bold text-sm mb-2 line-clamp-2">
                    {movie.title}
                  </h3>
                </div>
                <div className="flex space-x-1">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-white/20">
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-white/20">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Link href={`/dashboard/reviews/${movie.id}`}>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-white/20">
                      <Info className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}