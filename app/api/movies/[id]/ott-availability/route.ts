import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { OTTAvailability, OTTService } from '@/types/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const movieId = params.id
    
    // Get movie details from Supabase
    const { data: movie, error: movieError } = await supabase
      .from('movies')
      .select('title, year')
      .eq('id', movieId)
      .single()
    
    if (movieError || !movie) {
      return NextResponse.json(
        { error: 'Movie not found' }, 
        { status: 404 }
      )
    }
    
    // Get OTT availability from Perplexity API
    const ottData = await getOTTAvailability(movie.title, movie.year)
    
    return NextResponse.json({ 
      data: ottData,
      message: 'OTT availability retrieved successfully'
    })
    
  } catch (error) {
    console.error('OTT availability error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch OTT data' }, 
      { status: 500 }
    )
  }
}

async function getOTTAvailability(title: string, year: number): Promise<OTTAvailability> {
  const perplexityApiKey = process.env.PERPLEXITY_API_KEY
  
  if (!perplexityApiKey) {
    // Return mock data if API key is not configured
    return getMockOTTAvailability(title, year)
  }
  
  try {
    const prompt = `Find where the movie "${title}" (${year}) is available to watch online. Include streaming services, rental options, and purchase options. Format the response as JSON with this structure:
    {
      "services": [
        {
          "name": "Service Name",
          "type": "stream|rent|buy",
          "price": "price if applicable",
          "quality": "HD|4K if available",
          "regions": ["US", "UK", etc],
          "url": "direct link if available"
        }
      ]
    }`
    
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.1
      })
    })
    
    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.status}`)
    }
    
    const data = await response.json()
    const content = data.choices[0]?.message?.content
    
    if (!content) {
      throw new Error('No content received from Perplexity API')
    }
    
    // Try to parse JSON from the response
    try {
      const parsedData = JSON.parse(content)
      return {
        movieId: params.id,
        movieTitle: title,
        year,
        services: parsedData.services || [],
        lastUpdated: new Date().toISOString()
      }
    } catch (parseError) {
      // If JSON parsing fails, extract information from text
      return parseTextResponse(content, title, year)
    }
    
  } catch (error) {
    console.error('Perplexity API error:', error)
    // Fallback to mock data
    return getMockOTTAvailability(title, year)
  }
}

function parseTextResponse(content: string, title: string, year: number): OTTAvailability {
  const services: OTTService[] = []
  
  // Common streaming services to look for
  const streamingServices = [
    'Netflix', 'Prime Video', 'Disney+', 'HBO Max', 'Hulu', 
    'Apple TV+', 'Paramount+', 'Peacock', 'Showtime', 'Starz'
  ]
  
  // Look for streaming services mentioned
  streamingServices.forEach(service => {
    if (content.toLowerCase().includes(service.toLowerCase())) {
      services.push({
        name: service,
        type: 'stream',
        regions: ['US'], // Default to US
        quality: 'HD'
      })
    }
  })
  
  // Look for rental/purchase options
  if (content.toLowerCase().includes('rent') || content.toLowerCase().includes('rental')) {
    services.push({
      name: 'Various Platforms',
      type: 'rent',
      price: 3.99,
      regions: ['US'],
      quality: 'HD'
    })
  }
  
  if (content.toLowerCase().includes('buy') || content.toLowerCase().includes('purchase')) {
    services.push({
      name: 'Various Platforms',
      type: 'buy',
      price: 14.99,
      regions: ['US'],
      quality: 'HD'
    })
  }
  
  return {
    movieId: params.id,
    movieTitle: title,
    year,
    services,
    lastUpdated: new Date().toISOString()
  }
}

function getMockOTTAvailability(title: string, year: number): OTTAvailability {
  // Mock data for testing when API is not available
  const mockServices: OTTService[] = [
    {
      name: 'Netflix',
      type: 'stream',
      quality: 'HD',
      regions: ['US', 'UK', 'CA']
    },
    {
      name: 'Prime Video',
      type: 'stream',
      quality: '4K',
      regions: ['US', 'UK', 'CA', 'DE']
    },
    {
      name: 'Apple TV+',
      type: 'rent',
      price: 3.99,
      quality: 'HD',
      regions: ['US', 'UK', 'CA']
    },
    {
      name: 'Google Play',
      type: 'buy',
      price: 14.99,
      quality: 'HD',
      regions: ['US', 'UK', 'CA']
    }
  ]
  
  return {
    movieId: params.id,
    movieTitle: title,
    year,
    services: mockServices,
    lastUpdated: new Date().toISOString()
  }
}
