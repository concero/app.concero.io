import classNames from './UserActions.module.pcss'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { UserAction } from './UserAction'
import { fetchParentPoolActionsByLpAddress } from '../../../api/concero/fetchParentPoolActionsByLpAddress'
import { Modal } from '../../modals/Modal/Modal'
import { Button } from '../../buttons/Button/Button'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { IconButton } from '../../buttons/IconButton/IconButton'
import { CrossIcon } from '../../../assets/icons/CrossIcon'

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

export function UserActions() {
	const { address } = useAccount()
	const [isOpen, setIsOpen] = useState(false)
	const [actions, setActions] = useState<UserTransaction[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [retryTimeLeft, setRetryTimeLeft] = useState<number>(0)
	const isMobile = useMediaQuery('ipad')

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

		setRetryTimeLeft(getRemainingTime(retryPerformedTimestamp))

		const intervalId = setInterval(() => {
			setRetryTimeLeft(getRemainingTime(retryPerformedTimestamp))
		}, 60 * 1000)

		return () => {
			clearInterval(intervalId)
		}
	}, [])

	return (
		<>
			<Button
				isLoading={isLoading}
				onClick={() => {
					setIsOpen(!isOpen)
				}}
				size="lg"
				variant="secondary"
				className={classNames.buttonActions}
			>
				{isMobile ? '' : 'Actions'} History
			</Button>
			<Modal
				position="top"
				setShow={() => {
					setIsOpen(!isOpen)
				}}
				show={isOpen}
				isHeaderVisible={false}
				className={classNames.actionsModal}
			>
				<div className="row ac jsb">
					<h3 className={classNames.title}>Actions history</h3>
					<IconButton
						onClick={() => {
							setIsOpen(false)
						}}
						size="md"
						variant="secondary"
					>
						<CrossIcon />
					</IconButton>
				</div>

				<div className={`${classNames.action} ${classNames.header}`}>
					<div className={classNames.leftSide}>
						<h6>Action</h6>
					</div>
					<h6 className={classNames.value}>Amount</h6>
					<div className={classNames.date}>
						<h6>Date</h6>
					</div>
				</div>

				<div className={classNames.list}>
					{actions.map(action => (
						<UserAction
							setRetryTimeLeft={setRetryTimeLeft}
							retryTimeLeft={retryTimeLeft}
							key={action.transactionHash}
							action={action}
						/>
					))}
				</div>
			</Modal>
		</>
	)
}
