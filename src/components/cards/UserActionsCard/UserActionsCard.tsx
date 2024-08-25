import { Card } from '../Card/Card'
import classNames from './UserActionsCard.module.pcss'
import { useEffect, useState } from 'react'
import { FullScreenLoader } from '../../layout/FullScreenLoader/FullScreenLoader'
import { useAccount } from 'wagmi'
import { UserAction } from './UserAction'
import { fetchParentPoolActionsByLpAddress } from '../../../api/concero/fetchParentPoolActionsByLpAddress'

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
	args: any
}

export function UserActionsCard() {
	const { address } = useAccount()
	const [actions, setActions] = useState<UserTransaction[]>([])

	// const watchActions = async () => {
	// 	await watchUserActions(address, actions => {
	// 		setActions(prev => [...prev, ...actions])
	// 	})
	// }

	const getActions = async () => {
		return await fetchParentPoolActionsByLpAddress(address)
	}

	useEffect(() => {
		if (actions.length !== 0 || !address) return

		getActions()
			.then(actions => {
				setActions(actions)
			})
			.catch(error => {
				console.error(error)
			})
	}, [address])

	// useEffect(() => {
	// 	handleWithdrawRequestActions(actions).then(newActions => {
	// 		setActions(newActions)
	// 	})
	// }, [actions])

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
