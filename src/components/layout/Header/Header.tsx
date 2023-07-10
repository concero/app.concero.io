import { useAccount } from 'wagmi'
import { CSSProperties, FC, ReactNode, useContext } from 'react'
import { Link, useMatch } from 'react-router-dom'
import classNames from './Header.module.pcss'
import { routes } from '../../../constants/routes'
import { Button } from '../../buttons/Button/Button'
import { ThemeContext } from '../../../hooks/themeContext'
import { Logo } from '../Logo'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { MobileBurgerMenu } from './MobileBurgerMenu'
import { WithPopover } from '../../wrappers/WithPopover'
import { WalletButton } from '../../buttons/WalletButton/WalletButton'
import { HeaderPopoverMenu } from './HeaderPopoverMenu'
import { useWeb3Modal } from '@web3modal/react'

export interface HeaderProps {
  style?: CSSProperties
  children?: ReactNode
}

export const Header: FC<HeaderProps> = ({ children }) => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const matchExchange = useMatch(routes.exchange)
  const matchPortfolio = useMatch(routes.portfolio)
  const isDesktop = useMediaQuery('mobile')
  const { isConnected } = useAccount()
  const { open } = useWeb3Modal()

  const ButtonWithPopover = WithPopover(WalletButton, HeaderPopoverMenu, 'hover')

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
        <div>
          {isDesktop ? (
            <div>
              {isConnected ? <ButtonWithPopover onClick={open} /> : <WalletButton onClick={open} />}
              <Button
                size="sq-md"
                onClick={toggleTheme}
                variant="black"
                leftIcon={{
                  name: theme === 'light' ? 'Moon' : 'Sun',
                  iconProps: { size: 18 },
                }}
              />
            </div>
          ) : (
            <div style={{ alignItems: 'center' }}>
              <WalletButton onClick={open} variant={'mobile'} />
              <MobileBurgerMenu
                matchPortfolio={matchPortfolio}
                matchExchange={matchExchange}
                toggleTheme={toggleTheme}
              />
            </div>
          )}
        </div>
      </header>
    </div>
  )
}
