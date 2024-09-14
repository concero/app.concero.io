import { Card } from '../Card/Card'
import classNames from './UserActionsCard.module.pcss'
import { useEffect, useState } from 'react'
import { FullScreenLoader } from '../../layout/FullScreenLoader/FullScreenLoader'
import { useAccount } from 'wagmi'
import { UserAction } from './UserAction'
import { fetchParentPoolActionsByLpAddress } from '../../../api/concero/fetchParentPoolActionsByLpAddress'

export enum UserActionStatus {
	ActiveRequestWithdraw = 'ActiveRequestWithdraw',
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
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const getActions = async () => {
		return await fetchParentPoolActionsByLpAddress(address!)
	}

	useEffect(() => {
		if (!address) return

		setIsLoading(true)

		getActions()
			.then(actions => {
				setActions(actions)
			})
			.catch(error => {
				console.error(error)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [address])

	return (
		<div>
			<div className={classNames.header}>
				<h4>Your actions</h4>
			</div>
			<Card className={`${classNames.actionsCard} cardConvex`}>
				{isLoading && <FullScreenLoader />}
				{!isLoading && actions.length === 0 ? (
					<div className="body4 ac jc h-full">You don't have any action yet</div>
				) : (
					actions.map(action => <UserAction key={action.transactionHash} action={action} />)
				)}
			</Card>
		</div>
	)
}
