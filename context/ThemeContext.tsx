'use client';
import { useEffect, createContext, useState, FC, ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}
export type ThemeContextType = { theme: Theme; toggleTheme: () => void };
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', Theme.LIGHT);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  const toggleTheme = () => {
    setTheme((prevTheme: Theme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT,
    );
  };

  useEffect(() => {
    setIsThemeLoaded(true);
    if (typeof window !== 'undefined') {
      if (theme === Theme.DARK) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);

  if (!isThemeLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
