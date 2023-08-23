import { FC, useState } from 'react'
import classNames from './FeedbackModal.module.pcss'
import { Modal } from '../../components/modals/Modal/Modal'
import { Tag } from '../../components/tags/Tag/Tag'
import { TextArea } from '../../components/layout/TextArea/TextArea'
import { Button } from '../../components/buttons/Button/Button'

interface FeedbackModalProps {
  show: boolean
  setShow: () => void
}

export const FeedbackModal: FC<FeedbackModalProps> = ({ show, setShow }) => {
  const [selectedTag, setSelectedTag] = useState('')

  return (
    <Modal title={'Help us improve'} show={show} setShow={setShow}>
      <div className={classNames.container}>
        <div className={classNames.tagContainer}>
          <Tag
            color={selectedTag === 'question' ? 'main' : 'secondary'}
            title={'Question'}
            onClick={() => setSelectedTag('question')}
          />
          <Tag
            color={selectedTag === 'issue' ? 'main' : 'secondary'}
            title={'Issue'}
            onClick={() => setSelectedTag('issue')}
          />
          <Tag
            color={selectedTag === 'suggestion' ? 'main' : 'secondary'}
            title={'Suggestion'}
            onClick={() => setSelectedTag('suggestion')}
          />
          <Tag
            color={selectedTag === 'i_like_something' ? 'main' : 'secondary'}
            title={'I like something'}
            onClick={() => setSelectedTag('i_like_something')}
          />
        </div>
        <div className={classNames.textareaContainer}>
          <TextArea />
        </div>
        <Button
          variant={'primary'}
          leftIcon={{
            name: 'ArrowsDiff',
            iconProps: { transform: 'rotate(90)' },
          }}
        >
          Send
        </Button>
      </div>
    </Modal>
  )
}
