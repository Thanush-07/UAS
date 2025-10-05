// src/hooks/useDarkMode.js
import { useEffect, useState } from 'react';

export const useDarkMode = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const colorTheme = theme === 'light' ? 'dark' : 'light';

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
};

// src/components/DarkModeToggle.jsx
import React from 'react';
import { useDarkMode } from '../hooks/useDarkMode';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'; // npm install @heroicons/react

const DarkModeToggle = () => {
  const [colorTheme, setTheme] = useDarkMode();

  return (
    <button
      onClick={() => setTheme(colorTheme)}
      className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle dark mode"
    >
      {colorTheme === 'light' ? (
        <SunIcon className="h-6 w-6 text-yellow-500" />
      ) : (
        <MoonIcon className="h-6 w-6 text-blue-400" />
      )}
    </button>
  );
};

export default DarkModeToggle;
