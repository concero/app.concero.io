import { useState, useCallback, useEffect } from 'react'
import type { MouseEvent, KeyboardEvent } from 'react'
export const useBurgerMenu = () => {
	const [isMenuOpened, setIsMenuOpened] = useState(false)

	const handleMenuClose = useCallback(() => {
		setIsMenuOpened(false)
	}, [])

	const handleMenuOpen = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		setIsMenuOpened(prev => !prev)
	}
	useEffect(() => {
		if (isMenuOpened) {
			document.body.style.overflow = 'hidden'
			const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
			document.body.style.paddingRight = `${scrollbarWidth}px`
		} else {
			document.body.style.overflow = ''
			document.body.style.paddingRight = ''
		}
	}, [isMenuOpened])
	const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Escape') {
			setIsMenuOpened(false)
		}
	}, [])
	return {
		isMenuOpened,
		setIsMenuOpened,
		handleKeyDown,
		handleMenuOpen,
		handleMenuClose,
	}
}
