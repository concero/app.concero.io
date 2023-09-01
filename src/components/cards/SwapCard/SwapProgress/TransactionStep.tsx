import { FC } from 'react'
import classNames from './SwapProgress.module.pcss'
import { Tag } from '../../../tags/Tag/Tag'
import { LoadingAnimation } from '../../../layout/LoadingAnimation/LoadingAnimation'
import Icon from '../../../Icon'
import { colors } from '../../../../constants/colors'

interface TransactionStepProps {
  step: {
    title: string
    body?: string
    status: 'pending' | 'success' | 'error' | 'await'
    txLink?: string
  }
}

export const TransactionStep: FC<TransactionStepProps> = ({ step }) => {
  const { title, body, status, txLink } = step

  return (
    <div className={classNames.transactionStep}>
      <div className={classNames.tagContainer}>
        {status === 'pending' ? (
          <Tag color={'grey'} size={'xxs'}>
            <LoadingAnimation size={16} color={'secondary'} />
          </Tag>
        ) : status === 'success' ? (
          <Tag color={'green'} size={'xxs'}>
            <Icon name={'Check'} size={16} color={colors.green.darker} />
          </Tag>
        ) : status === 'error' ? (
          <Tag color={'red'} size={'xxs'}>
            <Icon name={'X'} size={16} color={colors.red.dark} />
          </Tag>
        ) : (
          <Tag color={'grey'} size={'xxs'}>
            <div style={{ width: 16, height: 16 }} />
          </Tag>
        )}
      </div>
      <div className={classNames.transactionStepText}>
        <div className={classNames.titleContainer}>
          <h5>{title}</h5>
          {txLink ? (
            <a href={txLink} target="_blank">
              <Icon name={'ExternalLink'} size={16} color={colors.text.secondary} />
            </a>
          ) : null}
        </div>
        {body ? <p className={'body1'}>{body}</p> : null}
      </div>
    </div>
  )
}
