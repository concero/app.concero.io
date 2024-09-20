import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { Modal } from '../Modal/Modal'
import classNames from './RewardsUserHistory.module.pcss'
import { UserAction } from './UserAction'
import { fetchUserActions } from '../../../api/concero/userActions/fetchUserActions'
import { type IUserActionPopulated } from '../../../api/concero/userActions/userActionType'

interface UserHistoryProps {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const UserHistory = ({ isOpen, setIsOpen }: UserHistoryProps) => {
	const { address } = useAccount()
	const [actions, setActions] = useState<IUserActionPopulated[]>([])

	const fetchAndSetUserTransactions = async () => {
		const response = await fetchUserActions(address!)
		console.log(response)
		setActions(response)
	}

	useEffect(() => {
		if (address) {
			void fetchAndSetUserTransactions()
		}
	}, [address])

	return (
		<Modal show={isOpen} setShow={setIsOpen} title="History" className={classNames.historyModal}>
			<div className={classNames.historyWrapper}>
				{!address && <h4>Connect wallet to see your history</h4>}
				{actions.map(action => (
					<UserAction key={action.timestamp} action={action} />
				))}
			</div>
		</Modal>
	)
}
