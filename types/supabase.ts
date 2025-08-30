// =====================================================
// SUPABASE TYPES FOR MOVIE REVIEW APP
// =====================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          avatar_url: string | null
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      movies: {
        Row: {
          id: string
          title: string
          year: number
          runtime: number | null
          genres: string[]
          languages: string[]
          backdrop_url: string | null
          poster_url: string | null
          trailer_youtube_id: string | null
          rating: number | null
          overview: string | null
          cast: Json | null
          director: string | null
          release_date: string | null
          country: string | null
          age_rating: string | null
          status: 'released' | 'upcoming' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          year: number
          runtime?: number | null
          genres: string[]
          languages: string[]
          backdrop_url?: string | null
          poster_url?: string | null
          trailer_youtube_id?: string | null
          rating?: number | null
          overview?: string | null
          cast?: Json | null
          director?: string | null
          release_date?: string | null
          country?: string | null
          age_rating?: string | null
          status?: 'released' | 'upcoming' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          year?: number
          runtime?: number | null
          genres?: string[]
          languages?: string[]
          backdrop_url?: string | null
          poster_url?: string | null
          trailer_youtube_id?: string | null
          rating?: number | null
          overview?: string | null
          cast?: Json | null
          director?: string | null
          release_date?: string | null
          country?: string | null
          age_rating?: string | null
          status?: 'released' | 'upcoming' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          movie_id: string
          user_id: string
          rating: number
          text: string
          sentiment: 'positive' | 'mixed' | 'negative'
          is_spoiler: boolean
          helpful_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          movie_id: string
          user_id: string
          rating: number
          text: string
          sentiment?: 'positive' | 'mixed' | 'negative'
          is_spoiler?: boolean
          helpful_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          movie_id?: string
          user_id?: string
          rating?: number
          text?: string
          sentiment?: 'positive' | 'mixed' | 'negative'
          is_spoiler?: boolean
          helpful_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      user_preferences: {
        Row: {
          id: string
          user_id: string
          favorite_genres: string[]
          preferred_languages: string[]
          favorite_ott_services: string[]
          min_rating: number | null
          max_runtime: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          favorite_genres?: string[]
          preferred_languages?: string[]
          favorite_ott_services?: string[]
          min_rating?: number | null
          max_runtime?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          favorite_genres?: string[]
          preferred_languages?: string[]
          favorite_ott_services?: string[]
          min_rating?: number | null
          max_runtime?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      watchlist: {
        Row: {
          id: string
          user_id: string
          movie_id: string
          status: 'plan_to_watch' | 'watching' | 'completed' | 'dropped'
          priority: number
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          movie_id: string
          status?: 'plan_to_watch' | 'watching' | 'completed' | 'dropped'
          priority?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          movie_id?: string
          status?: 'plan_to_watch' | 'watching' | 'completed' | 'dropped'
          priority?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      helpful_votes: {
        Row: {
          id: string
          review_id: string
          user_id: string
          is_helpful: boolean
          created_at: string
        }
        Insert: {
          id?: string
          review_id: string
          user_id: string
          is_helpful: boolean
          created_at?: string
        }
        Update: {
          id?: string
          review_id?: string
          user_id?: string
          is_helpful?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_movies_by_genre: {
        Args: {
          genre_name: string
        }
        Returns: {
          id: string
          title: string
          year: number
          rating: number | null
          poster_url: string | null
        }[]
      }
      get_user_recommendations: {
        Args: {
          user_uuid: string
        }
        Returns: {
          id: string
          title: string
          year: number
          rating: number | null
          poster_url: string | null
          match_score: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// =====================================================
// COMMON TYPES FOR THE APP
// =====================================================

export type User = Database['public']['Tables']['users']['Row']
export type Movie = Database['public']['Tables']['movies']['Row']
export type Review = Database['public']['Tables']['reviews']['Row']
export type UserPreference = Database['public']['Tables']['user_preferences']['Row']
export type WatchlistItem = Database['public']['Tables']['watchlist']['Row']
export type HelpfulVote = Database['public']['Tables']['helpful_votes']['Row']

export type UserInsert = Database['public']['Tables']['users']['Insert']
export type MovieInsert = Database['public']['Tables']['movies']['Insert']
export type ReviewInsert = Database['public']['Tables']['reviews']['Insert']
export type UserPreferenceInsert = Database['public']['Tables']['user_preferences']['Insert']
export type WatchlistItemInsert = Database['public']['Tables']['watchlist']['Insert']
export type HelpfulVoteInsert = Database['public']['Tables']['helpful_votes']['Insert']

export type UserUpdate = Database['public']['Tables']['users']['Update']
export type MovieUpdate = Database['public']['Tables']['movies']['Update']
export type ReviewUpdate = Database['public']['Tables']['reviews']['Update']
export type UserPreferenceUpdate = Database['public']['Tables']['user_preferences']['Update']
export type WatchlistItemUpdate = Database['public']['Tables']['watchlist']['Update']
export type HelpfulVoteUpdate = Database['public']['Tables']['helpful_votes']['Update']

// =====================================================
// EXTENDED TYPES WITH RELATIONS
// =====================================================

export interface MovieWithReviews extends Movie {
  reviews: Review[]
  _count?: {
    reviews: number
  }
}

export interface ReviewWithUser extends Review {
  user: Pick<User, 'id' | 'name' | 'avatar_url'>
  movie: Pick<Movie, 'id' | 'title' | 'poster_url'>
}

export interface UserWithPreferences extends User {
  preferences: UserPreference | null
  reviews: Review[]
  watchlist: WatchlistItem[]
}

export interface MovieWithDetails extends Movie {
  reviews: ReviewWithUser[]
  _count?: {
    reviews: number
  }
  averageRating?: number
}

// =====================================================
// OTT SERVICE TYPES (For Perplexity API)
// =====================================================

export interface OTTService {
  name: string
  type: 'stream' | 'rent' | 'buy'
  price?: number
  quality?: 'SD' | 'HD' | '4K'
  regions: string[]
  url?: string
}

export interface OTTAvailability {
  movieId: string
  movieTitle: string
  year: number
  services: OTTService[]
  lastUpdated: string
}

// =====================================================
// API RESPONSE TYPES
// =====================================================

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// =====================================================
// FORM TYPES
// =====================================================

export interface ReviewFormData {
  rating: number
  text: string
  isSpoiler: boolean
}

export interface UserPreferenceFormData {
  favoriteGenres: string[]
  preferredLanguages: string[]
  favoriteOTTServices: string[]
  minRating: number
  maxRuntime: number | null
}

export interface WatchlistFormData {
  status: 'plan_to_watch' | 'watching' | 'completed' | 'dropped'
  priority: number
  notes?: string
}
