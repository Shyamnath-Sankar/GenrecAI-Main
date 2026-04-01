import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const adminUsername = process.env.VITE_ADMIN_USERNAME;
const adminPassword = process.env.VITE_ADMIN_PASSWORD;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const sampleBlogs = [
    {
        title: 'The Future of GenAI in 2026',
        slug: 'future-of-genai-2026',
        excerpt: 'Exploring how Generative AI is reshaping industries and what to expect in the coming years.',
        content: `
            <p class="lead">Generative AI has evolved rapidly, moving from simple text generation to complex, multi-modal reasoning engines.</p>
            <p>In 2026, we are seeing a shift towards <strong>agentic workflows</strong> where AI doesn't just answer questions but actively solves problems.</p>
            <h2>Key Trends</h2>
            <ul>
                <li>Autonomous Agents</li>
                <li>Hyper-personalized Experiences</li>
                <li>AI in Edge Computing</li>
            </ul>
            <p>At GENREC AI, we are at the forefront of this revolution, building tools that empower developers to build the next generation of intelligent applications.</p>
        `,
        featured_image: 'https://eagediffandfnavqcxnw.supabase.co/storage/v1/object/public/blog-images/ai-future.jpg',
        published: true
    },
    {
        title: 'Optimizing React Performance with Vercel',
        slug: 'optimizing-react-performance-vercel',
        excerpt: 'A deep dive into advanced caching strategies and edge rendering techniques.',
        content: `
            <p>Performance is paramount in modern web development. Users expect instant load times and buttery smooth interactions.</p>
            <p>React, combined with Vercel's edge network, offers a powerful platform for building high-performance applications.</p>
            <h2>Strategies</h2>
            <p>We leverage <strong>Incremental Static Regeneration (ISR)</strong> and aggressive caching policies to ensure our content is always fresh yet delivered instantly.</p>
            <p>By optimizing our asset delivery pipeline, we've reduced our First Contentful Paint (FCP) by 40%.</p>
        `,
        featured_image: 'https://eagediffandfnavqcxnw.supabase.co/storage/v1/object/public/blog-images/react-performance.jpg',
        published: true
    },
    {
        title: 'Why We Switched to Supabase',
        slug: 'why-we-switched-to-supabase',
        excerpt: 'Our journey from a custom backend to the power of Supabase.',
        content: `
            <p>Building a robust backend is hard. Managing databases, authentication, and storage can take away valuable time from building core product features.</p>
            <p>Supabase provided us with an "instant backend" that scales accurately and securely.</p>
            <h2>Benefits</h2>
            <ul>
                <li>Real-time subscriptions</li>
                <li>Postgres RLS (Row Level Security)</li>
                <li>Seamless integration with modern frontend frameworks</li>
            </ul>
        `,
        featured_image: 'https://eagediffandfnavqcxnw.supabase.co/storage/v1/object/public/blog-images/database-migration.jpg',
        published: true
    }
];

async function seedBlogs() {
    console.log('🌱 Seeding blogs...');

    for (const blog of sampleBlogs) {
        const { data, error } = await supabase
            .from('blogs')
            .upsert(blog, { onConflict: 'slug' })
            .select();

        if (error) {
            console.error(`Error inserting blog: ${blog.title}`, error);
        } else {
            console.log(`✅ Inserted: ${blog.title}`);
        }
    }

    console.log('✨ Seeding complete!');
    // If we're using Unsplash images strictly, we might need to actually upload them or just assume the frontend will rewrite ANY Supabase URL. 
    // The current implementation rewrites specific Supabase URLs. 
    // For this test, valid Supabase URLs are used as placeholders; they might not load real images unless those files exist in the bucket.
    // If the user wants "Unsplash-like" behavior, they might imply using Unsplash images BUT served through their domain (proxy).
    // But the Vercel rewrite points to Supabase Storage. So we must use Supabase Storage URLs.
}

seedBlogs();
