import { HeroCarousel } from '@/components/home/hero-carousel'
import { HorizontalCarousel } from '@/components/movies/horizontal-carousel'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Mock data - in production this would come from your API
const heroMovies = [
  {
    id: '1',
    title: 'Dune: Part Two',
    overview: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    backdropUrl: 'https://images.pexels.com/photos/631954/pexels-photo-631954.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    rating: 8.8
  },
  {
    id: '2',
    title: 'Oppenheimer',
    overview: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    backdropUrl: 'https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    rating: 8.4
  },
  {
    id: '3',
    title: 'The Batman',
    overview: 'When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman must track down the killer.',
    backdropUrl: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    rating: 7.8
  }
]

const trendingMovies = [
  {
    id: '4',
    title: 'Avatar: The Way of Water',
    posterUrl: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    rating: 7.6
  },
  {
    id: '5',
    title: 'Top Gun: Maverick',
    posterUrl: 'https://images.pexels.com/photos/163077/mario-luigi-figures-funny-163077.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    rating: 8.3
  },
  {
    id: '6',
    title: 'Everything Everywhere All at Once',
    posterUrl: 'https://images.pexels.com/photos/1337380/pexels-photo-1337380.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    rating: 7.8
  },
  {
    id: '7',
    title: 'Spider-Man: No Way Home',
    posterUrl: 'https://images.pexels.com/photos/1319854/pexels-photo-1319854.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    rating: 8.2
  },
  {
    id: '8',
    title: 'Black Panther: Wakanda Forever',
    posterUrl: 'https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    rating: 6.7
  }
]

const topPicks = [
  {
    id: '9',
    title: 'Interstellar',
    posterUrl: 'https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    rating: 8.7
  },
  {
    id: '10',
    title: 'Inception',
    posterUrl: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    rating: 8.8
  },
  {
    id: '11',
    title: 'The Dark Knight',
    posterUrl: 'https://images.pexels.com/photos/631954/pexels-photo-631954.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    rating: 9.0
  }
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-white">
      <div className="p-6 space-y-12">
        {/* Hero Section */}
        <HeroCarousel movies={heroMovies} />

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Top Picks Card */}
          <div className="lg:col-span-6">
            <div className="netflix-card p-6">
              <h2 className="text-2xl font-bold mb-6">Top Picks for You</h2>
              <div className="grid grid-cols-2 gap-4">
                {topPicks.slice(0, 4).map((movie) => (
                  <div key={movie.id} className="relative">
                    <div className="aspect-[2/3] rounded-lg overflow-hidden netflix-hover">
                      <Image
                        src={movie.posterUrl}
                        alt={movie.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-sm mt-2 text-center">{movie.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trending Card */}
          <div className="lg:col-span-6">
            <div className="netflix-card p-6">
              <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
              <div className="space-y-4">
                {trendingMovies.slice(0, 3).map((movie, index) => (
                  <div key={movie.id} className="flex items-center gap-4 netflix-hover cursor-pointer p-2 rounded-lg">
                    <div className="text-4xl font-bold text-[var(--accent)] w-12">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{movie.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-sm ${i < Math.floor(movie.rating / 2) ? 'text-[var(--warning)]' : 'text-gray-600'}`}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-[var(--text-muted)]">{movie.rating}/10</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Continue Watching Panel */}
        <div className="netflix-card p-6">
          <h2 className="text-2xl font-bold mb-6">Continue Watching</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trendingMovies.slice(0, 4).map((movie) => (
              <div key={movie.id} className="netflix-hover">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                  <Image
                    src={movie.posterUrl}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 left-2 right-2 h-1 bg-gray-700 rounded-full">
                    <div className="h-full bg-[var(--accent)] rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>
                <h3 className="font-semibold">{movie.title}</h3>
                <p className="text-sm text-[var(--text-muted)]">34 min left</p>
              </div>
            ))}
          </div>
        </div>

        {/* Horizontal Carousels */}
        <HorizontalCarousel title="Action Movies" movies={trendingMovies} />
        <HorizontalCarousel title="Comedy Movies" movies={topPicks} />
        <HorizontalCarousel title="Drama Movies" movies={trendingMovies.slice().reverse()} />
        
        {/* Demo Navigation */}
        <div className="netflix-card p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Demo Navigation</h2>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard/reviews/1">
              <Button className="bg-[var(--accent)] hover:bg-[var(--accent-2)] text-white">
                View Movie Review (Dune)
              </Button>
            </Link>
            <Link href="/dashboard/preferences">
              <Button variant="outline" className="border-[var(--border)] text-[var(--text-muted)] hover:text-white">
                User Preferences
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}