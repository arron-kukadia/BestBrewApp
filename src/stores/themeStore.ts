import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import { lightColors, darkColors, Colors } from '@/theme/colors';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ThemeMode;
  isDark: boolean;
  colors: Colors;
  hasHydrated: boolean;
  setMode: (mode: ThemeMode) => void;
  setSystemTheme: (isDark: boolean) => void;
  setHasHydrated: (value: boolean) => void;
}

const getColorsForMode = (mode: ThemeMode, systemIsDark: boolean) => {
  const isDark = mode === 'dark' || (mode === 'system' && systemIsDark);
  return {
    isDark,
    colors: isDark ? darkColors : lightColors,
  };
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'system',
      isDark: false,
      colors: lightColors,
      hasHydrated: false,

      setMode: (mode: ThemeMode) => {
        const systemIsDark = Appearance.getColorScheme() === 'dark';
        const { isDark, colors } = getColorsForMode(mode, systemIsDark);
        set({ mode, isDark, colors });
      },

      setSystemTheme: (systemIsDark: boolean) => {
        const { mode } = get();
        if (mode === 'system') {
          set({
            isDark: systemIsDark,
            colors: systemIsDark ? darkColors : lightColors,
          });
        }
      },

      setHasHydrated: (value: boolean) => set({ hasHydrated: value }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ mode: state.mode }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const systemIsDark = Appearance.getColorScheme() === 'dark';
          const { isDark, colors } = getColorsForMode(state.mode, systemIsDark);
          state.isDark = isDark;
          state.colors = colors;
          state.hasHydrated = true;
        }
      },
    }
  )
);
