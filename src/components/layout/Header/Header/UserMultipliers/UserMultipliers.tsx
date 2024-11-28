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
					<span>Base</span>
					<p className={classNames.multiplier}>{multiplier}x</p>
				</div>
				<div className={classNames.item}>
					<span>Liquidity Holding</span>
					<p className={classNames.multiplier}>{liquidityHoldingMultiplier}x</p>
				</div>
				<div className={classNames.item}>
					<span>Daily Swapping</span>
					<p className={classNames.multiplier}>{dailySwappingMultiplier}x</p>
				</div>
			</div>
		</div>
	)
}
