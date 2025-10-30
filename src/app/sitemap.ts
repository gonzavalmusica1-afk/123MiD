import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';
  
  // Lista de páginas estáticas
  const staticRoutes = [
    '',
    '/login',
    '/signup',
    '/privacidad',
    '/terminos',
    '/perfil/demostracion',
    '/recuperar-contrasena',
  ];

  const routes = staticRoutes.map((route) => ({
    url: `${siteUrl}${route === '' ? '/' : route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? 'daily' : 'monthly' as 'daily' | 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
