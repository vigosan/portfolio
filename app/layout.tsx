import type { Metadata } from 'next';
import Navbar from './ui/Navbar';
import { GeistSans } from 'geist/font/sans';
import ThemeProvider from './context/ThemeContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vicent Gozalbes',
  description: 'Developer, biker, and dj.',
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
        <ThemeProvider>
          <main className="min-h-screen bg-white text-slate-950 transition-all dark:bg-gray-950 dark:text-white">
            <div className="max-w-full px-8 py-14 lg:mx-auto lg:max-w-2xl lg:px-0">
              <Navbar className="pb-14" />
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
