import { FC } from 'react'
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
  return (
    <Modal title={'Help us improve'} show={show} setShow={setShow}>
      <div className={classNames.container}>
        <div className={classNames.tagContainer}>
          <Tag color={'main'} title={'Question'} />
          <Tag color={'secondary'} title={'Issue'}></Tag>
          <Tag color={'secondary'} title={'Suggestion'}></Tag>
          <Tag color={'secondary'} title={'I like something'}></Tag>
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
