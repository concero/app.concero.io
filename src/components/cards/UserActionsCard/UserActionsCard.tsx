import { Card } from '../Card/Card'
import classNames from './UserActionsCard.module.pcss'
import { useEffect, useState } from 'react'
import { FullScreenLoader } from '../../layout/FullScreenLoader/FullScreenLoader'
import { useAccount } from 'wagmi'
import { UserAction } from './UserAction'
import { fetchParentPoolActionsByLpAddress } from '../../../api/concero/fetchParentPoolActionsByLpAddress'
import { handleWithdrawRequestActions } from '../../../api/concero/getUserActions'

export enum UserActionStatus {
	ActiveRequestWithdraw = 'ActiveRequestWithdraw',
	CompleteRequestWithdraw = 'CompleteRequestWithdraw',
	CompleteWithdraw = 'CompleteWithdraw',
	CompleteDeposit = 'CompleteDeposit',
	WithdrawRetryNeeded = 'WithdrawRetryNeeded',
}

export interface UserTransaction {
	eventName: string
	time: number
	amount: string
	status: string | null
	transactionHash: string
	address: string
	isActiveWithdraw?: boolean
	deadline?: number | null
	args: any
}

export function UserActionsCard() {
	const { address } = useAccount()
	const [actions, setActions] = useState<UserTransaction[]>([])

	const getActions = async () => {
		return await fetchParentPoolActionsByLpAddress(address)
	}

	useEffect(() => {
		if (!address) return

		getActions()
			.then(actions => {
				handleWithdrawRequestActions(actions, address)
					.then(newActions => {
						setActions(newActions)
					})
					.catch(error => {
						console.error(error)
						setActions(actions)
					})
			})
			.catch(error => {
				console.error(error)
			})
	}, [address])

	return (
		<div>
			<div className={classNames.header}>
				<h4>Your actions</h4>
				<h4>Type</h4>
			</div>
			<Card className={`${classNames.actionsCard} cardConvex`}>
				{actions.length === 0 ? (
					<FullScreenLoader />
				) : (
					actions.map(action => <UserAction key={action.transactionHash} action={action} />)
				)}
			</Card>
		</div>
	)
}
