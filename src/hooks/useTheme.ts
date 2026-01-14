import { useColorScheme } from 'react-native'
import { useEffect } from 'react'
import { useThemeStore } from '@/stores/themeStore'
import { spacing, borderRadius } from '@/theme/spacing'
import { typography } from '@/theme/typography'

export const useTheme = () => {
  const systemColorScheme = useColorScheme()
  const { colors, isDark, mode, setMode, setSystemTheme } = useThemeStore()

  useEffect(() => {
    setSystemTheme(systemColorScheme === 'dark')
  }, [systemColorScheme, setSystemTheme])

  return {
    colors,
    spacing,
    borderRadius,
    typography,
    isDark,
    mode,
    setMode,
  }
}
