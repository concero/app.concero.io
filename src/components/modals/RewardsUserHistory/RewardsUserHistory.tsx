import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { Modal } from '../Modal/Modal'
import classNames from './RewardsUserHistory.module.pcss'
import { UserAction } from './UserAction'
import { type IUserAction } from '../../../api/concero/userActions/userActionType'
import { fetchUserActions } from '../../../api/concero/userActions/fetchUserActions'
import { type IUser } from '../../../api/concero/user/userType'

interface UserHistoryProps {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
	user: IUser
}

export const UserHistory = ({ isOpen, setIsOpen, user }: UserHistoryProps) => {
	const [userActions, setUserActions] = useState<IUserAction[]>([])

	const fetchAndSetUserActions = async () => {
		const response = await fetchUserActions(user.address, {})
		setUserActions(response.data)
	}

	useEffect(() => {
		if (!isOpen || userActions.length > 0) return

		fetchAndSetUserActions().catch(e => {
			console.error(e)
		})
	}, [isOpen])

	return (
		<Modal show={isOpen} setShow={setIsOpen} title="History" className={classNames.historyModal}>
			<div className={classNames.historyWrapper}>
				{!user && <h4>Connect wallet to see your history</h4>}
				{userActions.map(action => (
					<UserAction key={action.timestamp} action={action} />
				))}
			</div>
		</Modal>
	)
}
