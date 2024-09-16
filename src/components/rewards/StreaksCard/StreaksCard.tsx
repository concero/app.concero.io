import { LpHoldingStreak } from './LpHoldingStreak/LpHoldingStreak'

export const StreaksCard = () => {
	return (
		<div className="row wrap gap-lg">
			<LpHoldingStreak />
			<LpHoldingStreak />
		</div>
	)
}
