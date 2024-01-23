import { type StandardRoute, type Step } from '../../../../../types/StandardRoute'
import classNames from './RouteCard.module.pcss'
import { IconChevronDown, IconClock, IconCoins, IconHandClick } from '@tabler/icons-react'
import { secondsConverter } from '../../../../../utils/formatting'
import { Button } from '../../../../buttons/Button/Button'
import { useState } from 'react'
import { StepCard } from './StepCard/StepCard'

interface RouteCardProps {
	route: StandardRoute
	isSelected?: boolean
	onSelect?: (route: StandardRoute) => void
}

export function RouteCard({ route, isSelected, onSelect }: RouteCardProps) {
	const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
	const { to, transaction_time_seconds, cost, steps } = route

	return (
		<div
			className={`${classNames.container} ${isSelected ? classNames.selected : ''}`}
			onClick={() => {
				onSelect && onSelect(route)
			}}
		>
			<div className={classNames.header}>
				<div className={classNames.rowContainer}>
					<h4>${to.token.amount_usd}</h4>
					<p className={`body1 ${classNames.tokenAmount}`}>{`${to.token.amount} ${to.token.symbol}`}</p>
				</div>
				<div className={classNames.rowContainer}>
					<Button
						leftIcon={<IconChevronDown size={16} color={'var(--color-text-secondary)'} />}
						variant={'black'}
						size={'sq-xs'}
						onClick={() => {
							setIsCollapsed((prev: boolean) => !prev)
						}}
					/>
				</div>
			</div>
			<div className={classNames.rowContainer}>
				<div className={classNames.tagContainer}>
					<IconCoins size={16} color={'var(--color-text-secondary)'} />
					<p className={'body3'}>{`$${cost.total_gas_usd}`}</p>
				</div>
				<div className={classNames.tagContainer}>
					<IconClock size={16} color={'var(--color-text-secondary)'} />
					<p className={'body1'}>{`${secondsConverter(Number(transaction_time_seconds))}`}</p>
				</div>
				<div className={classNames.tagContainer}>
					<IconHandClick size={16} color={'var(--color-text-secondary)'} />
					<p className={'body1'}>{steps?.length ?? 1}</p>
				</div>
			</div>
			<div>
				{steps?.map((step: Step) => {
					return <StepCard key={step.id} steps={steps} isCollapsed={isCollapsed} />
				})}
			</div>
		</div>
	)
}
