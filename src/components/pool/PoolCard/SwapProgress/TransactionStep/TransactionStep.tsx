import { type FC } from 'react'
import classNames from './TransactionStep.module.pcss'
import { type StageStepStatus } from '../../swapReducer/types'
import { Loader } from '../../../../layout/Loader/Loader'
import { InfoIcon } from '../../../../../assets/icons/InfoIcon'
import { SuccessIcon } from '../../../../../assets/icons/SuccessIcon'

interface StageProps {
	title: string
	status: StageStepStatus | null | undefined
}

export const TransactionStep: FC<StageProps> = ({ status, title }) => {
	const renderIcon = () => {
		switch (status) {
			case 'idle':
				return null
			case 'pending':
			case 'await':
				return <Loader variant="neutral" />
			case 'error':
				return <InfoIcon color="var(--color-danger-700)" />
			case 'success':
				return <SuccessIcon />
			default:
				return null
		}
	}

	return (
		<div className={classNames.step}>
			{renderIcon()}
			<h5 className={classNames[status ?? 'idle']}>{title}</h5>
		</div>
	)
}
