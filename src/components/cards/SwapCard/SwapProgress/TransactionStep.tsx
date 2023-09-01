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

const renderTag = (status: string) => {
  const color = status === 'success' ? 'green' : status === 'error' ? 'red' : 'grey'
  const iconSize = 16
  const content = () => {
    switch (status) {
      case 'pending':
        return <LoadingAnimation size={iconSize} color={colors.text.secondary} />
      case 'success':
        return <Icon name="Check" size={iconSize} color={colors.green.darker} />
      case 'error':
        return <Icon name="X" size={iconSize} color={colors.red.dark} />
      default:
        return <div style={{ width: iconSize, height: iconSize }} />
    }
  }

  return (
    <div className={classNames.tagContainer}>
      <Tag color={color} size="xxs">
        {content()}
      </Tag>
    </div>
  )
}

export const TransactionStep: FC<TransactionStepProps> = ({ step }) => {
  const { title, body, status, txLink } = step

  return (
    <div className={classNames.transactionStep}>
      {renderTag(status)}
      <div className={classNames.transactionStepText}>
        <div className={classNames.titleContainer}>
          <h5>{title}</h5>
          {txLink && (
            <a href={txLink} target="_blank" rel="noopener noreferrer">
              <Icon name="ExternalLink" size={16} color={colors.text.secondary} />
            </a>
          )}
        </div>
        {body && <p className="body1">{body}</p>}
      </div>
    </div>
  )
}
