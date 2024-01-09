import React, { useState } from 'react'
import { animated, useSpring } from '@react-spring/web'

export function WithTooltip({ WrappedComponent, Tooltip, tooltipProps = {} }) {
	const [tooltipVisible, setTooltipVisible] = useState(false)
	const [tooltipTimeout, setTooltipTimeout] = useState(null)

	const [springProps, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 2, tension: 300, friction: 18 } }))

	const handleMouseEnter = () => {
		setTooltipVisible(true)
		// sets timeout to hide tooltip after 1 second
		if (tooltipTimeout) clearTimeout(tooltipTimeout)
	}

	const handleMouseLeave = () => {
		setTooltipTimeout(
			setTimeout(() => {
				setTooltipVisible(false)
			}, 300),
		)
		if (tooltipTimeout) clearTimeout(tooltipTimeout)
	}

	const handleMouseMove = ({ clientX: x, clientY: y }) => {
		set({ xy: [x, y] })
	}

	return (
		<div>
			<div onMouseEnter={handleMouseEnter} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
				<WrappedComponent />
			</div>
			{tooltipVisible && (
				<animated.div
					style={{
						position: 'fixed',
						zIndex: 100,
						pointerEvents: 'none',
						transform: springProps.xy.to((x, y) => `translateX(${x - 320}px) translateY(${y}px)`),
					}}
				>
					<Tooltip {...tooltipProps} />
				</animated.div>
			)}
		</div>
	)
}
