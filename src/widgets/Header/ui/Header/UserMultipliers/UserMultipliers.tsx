import classNames from './UserMultipliers.module.pcss'
import { TUserResponse } from '@/entities/User'

export const UserMultipliers = ({ user }: { user: TUserResponse }) => {
	const { liquidityHold, dailySwap, default: defaultMultiplier } = user.multiplier
	const totalMultiplier = defaultMultiplier + (dailySwap || 0) + (liquidityHold || 0)
	return (
		<div className={classNames.userMultipliers}>
			<div className={classNames.multiplierHeading}>
				<h6 className={classNames.heading}>Multipliers:</h6>
				<h6 className={classNames.heading}>{totalMultiplier}x</h6>
			</div>
			<div className={classNames.multiplierComponents}>
				<div className={classNames.item}>
					<span className="body1">Base:</span>
					<p>{defaultMultiplier || 0}x</p>
				</div>
				<div className={classNames.item}>
					<span>Liquidity Holding Multiplier:</span>
					<p>{liquidityHold || 0}x</p>
				</div>
				<div className={classNames.item}>
					<span>Daily Swapping Multiplier:</span>
					<p>{dailySwap || 0}x</p>
				</div>
			</div>
		</div>
	)
}
