import { Button, Modal } from '@concero/ui-kit'
import { useState } from 'react'
import cls from './DisconnectSocialsModal.module.pcss'

type TProps = {
	show?: boolean
	close?: () => void
	onDisconnect?: () => void
}

export const DisconnectSocialsModal = (props: TProps) => {
	const { close, show = false, onDisconnect } = props
	return (
		<Modal headless show={show} onClose={() => close?.()}>
			<div className={cls.card_modal}>
				<div>
					<span className={cls.title}>Are you shure?</span>
					<span className={cls.description}>
						Unlinking an account
						<span className={cls.red_text}> will remove 5 CERs </span>
						from your balance.
					</span>
				</div>
				<div className={cls.controls}>
					<Button variant="secondary" size="l" isFull onClick={close}>
						Cancel
					</Button>
					<Button variant="danger" size="l" isFull onClick={onDisconnect}>
						Unlink
					</Button>
				</div>
			</div>
		</Modal>
	)
}
