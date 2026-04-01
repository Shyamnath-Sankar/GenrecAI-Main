import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { supabase, Blog, getPublicImageUrl } from '../lib/supabase';
import { SEO } from '../components/SEO';

export const BlogPage = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = async () => {
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .eq('published', true)
            .order('created_at', { ascending: false });

        if (!error && data) {
            setBlogs(data);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen pt-32 pb-20">
            <SEO
                title="Blog"
                description="Insights, updates, and technical articles from GENREC AI"
                keywords="AI blog, software development blog, technology insights, GENREC AI"
            />

            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 text-center"
                >
                    <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter">
                        Blog
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        Insights, updates, and technical deep-dives from the engineering floor
                    </p>
                </motion.div>

                {/* Blog Grid */}
                {loading ? (
                    <div className="text-center py-20 text-zinc-500">Loading...</div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-zinc-500">No blog posts published yet. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {blogs.map((blog, index) => (
                            <motion.article
                                key={blog.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    to={`/blog/${blog.slug}`}
                                    className="group block h-full"
                                >
                                    <div className="h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:border-nothing-red transition-all duration-300">
                                        {/* Featured Image */}
                                        {blog.featured_image && (
                                            <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                                                <img
                                                    src={getPublicImageUrl(blog.featured_image)}
                                                    alt={blog.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="p-6">
                                            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                                                <Calendar className="w-4 h-4" />
                                                <time>{new Date(blog.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}</time>
                                            </div>

                                            <h2 className="text-2xl font-bold mb-3 group-hover:text-nothing-red transition-colors">
                                                {blog.title}
                                            </h2>

                                            {blog.excerpt && (
                                                <p className="text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3">
                                                    {blog.excerpt}
                                                </p>
                                            )}

                                            <div className="flex items-center gap-2 text-nothing-red font-medium text-sm">
                                                Read More
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
