import { useEffect, useState } from 'react'

const breakpoints = {
	mobile: 743,
	tablet: 1279,
	desktop: 1919,
	fullHd: Infinity,
} as const

export type Screen = keyof typeof breakpoints
type RangeType = 'up' | 'down' | 'only'
const screenOrder: Screen[] = Object.keys(breakpoints) as Screen[]
export const useMediaQuery = (screen: Screen, rangeType: RangeType = 'only'): boolean => {
	const [matches, setMatches] = useState(false)

	useEffect(() => {
		let media: MediaQueryList

		if (rangeType === 'up') {
			const index = screenOrder.indexOf(screen)
			// Give prev resolution and plus 1px
			const minWidth = screen === 'mobile' ? 0 : breakpoints[screenOrder[index - 1]] + 1
			media = window.matchMedia(`(min-width: ${minWidth}px)`)
		} else if (rangeType === 'down') {
			media = window.matchMedia(`(max-width: ${breakpoints[screen]}px)`)
		} else {
			const index = screenOrder.indexOf(screen)
			const min = index === 0 ? 0 : breakpoints[screen] + 1
			const max =
				index === 0 ? breakpoints[screenOrder[index]] : (breakpoints[screenOrder[index + 1]] ?? Infinity)

			if (max === Infinity) {
				media = window.matchMedia(`(min-width: ${min}px)`)
			} else {
				media = window.matchMedia(`(min-width: ${min}px) and (max-width: ${max}px)`)
			}
		}

		const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
		media.addEventListener('change', onChange)
		setMatches(media.matches)

		return () => media.removeEventListener('change', onChange)
	}, [screen, rangeType])

	return matches
}
