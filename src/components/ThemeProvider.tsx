import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSettingsStore } from '../settings/useSettingsStore';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function resolveTheme(themeMode: 'system' | 'light' | 'dark'): Theme {
  if (themeMode === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return themeMode;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { themeMode, setThemeMode } = useSettingsStore();
  const [theme, setTheme] = useState<Theme>(() => resolveTheme(themeMode));

  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = () => {
      const resolved = resolveTheme(themeMode);
      setTheme(resolved);
      if (resolved === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
    };

    applyTheme();

    if (themeMode === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener('change', applyTheme);
      return () => mq.removeEventListener('change', applyTheme);
    }
  }, [themeMode]);

  const toggleTheme = () => {
    const current = resolveTheme(themeMode);
    setThemeMode(current === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
