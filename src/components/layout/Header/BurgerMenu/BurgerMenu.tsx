import burgerMenuIcon from '../../../../assets/icons/burgerMenuIcon.svg'
import classNames from './BurgerMenu.module.pcss'
import { Button } from '../../../buttons/Button/Button'
import { type KeyboardEvent, useContext, useEffect, useState } from 'react'
import { IconBrandDiscord, IconBrandTwitter, IconLanguage, IconMoon, IconSun } from '@tabler/icons-react'
import { LanguageModal } from '../../../modals/LanguageModal/LanguageModal'
import { ThemeContext } from '../../../../hooks/themeContext'
import { animated, useSpring } from '@react-spring/web'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from '../../../../hooks/useMediaQuery'
import { MobileBreadcrumbs } from './MobileBreadcrumbs/MobileBreadcrumbs'
import { ContactSupportModal } from '../../../modals/ContactSupportModal/ContactSupportModal'

export function BurgerMenu() {
	const [isMenuOpened, setIsMenuOpened] = useState(false)
	const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false)
	const [isContactSupportModalVisible, setIsModalContactSupportModalVisible] = useState(false)
	const { theme, toggleTheme } = useContext(ThemeContext)
	const isMobile = useMediaQuery('mobile')
	const { t } = useTranslation()

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			setIsMenuOpened(false)
		}
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

	return (
		<div className={classNames.container}>
			<Button
				variant={'black'}
				size={'sq-sm'}
				onClick={() => {
					setIsMenuOpened(prev => !prev)
				}}
			>
				<div className={classNames.imgContainer}>
					<img src={burgerMenuIcon} />
				</div>
			</Button>
			<animated.div
				style={overlayFadeAnimation}
				className={classNames.overlay}
				onClick={() => {
					setIsMenuOpened(false)
				}}
			>
				<animated.div style={fadeAnimation} className={classNames.menuContainer}>
					{isMobile ? <MobileBreadcrumbs /> : null}
					<ul className={classNames.listContainer}>
						<li>
							<Button
								variant={'black'}
								size={'sq-sm'}
								className={classNames.listButton}
								onClick={(e: MouseEvent) => {
									toggleTheme()
									e.stopPropagation()
								}}
							>
								{theme === 'dark' ? <IconMoon size={18} color={'var(--color-text-secondary)'} /> : <IconSun size={18} color={'var(--color-text-secondary)'} />}
								<h5>{t('header.menu.toggleTheme')}</h5>
							</Button>
						</li>
						<li>
							<Button
								variant={'black'}
								size={'sq-sm'}
								className={classNames.listButton}
								onClick={(e: MouseEvent) => {
									setIsLanguageModalVisible(true)
									e.stopPropagation()
								}}
							>
								<IconLanguage size={18} color={'var(--color-text-secondary)'} />
								<h5>{t('header.menu.changeLanguage')}</h5>
							</Button>
						</li>
						<li>
							<Button
								variant={'black'}
								size={'sq-sm'}
								className={classNames.listButton}
								onClick={(e: MouseEvent) => {
									window.open('https://twitter.com/concero_io', '_blank')
									e.stopPropagation()
								}}
							>
								<IconBrandTwitter size={18} color={'var(--color-text-secondary)'} />
								<h5>{t('socialMedia.twitter')}</h5>
							</Button>
						</li>
						<li>
							<Button
								variant={'black'}
								size={'sq-sm'}
								className={classNames.listButton}
								onClick={(e: MouseEvent) => {
									window.open('https://discord.com/channels/1155792755105214535', '_blank')
									e.stopPropagation()
								}}
							>
								<IconBrandDiscord size={18} color={'var(--color-text-secondary)'} />
								<h5>{t('socialMedia.discord')}</h5>
							</Button>
						</li>
					</ul>
					<Button
						onClick={() => {
							setIsModalContactSupportModalVisible(true)
						}}
					>
						{t('header.menu.contactSupport')}
					</Button>
				</animated.div>
			</animated.div>
			<LanguageModal show={isLanguageModalVisible} setShow={setIsLanguageModalVisible} />
			<ContactSupportModal isShow={isContactSupportModalVisible} setIsShow={setIsModalContactSupportModalVisible} />
		</div>
	)
}
