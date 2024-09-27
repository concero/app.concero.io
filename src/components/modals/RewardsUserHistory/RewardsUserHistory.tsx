import { type Dispatch, type SetStateAction } from 'react'
import { useAccount } from 'wagmi'
import { Modal } from '../Modal/Modal'
import classNames from './RewardsUserHistory.module.pcss'
import { UserAction } from './UserAction'
import { type IUserAction } from '../../../api/concero/userActions/userActionType'

interface UserHistoryProps {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
	userActions: IUserAction[]
}

export const UserHistory = ({ isOpen, setIsOpen, userActions }: UserHistoryProps) => {
	const { address } = useAccount()

	return (
		<Modal show={isOpen} setShow={setIsOpen} title="History" className={classNames.historyModal}>
			<div className={classNames.historyWrapper}>
				{!address && <h4>Connect wallet to see your history</h4>}
				{userActions.map(action => (
					<UserAction key={action.timestamp} action={action} />
				))}
			</div>
		</Modal>
	)
}
