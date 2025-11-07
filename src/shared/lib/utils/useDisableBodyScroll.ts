import { useCallback, useEffect } from 'react'

export const useDisableBodyScroll = (isOpen: boolean) => {
	const disableScroll = useCallback(() => {
		const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
		document.body.style.paddingRight = `${scrollBarWidth}px`
		document.body.style.overflow = 'hidden'
		document.body.style.touchAction = 'none'
	}, [])

	const enableScroll = useCallback(() => {
		document.body.style.paddingRight = ''
		document.body.style.overflow = ''
		document.body.style.touchAction = ''
	}, [])

	useEffect(() => {
		if (isOpen) {
			disableScroll()
			return enableScroll // cleanup при закрытии
		}
	}, [isOpen, disableScroll, enableScroll])
}
