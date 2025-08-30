# 🚀 Supabase Setup Guide for Movie Review App

## 📋 Prerequisites
- Supabase account (free tier works great!)
- Your Movie Review app project ready

## 🔧 Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Choose your organization
4. Enter project details:
   - **Name**: `movie-review-app` (or your preferred name)
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to your users
5. Click **"Create new project"**
6. Wait for setup to complete (2-3 minutes)

## 🗄️ Step 2: Set Up Database

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the entire content of `supabase-setup.sql`
3. Paste it into the SQL editor
4. Click **"Run"** to execute all commands
5. You should see success messages for all operations

## 🔑 Step 3: Get API Credentials

1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy these values:
   - **Project URL** (looks like: `https://abcdefghijklmnop.supabase.co`)
   - **anon public key** (starts with `eyJ...`)

## ⚙️ Step 4: Configure Environment Variables

1. Create a `.env.local` file in your project root
2. Add these variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Optional: Perplexity API for OTT data
PERPLEXITY_API_KEY=your_perplexity_api_key_here
```

3. Replace the placeholder values with your actual credentials

## 📦 Step 5: Install Dependencies

```bash
npm install @supabase/supabase-js
```

## 🎯 Step 6: Test Your Setup

1. Start your development server: `npm run dev`
2. Check the browser console for any Supabase connection errors
3. If successful, you should see no connection errors

## 🔍 Step 7: Verify Database Tables

In your Supabase dashboard, go to **Table Editor** and verify these tables exist:
- ✅ `users`
- ✅ `movies`
- ✅ `reviews`
- ✅ `user_preferences`
- ✅ `watchlist`
- ✅ `helpful_votes`

## 🗂️ Step 8: Check Storage Buckets

Go to **Storage** and verify these buckets exist:
- ✅ `user-avatars`
- ✅ `movie-posters`
- ✅ `movie-backdrops`

## 🚨 Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables"**
   - Check your `.env.local` file exists
   - Verify variable names are correct
   - Restart your dev server after adding variables

2. **"Transport is closed" error**
   - This is a temporary MCP connection issue
   - Use the manual setup steps above instead

3. **RLS Policy Errors**
   - Make sure you ran the complete SQL script
   - Check that all policies were created successfully

4. **Storage Upload Errors**
   - Verify storage buckets exist
   - Check storage policies are in place

## 🎉 What You Now Have

Your Supabase backend now includes:

- **5 Main Tables** with proper relationships
- **Row Level Security** for data protection
- **Storage Buckets** for images and files
- **Custom Functions** for recommendations
- **Automatic Triggers** for timestamps
- **Performance Indexes** for fast queries
- **TypeScript Types** for type safety

## 🔄 Next Steps

1. **Update your auth system** to use Supabase Auth
2. **Replace Prisma calls** with Supabase service functions
3. **Test the API endpoints** with your frontend
4. **Add more sample data** to test functionality
5. **Set up Perplexity API** for OTT availability

## 📚 Useful Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Management](https://supabase.com/docs/guides/storage)

---

**Need Help?** Check the Supabase Discord or GitHub issues for support!
