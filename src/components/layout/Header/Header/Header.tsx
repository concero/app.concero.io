import { CSSProperties, FC, ReactNode } from 'react'
import { Link, useMatch } from 'react-router-dom'
import classNames from './Header.module.pcss'
import { routes } from '../../../../constants/routes'
import { Logo } from '../../Logo/Logo'
import { useMediaQuery } from '../../../../hooks/useMediaQuery'
import { WalletButton } from '../WalletButton/WalletButton'
import { WithTooltip } from '../../../wrappers/WithTooltip'
import { TooltipContent } from './TooltipContent'
import { ComingSoonLinks } from './ComingSoonLinks'

interface HeaderProps {
	style?: CSSProperties
	children?: ReactNode
}

export const Header: FC<HeaderProps> = ({ children }) => {
	const isMobile = useMediaQuery('mobile')
	const matchExchange = useMatch(routes.exchange)


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
							Exchange
						</Link>

						{ComingSoon}
					</ul>
				) : null}
			</div>
			<WalletButton />
		</header>
	)
}
