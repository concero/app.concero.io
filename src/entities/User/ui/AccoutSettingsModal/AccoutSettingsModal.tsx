import { IconButton, Modal } from '@concero/ui-kit'
import SettingsIcon from '@/shared/assets/icons/monochrome/Settings_1.svg?react'
import { ReactNode, useState } from 'react'
import { AccoutSettingsUI } from '../AccoutSettingsUI/AccoutSettingsUI'
import cls from './AccoutSettingsModal.module.pcss'
type TProps = {
	TriggerElement?: ReactNode
	titleModal?: string
} & Parameters<typeof AccoutSettingsUI>[0]

export const AccoutSettingsModal = ({ TriggerElement, titleModal, ...settingsProps }: TProps) => {
	const [isOpenModal, setIsOpenModal] = useState(false)

	const handleOpenModal = () => setIsOpenModal(true)
	const handleCloseModal = () => setIsOpenModal(false)

	const renderTrigger = () => {
		if (TriggerElement) {
			return <div onClick={handleOpenModal}>{TriggerElement}</div>
		}

		return (
			<IconButton onClick={handleOpenModal} size="s" variant="secondary">
				<SettingsIcon />
			</IconButton>
		)
	}

	return (
		<>
			{renderTrigger()}
			<Modal
				show={isOpenModal}
				onClose={handleCloseModal}
				title={titleModal ?? 'Account Settings'}
				className={cls.modal}
			>
				<AccoutSettingsUI {...settingsProps} />
			</Modal>
		</>
	)
}
