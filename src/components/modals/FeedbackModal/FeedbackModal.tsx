import { FC, useContext, useRef, useState } from 'react'
import { IconAlertHexagon, IconBrandDiscord, IconBrandTelegram, IconBrandTwitter, IconMessage, IconMessageChatbot, IconQuestionMark, IconSend, IconUser } from '@tabler/icons-react'
import classNames from './FeedbackModal.module.pcss'
import { Modal } from '../Modal/Modal'
import { TextArea } from '../../layout/TextArea/TextArea'
import { Button } from '../../buttons/Button/Button'
import { submitFeedback } from '../../../api/concero/submitFeedback'
import { TextInput } from '../../input/TextInput'
import { NotificationsContext } from '../../../hooks/notificationsContext'

interface FeedbackModalProps {
	show: boolean
	setShow: () => void
}

enum FeedbackTags {
	QUESTION = 1,
	ISSUE,
	SUGGESTION,
	LIKE,
}

enum ContactOptions {
	DISCORD = 1,
	TWITTER,
	TELEGRAM,
	EMAIL,
}

export const FeedbackModal: FC<FeedbackModalProps> = ({ show, setShow }) => {
	const [selectedTag, setSelectedTag] = useState<FeedbackTags | null>(null)
	const [message, setMessage] = useState<string>('')
	const [contactOption, setContactOption] = useState<ContactOptions | null>(null)
	const [username, setUsername] = useState<string>('')
	const { addNotification } = useContext(NotificationsContext)
	const feedbackOptions = [
		{ label: 'Question', value: FeedbackTags.QUESTION, icon: <IconQuestionMark size={16} /> },
		{ label: 'Issue', value: FeedbackTags.ISSUE, icon: <IconAlertHexagon size={16} /> },
		{ label: 'Suggestion', value: FeedbackTags.SUGGESTION, icon: <IconMessageChatbot size={16} /> },
	]

	const contactOptions = [
		{ label: 'Discord', value: ContactOptions.DISCORD, icon: <IconBrandDiscord size={16} /> },
		{ label: 'Twitter', value: ContactOptions.TWITTER, icon: <IconBrandTwitter size={16} /> },
		{ label: 'Telegram', value: ContactOptions.TELEGRAM, icon: <IconBrandTelegram size={16} /> },
		{ label: 'Email', value: ContactOptions.EMAIL, icon: <IconMessage size={16} /> },
	]

	const handleSubmit = async () => {
		if (selectedTag && message && contactOption && username) {
			const { res } = await submitFeedback({
				type: feedbackOptions[selectedTag - 1].label.toLowerCase(),
				message: message.trim(),
				contact_option: contactOptions[contactOption - 1].label.toLowerCase(),
				contact_username: username.trim(),
				addNotification,
			})
			if (res) {
				setShow(false) // Close the modal upon success
			}
		}
	}

	const textAreaRef = useRef(null)
	const textInputRef = useRef(null)

	return (
		<Modal title="Help us improve" show={show} setShow={setShow}>
			<div className={classNames.container}>
				<div className={classNames.tagContainer}>
					{feedbackOptions.map(option => (
						<Button key={option.value} size="sm" variant={selectedTag === option.value ? 'primary' : 'subtle'} onClick={() => setSelectedTag(option.value)} leftIcon={option.icon}>
							{option.label}
						</Button>
					))}
				</div>
				<TextArea
					key="textArea"
					ref={textAreaRef}
					onFocus={() => textInputRef.current.blur()}
					onChange={e => setMessage(e.target.value)}
					placeholder={'Explain your feedback in detail'}
				/>
				<h5 className={classNames.sectionTitle}>How can we reach out?</h5>
				<div className={classNames.tagContainer}>
					{contactOptions.map(option => (
						<Button key={option.value} size="sm" variant={contactOption === option.value ? 'primary' : 'subtle'} onClick={() => setContactOption(option.value)} leftIcon={option.icon}>
							{option.label}
						</Button>
					))}
				</div>
				<TextInput
					key="textInput"
					ref={textInputRef}
					placeholder={'Your username'}
					icon={<IconUser size={18} color={'var(--color-grey-500'} />}
					onChange={e => setUsername(e.target.value)}
				/>

				<Button className={classNames.ctaButton} variant="primary" isDisabled={!message || !contactOption || !username} leftIcon={<IconSend size={16} />} onClick={handleSubmit}>
					Send Feedback
				</Button>
			</div>
		</Modal>
	)
}
