import { Modal } from '../Modal/Modal'
import { ContactSupportCard } from '../../cards/ContactSupportCard/ContactSupportCard'
import classNames from './ContactSupportModal.module.pcss'
import { useTranslation } from 'react-i18next'
import posthog from 'posthog-js'

interface ContactSupportModalProps {
	isShow: boolean
	setIsShow: (isShow: boolean) => void
}

export function ContactSupportModal({ isShow, setIsShow }: ContactSupportModalProps) {
	const infoToCopy = { replay_id: posthog.get_distinct_id(), session_id: posthog.get_session_id() }
	const { t } = useTranslation()

	return (
		<Modal show={isShow} setShow={setIsShow} title={t('contactSupportCard.contractSupport')}>
			<div className={classNames.supportCardContainer}>
				<ContactSupportCard infoToCopy={infoToCopy} />
			</div>
		</Modal>
	)
}
