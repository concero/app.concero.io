import { CSSProperties, FC, ReactNode } from 'react'
import classNames from './Header.module.pcss'
import { Link } from 'react-router-dom'
import { Web3Button } from '@web3modal/react'

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

  return (
    <header>
      {children}
      <div>
        <div className={classNames.logo} />
        <ul>
          <Link to={'#'}>Home</Link>
          <Link to={'#'}>Exchange</Link>
          <Link to={'#'}>Wallet</Link>
        </ul>
      </div>
      <div>
        <Web3Button />
        {/*<ButtonWithPopover*/}
        {/*  secondary*/}
        {/*  sm*/}
        {/*  leftIcon={{ name: 'Wallet', iconProps: { color: colors.base.white, strokeWidth: 2, size: 14 } }}*/}
        {/*  rightIcon={{ name: 'ChevronDown', iconProps: { color: colors.base.white, strokeWidth: 2, size: 14 } }}>*/}
        {/*  0x00000*/}
        {/*</ButtonWithPopover>*/}
      </div>
    </header>
  )
}
