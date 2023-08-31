import { FC } from 'react'
import classNames from './SwapProgress.module.pcss'
import { Tag } from '../../../tags/Tag/Tag'
import { LoadingAnimation } from '../../../layout/LoadingAnimation/LoadingAnimation'
import Icon from '../../../Icon'
import { colors } from '../../../../constants/colors'

interface TransactionStepProps {
  step: {
    title: string
    body: string
    status: 'pending' | 'success' | 'error'
  }
}

export const TransactionStep: FC<TransactionStepProps> = ({ step }) => {
  const { title, body, status } = step

  return (
    <div className={classNames.transactionStep}>
      <div>
        {status === 'pending' ? (
          <Tag color={'grey'} size={'xxs'}>
            <LoadingAnimation size={16} color={'secondary'} />
          </Tag>
        ) : status === 'success' ? (
          <Tag color={'green'} size={'xxs'}>
            <Icon name={'Check'} size={16} color={colors.green.darker} />
          </Tag>
        ) : (
          <Tag color={'red'} size={'xxs'}>
            <Icon name={'X'} size={16} color={colors.red.dark} />
          </Tag>
        )}
      </div>
      <div className={classNames.transactionStepText}>
        <h5>{title}</h5>
        {body ? <p className={'body1'}>{body}</p> : null}
      </div>
    </div>
  )
}
