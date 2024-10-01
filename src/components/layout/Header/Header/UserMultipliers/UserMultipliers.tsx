import classNames from './UserMultipliers.module.pcss'
import { type IUser } from '../../../../../api/concero/user/userType'

export const UserMultipliers = ({ user }: { user: IUser }) => {
	const totalMultiplier = user.multiplier + user.dailySwappingMultiplier + user.liquidityHoldingMultiplier
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
					<p className="body1">{user.liquidityHoldingMultiplier}x</p>
				</div>
				<div className={classNames.item}>
					<span className="body1">Daily Swapping Multiplier:</span>
					<p className="body1">{user.dailySwappingMultiplier}x</p>
				</div>
			</div>
		</div>
	)
}
