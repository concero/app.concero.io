import { type FC, type ReactNode } from 'react'
import classNames from './CardHeader.module.pcss'
import { LoadingAnimation } from '../../layout/LoadingAnimation/LoadingAnimation'

interface CardHeaderProps {
	title?: string
	children?: ReactNode
	isLoading?: boolean
	className?: string
}

export const CardHeader: FC<CardHeaderProps> = ({ title = null, children, isLoading = false, className = '' }) => (
	<div className={`${classNames.cardHeader} ${className}`}>
		{title ? (
			<div className={classNames.titleContainer}>
				<h5 className={'cardHeaderTitle'}>{title}</h5>
				<div>{isLoading ? <LoadingAnimation size={13} color={'var(--color-text-secondary)'} /> : null}</div>
			</div>
		) : null}
		{children}
	</div>
)
