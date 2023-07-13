import { FC, useState } from 'react'
import { Link, PathMatch } from 'react-router-dom'
import { routes } from '../../../../constants/routes'
import classNames from './MobileBurgerMenu.module.pcss'
import { Button } from '../../../buttons/Button/Button'

export interface MobileBurgerMenuProps {
  matchExchange: PathMatch<string> | null
  matchPortfolio: PathMatch<string> | null
  toggleTheme: () => void
}

export const MobileBurgerMenu: FC<MobileBurgerMenuProps> = ({ matchExchange, matchPortfolio, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className={classNames.container}>
      <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant={'black'}>
        <input className={classNames.menuBtn} type="checkbox" id="menu-btn" checked={isMenuOpen} />
        <label className={classNames.menuIcon}>
          <span className={classNames.navIcon} />
        </label>
      </Button>
      <nav className={`${classNames.menu} ${isMenuOpen ? classNames.menuActive : ''}`}>
        <Link to={routes.exchange}>
          <h4 className={matchExchange ? classNames.active : classNames.secondary}>Exchange</h4>
        </Link>
        {/* <Link to={routes.portfolio}> */}
        {/*   <h4 className={matchPortfolio ? classNames.active : classNames.secondary}>Portfolio</h4> */}
        {/* </Link> */}
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
