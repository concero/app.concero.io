import classNames from './BurgerMenu.module.pcss'
import {
	type KeyboardEvent as ReactKeyboardEvent,
	type MouseEvent as ReactMouseEvent,
	useCallback,
	useEffect,
	useState,
} from 'react'
import { animated, useSpring } from '@react-spring/web'
import { useTranslation } from 'react-i18next'
import IconBurger from '@/shared/assets/icons/monochrome/BurgerMenu.svg?react'
import LanguageIcon from '@/shared/assets/icons/monochrome/LanguageIcon.svg?react'
import CrossCloseIcon from '@/shared/assets/icons/monochrome/CrossClose.svg?react'
import { Button, IconButton, Tag, useTheme } from '@concero/ui-kit'
import { TUserResponse } from '@/entities/User'
import { Link, useMatch } from 'react-router-dom'
import { routes } from '@/constants/routes'
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery'
import { Separator } from '@/components/layout/Separator/Separator'
import { WalletButton } from '@/features/Auth'
import { LanguageModal } from '@/components/modals/LanguageModal/LanguageModal'
import { ContactSupportModal } from '@/components/modals/ContactSupportModal/ContactSupportModal'
import { ThemeSwitcher } from '@/features/ThemeSwitcher/ui/ThemeSwitcher'
import { useAppKitAccount } from '@reown/appkit/react'
import { isAdminAddress } from '@/shared/lib/tests/isAdminAddress'

interface Props {
	user: TUserResponse | null
}

export function BurgerMenu({ user }: Props) {
	const [isMenuOpened, setIsMenuOpened] = useState(false)
	const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false)
	const [isContactSupportModalVisible, setIsModalContactSupportModalVisible] = useState(false)
	const isTablet = useMediaQuery('tablet')
	const isMobile = useMediaQuery('mobile')
	const { t } = useTranslation()
	const { address } = useAppKitAccount()
	const { theme } = useTheme()
	const isAdmin = isAdminAddress(address)
	const matchSwapRewards = useMatch(routes.rewards)
	const matchSwapProfile = useMatch(routes.profile)
	const handleKeyDown = useCallback((event: ReactKeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Escape') {
			setIsMenuOpened(false)
		}
	}, [])

	const handleMenuClose = useCallback(() => {
		setIsMenuOpened(false)
	}, [])

	const handleMenuOpen = (e: ReactMouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		setIsMenuOpened(prev => !prev)
	}

	const fadeAnimation = useSpring({
		to: {
			opacity: isMenuOpened ? 1 : 0,
			translateY: isMenuOpened ? 0 : -100,
			pointerEvents: isMenuOpened ? 'auto' : ('none' as const),
		},
		config: {
			mass: 1,
			tension: 600,
			friction: 30,
		},
		from: {
			opacity: 0,
			zIndex: -10,
			pointerEvents: 'none' as const,
		},
	})

	const overlayFadeAnimation = useSpring({
		to: {
			opacity: isMenuOpened ? 1 : 0,
			pointerEvents: isMenuOpened ? 'auto' : ('none' as const),

			zIndex: isMenuOpened ? 'initial' : -10,
		},
		config: {
			mass: 1,
			tension: 600,
			friction: 30,
		},
		from: {
			opacity: 0,
			zIndex: -10,
			pointerEvents: 'none' as const,
		},
	})

	useEffect(() => {
		if (isMenuOpened) {
			document.body.style.overflowY = 'hidden'
			document.addEventListener('keydown', handleKeyDown as unknown as EventListener)
		} else {
			document.body.style.removeProperty('overflow-y')
		}
		return () => {
			document.removeEventListener('keydown', handleKeyDown as unknown as EventListener)
		}
	}, [isMenuOpened, handleKeyDown])

	useEffect(() => {
		document.addEventListener('click', handleMenuClose)
		return () => {
			document.removeEventListener('click', handleMenuClose)
		}
	}, [handleMenuClose])

	const settings = (
		<ul className={classNames.listContainer}>
			{(isTablet || isMobile) && (
				<>
					<Link
						style={{ pointerEvents: matchSwapRewards ? 'none' : 'all', width: '100%' }}
						to={routes.rewards}
					>
						<Button
							isFull
							buttonProps={{
								style: {
									color: matchSwapRewards ? 'var(--color-accent-600)' : '',
								},
							}}
							variant="tetrary"
							className={classNames.rewards_page_btn}
						>
							Rewards
						</Button>
					</Link>
					<Link
						style={{ pointerEvents: matchSwapProfile ? 'none' : 'all', width: '100%' }}
						to={routes.profile}
					>
						<Button
							isFull
							className={classNames.profile_page_btn}
							buttonProps={{
								style: {
									color: matchSwapProfile ? 'var(--color-accent-600)' : '',
								},
							}}
							rightIcon={
								<Tag size="s" variant="branded">
									New!
								</Tag>
							}
							variant="tetrary"
						>
							Profile
						</Button>
					</Link>
					<Separator />
				</>
			)}

			{isAdmin && (
				<li>
					<ThemeSwitcher className={classNames.listButton} />
				</li>
			)}
			<li>
				<Button
					leftIcon={<LanguageIcon />}
					variant={'tetrary'}
					size={'m'}
					className={classNames.listButton}
					onClick={() => {
						setIsLanguageModalVisible(true)
					}}
				>
					{t('header.menu.changeLanguage')}
				</Button>
			</li>
			<li>
				<Separator />
			</li>
		</ul>
	)

	return (
		<div className={classNames.container}>
			<IconButton
				variant="secondary"
				onClick={handleMenuOpen}
				size="m"
				htmlButtonProps={{
					//@ts-expect-error dadw
					onClick: handleMenuOpen,
					style: {
						zIndex: 1,
					},
				}}
			>
				{isMenuOpened ? <CrossCloseIcon /> : <IconBurger />}
			</IconButton>

			<animated.div style={overlayFadeAnimation} className={classNames.overlay} onClick={handleMenuClose}>
				<animated.div
					onClick={(e: ReactMouseEvent<HTMLDivElement>) => {
						e.stopPropagation()
					}}
					style={fadeAnimation}
					className={classNames.menuContainer}
				>
					{isMobile && <WalletButton isFull />}
					{settings}
					<Button
						isFull
						variant="secondary_color"
						size="l"
						onClick={() => {
							setIsModalContactSupportModalVisible(true)
						}}
					>
						{t('header.menu.contactSupport')}
					</Button>
				</animated.div>
			</animated.div>
			<LanguageModal show={isLanguageModalVisible} setShow={setIsLanguageModalVisible} />
			<ContactSupportModal
				isShow={isContactSupportModalVisible}
				setIsShow={setIsModalContactSupportModalVisible}
			/>
		</div>
	)
}
