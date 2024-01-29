import Link from 'next/link';
import Icon from './Icon';
import cn from '../utils/cn';

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
    href: 'blog',
  },
];

export default function Navbar({ className }: { className?: string }) {
  return (
    <nav className={cn(['flex justify-between', className])}>
      <ol className="flex gap-4">
        {navItems.map(item => (
          <li key={item.name}>
            <div>
              <Link
                href={item.href}
                className="hover:underline hover:decoration-blue-500 hover:decoration-wavy"
              >
                {item.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
      <ol className="flex flex-row gap-8">
        <li>
          <Icon name="sun" className="h-6 w-6" />
        </li>
        <li>
          <Icon name="rss" className="h-6 w-6" />
        </li>
      </ol>
    </nav>
  );
}
