import { IconButton } from '@concero/ui-kit'
import CrossCloseIcon from '@/shared/assets/icons/monochrome/CrossClose.svg?react'
import IconBurger from '@/shared/assets/icons/monochrome/BurgerMenu.svg?react'
import { useBurgerMenu } from '../../model/hooks/useBurgerMenu'
import { ReactNode, MouseEvent } from 'react'
import { animated, easings, useSpring } from '@react-spring/web'
import cls from './BurgerButton.module.pcss'
import clsx from 'clsx'
import { BurgerMenuContext } from '../../model/context/BurgerMenuContext'
import { ContactSupportButton } from '@/entities/Support'
type TProps = {
	menuContent?: ReactNode
}

export const BurgerButton = (props: TProps) => {
	const { menuContent } = props
	const { handleKeyDown, handleMenuClose, handleMenuOpen, isMenuOpened, setIsMenuOpened } = useBurgerMenu()

	const overlayFadeAnimation = useSpring({
		to: {
			opacity: isMenuOpened ? 1 : 0,
			pointerEvents: isMenuOpened ? 'auto' : ('none' as const),
		},
		config: {
			duration: 300,
			easing: (t: number) => t * t,
		},
		from: {
			opacity: 0,
			pointerEvents: 'none' as const,
		},
	})
	const fadeAnimation = useSpring({
		to: {
			opacity: isMenuOpened ? 1 : 0,
			transform: isMenuOpened ? 'translateY(0)' : 'translateY(-100px)',
			pointerEvents: isMenuOpened ? ('auto' as const) : ('none' as const),
		},
		config: {
			duration: 300,
			easing: (t: number) => t * t,
		},
		from: {
			transform: 'translateY(-100%)',
			opacity: 0,
			zIndex: -10,
			pointerEvents: 'none' as const,
		},
	})
	return (
		<div>
			<IconButton
				variant="secondary"
				onClick={handleMenuOpen}
				size="m"
				htmlButtonProps={{
					style: {
						zIndex: 1,
					},
				}}
				className={clsx({ [cls.opened]: isMenuOpened })}
			>
				{isMenuOpened ? <CrossCloseIcon /> : <IconBurger />}
			</IconButton>
			<animated.div style={overlayFadeAnimation} className={clsx(cls.overlay)} onClick={handleMenuClose}>
				<animated.div
					onClick={(e: MouseEvent<HTMLDivElement>) => {
						e.stopPropagation()
					}}
					style={fadeAnimation}
					className={cls.menu_container}
				>
					<BurgerMenuContext.Provider value={{ closeMenu: handleMenuClose }}>
						{menuContent}
					</BurgerMenuContext.Provider>
				</animated.div>
			</animated.div>
		</div>
	)
}
