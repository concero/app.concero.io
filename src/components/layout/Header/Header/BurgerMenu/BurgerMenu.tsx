import burgerMenuIcon from '../../../../../assets/icons/burgerMenuIcon.svg'
import classNames from './BurgerMenu.module.pcss'
import { Button } from '../../../../buttons/Button/Button'
import { useContext, useState } from 'react'
import { IconBrandDiscord, IconBrandTwitter, IconLanguage, IconMoon, IconSun } from '@tabler/icons-react'
import { LanguageModal } from '../../../../modals/LanguageModal/LanguageModal'
import { ThemeContext } from '../../../../../hooks/themeContext'
import { animated, useSpring } from '@react-spring/web'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from '../../../../../hooks/useMediaQuery'
import { MobileBreadcrumbs } from './MobileBreadcrumbs/MobileBreadcrumbs'

export function BurgerMenu() {
	const [isMenuOpened, setIsMenuOpened] = useState(false)
	const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false)
	const { theme, toggleTheme } = useContext(ThemeContext)
	const isMobile = useMediaQuery('mobile')
	const { t } = useTranslation()

	const fadeAnimation = useSpring({
		opacity: isMenuOpened ? 1 : 0,
		pointerEvents: isMenuOpened ? 'auto' : 'none',
	})

	return (
		<div className={classNames.container}>
			<Button variant={'black'} size={'sq-sm'} onClick={() => setIsMenuOpened(prev => !prev)}>
				<div className={classNames.imgContainer}>
					<img src={burgerMenuIcon} />
				</div>
			</Button>
			{isMenuOpened ? (
				<animated.div style={fadeAnimation} className={classNames.overlay} onClick={() => setIsMenuOpened(false)}>
					<div className={classNames.menuContainer}>
						{isMobile ? <MobileBreadcrumbs /> : null}
						<ul className={classNames.listContainer}>
							<li>
								<Button variant={'black'} size={'sq-sm'} className={classNames.listButton} onClick={() => toggleTheme()}>
									{theme === 'dark' ? <IconMoon size={18} color={'var(--color-text-secondary)'} /> : <IconSun size={18} color={'var(--color-text-secondary)'} />}
									<h5>Toggle theme</h5>
								</Button>
							</li>
							<li>
								<Button variant={'black'} size={'sq-sm'} className={classNames.listButton} onClick={() => setIsLanguageModalVisible(true)}>
									<IconLanguage size={18} color={'var(--color-text-secondary)'} />
									<h5>Change language</h5>
								</Button>
							</li>
							<li>
								<Button variant={'black'} size={'sq-sm'} className={classNames.listButton} onClick={() => window.open('https://twitter.com/concero_io', '_blank')}>
									<IconBrandTwitter size={18} color={'var(--color-text-secondary)'} />
									<h5>{t('socialMedia.twitter')}</h5>
								</Button>
							</li>
							<li>
								<Button variant={'black'} size={'sq-sm'} className={classNames.listButton} onClick={() => window.open('https://discord.com/channels/1155792755105214535', '_blank')}>
									<IconBrandDiscord size={18} color={'var(--color-text-secondary)'} />
									<h5>{t('socialMedia.discord')}</h5>
								</Button>
							</li>
						</ul>
						<Button onClick={() => window.open('https://discord.com/channels/1155792755105214535', '_blank')}>Contact support</Button>
					</div>
				</animated.div>
			) : null}
			<LanguageModal show={isLanguageModalVisible} setShow={setIsLanguageModalVisible} />
		</div>
	)
}
