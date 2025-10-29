import type {Metadata} from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from "@/components/ui/toaster"
import { ProfileProvider } from '@/context/ProfileContext';
import { FirebaseClientProvider } from '@/firebase';
import { PT_Sans } from 'next/font/google';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: '123MiD - Pulseras de Emergencia Médica',
    template: '%s | 123MiD',
  },
  description: '123MiD te conecta con tu información médica crucial en momentos de emergencia. Una solución simple y segura para ti, tu familia y tus mascotas.',
  openGraph: {
    title: '123MiD - Pulseras de Emergencia Médica',
    description: 'Información que salva vidas, al instante. Perfiles médicos accesibles para emergencias.',
    url: siteUrl,
    siteName: '123MiD',
    images: [
      {
        url: '/og-image.png', // Ruta relativa a la carpeta /public
        width: 1200,
        height: 630,
        alt: 'Personas sonriendo, mostrando pulseras de emergencia 123MiD',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '123MiD - Pulseras de Emergencia Médica',
    description: 'Información que salva vidas, al instante. Perfiles médicos accesibles para emergencias.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={ptSans.variable}>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <ProfileProvider>
              <Header />
              <main>{children}</main>
              <Footer />
              <Toaster />
          </ProfileProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
