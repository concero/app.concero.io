import { useCallback, useEffect } from 'react'

export const useDisableBodyScroll = (isOpen: boolean) => {
	const disableScroll = useCallback(() => {
		const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
		document.body.style.paddingRight = `${scrollBarWidth}px`
		document.body.style.overflow = 'hidden'
		document.body.style.touchAction = 'none'
		document.body.style.height = '100vh'
	}, [])

	const enableScroll = useCallback(() => {
		document.body.style.paddingRight = ''
		document.body.style.overflow = ''
		document.body.style.touchAction = ''
	}, [])

	useEffect(() => {
		if (isOpen) {
			disableScroll()
			return enableScroll
		}
	}, [isOpen, disableScroll, enableScroll])
}
