import { CSSProperties, FC, ReactNode } from 'react'
import { Link, useMatch } from 'react-router-dom'
import { Web3Button } from '@web3modal/react'
import classNames from './Header.module.pcss'
import { routes } from '../../../constants/routes.ts'

export interface HeaderProps {
  style?: CSSProperties
  children?: ReactNode
}

export const Header: FC<HeaderProps> = ({ children }) => {
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

  return (
    <header>
      {children}
      <div>
        <div className={classNames.logo} />
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
      </div>
      <div>
        <Web3Button />
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
