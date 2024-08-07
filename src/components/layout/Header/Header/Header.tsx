import { type CSSProperties, type FC, type ReactNode, useState } from 'react'
import { Link, useMatch } from 'react-router-dom'
import classNames from './Header.module.pcss'
import { routes } from '../../../../constants/routes'
import { Logo } from '../../Logo/Logo'
import { useMediaQuery } from '../../../../hooks/useMediaQuery'
import { WalletButton } from '../WalletButton/WalletButton'
import { BurgerMenu } from '../BurgerMenu/BurgerMenu'
import { FeedbackModal } from '../../../modals/FeedbackModal/FeedbackModal'

interface HeaderProps {
	style?: CSSProperties
	children?: ReactNode
	setIsNewSwapCardMode: (isNewSwapCardMode: boolean) => void
	isNewSwapCardMode: boolean
}

export const Header: FC<HeaderProps> = ({ children, setIsNewSwapCardMode, isNewSwapCardMode }) => {
	const [isFeedbackModalOpened, setIsFeedbackModalOpened] = useState(false)
	const isMobile = useMediaQuery('mobile')
	const matchSwapPool = useMatch(routes.pool)
	const matchSwapRewards = useMatch(routes.rewards)

	return (
		<header className={classNames.header}>
			{children}
			<div className={classNames.navigatorContainer}>
				<div className={classNames.logoContainer}>
					<Logo />
				</div>
				{!isMobile ? (
					<ul>
						<a className={classNames.link} target="_blank" href="http://lanca.io" rel="noreferrer">
							Swap
						</a>
						<Link className={matchSwapPool ? classNames.active : classNames.link} to={routes.pool}>
							Provide liquidity
						</Link>
						<Link className={matchSwapRewards ? classNames.active : classNames.link} to={routes.rewards}>
							Rewards
						</Link>
					</ul>
				) : null}
				{!isNewSwapCardMode ? (
					<ul
						onClick={() => {
							setIsNewSwapCardMode(true)
						}}
					>
						<Link className={classNames.active} to={routes.swap}>
							Switch to new version
						</Link>
					</ul>
				) : null}
			</div>
			<div className={classNames.headerButtonsContainer}>
				{/* {!isMobile ? ( */}
				{/*	<Button */}
				{/*		variant="subtle" */}
				{/*		size="sm" */}
				{/*		className={classNames.helpButton} */}
				{/*		onClick={() => { */}
				{/*			handleHelpButtonClick() */}
				{/*		}} */}
				{/*	> */}
				{/*		{t('modal.helpUsImprove')} */}
				{/*	</Button> */}
				{/* ) : null} */}
				<WalletButton />
				<BurgerMenu />
			</div>
			<FeedbackModal show={isFeedbackModalOpened} setShow={setIsFeedbackModalOpened} />
		</header>
	)
}
