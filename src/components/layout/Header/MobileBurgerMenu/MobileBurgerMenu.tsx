import { disconnect } from '@wagmi/core'
import { FC, useState } from 'react'
import { Link, useMatch } from 'react-router-dom'
import { routes } from '../../../../constants/routes'
import classNames from './MobileBurgerMenu.module.pcss'
import { Button } from '../../../buttons/Button/Button'
import { FeedbackModal } from '../../../modals/FeedbackModal/FeedbackModal'

export interface MobileBurgerMenuProps {
	toggleTheme: () => void
}

export const MobileBurgerMenu: FC<MobileBurgerMenuProps> = ({ toggleTheme }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isFeedbackModalOpened, setIsFeedbackModalOpened] = useState(false)

	const matchExchange = useMatch(routes.exchange)
	const matchStaking = useMatch(routes.staking)

	return (
		<div className={classNames.container}>
			<Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant="black">
				<input className={classNames.menuBtn} type="checkbox" id="menu-btn" checked={isMenuOpen} onChange={() => setIsMenuOpen(!isMenuOpen)} />
				<label className={classNames.menuIcon}>
					<span className={classNames.navIcon} />
				</label>
			</Button>
			<nav className={`${classNames.menu} ${isMenuOpen ? classNames.menuActive : ''}`}>
				<Link to={routes.exchange} aria-label={routes.exchange}>
					<h4 className={matchExchange ? classNames.active : classNames.secondary}>Exchange</h4>
				</Link>
				<Link to={routes.staking} aria-label={routes.staking}>
					<h4 className={matchStaking ? classNames.active : classNames.secondary}>Staking</h4>
				</Link>
				{/* <Link to={routes.portfolio}> */}
				{/*   <h4 className={matchPortfolio ? classNames.active : classNames.secondary}>Portfolio</h4> */}
				{/* </Link> */}
				<a href="#" aria-label="Help us improve" onClick={() => setIsFeedbackModalOpened(true)}>
					<h4 className={classNames.secondary}>Help us improve</h4>
				</a>

				<a href="#" onClick={toggleTheme} aria-label="Toggle theme">
					<h4 className={classNames.secondary}>Toggle theme</h4>
				</a>
				<a href="#" onClick={() => disconnect()} aria-label="Log out">
					<h4 className={classNames.logOutButton}>Log out</h4>
				</a>
			</nav>
			<FeedbackModal show={isFeedbackModalOpened} setShow={setIsFeedbackModalOpened} />
		</div>
	)
}
