export default function robots(): {
    rules: {
        userAgent: string;
        allow: string;
    }[];
    host: string;
    sitemap: string;
} | {
    rules: {
        userAgent: string;
        disallow: string;
    }[];
    host: string;
    sitemap?: undefined;
};
