import clsx from 'clsx';

export default function cn(...strs: (string | undefined | null)[]) {
  return clsx(strs);
}