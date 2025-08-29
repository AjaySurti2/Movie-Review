import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { RatingBadge } from '@/components/ui/rating-badge'
import { TrailerPlayer } from '@/components/movies/trailer-player'
import { HorizontalCarousel } from '@/components/movies/horizontal-carousel'
import { Plus, Star, Clock, Globe, Users } from 'lucide-react'

// Mock movie data - in production this would come from your API
const movie = {
  id: '1',
  title: 'Dune: Part Two',
  year: 2024,
  runtime: 166,
  genres: ['Sci-Fi', 'Adventure', 'Drama'],
  language: 'English',
  rating: 8.8,
  overview: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
  backdropUrl: 'https://images.pexels.com/photos/631954/pexels-photo-631954.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop',
  posterUrl: 'https://images.pexels.com/photos/631954/pexels-photo-631954.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
  trailerYoutubeId: 'Way9Dexny3w',
  cast: [
    { name: 'Timothée Chalamet', character: 'Paul Atreides' },
    { name: 'Zendaya', character: 'Chani' },
    { name: 'Rebecca Ferguson', character: 'Lady Jessica' },
    { name: 'Oscar Isaac', character: 'Duke Leto' }
  ]
}

const ottServices = [
  { name: 'Netflix', regions: ['US', 'UK'], logo: '🎬' },
  { name: 'Prime Video', regions: ['US', 'CA', 'UK'], logo: '📺' },
  { name: 'HBO Max', regions: ['US'], logo: '🎭' }
]

const reviews = [
  {
    id: '1',
    user: { name: 'Alice Johnson', avatar: '' },
    rating: 5,
    text: 'Absolutely stunning cinematography and incredible world-building. Villeneuve has crafted a masterpiece.',
    sentiment: 'positive',
    createdAt: new Date('2024-03-15')
  },
  {
    id: '2',
    user: { name: 'Bob Smith', avatar: '' },
    rating: 4,
    text: 'Great sequel that expands the universe beautifully. Some pacing issues but overall excellent.',
    sentiment: 'positive',
    createdAt: new Date('2024-03-12')
  },
  {
    id: '3',
    user: { name: 'Carol Williams', avatar: '' },
    rating: 3,
    text: 'Visually impressive but felt a bit long. Good for sci-fi fans.',
    sentiment: 'mixed',
    createdAt: new Date('2024-03-10')
  }
]

const recommendations = [
  {
    id: '2',
    title: 'Blade Runner 2049',
    posterUrl: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    rating: 8.0
  },
  {
    id: '3',
    title: 'Arrival',
    posterUrl: 'https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    rating: 7.9
  },
  {
    id: '4',
    title: 'Interstellar',
    posterUrl: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    rating: 8.7
  }
]

