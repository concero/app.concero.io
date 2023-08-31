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
        <Tag color={'grey'} size={'xxs'}>
          {status === 'pending' ? (
            <LoadingAnimation size={16} color={'secondary'} />
          ) : status === 'success' ? (
            <Icon name={'Check'} size={16} color={colors.green.darker} />
          ) : (
            <Icon name={'X'} size={16} color={colors.red.dark} />
          )}
        </Tag>
      </div>
      <div className={classNames.transactionStepText}>
        <h5>{title}</h5>
        {body ? <p className={'body1'}>{body}</p> : null}
      </div>
    </div>
  )
}
