import classNames from './UserMultipliers.module.pcss'
import { type IUser } from '../../../../../api/concero/user/userType'

export const UserMultipliers = ({ user }: { user: IUser }) => {
	return (
		<div className={classNames.userMultipliers}>
			<h6 className={classNames.heading}>Multipliers:</h6>
			<div>
				<div className={classNames.item}>
					<span className="body1">Total Multiplier:</span>
					<p>{user.multiplier}x</p>
				</div>
			</div>
		</div>
	)
}
