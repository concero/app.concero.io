import { Link } from 'react-router-dom'
import classNames from './Header.module.pcss'

export function PortfolioLink() {
  return (
    <div className={classNames.comingSoonContainer}>
      <Link className={classNames.comingSoon} to="#">
        Portfolio
      </Link>
      <Link className={classNames.comingSoon} to="#">
        My referrals
      </Link>
    </div>
  )
}
