import { type FC } from 'react'
import { Ping } from '@uiball/loaders'
import { IconCheck, IconExternalLink, IconX } from '@tabler/icons-react'
import { LoadingAnimation } from '../LoadingAnimation/LoadingAnimation'
import { Button } from '../../buttons/Button/Button'
import classNames from './TransactionStep.module.pcss'

interface StageProps {
	step: StageStep
}

export interface StageStep {
	title: string
	body?: string
	status: 'pending' | 'success' | 'error' | 'await'
	txLink?: string
}

const renderTag = (status: string) => {
	const iconSize = 18

	const content = () => {
		switch (status) {
			case 'pending':
				return <LoadingAnimation size={iconSize} color="var(--color-text-secondary)" />
			case 'await':
				return <Ping size={iconSize} color="var(--color-primary-500)" />
			case 'success':
				return <IconCheck size={iconSize} color={'var(--color-green-500'} />
			case 'error':
				return <IconX size={iconSize} color={'var(--color-red-500'} />
			default:
				return <div style={{ width: iconSize, height: iconSize }} />
		}
	}

	return <div className={`${classNames.tagContainer} ${classNames[status]}`}>{content()}</div>
}

export const TransactionStep: FC<StageProps> = ({ step }) => {
	const { title, body, status, txLink } = step

	return (
		<div className={classNames.step}>
			{renderTag(status)}
			<div className={classNames.stageText}>
				<div className={classNames.titleContainer}>
					<h5>{title}</h5>
					{txLink && (
						<a href={txLink} target="_blank" rel="noopener noreferrer">
							<Button variant="black" size="xs">
								<IconExternalLink size={16} color={'var(--color-text-secondary)'} />
							</Button>
						</a>
					)}
				</div>
				{body && <p className="body1">{body}</p>}
			</div>
		</div>
	)
}
