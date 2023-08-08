// ThemeContext.tsx
import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'
import { Colors } from '../constants/colors'

import lightColors from '../constants/json/colors-light.json'
import darkColors from '../constants/json/colors-dark.json'

type ThemeContextType = {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  colors: Colors
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
const useTheme = () => useContext(ThemeContext)
type ThemeProviderProps = {
  children: ReactNode
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const bodyClassTheme = document.body.classList.contains('dark') ? 'dark' : 'light'

  const [theme, setTheme] = useState<'light' | 'dark'>(bodyClassTheme)

  const [colors, setColors] = useState<Colors>(lightColors.color as Colors)

  const toggleTheme = () => {
    const bodyClassTheme = document.body.classList.contains('dark') ? 'dark' : 'light'
    const newTheme = bodyClassTheme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)

    document.body.classList.remove(bodyClassTheme)
    document.body.classList.add(newTheme)
  }

  const watchSystemThemeChanges = () => {
    const prefersDarkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleSystemThemeChange = (event) => {
      if (event.matches) {
        setTheme('dark')
        document.body.classList.remove(bodyClassTheme)
        document.body.classList.add('dark')
      } else {
        setTheme('light')
        document.body.classList.remove(bodyClassTheme)
        document.body.classList.add('light')
      }
    }

    prefersDarkModeMediaQuery.addListener(handleSystemThemeChange)
    handleSystemThemeChange(prefersDarkModeMediaQuery)

    return () => {
      prefersDarkModeMediaQuery.removeListener(handleSystemThemeChange)
    }
  }

  useEffect(() => {
    const clean = watchSystemThemeChanges()
    return () => clean()
  }, [])

  useEffect(() => {
    const themeColors = theme === 'light' ? lightColors : darkColors
    setColors(themeColors.color as Colors)
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        colors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
