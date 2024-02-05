import classNames from './MainRouteInfoTags.module.pcss'
import { IconClock, IconCoins, IconHandClick } from '@tabler/icons-react'
import { secondsConverter } from '../../../utils/formatting'

interface MainRouteInfoTagsProps {
	totalGasUsd?: string | null
	stepsLength?: number | null
	transactionTimeSeconds?: number | null
}

export function MainRouteInfoTags({
	totalGasUsd = null,
	stepsLength = null,
	transactionTimeSeconds = null,
}: MainRouteInfoTagsProps) {
	return (
		<div className={classNames.container}>
			{totalGasUsd !== null ? (
				<div className={classNames.tagContainer}>
					<IconCoins size={16} color={'var(--color-text-secondary)'} />
					<p className={'body1'}>{`$${totalGasUsd}`}</p>
				</div>
			) : null}
			{transactionTimeSeconds !== null ? (
				<div className={classNames.tagContainer}>
					<IconClock size={16} color={'var(--color-text-secondary)'} />
					<p className={'body1'}>{`${secondsConverter(Number(transactionTimeSeconds))}`}</p>
				</div>
			) : null}
			{stepsLength !== null ? (
				<div className={classNames.tagContainer}>
					<IconHandClick size={16} color={'var(--color-text-secondary)'} />
					<p className={'body1'}>{stepsLength}</p>
				</div>
			) : null}
		</div>
	)
}
