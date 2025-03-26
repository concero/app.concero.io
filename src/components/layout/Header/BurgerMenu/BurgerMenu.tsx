import classNames from './BurgerMenu.module.pcss'
import {
	type KeyboardEvent as ReactKeyboardEvent,
	type MouseEvent as ReactMouseEvent,
	useCallback,
	useEffect,
	useState,
} from 'react'
import { LanguageModal } from '../../../modals/LanguageModal/LanguageModal'
import { animated, useSpring } from '@react-spring/web'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from '../../../../hooks/useMediaQuery'
import { ContactSupportModal } from '../../../modals/ContactSupportModal/ContactSupportModal'
import { IconBurger } from '../../../../assets/icons/IconBurger'
import LanguageIcon from '@/shared/assets/icons/monochrome/LanguageIcon.svg?react'
import CrossCloseIcon from '@/shared/assets/icons/monochrome/CrossClose.svg?react'
import { SocialNetworkButtons } from '../../../../features/User/ui/SocialNetworkButtons/SocialNetworkButtons'
import { Separator } from '../../Separator/Separator'
import { Button, IconButton, Tag } from '@concero/ui-kit'
import { TUserResponse } from '@/entities/User'
import { WalletButton } from '../WalletButton/WalletButton'
import { Link, useMatch } from 'react-router-dom'
import { routes } from '@/constants/routes'
import { isAdminAddress } from '@/shared/lib/tests/isAdminAddress'

interface Props {
	user: TUserResponse | null
}

export function BurgerMenu({ user }: Props) {
	const [isMenuOpened, setIsMenuOpened] = useState(false)
	const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false)
	const [isContactSupportModalVisible, setIsModalContactSupportModalVisible] = useState(false)
	const isDecktop = useMediaQuery('desktop')
	const isTablet = useMediaQuery('tablet')
	const isMobile = useMediaQuery('mobile')
	let isAdmin = isAdminAddress(user?.address)
	const { t } = useTranslation()

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
			pointerEvents: 'none' as const,
		},
	})

	const overlayFadeAnimation = useSpring({
		to: {
			opacity: isMenuOpened ? 1 : 0,
			pointerEvents: isMenuOpened ? 'auto' : ('none' as const),
		},
		config: {
			mass: 1,
			tension: 600,
			friction: 30,
		},
		from: {
			opacity: 0,
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
							isDisabled={!isAdmin}
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
						style={{ pointerEvents: matchSwapProfile ? 'none' : isAdmin ? 'all' : 'none', width: '100%' }}
						to={routes.profile}
					>
						<Button
							isFull
							isDisabled={!isAdmin}
							className={classNames.profile_page_btn}
							buttonProps={{
								style: {
									color: matchSwapProfile ? 'var(--color-accent-600)' : '',
								},
							}}
							rightIcon={
								isAdmin ? (
									<Tag size="s" variant="branded">
										new
									</Tag>
								) : (
									<Tag size="s" variant="neutral">
										Coming Soon
									</Tag>
								)
							}
							variant="tetrary"
						>
							Profile
						</Button>
					</Link>
					<Separator />
				</>
			)}
			{user && !isAdmin && (
				<>
					<SocialNetworkButtons user={user} /> <Separator />
				</>
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
