import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit, Trash2, Plus, FileText, Eye, EyeOff } from 'lucide-react';
import { supabase, Blog, getPublicImageUrl } from '../../lib/supabase';
import { SEO } from '../../components/SEO';
import { GlitchText } from '../../components/ui/GlitchText';

export const BlogManager = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setBlogs(data);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Delete "${title}"?`)) return;

        const { error } = await supabase
            .from('blogs')
            .delete()
            .eq('id', id);

        if (!error) {
            loadBlogs();
        } else {
            alert('Error deleting blog');
        }
    };

    const togglePublish = async (blog: Blog) => {
        const { error } = await supabase
            .from('blogs')
            .update({ published: !blog.published })
            .eq('id', blog.id);

        if (!error) {
            loadBlogs();
        }
    };

    return (
        <div>
            <SEO title="Blog Manager - Admin" />

            {/* Header */}
            <div className="mb-8 flex items-start justify-between">
                <div>
                    <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 text-purple-500 text-xs font-mono mb-4 border border-purple-500/20">
                        CONTENT_MODULE
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        <GlitchText text="BLOG_POSTS" />
                    </h1>
                    <p className="text-zinc-500">Manage and publish your blog content</p>
                </div>
                <Link
                    to="/adminofthegenrecai/dashboard/blogs/new"
                    className="flex items-center gap-2 px-5 py-3 bg-nothing-red hover:bg-red-600 text-white rounded-lg transition-colors font-medium shadow-lg"
                >
                    <Plus className="w-4 h-4" />
                    New Post
                </Link>
            </div>

            {/* Content */}
            {loading ? (
                <div className="text-center py-20 text-zinc-500 font-mono">LOADING...</div>
            ) : blogs.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-zinc-300 dark:text-zinc-700" />
                    <p className="text-xl text-zinc-400 mb-6">No blog posts yet</p>
                    <Link
                        to="/adminofthegenrecai/dashboard/blogs/new"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-nothing-red hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
                    >
                        <Plus className="w-4 h-4" />
                        Create Your First Post
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {blogs.map((blog, index) => (
                        <motion.div
                            key={blog.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 hover:border-nothing-red transition-all hover:shadow-lg"
                        >
                            <div className="flex items-start justify-between gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-xl font-bold">{blog.title}</h2>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${blog.published
                                            ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                            : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                                            }`}>
                                            {blog.published ? 'Published' : 'Draft'}
                                        </span>
                                    </div>
                                    <p className="text-zinc-400 text-sm mb-2 font-mono">/blog/{blog.slug}</p>
                                    {blog.excerpt && (
                                        <p className="text-zinc-500 mb-4 line-clamp-2">{blog.excerpt}</p>
                                    )}
                                    <p className="text-xs text-zinc-400 font-mono">
                                        Created: {new Date(blog.created_at).toLocaleDateString()} •
                                        Updated: {new Date(blog.updated_at).toLocaleDateString()}
                                    </p>
                                </div>

                                {blog.featured_image && (
                                    <div className="w-32 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0 border border-zinc-200 dark:border-zinc-700">
                                        <img
                                            src={getPublicImageUrl(blog.featured_image)}
                                            alt={blog.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-3 mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                                <Link
                                    to={`/adminofthegenrecai/dashboard/blogs/edit/${blog.id}`}
                                    className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors text-sm"
                                >
                                    <Edit className="w-4 h-4" />
                                    Edit
                                </Link>
                                <button
                                    onClick={() => togglePublish(blog)}
                                    className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors text-sm"
                                >
                                    {blog.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    {blog.published ? 'Unpublish' : 'Publish'}
                                </button>
                                {blog.published && (
                                    <Link
                                        to={`/blog/${blog.slug}`}
                                        target="_blank"
                                        className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors text-sm"
                                    >
                                        <Eye className="w-4 h-4" />
                                        View
                                    </Link>
                                )}
                                <button
                                    onClick={() => handleDelete(blog.id, blog.title)}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors text-sm ml-auto"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};
