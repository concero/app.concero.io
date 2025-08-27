import { Modal } from '../Modal/Modal'
import { ContactSupportCard } from '../../cards/ContactSupportCard/ContactSupportCard'
import classNames from './ContactSupportModal.module.pcss'
import { useTranslation } from 'react-i18next'
import posthog from 'posthog-js'

interface ContactSupportModalProps {
	isShow: boolean
	setIsShow: (isShow: boolean) => void
}
/**@deprecated */
export function ContactSupportModal({ isShow, setIsShow }: ContactSupportModalProps) {
	const infoToCopy = { replay_id: posthog.get_distinct_id(), session_id: posthog.get_session_id() }
	const { t } = useTranslation()

	return (
		<Modal
			show={isShow}
			setShow={setIsShow}
			className={classNames.supportCardContainer}
			title={t('contactSupportCard.contractSupport')}
		>
			<ContactSupportCard infoToCopy={infoToCopy} />
		</Modal>
	)
}
