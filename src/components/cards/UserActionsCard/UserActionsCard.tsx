import { Card } from '../Card/Card'
import classNames from './UserActionsCard.module.pcss'

export interface UserTransaction {
	id: string
	name: string
	date: string
	value: string
	status: string | null
}

export interface UserActionsCardProps {
	actions: UserTransaction[]
}

export function UserActionsCard({ actions }: UserActionsCardProps) {
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
					<h5>{action.name}</h5>
					<p className="body1">{action.date}</p>
				</div>
			</div>
			<div className={classNames.rightSide}>
				{action.status && renderStatusTag(action.status)}
				<h4>{action.value} USDC</h4>
			</div>
		</div>
	)

	return (
		<div>
			{header}
			<Card className={`${classNames.actionsCard} cardConvex`}>
				{actions.map(action => renderAction(action))}
			</Card>
		</div>
	)
}
