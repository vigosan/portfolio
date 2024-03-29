'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DarkModeSwitch from './DarkModeSwitch';
import Icon from './Icon';
import cn from '../utils/cn';
import { useTheme } from '../hooks/useTheme';
import { Theme } from '../context/ThemeContext';

const navItems = [
  {
    name: 'home',
    href: '/',
  },
  {
    name: 'blog',
    href: '/blog',
  },
];

export default function Navbar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={cn('flex justify-between', className)}>
      <ol className="flex items-center gap-4">
        {navItems.map(item => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={cn(
                'hover:underline hover:decoration-blue-500 hover:decoration-wavy dark:decoration-slate-400 dark:hover:decoration-slate-500/50',
                (
                  item.href === '/'
                    ? pathname === item.href
                    : pathname.includes(item.href)
                )
                  ? 'underline decoration-blue-500 decoration-wavy dark:decoration-slate-500/50'
                  : null,
              )}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ol>

      <ol className="flex items-center gap-8">
        <li>
          <DarkModeSwitch
            className="block h-6 w-6"
            checked={theme === Theme.DARK}
            onSwitch={toggleTheme}
          />
        </li>
        <li>
          <a href="/feed.xml" title="RSS link">
            <Icon name="rss" className="h-6 w-6" />
          </a>
        </li>
        <li>
          <a href="http://github.com/vigosan/portfolio" title="Source code">
            <Icon name="github" className="h-6 w-6" />
          </a>
        </li>
      </ol>
    </nav>
  );
}
