import { Suspense } from 'react';
import type { Metadata } from 'next';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import Analytics from '../ui/Analytics';
import { GeistSans } from 'geist/font/sans';
import ThemeProvider from '../context/ThemeContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vicent Gozalbes',
  description: 'Developer, biker, and dj.',
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
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

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <Analytics gaId="G-11197KZXNE" />
        <ThemeProvider>
          <div className="flex min-h-screen bg-white text-gray-900 transition-all dark:bg-gray-900 dark:text-white">
            <div className="flex max-w-full flex-1 flex-col px-8 py-14 lg:mx-auto lg:max-w-2xl lg:px-0">
              <Navbar className="pb-14" />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
