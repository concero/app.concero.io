import { Button, Modal, ModalProps, TButtonProps } from '@concero/ui-kit'
import clsx from 'clsx'
import cls from './OpenHistoryUserActions.module.pcss'
import { HistoryUserActions } from '../HistoryUserActions/HistoryUserActions'
import { TUserResponse } from '@/entities/User'
import { useState } from 'react'

type TProps = {
	text?: string
	className?: string
	buttonProps?: Partial<TButtonProps>
	modalProps?: Partial<ModalProps>
	user?: TUserResponse
}

export const OpenHistoryUserActions = (props: TProps) => {
	const { user, className, text, buttonProps, modalProps } = props
	const [showModal, setShowModal] = useState(false)
	if (!user) {
		return (
			<Button {...buttonProps} className={clsx(className)} isDisabled>
				{text}
			</Button>
		)
	}
	const handleOpen = () => {
		setShowModal(true)
	}
	const handleClose = () => {
		setShowModal(false)
	}
	return (
		<>
			<Button {...buttonProps} className={clsx(className)} onClick={handleOpen}>
				{text}
			</Button>
			<div className={cls.wrap_modal}>
				<Modal
					position="center"
					onClose={handleClose}
					show={showModal}
					title={'History'}
					{...modalProps}
					className={clsx(cls.user_actions_modal)}
				>
					<HistoryUserActions user={user} />
				</Modal>
			</div>
		</>
	)
}
