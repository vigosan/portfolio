'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './Icon';
import cn from '../utils/cn';
import DarkModeSwitch from './DarkModeSwitch';

const navItems = [
  {
    name: 'home',
    href: '/',
  },
  {
    name: 'work',
    href: '/work',
  },
  {
    name: 'blog',
    href: '/blog',
  },
];

export default function Navbar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [isDarkMode, setDarkMode] = useState(false);

  return (
    <nav className={cn('flex justify-between', className)}>
      <ol className="flex gap-4">
        {navItems.map(item => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={cn(
                'hover:underline hover:decoration-blue-500 hover:decoration-wavy dark:decoration-slate-400 dark:hover:decoration-slate-500/50',
                pathname === item.href
                  ? 'underline decoration-blue-500 decoration-wavy dark:decoration-slate-500/50'
                  : null,
              )}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ol>
      <ol className="flex flex-row gap-8">
        <li>
          <DarkModeSwitch
            className="h-6 w-6"
            checked={isDarkMode}
            onSwitch={setDarkMode}
          />
        </li>
        <li>
          <a href="" title="RSS link">
            <Icon name="rss" className="h-6 w-6" />
          </a>
        </li>
      </ol>
    </nav>
  );
}
