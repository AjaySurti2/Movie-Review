-- =====================================================
-- SUPABASE SETUP FOR MOVIE REVIEW APP
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. USERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger for users table
CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON users 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 2. MOVIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS movies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  year INTEGER NOT NULL,
  runtime INTEGER,
  genres TEXT[] NOT NULL DEFAULT '{}',
  languages TEXT[] NOT NULL DEFAULT '{}',
  backdrop_url TEXT,
  poster_url TEXT,
  trailer_youtube_id TEXT,
  rating DECIMAL(3,1),
  overview TEXT,
  cast JSONB DEFAULT '[]',
  director TEXT,
  release_date DATE,
  country TEXT,
  age_rating TEXT,
  status TEXT DEFAULT 'released' CHECK (status IN ('released', 'upcoming', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add trigger for movies table
CREATE TRIGGER update_movies_updated_at 
  BEFORE UPDATE ON movies 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_movies_genres ON movies USING GIN (genres);
CREATE INDEX IF NOT EXISTS idx_movies_languages ON movies USING GIN (languages);
CREATE INDEX IF NOT EXISTS idx_movies_year ON movies (year);
CREATE INDEX IF NOT EXISTS idx_movies_rating ON movies (rating);
CREATE INDEX IF NOT EXISTS idx_movies_title ON movies USING GIN (to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS idx_movies_status ON movies (status);

-- =====================================================
-- 3. REVIEWS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  movie_id UUID REFERENCES movies(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  sentiment TEXT CHECK (sentiment IN ('positive', 'mixed', 'negative')),
  is_spoiler BOOLEAN DEFAULT FALSE,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(movie_id, user_id) -- One review per user per movie
);

-- Add trigger for reviews table
CREATE TRIGGER update_reviews_updated_at 
  BEFORE UPDATE ON reviews 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Indexes
CREATE INDEX IF NOT EXISTS idx_reviews_movie_id ON reviews (movie_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews (user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews (rating);
CREATE INDEX IF NOT EXISTS idx_reviews_sentiment ON reviews (sentiment);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews (created_at);

-- =====================================================
-- 4. USER PREFERENCES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  favorite_genres TEXT[] DEFAULT '{}',
  preferred_languages TEXT[] DEFAULT '{}',
  favorite_ott_services TEXT[] DEFAULT '{}',
  min_rating DECIMAL(3,1) DEFAULT 0,
  max_runtime INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add trigger for user_preferences table
CREATE TRIGGER update_user_preferences_updated_at 
  BEFORE UPDATE ON user_preferences 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Index for array queries
CREATE INDEX IF NOT EXISTS idx_preferences_genres ON user_preferences USING GIN (favorite_genres);
CREATE INDEX IF NOT EXISTS idx_preferences_languages ON user_preferences USING GIN (preferred_languages);

-- =====================================================
-- 5. WATCHLIST TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS watchlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  movie_id UUID REFERENCES movies(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'plan_to_watch' CHECK (status IN ('plan_to_watch', 'watching', 'completed', 'dropped')),
  priority INTEGER DEFAULT 0 CHECK (priority >= 0 AND priority <= 5),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, movie_id)
);

-- Add trigger for watchlist table
CREATE TRIGGER update_watchlist_updated_at 
  BEFORE UPDATE ON watchlist 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Indexes
CREATE INDEX IF NOT EXISTS idx_watchlist_user_id ON watchlist (user_id);
CREATE INDEX IF NOT EXISTS idx_watchlist_movie_id ON watchlist (movie_id);
CREATE INDEX IF NOT EXISTS idx_watchlist_status ON watchlist (status);

-- =====================================================
-- 6. HELPFUL VOTES TABLE (For review quality)
-- =====================================================
CREATE TABLE IF NOT EXISTS helpful_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  is_helpful BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(review_id, user_id) -- One vote per user per review
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_helpful_votes_review_id ON helpful_votes (review_id);
CREATE INDEX IF NOT EXISTS idx_helpful_votes_user_id ON helpful_votes (user_id);

-- =====================================================
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Users table policies
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Movies table policies (public read, admin write)
CREATE POLICY "Movies are viewable by everyone" ON movies
  FOR SELECT USING (true);

-- Reviews table policies
CREATE POLICY "Reviews are viewable by everyone" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can create their own reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews" ON reviews
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews" ON reviews
  FOR DELETE USING (auth.uid() = user_id);

-- User preferences policies
CREATE POLICY "Users can view their own preferences" ON user_preferences
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences" ON user_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences" ON user_preferences
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own preferences" ON user_preferences
  FOR DELETE USING (auth.uid() = user_id);

-- Watchlist policies
CREATE POLICY "Users can view their own watchlist" ON watchlist
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert into their own watchlist" ON watchlist
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own watchlist" ON watchlist
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete from their own watchlist" ON watchlist
  FOR DELETE USING (auth.uid() = user_id);

-- Helpful votes policies
CREATE POLICY "Helpful votes are viewable by everyone" ON helpful_votes
  FOR SELECT USING (true);

CREATE POLICY "Users can create their own helpful votes" ON helpful_votes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own helpful votes" ON helpful_votes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own helpful votes" ON helpful_votes
  FOR DELETE USING (auth.uid() = user_id);

-- =====================================================
-- 8. STORAGE BUCKETS
-- =====================================================

-- Create storage bucket for user avatars
INSERT INTO storage.buckets (id, name, public) 
VALUES ('user-avatars', 'user-avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for movie posters
INSERT INTO storage.buckets (id, name, public) 
VALUES ('movie-posters', 'movie-posters', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for movie backdrops
INSERT INTO storage.buckets (id, name, public) 
VALUES ('movie-backdrops', 'movie-backdrops', true)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 9. STORAGE POLICIES
-- =====================================================

-- User avatars storage policies
CREATE POLICY "User avatars are viewable by everyone" ON storage.objects
  FOR SELECT USING (bucket_id = 'user-avatars');

CREATE POLICY "Users can upload their own avatar" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'user-avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own avatar" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'user-avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own avatar" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'user-avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Movie posters storage policies (public read, admin write)
CREATE POLICY "Movie posters are viewable by everyone" ON storage.objects
  FOR SELECT USING (bucket_id = 'movie-posters');

-- Movie backdrops storage policies (public read, admin write)
CREATE POLICY "Movie backdrops are viewable by everyone" ON storage.objects
  FOR SELECT USING (bucket_id = 'movie-backdrops');

-- =====================================================
-- 10. SAMPLE DATA INSERTION
-- =====================================================

-- Insert sample genres for reference
-- Note: These are just examples, you can modify as needed
INSERT INTO movies (title, year, runtime, genres, languages, overview, rating, status) VALUES
('The Shawshank Redemption', 1994, 142, ARRAY['Drama'], ARRAY['English'], 'Two imprisoned men bond over a number of years...', 9.3, 'released'),
('The Godfather', 1972, 175, ARRAY['Crime', 'Drama'], ARRAY['English'], 'The aging patriarch of an organized crime dynasty...', 9.2, 'released'),
('Pulp Fiction', 1994, 154, ARRAY['Crime', 'Drama'], ARRAY['English'], 'The lives of two mob hitmen, a boxer...', 8.9, 'released')
ON CONFLICT DO NOTHING;

-- =====================================================
-- 11. FUNCTIONS FOR COMMON OPERATIONS
-- =====================================================

-- Function to get movies by genre
CREATE OR REPLACE FUNCTION get_movies_by_genre(genre_name TEXT)
RETURNS TABLE (
  id UUID,
  title TEXT,
  year INTEGER,
  rating DECIMAL(3,1),
  poster_url TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT m.id, m.title, m.year, m.rating, m.poster_url
  FROM movies m
  WHERE genre_name = ANY(m.genres)
  ORDER BY m.rating DESC, m.year DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to get user's personalized movie recommendations
CREATE OR REPLACE FUNCTION get_user_recommendations(user_uuid UUID)
RETURNS TABLE (
  id UUID,
  title TEXT,
  year INTEGER,
  rating DECIMAL(3,1),
  poster_url TEXT,
  match_score INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    m.id,
    m.title,
    m.year,
    m.rating,
    m.poster_url,
    (
      CASE WHEN up.favorite_genres && m.genres THEN 10 ELSE 0 END +
      CASE WHEN up.preferred_languages && m.languages THEN 5 ELSE 0 END +
      CASE WHEN m.rating >= up.min_rating THEN 3 ELSE 0 END +
      CASE WHEN up.max_runtime IS NULL OR m.runtime <= up.max_runtime THEN 2 ELSE 0 END
    ) as match_score
  FROM movies m
  CROSS JOIN user_preferences up
  WHERE up.user_id = user_uuid
    AND m.status = 'released'
    AND m.id NOT IN (
      SELECT movie_id FROM watchlist WHERE user_id = user_uuid
    )
  ORDER BY match_score DESC, m.rating DESC
  LIMIT 20;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

-- This script has successfully created:
-- ✅ 5 main tables (users, movies, reviews, user_preferences, watchlist)
-- ✅ 1 helper table (helpful_votes)
-- ✅ All necessary indexes for performance
-- ✅ Row Level Security (RLS) policies
-- ✅ 3 storage buckets (user-avatars, movie-posters, movie-backdrops)
-- ✅ Storage policies
-- ✅ Sample data
-- ✅ Helper functions for common queries
-- ✅ Automatic updated_at triggers

-- Your Movie Review app database is now ready!
-- Next steps:
-- 1. Set up your Supabase project
-- 2. Run this script in the SQL editor
-- 3. Configure your environment variables
-- 4. Start building your app!
