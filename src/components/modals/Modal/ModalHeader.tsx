import { IconX } from '@tabler/icons-react'
import classNames from './Modal.module.pcss'
import { Button } from '../../buttons/Button/Button'
import { LoadingAnimation } from '../../layout/LoadingAnimation/LoadingAnimation'

interface ModalHeaderProps {
	title: string
	isLoading?: boolean
	onClick: () => void
}

export function ModalHeader({ title, isLoading = false, onClick }: ModalHeaderProps) {
	return (
		<div className={classNames.header}>
			<div className={classNames.titleContainer}>
				<h5>{title}</h5>
				{isLoading ? <LoadingAnimation size={16} color={'var(--color-grey-600'} /> : null}
			</div>
			<Button
				onClick={onClick}
				variant="black"
				size="sq-xs"
				leftIcon={<IconX size={18} color="var(--color-text-secondary)" />}
			/>
		</div>
	)
}
