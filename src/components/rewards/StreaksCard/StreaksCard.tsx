import { StreakCard } from './StreakCard/StreakCard'
import { Button } from '../../buttons/Button/Button'
import { Link } from 'react-router-dom'
import { routes } from '../../../constants/routes'

export const StreaksCard = () => {
	return (
		<div className="row wrap gap-lg">
			<StreakCard
				title="LP Holdling Streak"
				description="Test"
				button={
					<Link to={routes.pool}>
						<Button size="sm" variant="secondary">
							Provide Liquidity
						</Button>
					</Link>
				}
			/>
			<StreakCard
				title="Daily Swapping Streak"
				description="Test"
				button={
					<Link to="https://lanca.io" target="_blank">
						<Button size="sm" variant="secondary">
							Swap
						</Button>
					</Link>
				}
			/>
		</div>
	)
}
