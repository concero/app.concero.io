import classNames from './BurgerMenu.module.pcss'
import { Button } from '../../../buttons/Button/Button'
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
import { MobileBreadcrumbs } from './MobileBreadcrumbs/MobileBreadcrumbs'
import { ContactSupportModal } from '../../../modals/ContactSupportModal/ContactSupportModal'
import { IconButton } from '../../../buttons/IconButton/IconButton'
import { IconBurger } from '../../../../assets/icons/IconBurger'
import { LanguageIcon } from '../../../../assets/icons/LanguageIcon'
import { SocialNetworkButtons } from '../../../rewards/ProfileCard/SocialNetworkButtons'
import { type IUser } from '../../../../api/concero/user/userType'
import { Separator } from '../../Separator/Separator'
import { Dropdown } from './Dropdown'

interface Props {
	user: IUser | null
}

export function BurgerMenu({ user }: Props) {
	const [isMenuOpened, setIsMenuOpened] = useState(false)
	const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false)
	const [isContactSupportModalVisible, setIsModalContactSupportModalVisible] = useState(false)
	const isMobile = useMediaQuery('ipad')
	const { t } = useTranslation()

	const handleKeyDown = useCallback((event: ReactKeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Escape') {
			setIsMenuOpened(false)
		}
	}, [])

	const handleMenuClose = useCallback(() => {
		setIsMenuOpened(false)
	}, [])

	const handleMenuOpen = useCallback((e: ReactMouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		setIsMenuOpened(prev => !prev)
	}, [])

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
			{user && <SocialNetworkButtons user={user} />}
			{user && <Separator />}
			<li>
				<Button
					leftIcon={<LanguageIcon />}
					variant={isMobile ? 'tetrary' : 'secondary'}
					size={isMobile ? 'md' : 'sm'}
					className={classNames.listButton}
					onClick={() => {
						setIsLanguageModalVisible(true)
					}}
				>
					{t('header.menu.changeLanguage')}
				</Button>
			</li>
			{!isMobile && <Separator />}
		</ul>
	)

	return (
		<div className={classNames.container}>
			<IconButton variant="secondary" onClick={handleMenuOpen}>
				<IconBurger />
			</IconButton>

			<animated.div style={overlayFadeAnimation} className={classNames.overlay} onClick={handleMenuClose}>
				<animated.div
					onClick={(e: ReactMouseEvent<HTMLDivElement>) => {
						e.stopPropagation()
					}}
					style={fadeAnimation}
					className={classNames.menuContainer}
				>
					{isMobile ? <MobileBreadcrumbs /> : null}

					{isMobile ? <Dropdown>{settings}</Dropdown> : settings}
					{isMobile && <Separator />}

					<Button
						className="w-full"
						variant="secondaryColor"
						size="md"
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
