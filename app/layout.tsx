// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Simple AuthX - Secure & Lightweight Auth for Node.js',
  description: 'Simple AuthX provides JWT authentication, password hashing, and refresh token support for secure Node.js applications.',
  keywords: [
    'authentication',
    'jwt',
    'nodejs',
    'express',
    'security',
    'auth',
    'passport',
    'bcrypt',
    'refresh-token',
    'mfa',
    '2fa',
    'oauth',
    'session-management',
  ],
  authors: [{ name: 'Antony Mwangi', url: 'https://github.com/Antonymwangi20' }],
  creator: 'Antony Mwangi',
  publisher: 'Simple AuthX',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://simple-authx-lp.vercel.app',
    title: 'Simple AuthX - Secure & Lightweight Auth for Node.js',
    description: 'Simple AuthX provides JWT authentication, password hashing, and refresh token support for secure Node.js applications.',
    siteName: 'Simple AuthX',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Simple AuthX',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simple AuthX - Secure & Lightweight Auth for Node.js',
    description: 'Simple AuthX provides JWT authentication, password hashing, and refresh token support for secure Node.js applications.',
    images: ['/og-image.png'],
    creator: '@yourtwitterhandle',
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
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth bg-dark text-white">
      <head>
        {/* Canonical URL */}
        <link rel="canonical" href="https://simple-authx-lp.vercel.app" />

        {/* Favicon */}
        <link rel="icon" href="/icon.png" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/icon.png" />

        {/* Theme Color for PWA */}
        <meta name="theme-color" content="#4ecdc4" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${inter.className} min-h-screen`}>
        {/* Animated background blobs */}
        <div className="blob bg-primary w-96 h-96 top-[-100px] left-[-100px]"></div>
        <div className="blob bg-secondary w-96 h-96 bottom-[-150px] right-[-150px]"></div>

        {/* Main content */}
        {children}
      </body>
    </html>
  );
}
