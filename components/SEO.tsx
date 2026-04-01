import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
    structuredData?: Record<string, any>;
}

export const SEO: React.FC<SEOProps> = ({
    title,
    description = "Production Grade Software & AI Solutions. We build future-proof digital products with cutting-edge technology.",
    keywords = "AI, Software Development, Web Design, Production Grade, React, Vite, GENREC AI",
    image = "/og-image.jpg", // Default OG image
    url,
    type = 'website',
    structuredData,
}) => {
    const siteTitle = "GENREC AI";
    const fullTitle = title === siteTitle ? siteTitle : `${title} | ${siteTitle}`;
    const canonicalUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

    // Ensure image URL is absolute for better SEO/Social sharing
    const siteUrl = 'https://www.genrecai.com';
    const fullImage = image?.startsWith('http') ? image : `${siteUrl}${image}`;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:site_name" content={siteTitle} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImage} />

            {/* Structured Data (JSON-LD) */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
};
