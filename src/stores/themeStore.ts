import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightColors, darkColors, Colors } from '@/theme/colors';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ThemeMode;
  isDark: boolean;
  colors: Colors;
  setMode: (mode: ThemeMode) => void;
  setSystemTheme: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'system',
      isDark: false,
      colors: lightColors,

      setMode: (mode: ThemeMode) => {
        const isDark = mode === 'dark' || (mode === 'system' && get().isDark);
        set({
          mode,
          isDark,
          colors: isDark ? darkColors : lightColors,
        });
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
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ mode: state.mode }),
    }
  )
);
