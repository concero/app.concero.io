// ThemeContext.tsx
import { createContext, type FC, type ReactNode, useContext, useEffect, useState } from 'react'
import { type Colors } from '../constants/colors'

import lightColors from '../constants/json/colors-light.json'
import { trackEvent } from './useTracking'
import { action, category } from '../constants/tracking'
import { setItem } from '../utils/localStorage'

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
	const [theme, setTheme] = useState<'light' | 'dark'>('light')
	const [colors, setColors] = useState<Colors>(lightColors.color)

	const toggleTheme = () => {
		const newTheme = 'light'
		setTheme('light')
		setItem('theme', 'light')

		document.body.classList.add(newTheme)

		trackEvent({
			category: category.Header,
			action: action.ToggleTheme,
			label: 'toggle_theme',
			data: { theme: newTheme },
		})
	}

	useEffect(() => {
		if (theme === 'dark') {
			document.body.classList.remove('dark')
			document.body.classList.add('light')
		}

		setColors(lightColors.color as Colors)
	}, [theme])

	return <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>{children}</ThemeContext.Provider>
}
