import { FC, useState } from 'react'
import classNames from './FeedbackModal.module.pcss'
import { Modal } from '../../components/modals/Modal/Modal'
import { TextArea } from '../../components/layout/TextArea/TextArea'
import { Button } from '../../components/buttons/Button/Button'

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
  const [textValue, setTextValue] = useState('')
  const feedbackOptions = [
    { label: 'Question', value: FeedbackTags.QUESTION },
    { label: 'Issue', value: FeedbackTags.ISSUE },
    { label: 'Suggestion', value: FeedbackTags.SUGGESTION },
    { label: 'I like something', value: FeedbackTags.LIKE },
  ]

  return (
    <Modal title="Help us improve" show={show} setShow={setShow}>
      <div className={classNames.container}>
        <div className={classNames.tagContainer}>
          {feedbackOptions.map((option) => (
            <Button
              key={option.value}
              size="sm"
              variant={selectedTag === option.value ? 'primary' : 'subtle'}
              onClick={() => setSelectedTag(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
        <div className={classNames.textareaContainer}>
          <TextArea value={textValue} onChangeText={(e) => setTextValue(e.target.value)} placeholder="Tell us more" />
        </div>
        <Button
          variant="primary"
          isDisabled={!textValue}
          leftIcon={{
            name: 'Send',
            iconProps: { size: 16 },
          }}
        >
          Send
        </Button>
      </div>
    </Modal>
  )
}
