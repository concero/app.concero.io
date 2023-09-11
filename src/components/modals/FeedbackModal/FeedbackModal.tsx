import { FC, useState } from 'react'
import { Send } from 'tabler-icons-react'
import classNames from './FeedbackModal.module.pcss'
import { Modal } from '../Modal/Modal'
import { TextArea } from '../../layout/TextArea/TextArea'
import { Button } from '../../buttons/Button/Button'
import { submitFeedback } from '../../../api/concero/submitFeedback'

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

export const FeedbackModal: FC<FeedbackModalProps> = ({ show, setShow }) => {
  const [selectedTag, setSelectedTag] = useState<FeedbackTags | null>(null)
  const [message, setMessage] = useState<string>('')
  const feedbackOptions = [
    { label: 'Question', value: FeedbackTags.QUESTION },
    { label: 'Issue', value: FeedbackTags.ISSUE },
    { label: 'Suggestion', value: FeedbackTags.SUGGESTION },
    { label: 'I like something', value: FeedbackTags.LIKE },
  ]

  const handleSubmit = async () => {
    if (selectedTag && message) {
      const { res } = await submitFeedback({
        type: feedbackOptions[selectedTag - 1].label.toLowerCase(),
        message: message.trim(),
      })
      if (res) {
        setShow(false) // Close the modal upon success
      }
    }
  }

  return (
    <Modal title="Help us improve" show={show} setShow={setShow}>
      <div className={classNames.container}>
        <div className={classNames.tagContainer}>
          {feedbackOptions.map((option) => (
            <Button key={option.value} size="sm" variant={selectedTag === option.value ? 'primary' : 'subtle'} onClick={() => setSelectedTag(option.value)}>
              {option.label}
            </Button>
          ))}
        </div>
        <div className={classNames.textareaContainer}>
          <TextArea onChange={(e) => setMessage(e.target.value)} />
        </div>
        <Button variant="primary" isDisabled={!message} leftIcon={<Send size={16} />} onClick={handleSubmit}>
          Send
        </Button>
      </div>
    </Modal>
  )
}
