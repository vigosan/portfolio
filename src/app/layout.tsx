import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { Navbar } from './ui/Navbar';
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
        <main className="min-h-screen">
          <div className="mx-auto max-w-2xl py-14">
            <Navbar className="flex gap-4 pb-14" />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
