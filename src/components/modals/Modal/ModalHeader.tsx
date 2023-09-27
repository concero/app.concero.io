import { IconX } from '@tabler/icons-react'
import classNames from './Modal.module.pcss'
import { Button } from '../../buttons/Button/Button'
import { LoadingAnimation } from '../../layout/LoadingAnimation/LoadingAnimation'

export function ModalHeader(props: { title: string; onClick: () => void; isLoading: boolean }) {
	return (
		<div className={classNames.header}>
			<div className={classNames.titleContainer}>
				<h5>{props.title}</h5>
				{props.isLoading ? <LoadingAnimation size={16} color={'var(--color-grey-600'} /> : null}
			</div>
			<Button onClick={props.onClick} variant="black" size="sq-xs" leftIcon={<IconX size={18} color="var(--color-text-secondary)" />} />
		</div>
	)
}
