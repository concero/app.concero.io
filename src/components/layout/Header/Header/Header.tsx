import { type FC, type ReactNode } from 'react'
import { Link, useMatch } from 'react-router-dom'
import classNames from './Header.module.pcss'
import { routes } from '@/constants/routes'
import { Logo } from '../../Logo/Logo'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { WalletButton } from '../WalletButton/WalletButton'
import { BurgerMenu } from '../BurgerMenu/BurgerMenu'
import { UserMultipliers } from './UserMultipliers/UserMultipliers'
import { TooltipWrapper } from '../../WithTooltip/TooltipWrapper'
import { toLocaleNumber } from '@/utils/formatting'
import { Button, Tag } from '@concero/ui-kit'
import { TUserResponse } from '@/entities/User'
import { NavButton } from '@/shared/ui'

interface HeaderProps {
	user: TUserResponse | null
	isWalletConnected: boolean
	children?: ReactNode
}

export const Header: FC<HeaderProps> = ({ children, user, isWalletConnected }) => {
	const isDesktop = useMediaQuery('desktop')
	const isTablet = useMediaQuery('tablet')
	const isMobile = useMediaQuery('mobile')
	const matchSwapRewards = useMatch(routes.rewards)
	const matchSwapProfile = useMatch(routes.profile)
	const getPoints = (points: number | { $numberDecimal: string }): number => {
		if (typeof points === 'number') {
			return points
		} else if (typeof points === 'object' && '$numberDecimal' in points) {
			return parseFloat(points.$numberDecimal)
		}
		return 0
	}

	return (
		<header className={classNames.header}>
			{children}
			<div className={classNames.navigatorContainer}>
				<div className={classNames.logoContainer}>
					<Logo />
				</div>
				{isDesktop && (
					<ul className="gap-xs">
						<Link style={{ pointerEvents: matchSwapRewards ? 'none' : 'all' }} to={routes.rewards}>
							<NavButton active={Boolean(matchSwapRewards)} text="Rewards" />
						</Link>
						<Link style={{ pointerEvents: matchSwapProfile ? 'none' : 'all' }} to={routes.profile}>
							<NavButton active={Boolean(matchSwapProfile)} newFlag={true} text="Profile" />
						</Link>
					</ul>
				)}
			</div>
			<div className={classNames.headerButtonsContainer}>
				{user && isWalletConnected && (
					<>
						<Tag size="m">{toLocaleNumber(getPoints(user.points), 2)} CERs</Tag>
						<TooltipWrapper
							tooltipId={'user-multiplier'}
							place={isTablet || isMobile ? 'top-end' : 'top'}
							tooltipContent={<UserMultipliers user={user} />}
						>
							<Tag size="m">
								{String(
									user.multiplier.default +
										(user.multiplier.dailySwap ?? 0) +
										(user.multiplier.liquidityHold ?? 0),
								)}
								x
							</Tag>
						</TooltipWrapper>
					</>
				)}
				{!isMobile && <WalletButton />}
				<BurgerMenu user={user} />
			</div>
		</header>
	)
}
