import { type FC, type ReactNode } from 'react'
import { Link, useMatch } from 'react-router-dom'
import classNames from './Header.module.pcss'
import { routes } from '../../../../constants/routes'
import { Logo } from '../../Logo/Logo'
import { useMediaQuery } from '../../../../hooks/useMediaQuery'
import { WalletButton } from '../WalletButton/WalletButton'
import { BurgerMenu } from '../BurgerMenu/BurgerMenu'
import buttonClassNames from '../../../buttons/Button/Button.module.pcss'
import { UserMultipliers } from './UserMultipliers/UserMultipliers'
import { TooltipWrapper } from '../../WithTooltip/TooltipWrapper'
import { toLocaleNumber } from '../../../../utils/formatting'
import { Button, Tag } from '@concero/ui-kit'
import { TUserResponse } from '@/entities/User'

interface HeaderProps {
	user: TUserResponse | null
	isWalletConnected: boolean
	children?: ReactNode
}

export const Header: FC<HeaderProps> = ({ children, user, isWalletConnected }) => {
	const isTablet = useMediaQuery('ipad')
	const isMobile = useMediaQuery('mobile')
	const matchSwapRewards = useMatch(routes.rewards)

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
				{!isTablet && (
					<ul className="gap-xs">
						<Link style={{ pointerEvents: matchSwapRewards ? 'none' : 'all' }} to={routes.rewards}>
							<Button
								className={matchSwapRewards ? buttonClassNames.tetraryColorActive : ''}
								variant="tetrary"
							>
								Rewards
							</Button>
						</Link>
						<Button
							isDisabled
							className={classNames.profile}
							rightIcon={
								<Tag size="s" variant="neutral">
									Coming Soon
								</Tag>
							}
							variant="tetrary"
						>
							Profile
						</Button>
					</ul>
				)}
			</div>
			<div className={classNames.headerButtonsContainer}>
				{user && isWalletConnected && (
					<>
						<Tag>{toLocaleNumber(getPoints(user.points), 2)} CERs</Tag>
						<TooltipWrapper
							tooltipId={'user-multiplier'}
							place={isTablet || isMobile ? 'top-end' : 'top'}
							tooltipContent={<UserMultipliers user={user} />}
						>
							<Tag>
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
