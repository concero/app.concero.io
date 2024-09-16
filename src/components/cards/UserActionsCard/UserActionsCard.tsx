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

export const getRemainingTime = (time: string | number): number => {
	const endTime = new Date(Number(time) + 30 * 60 * 1000)

	const currentTime = new Date()
	const remainingTime = Math.max(0, Math.floor((endTime.getTime() - currentTime.getTime()) / 1000))
	return remainingTime < 0 ? 0 : remainingTime
}

export function UserActionsCard() {
	const { address } = useAccount()
	const [actions, setActions] = useState<UserTransaction[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [retryTimeLeft, setRetryTimeLeft] = useState<number>(0)

	const getActions = async () => {
		return await fetchParentPoolActionsByLpAddress(address)
	}

	useEffect(() => {
		if (!address) return
		if (retryTimeLeft !== 0) return

		setActions([])
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
	}, [address, retryTimeLeft])

	useEffect(() => {
		const retryPerformedTimestamp = localStorage.getItem('retryPerformedTimestamp')
		if (!retryPerformedTimestamp) return

		const intervalId = setInterval(() => {
			setRetryTimeLeft(getRemainingTime(retryPerformedTimestamp))
		}, 60 * 1000)

		return () => {
			clearInterval(intervalId)
		}
	}, [])

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
					actions.map(action => (
						<UserAction
							setRetryTimeLeft={setRetryTimeLeft}
							retryTimeLeft={retryTimeLeft}
							key={action.transactionHash}
							action={action}
						/>
					))
				)}
			</Card>
		</div>
	)
}
