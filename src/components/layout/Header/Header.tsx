import { CSSProperties, FC, ReactNode, useContext } from 'react'
import { Link, useMatch } from 'react-router-dom'
import { Web3Button } from '@web3modal/react'
import classNames from './Header.module.pcss'
import { routes } from '../../../constants/routes'
import { Button } from '../../buttons/Button/Button'
import { ThemeContext } from '../../../hooks/themeContext'
import { Logo } from '../Logo'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { MobileBurgerMenu } from './MobileBurgerMenu'

export interface HeaderProps {
  style?: CSSProperties
  children?: ReactNode
}

export const Header: FC<HeaderProps> = ({ children }) => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  // const ButtonWithPopover = WithPopover(
  //   Button,
  //   MenuPopover,
  //   {
  //     items: [
  //       { title: 'Copy address', iconName: 'Copy' },
  //       { title: 'Settings', iconName: 'Settings' },
  //       { title: 'Logout', iconName: 'Logout', danger: true },
  //     ],
  //   },
  //   'click',
  // )
  const matchExchange = useMatch(routes.exchange)
  const matchPortfolio = useMatch(routes.portfolio)
  const isDesktop = useMediaQuery('mobile')

  return (
    <header>
      {children}
      <div>
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
            <Web3Button />
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
          <MobileBurgerMenu
            matchPortfolio={matchPortfolio}
            matchExchange={matchExchange}
            toggleTheme={toggleTheme}
          />
        )}
        {/* <ButtonWithPopover */}
        {/*  secondary */}
        {/*  sm */}
        {/*  leftIcon={{ name: 'Wallet', iconProps: { color: colors.base.white, strokeWidth: 2, size: 14 } }} */}
        {/*  rightIcon={{ name: 'ChevronDown', iconProps: { color: colors.base.white, strokeWidth: 2, size: 14 } }}> */}
        {/*  0x00000 */}
        {/* </ButtonWithPopover> */}
      </div>
    </header>
  )
}
