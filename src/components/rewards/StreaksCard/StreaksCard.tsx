import { StreakCard } from './StreakCard/StreakCard'
import { Button } from '../../buttons/Button/Button'
import { Link } from 'react-router-dom'
import { routes } from '../../../constants/routes'
import { StreakTooltip } from './StreakTooltip/StreakTooltip'
import { useEffect, useState } from 'react'
import { getUserStreaks } from '../../../api/concero/user/fetchUserStrikes'
import { useAccount } from 'wagmi'

// TODO: add swap description and title
const lpDescription =
	'Hold at least $500 worth of liquidity to get a multiplier. The longer you hold, the bigger multiplier you get.'

export const StreaksCard = () => {
	const { address } = useAccount()
	const [dailySwapStreak, setDailySwapStreak] = useState(0)
	const [lpHoldingStreak, setLpHoldingStreak] = useState(0)

	useEffect(() => {
		if (!address) return
		getUserStreaks(address).then(response => {
			setLpHoldingStreak(response.lpHoldingStreak)
			setDailySwapStreak(response.dailySwapStreak)
		})
	}, [address])

	return (
		<div className="row wrap gap-lg">
			<StreakCard
				streak={lpHoldingStreak}
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
				streak={dailySwapStreak}
				title="Daily Swapping Streak"
				description={<StreakTooltip title={'Swap'} description={lpDescription} />}
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
