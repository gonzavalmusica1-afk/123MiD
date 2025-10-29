import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
            '/dashboard/', // Disallow all dashboard pages
            '/perfil/',     // Disallow specific profile pages, except demo
        ],
      },
       {
        userAgent: '*',
        allow: '/perfil/demostracion', // Explicitly allow demo profile
      }
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
