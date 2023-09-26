import { useEffect, useState } from 'react'

const sizes = {
	mobile: '768px',
}

export const useMediaQuery = (screen: 'mobile') => {
	const [matches, setMatches] = useState(() => {
		const query = `(min-width: ${sizes[screen]})`
		return window.matchMedia(query).matches
	})

	useEffect(() => {
		const query = `(min-width: ${sizes[screen]})`
		const media = window.matchMedia(query)

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
