import Link from 'next/link';

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

export function Navbar({ className }: { className?: string }) {
  return (
    <nav>
      <ol className={className}>
        {navItems.map(item => (
          <li key={item.name}>
            <div>
              <Link href={item.href}>{item.name}</Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
