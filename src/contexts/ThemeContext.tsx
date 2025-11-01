import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/AuthProvider'

export type WellnessTheme = 'lavender' | 'ocean' | 'sunset' | 'forest' | 'moonlight'
export type ColorMode = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: WellnessTheme
  colorMode: ColorMode
  isDark: boolean
  setTheme: (theme: WellnessTheme) => Promise<void>
  setColorMode: (mode: ColorMode) => Promise<void>
  toggleColorMode: () => Promise<void>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [theme, setThemeState] = useState<WellnessTheme>('lavender')
  const [colorMode, setColorModeState] = useState<ColorMode>('system')
  const [isDark, setIsDark] = useState(false)

  // Load theme from user profile or localStorage
  useEffect(() => {
    const loadTheme = async () => {
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('wellness_theme, is_dark_mode')
          .eq('id', user.id)
          .single()

        if (data) {
          setThemeState((data.wellness_theme as WellnessTheme) || 'lavender')
          const savedMode = data.is_dark_mode ? 'dark' : 'light'
          setColorModeState(savedMode)
        }
      } else {
        const savedTheme = localStorage.getItem('wellness_theme') as WellnessTheme
        const savedMode = localStorage.getItem('color_mode') as ColorMode
        if (savedTheme) setThemeState(savedTheme)
        if (savedMode) setColorModeState(savedMode)
      }
    }

    loadTheme()
  }, [user])

  // Apply theme and color mode
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)

    const applyColorMode = () => {
      if (colorMode === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setIsDark(systemPrefersDark)
        root.classList.toggle('dark', systemPrefersDark)
      } else {
        const shouldBeDark = colorMode === 'dark'
        setIsDark(shouldBeDark)
        root.classList.toggle('dark', shouldBeDark)
      }
    }

    applyColorMode()

    if (colorMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = () => applyColorMode()
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    }
  }, [theme, colorMode])

  const setTheme = async (newTheme: WellnessTheme) => {
    setThemeState(newTheme)
    localStorage.setItem('wellness_theme', newTheme)

    if (user) {
      await supabase
        .from('profiles')
        .update({ wellness_theme: newTheme })
        .eq('id', user.id)
    }
  }

  const setColorMode = async (mode: ColorMode) => {
    setColorModeState(mode)
    localStorage.setItem('color_mode', mode)

    if (user) {
      const isDarkMode = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
      await supabase
        .from('profiles')
        .update({ is_dark_mode: isDarkMode })
        .eq('id', user.id)
    }
  }

  const toggleColorMode = async () => {
    const newMode = isDark ? 'light' : 'dark'
    await setColorMode(newMode)
  }

  return (
    <ThemeContext.Provider value={{ theme, colorMode, isDark, setTheme, setColorMode, toggleColorMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
