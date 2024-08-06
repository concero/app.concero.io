import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { fetchUserTransactions } from '../../../api/concero/fetchUserTransactions'
import { Modal } from '../Modal/Modal'
import classNames from './RewardsUserHistory.module.pcss'
import { UserAction } from './UserAction'
import { type IConceroInfraTx } from '../../../api/concero/transactionType'

interface UserHistoryProps {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const UserHistory = ({ isOpen, setIsOpen }: UserHistoryProps) => {
	const { address } = useAccount()
	const [transactions, setTransactions] = useState<IConceroInfraTx[]>([])

	const fetchAndSetUserTransactions = async () => {
		const response = await fetchUserTransactions(address!)
		setTransactions(response)
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
				{transactions.map(transaction => (
					<UserAction key={transaction.srcTxHash} transaction={transaction} type="swap" />
				))}
			</div>
		</Modal>
	)
}
