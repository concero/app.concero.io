import { useState, useCallback } from 'react'
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