export default function DashboardMovieDetailPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Hero Header */}
      <div className="relative h-[50vh] overflow-hidden">
        <Image
          src={movie.backdropUrl}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />
        
        <div className="absolute bottom-8 left-8 right-8">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-[var(--accent)] text-white hover:bg-[var(--accent-2)]">
              {movie.title}
            </Badge>
            <p className="text-xl text-[var(--text-muted)] mb-4">
              A visually stunning sci-fi epic that perfectly balances action and character development for fans of thoughtful blockbusters.
            </p>
          </div>
        </div>

        <div className="absolute top-8 right-8">
          <RatingBadge rating={movie.rating} />
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* AI Sentiment Summary */}
        <Card className="netflix-card p-6">
          <h2 className="text-2xl font-bold mb-4">AI Sentiment Summary</h2>
          <p className="text-lg text-[var(--text-muted)] mb-4">
            This high-praise, crowd-pleasing sci-fi epic balances spectacular visuals with deep character moments. 
            Critics and audiences praise its ambitious storytelling and Denis Villeneuve's masterful direction, making it 
            essential viewing for fans of thoughtful blockbusters.
          </p>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary" className="bg-[var(--success)]/20 text-[var(--success)]">Uplifting</Badge>
            <Badge variant="secondary" className="bg-[var(--warning)]/20 text-[var(--warning)]">Character Driven</Badge>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">Visually Stunning</Badge>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">Epic Scale</Badge>
          </div>
        </Card>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column - Movie Meta */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="netflix-card p-6">
              <h3 className="text-xl font-bold mb-4">Movie Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[var(--text-muted)]">
                  <Clock className="h-4 w-4" />
                  <span>{movie.year} • {movie.runtime} min • {movie.language}</span>
                </div>
                
                <div>
                  <p className="text-sm text-[var(--text-muted)] mb-2">Genres</p>
                  <div className="flex gap-2 flex-wrap">
                    {movie.genres.map((genre) => (
                      <Badge key={genre} variant="outline" className="border-[var(--border)] text-[var(--text-muted)]">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-[var(--text-muted)] mb-3">Cast</p>
                  <div className="flex -space-x-2">
                    {movie.cast.slice(0, 4).map((actor, index) => (
                      <Avatar key={index} className="border-2 border-[var(--bg)] w-10 h-10">
                        <AvatarFallback className="bg-[var(--accent)] text-white text-xs">
                          {actor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {movie.cast.length > 4 && (
                      <div className="w-10 h-10 rounded-full bg-[var(--panel)] border-2 border-[var(--bg)] flex items-center justify-center">
                        <span className="text-xs text-[var(--text-muted)]">+{movie.cast.length - 4}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="bg-[var(--accent)] hover:bg-[var(--accent-2)] text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add to List
                  </Button>
                  <Button variant="outline" className="border-[var(--border)] text-[var(--text-muted)] hover:text-white">
                    <Star className="h-4 w-4 mr-2" />
                    Rate
                  </Button>
                </div>
              </div>
            </Card>

            {/* Critics Highlight */}
            <Card className="netflix-card p-6">
              <h3 className="text-xl font-bold mb-4">Critics Highlight</h3>
              <blockquote className="text-[var(--text-muted)] italic">
                "A visionary sequel that expands Herbert's universe with stunning visuals and deep storytelling. 
                Villeneuve delivers a sci-fi masterpiece."
              </blockquote>
              <cite className="text-sm text-[var(--text-muted)] block mt-2">- Rolling Stone</cite>
            </Card>
          </div>

          {/* Right Column - Trailer */}
          <div className="lg:col-span-7">
            <TrailerPlayer 
              youtubeId={movie.trailerYoutubeId}
              title={movie.title}
              posterUrl={movie.posterUrl}
            />
          </div>
        </div>

        {/* OTT Availability */}
        <Card className="netflix-card p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Where to Watch
          </h3>
          <div className="flex gap-3 flex-wrap">
            {ottServices.map((service) => (
              <div key={service.name} className="flex items-center gap-2 bg-[var(--panel-dark)] px-4 py-2 rounded-full">
                <span className="text-xl">{service.logo}</span>
                <span className="font-medium">{service.name}</span>
                <span className="text-xs text-[var(--text-muted)]">
                  {service.regions.join(', ')}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* User Reviews */}
        <Card className="netflix-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Reviews
            </h3>
            <Button className="bg-[var(--accent)] hover:bg-[var(--accent-2)] text-white">
              Write a Review
            </Button>
          </div>
          
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-[var(--border)] pb-4 last:border-0">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-[var(--accent)] text-white">
                      {review.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{review.user.name}</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating 
                                ? 'fill-[var(--warning)] text-[var(--warning)]' 
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          review.sentiment === 'positive' 
                            ? 'border-[var(--success)] text-[var(--success)]'
                            : review.sentiment === 'mixed'
                            ? 'border-[var(--warning)] text-[var(--warning)]'
                            : 'border-[var(--accent)] text-[var(--accent)]'
                        }`}
                      >
                        {review.sentiment}
                      </Badge>
                    </div>
                    <p className="text-[var(--text-muted)]">{review.text}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-2">
                      {review.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recommendations */}
        <HorizontalCarousel title="More Like This" movies={recommendations} />
      </div>
    </div>
  )
}