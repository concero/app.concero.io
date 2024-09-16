import { type FC, type ReactNode } from 'react'
import { Link, useMatch } from 'react-router-dom'
import classNames from './Header.module.pcss'
import { routes } from '../../../../constants/routes'
import { Logo } from '../../Logo/Logo'
import { useMediaQuery } from '../../../../hooks/useMediaQuery'
import { WalletButton } from '../WalletButton/WalletButton'
import { BurgerMenu } from '../BurgerMenu/BurgerMenu'
import { Button } from '../../../buttons/Button/Button'
import buttonClassNames from '../../../buttons/Button/Button.module.pcss'
import { Tag } from '../../../tags/Tag/Tag'
import { type IUser } from '../../../../api/concero/user/userType'
import { UserMultipliers } from './UserMultipliers/UserMultipliers'
import { TooltipWrapper } from '../../../wrappers/WithTooltip/TooltipWrapper'

interface HeaderProps {
	user: IUser | null
	children?: ReactNode
}

export const Header: FC<HeaderProps> = ({ children, user }) => {
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
					<ul className="gap-xs">
						<a className={classNames.link} target="_blank" href="https://lanca.io" rel="noreferrer">
							<Button variant="tetrary">Swap</Button>
						</a>
						<span className={classNames.separator} />
						<Link to={routes.pool}>
							<Button
								className={matchSwapPool ? buttonClassNames.tetraryColorActive : ''}
								variant="tetrary"
							>
								Provide liquidity
							</Button>
						</Link>
						<Link to={routes.rewards}>
							<Button
								className={matchSwapRewards ? buttonClassNames.tetraryColorActive : ''}
								variant="tetrary"
							>
								Rewards
							</Button>
						</Link>
					</ul>
				) : null}
			</div>
			<div className={classNames.headerButtonsContainer}>
				{user && (
					<>
						<Tag>{user.points.toFixed(4)} CERs</Tag>
						<TooltipWrapper tooltipId={'user-multiplier'} tooltipContent={<UserMultipliers user={user} />}>
							<Tag>{String(user.multiplier)}x</Tag>
						</TooltipWrapper>
					</>
				)}
				<WalletButton />
				<BurgerMenu />
			</div>
		</header>
	)
}
