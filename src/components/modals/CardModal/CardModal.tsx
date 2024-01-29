import { type MutableRefObject, type ReactNode, useRef } from 'react'
import classNames from './CardModal.module.pcss'
import { animated, useSpring } from '@react-spring/web'
import { easeCubicInOut, easeQuadInOut } from 'd3-ease'
import { IconX } from '@tabler/icons-react'
import { Button } from '../../buttons/Button/Button'

interface CardModalProps {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	children: ReactNode
	title?: string
}

export function CardModal({ isOpen, setIsOpen, children, title = '' }: CardModalProps) {
	const contentContainerRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null)

	const contentContainerAnimation = useSpring({
		transform: isOpen ? 'translateY(0px)' : `translateY(${contentContainerRef.current?.clientHeight}px)`,
		config: { duration: 200, easing: easeCubicInOut },
		delay: !isOpen ? 0 : 50,
	})

	const overlayAnimation = useSpring({
		opacity: isOpen ? 1 : 0,
		pointerEvents: isOpen ? ('all' as const) : ('none' as const),
		config: { duration: 100, easing: easeQuadInOut },
		delay: !isOpen ? 150 : 0,
	})

	return (
		<animated.div className={classNames.overlay} style={overlayAnimation}>
			<animated.div className={classNames.contentContainer} style={contentContainerAnimation} ref={contentContainerRef}>
				<div className={classNames.header}>
					<p className={'body2'}>{title}</p>
					<Button
						onClick={() => {
							setIsOpen(false)
						}}
						variant="black"
						size="sq-xs"
						leftIcon={<IconX size={18} color="var(--color-text-secondary)" />}
					/>
				</div>
				{children}
			</animated.div>
		</animated.div>
	)
}
