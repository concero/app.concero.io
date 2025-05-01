import classNames from './Modal.module.pcss'
import { LoadingAnimation } from '../../layout/LoadingAnimation/LoadingAnimation'
import CrossIcon from '@/shared/assets/icons/monochrome/CrossIcon.svg?react'
import { ReactNode } from 'react'
import { IconButton } from '@concero/ui-kit'

interface ModalHeaderProps {
	title: ReactNode | string
	isLoading?: boolean
	onClick: () => void
}

export function ModalHeader({ title, isLoading = false, onClick }: ModalHeaderProps) {
	return (
		<div className={classNames.header}>
			{title}
			{isLoading ? <LoadingAnimation size={16} color={'var(--color-gray-600)'} /> : null}
			<IconButton onClick={onClick} variant="secondary" size="m">
				<CrossIcon />
			</IconButton>
		</div>
	)
}
