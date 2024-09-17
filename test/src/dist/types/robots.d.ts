export default function robots(): {
    rules: {
        userAgent: string;
        allow: string;
    }[];
    host: string;
    sitemap: string;
};
