import classNames from './UserMultipliers.module.pcss'
import { type IUser } from '../../../../../api/concero/user/userType'

interface UserMultipliersProps {
	user: IUser
}

export const UserMultipliers = ({ user }: UserMultipliersProps) => {
	const { multiplier, dailySwappingMultiplier, liquidityHoldingMultiplier } = user
	const totalMultiplier = multiplier + dailySwappingMultiplier + liquidityHoldingMultiplier

	return (
		<div className={classNames.userMultipliers}>
			<div className={classNames.multiplierHeading}>
				<h6 className={classNames.heading}>Multipliers:</h6>
				<h6 className={classNames.heading}>{totalMultiplier}x</h6>
			</div>
			<div className={classNames.multiplierComponents}>
				<div className={classNames.item}>
					<span className="body1">Base</span>
					<p>{multiplier}x</p>
				</div>
				<div className={classNames.item}>
					<span className="body1">Liquidity Holding</span>
					<p className="body1">{liquidityHoldingMultiplier}x</p>
				</div>
				<div className={classNames.item}>
					<span className="body1">Daily Swapping</span>
					<p className="body1">{dailySwappingMultiplier}x</p>
				</div>
			</div>
		</div>
	)
}
