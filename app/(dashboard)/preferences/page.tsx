'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const genres = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
  'Drama', 'Family', 'Fantasy', 'Horror', 'Music', 'Mystery',
  'Romance', 'Sci-Fi', 'Thriller', 'War', 'Western'
]

const languages = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Japanese',
  'Korean', 'Mandarin', 'Hindi', 'Portuguese', 'Russian', 'Arabic'
]

const ottServices = [
  'Netflix', 'Prime Video', 'Disney+', 'HBO Max', 'Hulu', 'Apple TV+',
  'Paramount+', 'Peacock', 'Showtime', 'Starz'
]

export default function DashboardPreferencesPage() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>(['Action', 'Sci-Fi'])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['English'])
  const [selectedServices, setSelectedServices] = useState<string[]>(['Netflix', 'Prime Video'])

  const toggleSelection = (item: string, list: string[], setter: (items: string[]) => void) => {
    if (list.includes(item)) {
      setter(list.filter(i => i !== item))
    } else {
      setter([...list, item])
    }
  }

  const handleSubmit = async () => {
    // TODO: Save preferences to API
    console.log('Saving preferences:', {
      genres: selectedGenres,
      languages: selectedLanguages,
      ottServices: selectedServices
    })
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="netflix-card p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Your Preferences</h1>
          
          <div className="space-y-8">
            {/* Favorite Genres */}
            <div>
              <label className="text-lg font-semibold mb-4 block">Favorite Genres</label>
              <div className="flex gap-2 flex-wrap">
                {genres.map((genre) => (
                  <Badge
                    key={genre}
                    variant={selectedGenres.includes(genre) ? 'default' : 'outline'}
                    className={`cursor-pointer transition-colors ${
                      selectedGenres.includes(genre)
                        ? 'bg-[var(--accent)] hover:bg-[var(--accent-2)] text-white'
                        : 'border-[var(--border)] text-[var(--text-muted)] hover:text-white hover:border-[var(--accent)]'
                    }`}
                    onClick={() => toggleSelection(genre, selectedGenres, setSelectedGenres)}
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <label className="text-lg font-semibold mb-4 block">Preferred Languages</label>
              <div className="flex gap-2 flex-wrap">
                {languages.map((language) => (
                  <Badge
                    key={language}
                    variant={selectedLanguages.includes(language) ? 'default' : 'outline'}
                    className={`cursor-pointer transition-colors ${
                      selectedLanguages.includes(language)
                        ? 'bg-[var(--accent)] hover:bg-[var(--accent-2)] text-white'
                        : 'border-[var(--border)] text-[var(--text-muted)] hover:text-white hover:border-[var(--accent)]'
                    }`}
                    onClick={() => toggleSelection(language, selectedLanguages, setSelectedLanguages)}
                  >
                    {language}
                  </Badge>
                ))}
              </div>
            </div>

            {/* OTT Services */}
            <div>
              <label className="text-lg font-semibold mb-4 block">Your Streaming Services</label>
              <div className="flex gap-2 flex-wrap">
                {ottServices.map((service) => (
                  <Badge
                    key={service}
                    variant={selectedServices.includes(service) ? 'default' : 'outline'}
                    className={`cursor-pointer transition-colors ${
                      selectedServices.includes(service)
                        ? 'bg-[var(--accent)] hover:bg-[var(--accent-2)] text-white'
                        : 'border-[var(--border)] text-[var(--text-muted)] hover:text-white hover:border-[var(--accent)]'
                    }`}
                    onClick={() => toggleSelection(service, selectedServices, setSelectedServices)}
                  >
                    {service}
                  </Badge>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleSubmit}
              className="w-full bg-[var(--accent)] hover:bg-[var(--accent-2)] text-white h-12 text-lg"
            >
              Save Preferences
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}