import { CSSProperties, FC, ReactNode } from 'react'
import { Link, useMatch } from 'react-router-dom'
import classNames from './Header.module.pcss'
import { routes } from '../../../constants/routes'
import { Logo } from '../Logo'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { WalletButton } from '../../buttons/WalletButton/WalletButton'

export interface HeaderProps {
  style?: CSSProperties
  children?: ReactNode
}

export const Header: FC<HeaderProps> = ({ children }) => {
  const matchExchange = useMatch(routes.exchange)
  const matchPortfolio = useMatch(routes.portfolio)
  const isDesktop = useMediaQuery('mobile')

  return (
    <div>
      <header className={classNames.header}>
        {children}
        <div className={classNames.navigatorContainer}>
          <div className={classNames.logoContainer}>
            <Logo />
          </div>
          {isDesktop ? (
            <ul>
              <Link
                className={matchExchange ? classNames.active : classNames.link}
                to={routes.exchange}
              >
                Exchange
              </Link>
              <Link
                className={matchPortfolio ? classNames.active : classNames.link}
                to={routes.portfolio}
              >
                Portfolio
              </Link>
            </ul>
          ) : null}
        </div>
        <WalletButton />
      </header>
    </div>
  )
}
