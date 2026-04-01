import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Copy, Trash2, CheckCircle, Image as ImageIcon, X } from 'lucide-react';
import { supabase, ImageRecord, getPublicImageUrl } from '../../lib/supabase';
import { SEO } from '../../components/SEO';
import { GlitchText } from '../../components/ui/GlitchText';

export const ImageLibrary = () => {
    const [images, setImages] = useState<ImageRecord[]>([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<ImageRecord | null>(null);

    useEffect(() => {
        loadImages();
    }, []);

    const loadImages = async () => {
        const { data, error } = await supabase
            .from('images')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setImages(data);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setUploadProgress(0);

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('blog-images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            setUploadProgress(50);

            const { data: { publicUrl } } = supabase.storage
                .from('blog-images')
                .getPublicUrl(filePath);

            setUploadProgress(75);

            // Convert raw Supabase URL to custom domain path
            const customUrl = getPublicImageUrl(publicUrl) || publicUrl;

            const { error: dbError } = await supabase
                .from('images')
                .insert({
                    name: file.name,
                    storage_path: filePath,
                    url: customUrl
                });

            if (dbError) throw dbError;

            setUploadProgress(100);
            setTimeout(() => {
                setUploading(false);
                setUploadProgress(0);
                loadImages();
            }, 500);
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploading(false);
            setUploadProgress(0);
            alert('Error uploading file. Please try again.');
        }
    };

    const handleDelete = async (image: ImageRecord) => {
        if (!confirm(`Delete ${image.name}?`)) return;

        try {
            await supabase.storage
                .from('blog-images')
                .remove([image.storage_path]);

            await supabase
                .from('images')
                .delete()
                .eq('id', image.id);

            loadImages();
        } catch (error) {
            console.error('Error deleting image:', error);
            alert('Error deleting image');
        }
    };

    const copyToClipboard = (url: string, id: string) => {
        let publicUrl = getPublicImageUrl(url) || url;
        if (publicUrl.startsWith('/')) {
            // Force production domain instead of current window.location.origin
            // This ensures URLs are correct even when admin is accessed via vercel preview URLs
            publicUrl = `https://www.genrecai.com${publicUrl}`;
        }
        navigator.clipboard.writeText(publicUrl);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div>
            <SEO title="Image Library - Admin" />

            {/* Header */}
            <div className="mb-8">
                <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-mono mb-4 border border-blue-500/20">
                    STORAGE_MODULE
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    <GlitchText text="IMAGE_LIBRARY" />
                </h1>
                <p className="text-zinc-500">Upload and manage visual assets for your content</p>
            </div>

            {/* Upload Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl p-12 text-center hover:border-nothing-red transition-colors bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={uploading}
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                            <Upload className="w-8 h-8 text-zinc-400" />
                        </div>
                        <p className="text-xl font-bold mb-2">
                            {uploading ? 'Uploading...' : 'Upload Image'}
                        </p>
                        <p className="text-sm text-zinc-500">
                            Click to select a file (JPG, PNG, WebP, GIF)
                        </p>
                        {uploading && (
                            <div className="mt-6 max-w-xs mx-auto">
                                <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-nothing-red"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${uploadProgress}%` }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                                <p className="text-xs text-zinc-400 mt-2 font-mono">{uploadProgress}%</p>
                            </div>
                        )}
                    </label>
                </div>
            </motion.div>

            {/* Images Grid */}
            {images.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                    <ImageIcon className="w-16 h-16 mx-auto mb-4 text-zinc-300 dark:text-zinc-700" />
                    <p className="text-xl text-zinc-400">No images uploaded yet</p>
                    <p className="text-sm text-zinc-500 mt-2">Upload your first image above</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image, index) => (
                        <motion.div
                            key={image.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:border-nothing-red transition-all hover:shadow-lg"
                        >
                            <div
                                className="aspect-video bg-zinc-100 dark:bg-zinc-800 overflow-hidden cursor-pointer"
                                onClick={() => setPreviewImage(image)}
                            >
                                <img
                                    src={getPublicImageUrl(image.url)}
                                    alt={image.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-4">
                                <p className="font-medium truncate mb-3 text-sm">{image.name}</p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => copyToClipboard(image.url, image.id)}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors text-sm"
                                    >
                                        {copiedId === image.id ? (
                                            <>
                                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                                <span className="text-emerald-500 font-medium">Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4" />
                                                <span>Copy URL</span>
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(image)}
                                        className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Image Preview Modal */}
            {previewImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setPreviewImage(null)}
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="relative max-w-4xl max-h-[90vh]"
                        onClick={e => e.stopPropagation()}
                    >
                        <img
                            src={getPublicImageUrl(previewImage.url)}
                            alt={previewImage.name}
                            className="max-w-full max-h-[90vh] object-contain rounded-lg"
                        />
                        <button
                            onClick={() => setPreviewImage(null)}
                            className="absolute -top-4 -right-4 w-10 h-10 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center shadow-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};
