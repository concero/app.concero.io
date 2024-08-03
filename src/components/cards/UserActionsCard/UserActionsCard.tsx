import { Card } from '../Card/Card'
import classNames from './UserActionsCard.module.pcss'
import { useEffect, useState } from 'react'
import { watchUserActions } from '../../../api/concero/getUserActions'
import dayjs from 'dayjs'
import { FullScreenLoader } from '../../layout/FullScreenLoader/FullScreenLoader'
import { useAccount } from 'wagmi'

export interface UserTransaction {
	eventName: string
	time: number
	amount: string
	status: string | null
	transactionHash: string
	address: string
}

export interface UserActionsCardProps {
	actions: UserTransaction[]
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

	const header = (
		<div className={classNames.header}>
			<h4>Your actions</h4>
			<h4>Type</h4>
		</div>
	)

	const renderStatusTag = (status: string) => (
		<div className={classNames.statusTag}>
			<p className="body1">{status}</p>
		</div>
	)

	const renderAction = (action: UserTransaction) => (
		<div className={classNames.action} key={action.id}>
			<div className={classNames.leftSide}>
				<img
					width={32}
					height={32}
					alt="User avatar"
					src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
				/>
				<div>
					<h5>{action.eventName === 'ParentPool_SuccessfulDeposited' ? 'Liquidity provided' : 'Untitled'}</h5>
					<p className="body1">{dayjs(action.time).format('D MMMM, HH:mm, YYYY')}</p>
				</div>
			</div>
			<div className={classNames.rightSide}>
				{action.status && renderStatusTag(action.status)}
				<h4>{action.amount} USDC</h4>
			</div>
		</div>
	)

	return (
		<div>
			{header}
			<Card className={`${classNames.actionsCard} cardConvex`}>
				{actions.length === 0 ? <FullScreenLoader /> : actions.map(action => renderAction(action))}
			</Card>
		</div>
	)
}
