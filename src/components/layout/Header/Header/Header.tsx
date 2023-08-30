import { CSSProperties, FC, ReactNode } from 'react'
import { Link, useMatch } from 'react-router-dom'
import classNames from './Header.module.pcss'
import { routes } from '../../../../constants/routes'
import { Logo } from '../../Logo/Logo'
import { useMediaQuery } from '../../../../hooks/useMediaQuery'
import { WalletButton } from '../WalletButton/WalletButton'
import { WithTooltip } from '../../../wrappers/WithTooltip'
import { TooltipContent } from './TooltipContent'
import { PortfolioLink } from './PortfolioLink'

interface HeaderProps {
  style?: CSSProperties
  children?: ReactNode
}

export const Header: FC<HeaderProps> = ({ children }) => {
  const isDesktop = useMediaQuery('mobile')
  const matchExchange = useMatch(routes.exchange)

  const PortfolioSoon = WithTooltip({
    WrappedComponent: PortfolioLink,
    Tooltip: TooltipContent,
  })

  return (
    <header className={classNames.header}>
      {children}
      <div className={classNames.navigatorContainer}>
        <div className={classNames.logoContainer}>
          <Logo />
        </div>
        {isDesktop ? (
          <ul>
            <Link className={matchExchange ? classNames.active : classNames.link} to={routes.exchange}>
              Exchange
            </Link>
            {PortfolioSoon}
          </ul>
        ) : null}
      </div>
      <WalletButton />
    </header>
  )
}
