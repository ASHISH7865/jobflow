import React from 'react';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  React.useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode((prev) => !prev)}
      className="p-2 rounded bg-secondary"
    >
        {isDarkMode ? <Moon /> : <Sun />}
    </button>
  );
};