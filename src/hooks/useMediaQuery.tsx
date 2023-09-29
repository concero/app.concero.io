import { useEffect, useState } from 'react'

const sizes = {
	mobile: '768px',
	ipad: '1024px',
}

export const useMediaQuery = (screen: keyof string) => {
	const [matches, setMatches] = useState(() => {
		const query = `(max-width: ${sizes[screen]})`
		return window.matchMedia(query).matches
	})

	useEffect(() => {
		const query = `(max-width: ${sizes[screen]})`
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
