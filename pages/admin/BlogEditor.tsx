import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Image as ImageIcon, X } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import slugify from 'slugify';
import { supabase, ImageRecord, getPublicImageUrl } from '../../lib/supabase';
import { SEO } from '../../components/SEO';
import { GlitchText } from '../../components/ui/GlitchText';

export const BlogEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [featuredImage, setFeaturedImage] = useState('');
    const [published, setPublished] = useState(false);
    const [saving, setSaving] = useState(false);
    const [showImagePicker, setShowImagePicker] = useState(false);
    const [images, setImages] = useState<ImageRecord[]>([]);
    const [imagePickerMode, setImagePickerMode] = useState<'featured' | 'content'>('featured');

    useEffect(() => {
        loadImages();
        if (id) {
            loadBlog();
        }
    }, [id]);

    const loadImages = async () => {
        const { data } = await supabase
            .from('images')
            .select('*')
            .order('created_at', { ascending: false });
        if (data) setImages(data);
    };

    const loadBlog = async () => {
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .eq('id', id)
            .single();

        if (!error && data) {
            setTitle(data.title);
            setSlug(data.slug);
            setContent(data.content);
            setExcerpt(data.excerpt || '');
            setFeaturedImage(data.featured_image || '');
            setPublished(data.published);
        }
    };

    const handleTitleChange = (value: string) => {
        setTitle(value);
        if (!id) {
            setSlug(slugify(value, { lower: true, strict: true }));
        }
    };

    const handleSave = async () => {
        if (!title || !content || !slug) {
            alert('Please fill in title, slug, and content');
            return;
        }

        setSaving(true);

        try {
            const blogData = {
                title,
                slug,
                content,
                excerpt,
                featured_image: featuredImage,
                published
            };

            if (id) {
                const { error } = await supabase
                    .from('blogs')
                    .update(blogData)
                    .eq('id', id);

                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('blogs')
                    .insert(blogData);

                if (error) throw error;
            }

            alert('Blog saved successfully!');
            navigate('/adminofthegenrecai/dashboard/blogs');
        } catch (error: any) {
            console.error('Error saving blog:', error);
            if (error.code === '23505') {
                alert('A blog with this slug already exists. Please use a different slug.');
            } else {
                alert('Error saving blog. Please try again.');
            }
        } finally {
            setSaving(false);
        }
    };

    const selectImage = (url: string) => {
        const publicUrl = getPublicImageUrl(url) || url;

        if (imagePickerMode === 'featured') {
            setFeaturedImage(url); // Keep raw URL for DB consistency, rely on read-time rewrite
        } else {
            const quill = (window as any).quillEditor;
            if (quill) {
                const range = quill.getSelection();
                if (range) {
                    quill.insertEmbed(range.index, 'image', publicUrl);
                }
            }
        }
        setShowImagePicker(false);
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['link', 'blockquote', 'code-block'],
            ['clean']
        ]
    };

    useEffect(() => {
        const quill = document.querySelector('.ql-editor');
        if (quill) {
            (window as any).quillEditor = (quill as any).__quill;
        }
    }, []);

    return (
        <div className="pb-20">
            <SEO title={id ? 'Edit Blog Post' : 'Create Blog Post'} />

            {/* Header */}
            <div className="mb-8 flex items-start justify-between">
                <div>
                    <Link to="/adminofthegenrecai/dashboard/blogs" className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-white transition-colors mb-4 text-sm">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog Manager
                    </Link>
                    <div className="inline-block px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-xs font-mono mb-4 ml-4 border border-orange-500/20">
                        EDITOR_MODULE
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold">
                        <GlitchText text={id ? 'EDIT_POST' : 'NEW_POST'} />
                    </h1>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 bg-nothing-red hover:bg-red-600 disabled:bg-zinc-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium shadow-lg"
                >
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : 'Save Post'}
                </button>
            </div>

            <div className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 text-xl font-bold focus:outline-none focus:border-nothing-red transition-colors"
                        placeholder="Enter post title..."
                    />
                </div>

                {/* Slug */}
                <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 mb-2">
                        URL Slug
                    </label>
                    <div className="flex items-center gap-2">
                        <span className="text-zinc-400 font-mono">/blog/</span>
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:border-nothing-red transition-colors font-mono"
                            placeholder="post-url-slug"
                        />
                    </div>
                </div>

                {/* Featured Image */}
                <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 mb-2">
                        Featured Image
                    </label>
                    <div className="flex gap-4 items-center">
                        {featuredImage && (
                            <div className="relative w-48 h-32 bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
                                <img src={getPublicImageUrl(featuredImage)} alt="Featured" className="w-full h-full object-cover" />
                                <button
                                    onClick={() => setFeaturedImage('')}
                                    className="absolute top-2 right-2 w-6 h-6 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        )}
                        <button
                            onClick={() => {
                                setImagePickerMode('featured');
                                setShowImagePicker(true);
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                        >
                            <ImageIcon className="w-4 h-4" />
                            {featuredImage ? 'Change Image' : 'Select Image'}
                        </button>
                    </div>
                </div>

                {/* Excerpt */}
                <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 mb-2">
                        Excerpt (Optional)
                    </label>
                    <textarea
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        rows={3}
                        className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:border-nothing-red transition-colors resize-none"
                        placeholder="Brief description of the post..."
                    />
                </div>

                {/* Content Editor */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500">
                            Content
                        </label>
                        <button
                            onClick={() => {
                                setImagePickerMode('content');
                                setShowImagePicker(true);
                            }}
                            className="text-sm text-nothing-red hover:text-red-400 transition-colors flex items-center gap-1"
                        >
                            <ImageIcon className="w-4 h-4" />
                            Insert Image
                        </button>
                    </div>
                    <div className="bg-white rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            modules={modules}
                            className="min-h-[400px]"
                        />
                    </div>
                </div>

                {/* Publish Toggle */}
                <div className="flex items-center gap-3 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                    <input
                        type="checkbox"
                        id="published"
                        checked={published}
                        onChange={(e) => setPublished(e.target.checked)}
                        className="w-5 h-5 accent-nothing-red"
                    />
                    <label htmlFor="published" className="font-medium cursor-pointer">
                        Publish this post (make it visible to the public)
                    </label>
                </div>
            </div>

            {/* Image Picker Modal */}
            {showImagePicker && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
                    >
                        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                            <h3 className="text-xl font-bold">Select Image</h3>
                            <button
                                onClick={() => setShowImagePicker(false)}
                                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
                            {images.length === 0 ? (
                                <div className="text-center py-12 text-zinc-500">
                                    <p>No images available. Upload some images first.</p>
                                    <Link to="/adminofthegenrecai/dashboard/images" className="text-nothing-red hover:underline mt-2 inline-block">
                                        Go to Image Library
                                    </Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-3 gap-4">
                                    {images.map((image) => (
                                        <button
                                            key={image.id}
                                            onClick={() => selectImage(image.url)}
                                            className="group aspect-video bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-nothing-red transition-all"
                                        >
                                            <img
                                                src={getPublicImageUrl(image.url)}
                                                alt={image.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};
