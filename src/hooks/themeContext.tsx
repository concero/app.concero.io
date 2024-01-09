// ThemeContext.tsx
import { createContext, type FC, type ReactNode, useContext, useEffect, useState } from 'react'
import { type Colors } from '../constants/colors'

import lightColors from '../constants/json/colors-light.json'
import darkColors from '../constants/json/colors-dark.json'
import { trackEvent } from './useTracking'
import { action, category } from '../constants/tracking'
import { getItem, setItem } from '../utils/localStorage'

interface ThemeContextType {
	theme: 'light' | 'dark'
	toggleTheme: () => void
	colors: Colors
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
export const useTheme = () => useContext(ThemeContext)
interface ThemeProviderProps {
	children: ReactNode
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
	const bodyClassTheme = getItem<'light' | 'dark'>('theme', 'dark') ?? 'dark'

	const [theme, setTheme] = useState<'light' | 'dark'>(bodyClassTheme)
	const [colors, setColors] = useState<Colors>(bodyClassTheme === 'light' ? (lightColors.color as Colors) : (darkColors.color as Colors))

	const toggleTheme = () => {
		const bodyClassTheme = document.body.classList.contains('dark') ? 'dark' : 'light'
		const newTheme = bodyClassTheme === 'light' ? 'dark' : 'light'
		setTheme(newTheme)
		setItem('theme', newTheme)

		document.body.classList.remove(bodyClassTheme)
		document.body.classList.add(newTheme)

		trackEvent({ category: category.Header, action: action.ToggleTheme, label: 'toggle_theme', data: { theme: newTheme } })
	}

	useEffect(() => {
		if (theme === 'light') {
			document.body.classList.remove('dark')
			document.body.classList.add('light')
		} else {
			document.body.classList.remove('light')
			document.body.classList.add('dark')
		}

		const themeColors = theme === 'light' ? lightColors : darkColors
		setColors(themeColors.color as Colors)
	}, [theme])

	return <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>{children}</ThemeContext.Provider>
}
