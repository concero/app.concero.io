import cls from './ContactSupportModal.module.pcss'
import posthog from 'posthog-js'
import { Modal } from '@concero/ui-kit'
import { ContactSupportCard } from '../ContactSupportCard/ContactSupportCard'

interface ContactSupportModalProps {
	isShow: boolean
	setIsShow: (isShow: boolean) => void
}

export const ContactSupportModal = ({ isShow, setIsShow }: ContactSupportModalProps) => {
	const infoToCopy = { replay_id: posthog.get_distinct_id(), session_id: posthog.get_session_id() }

	return (
		<Modal
			position="center"
			title={'Contact support'}
			show={isShow}
			onClose={() => setIsShow(false)}
			className={cls.support_card_container}
		>
			<ContactSupportCard infoToCopy={infoToCopy} />
		</Modal>
	)
}
