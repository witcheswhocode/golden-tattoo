// MetaTags.tsx
import React from 'react';
import { Helmet } from 'react-helmet';

interface MetaTagsProps {
    title: string;
    description: string;
    image: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({ title, description, image }) => {
    // Construct absolute URL for the image
    const imageUrl = `${window.location.origin}${process.env.PUBLIC_URL}${image}`;
    console.log(imageUrl);
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={imageUrl} />
        </Helmet>
    );
};

export default MetaTags;
