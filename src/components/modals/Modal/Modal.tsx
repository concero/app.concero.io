import { type FC, type KeyboardEvent, type MouseEvent, type ReactNode, useEffect } from 'react'
import { animated, useSpring, useTransition } from '@react-spring/web'
import classNames from './Modal.module.pcss'
import { ModalHeader } from './ModalHeader'

export interface ModalProps {
	title?: string
	show: boolean
	setShow: (show: boolean) => void
	children?: ReactNode
	className?: string
	isHeaderVisible?: boolean
}

export const Modal: FC<ModalProps> = ({ title = '', show, setShow, children, className, isHeaderVisible = true }) => {
	const stopPropagation = (event: MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.stopPropagation()
	}

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			setShow(false)
		}
	}

	useEffect(() => {
		if (show) {
			document.body.style.overflowY = 'hidden'
			document.addEventListener('keydown', handleKeyDown)
		} else {
			document.body.style.removeProperty('overflow-y')
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [show])

	const fadeAnimation = useSpring({
		opacity: show ? 1 : 0,
		pointerEvents: show ? ('auto' as const) : ('none' as const),
	})

	const transitions = useTransition(show, {
		from: { transform: 'translateY(20px)', opacity: 0 },
		enter: { transform: 'translateY(0)', opacity: 1 },
		leave: { transform: 'translateY(20px)', opacity: 0 },
	})

	return (
		fadeAnimation.opacity.to(o => o > 0) && (
			<animated.div
				style={fadeAnimation}
				className={classNames.overlay}
				onClick={() => {
					setShow(false)
				}}
			>
				{transitions((style, item) =>
					item ? (
						<animated.div style={style} className={`${classNames.container} ${className}`} onClick={stopPropagation}>
							{isHeaderVisible ? (
								<ModalHeader
									title={title}
									onClick={() => {
										setShow(false)
									}}
								/>
							) : null}
							{children}
						</animated.div>
					) : null,
				)}
			</animated.div>
		)
	)
}
