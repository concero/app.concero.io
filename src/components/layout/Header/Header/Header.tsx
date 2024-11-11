import { type FC, type ReactNode, useEffect, useState } from 'react'
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
import { useAccount } from 'wagmi'
import { handleFetchUser } from '../../../../web3/handleFetchUser'
import posthog from 'posthog-js'

interface HeaderProps {
	children?: ReactNode
}

export const Header: FC<HeaderProps> = ({ children }) => {
	const [user, setUser] = useState<IUser | null>(null)

	const { address } = useAccount()

	useEffect(() => {
		if (!address) return

		handleFetchUser(address).then(user => {
			setUser(user)
		})
		posthog.identify(address)
	}, [address])

	const isMobile = useMediaQuery('ipad')
	const matchSwapPool = useMatch(routes.pool)
	const matchSwapRewards = useMatch(routes.rewards)

	return (
		<header className={classNames.header}>
			{children}
			<div className={classNames.navigatorContainer}>
				<div className={classNames.logoContainer}>
					<Logo />
				</div>
				{!isMobile && (
					<ul className="gap-xs">
						<a className={classNames.link} target="_blank" href="https://lanca.io" rel="noreferrer">
							<Button variant="tetrary">Swap</Button>
						</a>
						<span className={classNames.separator} />
						<Link style={{ pointerEvents: matchSwapPool ? 'none' : 'all' }} to={routes.pool}>
							<Button
								className={matchSwapPool ? buttonClassNames.tetraryColorActive : ''}
								variant="tetrary"
							>
								Provide liquidity
							</Button>
						</Link>
						<Link style={{ pointerEvents: matchSwapRewards ? 'none' : 'all' }} to={routes.rewards}>
							<Button
								className={matchSwapRewards ? buttonClassNames.tetraryColorActive : ''}
								variant="tetrary"
							>
								Rewards
							</Button>
						</Link>
					</ul>
				)}
			</div>
			<div className={classNames.headerButtonsContainer}>
				{user && (
					<>
						<Tag>{user.points.toFixed(4)} CERs</Tag>
						<TooltipWrapper tooltipId={'user-multiplier'} tooltipContent={<UserMultipliers user={user} />}>
							<Tag>
								{String(
									user.multiplier +
										(user?.dailySwappingMultiplier ?? 0) +
										(user?.liquidityHoldingMultiplier ?? 0),
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
