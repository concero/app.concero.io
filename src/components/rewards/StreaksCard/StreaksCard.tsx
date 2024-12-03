import { StreakCard } from './StreakCard/StreakCard'
import { Button } from '../../buttons/Button/Button'
import { Link } from 'react-router-dom'
import { routes } from '../../../constants/routes'
import { StreakTooltip } from './StreakTooltip/StreakTooltip'
import { type IUser } from '../../../api/concero/user/userType'

const lpDescription =
	'Hold at least $100 worth of liquidity to get a multiplier. The longer you hold, the bigger multiplier you get.'

const swapDescription =
	'Perform swaps of at least $50 every day to get a multiplier. The longer your daily streak is the bigger multiplier you get.'

interface Props {
	user: IUser
}

export const StreaksCard = ({ user }: Props) => {
	return (
		<div className="row wrap gap-lg">
			<StreakCard
				streak={user.streak?.liquidityHold || 0}
				title="LP Holdling Streak"
				description={<StreakTooltip title={'Liquidity'} description={lpDescription} />}
				button={
					<Link to={routes.pool}>
						<Button size="sm" variant="secondary">
							Provide Liquidity
						</Button>
					</Link>
				}
			/>
			<StreakCard
				streak={user.streak?.dailySwap || 0}
				title="Daily Swapping Streak"
				description={<StreakTooltip title={'Swaps'} description={swapDescription} />}
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
