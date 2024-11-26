import classNames from './BurgerMenu.module.pcss'
import { Button } from '../../../buttons/Button/Button'
import { type KeyboardEvent, useEffect, useState } from 'react'
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

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			setIsMenuOpened(false)
		}
	}

	const handleMenuClose = () => {
		setIsMenuOpened(false)
	}

	const handleMenuOpen = (e: MouseEvent) => {
		e.stopPropagation()
		setIsMenuOpened(prev => !prev)
	}

	const fadeAnimation = useSpring({
		opacity: isMenuOpened ? 1 : 0,
		translateY: isMenuOpened ? 0 : -100,
		config: { easing: 'spring', mass: 1, tension: 600, friction: 30 },
		pointerEvents: isMenuOpened ? 'auto' : 'none',
		from: { opacity: 0, pointerEvents: 'none' },
	})

	const overlayFadeAnimation = useSpring({
		opacity: isMenuOpened ? 1 : 0,
		config: { easing: 'spring', mass: 1, tension: 600, friction: 30 },
		pointerEvents: isMenuOpened ? 'auto' : 'none',
		from: { opacity: 0, pointerEvents: 'none' },
	})

	useEffect(() => {
		if (isMenuOpened) {
			document.body.style.overflowY = 'hidden'
			document.addEventListener('keydown', handleKeyDown)
		} else {
			document.body.style.removeProperty('overflow-y')
		}
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [isMenuOpened])

	useEffect(() => {
		document.addEventListener('click', handleMenuClose)

		return () => {
			document.removeEventListener('click', handleMenuClose)
		}
	}, [])

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

			<animated.div
				style={overlayFadeAnimation}
				className={classNames.overlay}
				onClick={() => {
					setIsMenuOpened(false)
				}}
			>
				<animated.div
					onClick={(e: MouseEvent) => {
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
