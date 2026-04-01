import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Blog {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    featured_image: string | null;
    published: boolean;
    created_at: string;
    updated_at: string;
}

export interface ImageRecord {
    id: string;
    name: string;
    storage_path: string;
    url: string;
    created_at: string;
}

export interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    company: string | null;
    message: string;
    read: boolean;
}

/**
 * Transforms a Supabase Storage URL into a custom domain URL served via Vercel Rewrites.
 * Example:
 *   Input: https://eagediffandfnavqcxnw.supabase.co/storage/v1/object/public/blog-images/my-image.jpg
 *   Output: /images/my-image.jpg
 */
export const getPublicImageUrl = (pathOrUrl: string | null): string | undefined => {
    if (!pathOrUrl) return undefined;

    // Check if it's a Supabase URL
    if (pathOrUrl.includes('supabase.co') && pathOrUrl.includes('/storage/v1/object/public/blog-images/')) {
        // Skip local rewrite in dev due to Vite/Node HTTP Proxy ECONNRESET bugs with Cloudflare
        if (import.meta.env.DEV) {
            return pathOrUrl;
        }

        const parts = pathOrUrl.split('/blog-images/');
        if (parts.length === 2) {
            return `/images/${parts[1]}`;
        }
    }

    // If it's already a relative path or external URL, return as is
    return pathOrUrl;
};
