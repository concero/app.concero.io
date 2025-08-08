import classNames from './UserMultipliers.module.pcss'
import { TUserResponse } from '@/entities/User'

export const UserMultipliers = ({ user }: { user: TUserResponse }) => {
	const { base, daily_swaps, liquidity_pool } = user.multiplier
	const totalMultiplier = base ?? 0 + (daily_swaps || 0) + (liquidity_pool || 0)
	return (
		<div className={classNames.userMultipliers}>
			<div className={classNames.multiplierHeading}>
				<h6 className={classNames.heading}>Multipliers:</h6>
				<h6 className={classNames.heading}>{totalMultiplier}x</h6>
			</div>
			<div className={classNames.multiplierComponents}>
				<div className={classNames.item}>
					<span className="body1">Base:</span>
					<p>{base || 0}x</p>
				</div>
				<div className={classNames.item}>
					<span>Liquidity Holding Multiplier:</span>
					<p>{liquidity_pool || 0}x</p>
				</div>
				<div className={classNames.item}>
					<span>Daily Swapping Multiplier:</span>
					<p>{daily_swaps|| 0}x</p>
				</div>
			</div>
		</div>
	)
}
