import { Link } from 'react-router-dom'
import classNames from './Header.module.pcss'

export function ComingSoonLinks() {
	return (
		<div className={classNames.comingSoonContainer}>
			<Link className={classNames.comingSoon} to="#">
				Staking
			</Link>
			<Link className={classNames.comingSoon} to="#">
				Portfolio
			</Link>
			<Link className={classNames.comingSoon} to="#">
				My referrals
			</Link>
		</div>
	)
}
