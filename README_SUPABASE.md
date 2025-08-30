# 🎬 Movie Review App - Supabase Backend

## 🚀 Quick Start

Your Movie Review app is now configured to use **Supabase** as the backend instead of Prisma/SQLite. This gives you:

- **Real-time database** with PostgreSQL
- **Built-in authentication** 
- **File storage** for images
- **Row-level security** for data protection
- **Dynamic OTT data** via Perplexity API

## 📁 Files Created

```
├── supabase-setup.sql          # Complete database setup script
├── types/supabase.ts           # TypeScript types for Supabase
├── lib/supabase.ts             # Supabase client & service functions
├── app/api/movies/[id]/ott-availability/route.ts  # OTT API route
├── SUPABASE_SETUP_GUIDE.md     # Step-by-step setup guide
└── README_SUPABASE.md          # This file
```

## 🔧 Setup Steps

### 1. Install Supabase Dependency
```bash
npm install @supabase/supabase-js
```

### 2. Create Supabase Project
- Go to [supabase.com](https://supabase.com)
- Create new project
- Wait for setup to complete

### 3. Run Database Setup
- Copy `supabase-setup.sql` content
- Paste in Supabase SQL Editor
- Click **Run**

### 4. Configure Environment
Create `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
PERPLEXITY_API_KEY=your_perplexity_key  # Optional
```

## 🗄️ Database Schema

### Tables Created:
- **`users`** - User profiles and authentication
- **`movies`** - Movie information with arrays for genres/languages
- **`reviews`** - User reviews with sentiment analysis
- **`user_preferences`** - Personalized settings
- **`watchlist`** - User's movie lists
- **`helpful_votes`** - Review quality voting

### Key Features:
- **Array fields** for genres, languages, OTT services
- **JSON fields** for cast information
- **Automatic timestamps** with triggers
- **Performance indexes** for fast queries
- **Row-level security** policies

## 🔐 Authentication

Supabase handles authentication automatically. Users can:
- Sign up with email/password
- Sign in securely
- Access protected routes
- Manage their profiles

## 📱 API Services

### User Management
```typescript
import { userService } from '@/lib/supabase'

// Get current user
const user = await userService.getCurrentUser()

// Update profile
await userService.updateUserProfile(userId, { name: 'New Name' })

// Upload avatar
const avatarUrl = await userService.uploadAvatar(userId, file)
```

### Movie Operations
```typescript
import { movieService } from '@/lib/supabase'

// Get movies with filters
const movies = await movieService.getMovies(1, 20, {
  genres: ['Action', 'Sci-Fi'],
  minRating: 7.0
})

// Search movies
const results = await movieService.searchMovies('Dune', 1, 20)

// Get movie details
const movie = await movieService.getMovieById(movieId)
```

### Review System
```typescript
import { reviewService } from '@/lib/supabase'

// Create review
await reviewService.createReview({
  movie_id: movieId,
  user_id: userId,
  rating: 5,
  text: 'Amazing movie!',
  sentiment: 'positive'
})

// Get movie reviews
const reviews = await reviewService.getMovieReviews(movieId, 1, 10)
```

### Watchlist Management
```typescript
import { watchlistService } from '@/lib/supabase'

// Add to watchlist
await watchlistService.addToWatchlist({
  user_id: userId,
  movie_id: movieId,
  status: 'plan_to_watch',
  priority: 3
})

// Get user's watchlist
const watchlist = await watchlistService.getUserWatchlist(userId)
```

## 🎯 OTT Integration

The app uses **Perplexity API** for dynamic OTT availability:

```typescript
// GET /api/movies/[id]/ott-availability
const response = await fetch(`/api/movies/${movieId}/ott-availability`)
const ottData = await response.json()

// Returns:
{
  "data": {
    "movieId": "uuid",
    "movieTitle": "Dune",
    "year": 2021,
    "services": [
      {
        "name": "Netflix",
        "type": "stream",
        "quality": "4K",
        "regions": ["US", "UK"]
      }
    ],
    "lastUpdated": "2024-01-15T10:30:00Z"
  }
}
```

## 🔄 Migration from Prisma

### What to Replace:
1. **Database queries** → Use Supabase service functions
2. **Authentication** → Use Supabase Auth
3. **File uploads** → Use Supabase Storage
4. **Prisma client** → Remove from dependencies

### Example Migration:
```typescript
// OLD (Prisma)
const movies = await prisma.movie.findMany({
  where: { status: 'released' },
  include: { reviews: true }
})

// NEW (Supabase)
const movies = await movieService.getMovies(1, 20)
```

## 🚨 Important Notes

### Environment Variables
- **Required**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Optional**: `PERPLEXITY_API_KEY` for OTT data

### Security
- Row-level security is enabled by default
- Users can only access their own data
- Public read access for movies and reviews

### Performance
- GIN indexes on array fields for fast queries
- Full-text search on movie titles
- Pagination support for large datasets

## 🧪 Testing

### Test Database Connection:
```typescript
import { supabase } from '@/lib/supabase'

// Test connection
const { data, error } = await supabase
  .from('movies')
  .select('count')
  .limit(1)

if (error) {
  console.error('Supabase connection failed:', error)
} else {
  console.log('Supabase connected successfully!')
}
```

### Test OTT API:
```bash
curl "http://localhost:3000/api/movies/[movie-id]/ott-availability"
```

## 🆘 Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables"**
   - Check `.env.local` file exists
   - Verify variable names are correct
   - Restart dev server

2. **"RLS Policy Errors"**
   - Ensure SQL script ran completely
   - Check all policies were created

3. **"Storage Upload Errors"**
   - Verify storage buckets exist
   - Check storage policies

4. **"Perplexity API Errors"**
   - API key is optional - falls back to mock data
   - Check API key format and permissions

## 📚 Next Steps

1. **Test the setup** with sample data
2. **Update your components** to use Supabase services
3. **Add more features** like real-time updates
4. **Customize the schema** for your needs
5. **Set up monitoring** and analytics

## 🎉 Benefits of This Setup

- **Scalable**: PostgreSQL handles growth better than SQLite
- **Real-time**: Built-in real-time subscriptions
- **Secure**: Row-level security out of the box
- **Fast**: Optimized indexes and queries
- **Flexible**: Easy to modify and extend
- **Cost-effective**: Generous free tier

---

**Need Help?** Check the [Supabase Setup Guide](./SUPABASE_SETUP_GUIDE.md) for detailed instructions!
