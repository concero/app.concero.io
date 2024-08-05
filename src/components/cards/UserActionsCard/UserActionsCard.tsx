import { Card } from '../Card/Card'
import classNames from './UserActionsCard.module.pcss'
import { useEffect, useState } from 'react'
import { handleDepositRequestActions, watchUserActions } from '../../../api/concero/getUserActions'
import { FullScreenLoader } from '../../layout/FullScreenLoader/FullScreenLoader'
import { useAccount } from 'wagmi'
import { UserAction } from './UserAction'

export enum UserActionStatus {
	ActiveRequestWithdraw = 'ActiveRequestWithdraw',
	CompleteRequestWithdraw = 'CompleteRequestWithdraw',
	CompleteWithdraw = 'CompleteWithdraw',
	CompleteDeposit = 'CompleteDeposit',
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
}

export function UserActionsCard() {
	const { address } = useAccount()
	const [actions, setActions] = useState<UserTransaction[]>([])

	const watchActions = async () => {
		await watchUserActions(address, actions => {
			setActions(prev => [...prev, ...actions])
		})
	}

	useEffect(() => {
		if (actions.length !== 0 || !address) return

		void watchActions()
	}, [address])

	useEffect(() => {
		const newActions = handleDepositRequestActions(actions)
		setActions(newActions)
	}, [actions])

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
