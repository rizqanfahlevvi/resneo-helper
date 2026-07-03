import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FontFamily = 'lexend' | 'inter' | 'roboto' | 'jetbrains' | 'system' | 'poppins' | 'montserrat' | 'plus-jakarta' | 'outfit' | 'space-grotesk' | 'fira-code' | 'quicksand';
export type FontWeight = number; // -300 to 400 (offset from standard weights)
export type ThemeMode = 'system' | 'light' | 'dark';

interface SettingsState {
  fontFamily: FontFamily;
  fontScale: number; // 0.5 to 2.0
  fontWeight: FontWeight;
  themeMode: ThemeMode;
  bwMode: boolean; // Black & White Mode
  readingMode: boolean; // High Contrast Reading Mode
  vibrationEnabled: boolean;

  setFontFamily: (fontFamily: FontFamily) => void;
  setFontScale: (scale: number) => void;
  setFontWeight: (weight: FontWeight) => void;
  setThemeMode: (mode: ThemeMode) => void;
  setBwMode: (enabled: boolean) => void;
  setReadingMode: (enabled: boolean) => void;
  setVibrationEnabled: (enabled: boolean) => void;

  resetSettings: () => void;
}

const defaultSettings = {
  fontFamily: 'lexend' as FontFamily,
  fontScale: 1.0,
  fontWeight: 0 as FontWeight,
  themeMode: 'system' as ThemeMode,
  bwMode: false,
  readingMode: false,
  vibrationEnabled: true,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,

      setFontFamily: (fontFamily) => set({ fontFamily }),
      setFontScale: (fontScale) => set({ fontScale }),
      setFontWeight: (fontWeight) => set({ fontWeight }),
      setThemeMode: (themeMode) => set({ themeMode }),
      setBwMode: (bwMode) => set({ bwMode }),
      setReadingMode: (readingMode) => set({ readingMode }),
      setVibrationEnabled: (vibrationEnabled) => set({ vibrationEnabled }),

      resetSettings: () => set(defaultSettings),
    }),
    {
      name: 'resneo-helper-settings',
    }
  )
);
