import { Card } from '../Card/Card'
import classNames from './UserActionsCard.module.pcss'
import { useEffect, useState } from 'react'
import { poolEventNamesMap, watchUserActions } from '../../../api/concero/getUserActions'
import dayjs from 'dayjs'
import { FullScreenLoader } from '../../layout/FullScreenLoader/FullScreenLoader'
import { useAccount } from 'wagmi'
import BlockiesSvg from 'blockies-react-svg'

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
				<BlockiesSvg className={classNames.avatar} address={action.address} width={32} height={32} />
				<div>
					<h5>{poolEventNamesMap[action.eventName]}</h5>
					<p className="body1">{dayjs(action.time).format('D MMMM, HH:mm, YYYY')}</p>
				</div>
			</div>
			<div className={classNames.rightSide}>
				{action.status && renderStatusTag(action.status)}
				{action.amount ? <h4>{action.amount} USDC</h4> : null}
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
