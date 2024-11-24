import classNames from './Modal.module.pcss'
import { LoadingAnimation } from '../../layout/LoadingAnimation/LoadingAnimation'
import { IconButton } from '../../buttons/IconButton/IconButton'
import { ChestIcon } from '../../../assets/icons/ChestIcon'

interface ModalHeaderProps {
	title: string
	isLoading?: boolean
	onClick: () => void
}

export function ModalHeader({ title, isLoading = false, onClick }: ModalHeaderProps) {
	return (
		<div className={classNames.header}>
			<div className={classNames.titleContainer}>
				<h5 className={classNames.title}>{title}</h5>
				{isLoading ? <LoadingAnimation size={16} color={'var(--color-grey-600)'} /> : null}
			</div>
			<IconButton onClick={onClick} variant="secondary" size="md">
				<ChestIcon />
			</IconButton>
		</div>
	)
}
