import classNames from './UserMultipliers.module.pcss'
import { type IUser } from '../../../../../api/concero/user/userType'

export const UserMultipliers = ({ user }: { user: IUser }) => {
	const { liquidityHold, dailySwap, default: defaultMultiplier } = user.multiplier
	const totalMultiplier = defaultMultiplier + (dailySwap || 0) + (liquidityHold || 0)
	return (
		<div className={classNames.userMultipliers}>
			<h6 className={classNames.heading}>Multipliers:</h6>
			<div className="gap-sm">
				<div className={classNames.item}>
					<span className="body1">Total Multiplier:</span>
					<p>{totalMultiplier}x</p>
				</div>
				<div className={classNames.item}>
					<span className="body1">Liquidity Holding Multiplier:</span>
					<p className="body1">{liquidityHold || 0}x</p>
				</div>
				<div className={classNames.item}>
					<span className="body1">Daily Swapping Multiplier:</span>
					<p className="body1">{dailySwap || 0}x</p>
				</div>
			</div>
		</div>
	)
}
