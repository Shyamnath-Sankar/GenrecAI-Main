import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft } from 'lucide-react';
import { supabase, Blog, getPublicImageUrl } from '../lib/supabase';
import { SEO } from '../components/SEO';

export const BlogPost = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        loadBlog();
    }, [slug]);

    const loadBlog = async () => {
        if (!slug) return;

        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .eq('slug', slug)
            .eq('published', true)
            .single();

        if (error || !data) {
            setNotFound(true);
        } else {
            setBlog(data);
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-zinc-500">Loading...</div>
            </div>
        );
    }

    if (notFound || !blog) {
        return (
            <div className="min-h-screen flex items-center justify-center flex-col gap-4">
                <h1 className="text-4xl font-bold">Blog Post Not Found</h1>
                <Link to="/blog" className="text-nothing-red hover:underline">
                    ← Back to Blog
                </Link>
            </div>
        );
    }

    // Generate structured data for SEO
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blog.title,
        "description": blog.excerpt || "",
        "image": getPublicImageUrl(blog.featured_image) || "",
        "datePublished": blog.created_at,
        "dateModified": blog.updated_at,
        "author": {
            "@type": "Organization",
            "name": "GENREC AI"
        },
        "publisher": {
            "@type": "Organization",
            "name": "GENREC AI"
        }
    };

    return (
        <div className="min-h-screen">
            <SEO
                title={blog.title}
                description={blog.excerpt || blog.title}
                image={getPublicImageUrl(blog.featured_image) || undefined}
                type="article"
                structuredData={structuredData}
            />

            {/* Hero Section */}
            <div className="pt-32 pb-12 border-b border-zinc-200 dark:border-zinc-800">
                <div className="container mx-auto px-6 max-w-4xl">
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 text-zinc-500 hover:text-nothing-red transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
                            {blog.title}
                        </h1>

                        {blog.excerpt && (
                            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-6">
                                {blog.excerpt}
                            </p>
                        )}

                        <div className="flex items-center gap-2 text-zinc-500">
                            <Calendar className="w-4 h-4" />
                            <time>{new Date(blog.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</time>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Featured Image */}
            {blog.featured_image && (
                <div className="container mx-auto px-6 max-w-4xl mt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="aspect-video bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden"
                    >
                        <img
                            src={getPublicImageUrl(blog.featured_image)}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>
            )}

            {/* Content */}
            <article className="container mx-auto px-6 max-w-4xl py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="prose prose-lg prose-zinc dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl
            prose-p:text-zinc-700 dark:prose-p:text-zinc-300
            prose-a:text-nothing-red prose-a:no-underline hover:prose-a:underline
            prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100
            prose-img:rounded-xl prose-img:shadow-lg
            prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />
            </article>

            {/* Back to Blog CTA */}
            <div className="container mx-auto px-6 max-w-4xl pb-20">
                <div className="border-t border-zinc-200 dark:border-zinc-800 pt-12">
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 text-lg font-medium hover:text-nothing-red transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Read More Articles
                    </Link>
                </div>
            </div>
        </div>
    );
};
