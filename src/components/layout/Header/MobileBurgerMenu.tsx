import { FC } from 'react'
import { Link, PathMatch } from 'react-router-dom'
import { routes } from '../../../constants/routes'
import classNames from './MobileBurgerMenu.module.pcss'

export interface MobileBurgerMenuProps {
  matchExchange: PathMatch<string> | null
  matchPortfolio: PathMatch<string> | null
  toggleTheme: () => void
}

export const MobileBurgerMenu: FC<MobileBurgerMenuProps> = ({
  matchExchange,
  matchPortfolio,
  toggleTheme,
}) => {
  return (
    <div className={classNames.container}>
      <input className={classNames.menuBtn} type="checkbox" id="menu-btn" />
      <label className={classNames.menuIcon} htmlFor="menu-btn">
        <span className={classNames.navicon} />
      </label>
      <nav className={classNames.menu}>
        <Link to={routes.exchange}>
          <h4 className={matchExchange ? classNames.active : classNames.secondary}>Exchange</h4>
        </Link>
        <Link to={routes.portfolio}>
          <h4 className={matchPortfolio ? classNames.active : classNames.secondary}>Portfolio</h4>
        </Link>
        <a onClick={toggleTheme}>
          <h4 className={classNames.secondary}>Toggle theme</h4>
        </a>
        <a>
          <h4 className={classNames.logOutButton}>Log out</h4>
        </a>
      </nav>
    </div>
  )
}
