import { CSSProperties, FC, ReactNode } from 'react'
import { Link, useMatch } from 'react-router-dom'
import classNames from './Header.module.pcss'
import { routes } from '../../../../constants/routes'
import { Logo } from '../../Logo'
import { useMediaQuery } from '../../../../hooks/useMediaQuery'
import { WalletButton } from '../WalletButton/WalletButton'
import { WithTooltip } from '../../../wrappers/WithTooltip'
import { Button } from '../../../buttons/Button/Button'

export interface HeaderProps {
  style?: CSSProperties
  children?: ReactNode
}

export const Header: FC<HeaderProps> = ({ children }) => {
  const matchExchange = useMatch(routes.exchange)
  const matchPortfolio = useMatch(routes.portfolio)

  const isDesktop = useMediaQuery('mobile')
  function TooltipContent() {
    return (
      <Button variant="subtle" size="md">
        Coming Soon
      </Button>
    )
  }
  function MyComponent() {
    return (
      <Link className={classNames.comingSoon} to="#">
        Staking
      </Link>
    )
  }
  const ComponentWithTooltip = WithTooltip({ WrappedComponent: MyComponent, Tooltip: TooltipContent })

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
            {ComponentWithTooltip}
            <Link className={classNames.comingSoon} to="#">
              Staking
            </Link>
            {/* <Link className={classNames.comingSoon} to="#"> */}
            {/*  Referral */}
            {/* </Link> */}
          </ul>
        ) : null}
      </div>
      <WalletButton />
    </header>
  )
}
