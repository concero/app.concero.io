import { CSSProperties, FC, ReactNode, useState } from 'react'
import { Link, useMatch } from 'react-router-dom'
import classNames from './Header.module.pcss'
import { routes } from '../../../../constants/routes'
import { Logo } from '../../Logo/Logo'
import { useMediaQuery } from '../../../../hooks/useMediaQuery'
import { WalletButton } from '../WalletButton/WalletButton'
import { WithTooltip } from '../../../wrappers/WithTooltip'
import { TooltipContent } from './TooltipContent'
import { ComingSoonLinks } from './ComingSoonLinks'
import { useTranslation } from 'react-i18next'
import { BurgerMenu } from '../BurgerMenu/BurgerMenu'
import { FeedbackModal } from '../../../modals/FeedbackModal/FeedbackModal'
import { trackEvent } from '../../../../hooks/useTracking'
import { action, category } from '../../../../constants/tracking'
import { Button } from '../../../buttons/Button/Button'

interface HeaderProps {
	style?: CSSProperties
	children?: ReactNode
}

export const Header: FC<HeaderProps> = ({ children }) => {
	const [isFeedbackModalOpened, setIsFeedbackModalOpened] = useState(false)
	const isMobile = useMediaQuery('mobile')
	const matchExchange = useMatch(routes.exchange)
	const matchStaking = useMatch(routes.staking)
	const { t } = useTranslation()

	const handleHelpButtonClick = () => {
		setIsFeedbackModalOpened(prev => !prev)
		trackEvent({ category: category.Header, action: action.ToggleFeedbackModalVisible, label: 'toggle_feedback_modal' })
	}

	const ComingSoon = WithTooltip({
		WrappedComponent: ComingSoonLinks,
		Tooltip: TooltipContent,
	})

	return (
		<header className={classNames.header}>
			{children}
			<div className={classNames.navigatorContainer}>
				<div className={classNames.logoContainer}>
					<Logo />
				</div>
				{!isMobile ? (
					<ul>
						<Link className={matchExchange ? classNames.active : classNames.link} to={routes.exchange}>
							{t('header.exchange')}
						</Link>
						<Link className={matchStaking ? classNames.active : classNames.link} to={routes.staking}>
							{t('header.staking')}
						</Link>
						{ComingSoon}
					</ul>
				) : null}
			</div>
			<div className={classNames.headerButtonsContainer}>
				{!isMobile ? (
					<Button variant="subtle" size="sm" className={classNames.helpButton} onClick={() => handleHelpButtonClick()}>
						{t('modal.helpUsImprove')}
					</Button>
				) : null}
				<WalletButton />
				<BurgerMenu />
			</div>
			<FeedbackModal show={isFeedbackModalOpened} setShow={setIsFeedbackModalOpened} />
		</header>
	)
}
