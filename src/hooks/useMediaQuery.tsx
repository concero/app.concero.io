import { useEffect, useState } from 'react'

type Screen = 'mobile' | 'tablet' | 'desktop'

const queries: Record<Screen, string> = {
	mobile: '(max-width: 743px)',
	tablet: '(min-width: 744px) and (max-width: 1279px)',
	desktop: '(min-width: 1280px)',
}

export const useMediaQuery = (screen: Screen): boolean => {
	const [matches, setMatches] = useState<boolean>(() => {
		return window.matchMedia(queries[screen]).matches
	})

	useEffect(() => {
		const media = window.matchMedia(queries[screen])

		const listener = (event: MediaQueryListEvent) => {
			setMatches(event.matches)
		}

		media.addEventListener('change', listener)

		return () => {
			media.removeEventListener('change', listener)
		}
	}, [screen])

	return matches
}
