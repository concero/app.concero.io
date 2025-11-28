import { useEffect, useState } from 'react'

export const useQuestCardState = () => {
	const [isHovered, setIsHovered] = useState(false)
	const [isPressed, setIsPressed] = useState(false)

	useEffect(() => {
		const handleMouseUp = () => setIsPressed(false)
		document.addEventListener('mouseup', handleMouseUp)
		return () => document.removeEventListener('mouseup', handleMouseUp)
	}, [])

	return {
		isHovered,
		isPressed,
		setIsHovered,
		setIsPressed,
	}
}
