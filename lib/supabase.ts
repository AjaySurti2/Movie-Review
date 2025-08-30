import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

// Environment variables - make sure to add these to your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Create Supabase client with TypeScript support
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// =====================================================
// HELPER FUNCTIONS FOR COMMON OPERATIONS
// =====================================================

// User Management
export const userService = {
  // Get current user
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  // Get user profile
  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  },

  // Update user profile
  async updateUserProfile(userId: string, updates: Partial<Database['public']['Tables']['users']['Update']>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Upload user avatar
  async uploadAvatar(userId: string, file: File) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}.${fileExt}`
    
    const { data, error } = await supabase.storage
      .from('user-avatars')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      })
    
    if (error) throw error
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('user-avatars')
      .getPublicUrl(fileName)
    
    return publicUrl
  }
}

// Movie Management
export const movieService = {
  // Get all movies with pagination
  async getMovies(page = 1, limit = 20, filters?: {
    genres?: string[]
    languages?: string[]
    minRating?: number
    maxRuntime?: number
  }) {
    let query = supabase
      .from('movies')
      .select('*', { count: 'exact' })
      .eq('status', 'released')
      .order('rating', { ascending: false })
      .range((page - 1) * limit, page * limit - 1)

    if (filters?.genres?.length) {
      query = query.overlaps('genres', filters.genres)
    }
    
    if (filters?.languages?.length) {
      query = query.overlaps('languages', filters.languages)
    }
    
    if (filters?.minRating) {
      query = query.gte('rating', filters.minRating)
    }
    
    if (filters?.maxRuntime) {
      query = query.lte('runtime', filters.maxRuntime)
    }

    const { data, error, count } = await query
    if (error) throw error
    
    return {
      data: data || [],
      total: count || 0,
      page,
      limit,
      hasMore: (count || 0) > page * limit
    }
  },

  // Get movie by ID with reviews
  async getMovieById(movieId: string) {
    const { data, error } = await supabase
      .from('movies')
      .select(`
        *,
        reviews (
          *,
          user:users(id, name, avatar_url)
        )
      `)
      .eq('id', movieId)
      .single()
    
    if (error) throw error
    return data
  },

  // Search movies by title
  async searchMovies(query: string, page = 1, limit = 20) {
    const { data, error, count } = await supabase
      .from('movies')
      .select('*', { count: 'exact' })
      .textSearch('title', query)
      .eq('status', 'released')
      .order('rating', { ascending: false })
      .range((page - 1) * limit, page * limit - 1)
    
    if (error) throw error
    
    return {
      data: data || [],
      total: count || 0,
      page,
      limit,
      hasMore: (count || 0) > page * limit
    }
  },

  // Get movies by genre using the custom function
  async getMoviesByGenre(genre: string) {
    const { data, error } = await supabase
      .rpc('get_movies_by_genre', { genre_name: genre })
    
    if (error) throw error
    return data
  }
}

// Review Management
export const reviewService = {
  // Create a review
  async createReview(review: Database['public']['Tables']['reviews']['Insert']) {
    const { data, error } = await supabase
      .from('reviews')
      .insert(review)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update a review
  async updateReview(reviewId: string, updates: Database['public']['Tables']['reviews']['Update']) {
    const { data, error } = await supabase
      .from('reviews')
      .update(updates)
      .eq('id', reviewId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete a review
  async deleteReview(reviewId: string) {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId)
    
    if (error) throw error
  },

  // Get reviews for a movie
  async getMovieReviews(movieId: string, page = 1, limit = 10) {
    const { data, error, count } = await supabase
      .from('reviews')
      .select(`
        *,
        user:users(id, name, avatar_url)
      `, { count: 'exact' })
      .eq('movie_id', movieId)
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1)
    
    if (error) throw error
    
    return {
      data: data || [],
      total: count || 0,
      page,
      limit,
      hasMore: (count || 0) > page * limit
    }
  },

  // Vote on review helpfulness
  async voteReviewHelpful(reviewId: string, userId: string, isHelpful: boolean) {
    const { data, error } = await supabase
      .from('helpful_votes')
      .upsert({
        review_id: reviewId,
        user_id: userId,
        is_helpful: isHelpful
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// User Preferences
export const preferenceService = {
  // Get user preferences
  async getUserPreferences(userId: string) {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows returned
    return data
  },

  // Create or update user preferences
  async upsertUserPreferences(preferences: Database['public']['Tables']['user_preferences']['Insert']) {
    const { data, error } = await supabase
      .from('user_preferences')
      .upsert(preferences)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Get personalized recommendations
  async getUserRecommendations(userId: string) {
    const { data, error } = await supabase
      .rpc('get_user_recommendations', { user_uuid: userId })
    
    if (error) throw error
    return data
  }
}

// Watchlist Management
export const watchlistService = {
  // Add movie to watchlist
  async addToWatchlist(watchlistItem: Database['public']['Tables']['watchlist']['Insert']) {
    const { data, error } = await supabase
      .from('watchlist')
      .insert(watchlistItem)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update watchlist item
  async updateWatchlistItem(id: string, updates: Database['public']['Tables']['watchlist']['Update']) {
    const { data, error } = await supabase
      .from('watchlist')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Remove from watchlist
  async removeFromWatchlist(userId: string, movieId: string) {
    const { error } = await supabase
      .from('watchlist')
      .delete()
      .eq('user_id', userId)
      .eq('movie_id', movieId)
    
    if (error) throw error
  },

  // Get user's watchlist
  async getUserWatchlist(userId: string) {
    const { data, error } = await supabase
      .from('watchlist')
      .select(`
        *,
        movie:movies(*)
      `)
      .eq('user_id', userId)
      .order('priority', { ascending: false })
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }
}

// Storage Management
export const storageService = {
  // Upload movie poster
  async uploadMoviePoster(movieId: string, file: File) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${movieId}.${fileExt}`
    
    const { data, error } = await supabase.storage
      .from('movie-posters')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      })
    
    if (error) throw error
    
    const { data: { publicUrl } } = supabase.storage
      .from('movie-posters')
      .getPublicUrl(fileName)
    
    return publicUrl
  },

  // Upload movie backdrop
  async uploadMovieBackdrop(movieId: string, file: File) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${movieId}.${fileExt}`
    
    const { data, error } = await supabase.storage
      .from('movie-backdrops')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      })
    
    if (error) throw error
    
    const { data: { publicUrl } } = supabase.storage
      .from('movie-backdrops')
      .getPublicUrl(fileName)
    
    return publicUrl
  }
}

export default supabase
