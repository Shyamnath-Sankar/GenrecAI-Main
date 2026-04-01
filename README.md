# GenrecAI Website

A modern AI-powered portfolio and business website built with React, TypeScript, and Vite.

## Setup

### Prerequisites
- Node.js 18+
- Supabase account

### Environment Variables

Create a `.env` file with the following:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=your_admin_password
```

## Supabase Setup

### Database Schema

Create the following tables in your Supabase project:

#### 1. blogs table
```sql
CREATE TABLE blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  author TEXT DEFAULT 'GenrecAI Team',
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 2. images table
```sql
CREATE TABLE images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  alt TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Storage

1. Create a storage bucket named `images`
2. Add policy to allow public read access

### Adding Blogs

1. Go to Supabase Dashboard → Table Editor → blogs
2. Click "Insert Row" to add a new blog
3. Fill in title, slug (URL-friendly), excerpt, content, and optional cover_image URL

### Adding Images

1. Go to Supabase Dashboard → Storage → images
2. Upload images to the bucket
3. Go to Table Editor → images and add a row with the image URL and metadata

## Run Locally

```bash
npm install
npm run dev
```

## Admin Panel

Access `/admin-login` to manage blogs and images. Default credentials are set in `.env`.
