import { FC } from 'react'
import { Ping } from '@uiball/loaders'
import classNames from './SwapProgress.module.pcss'
import { LoadingAnimation } from '../../../layout/LoadingAnimation/LoadingAnimation'
import Icon from '../../../Icon'
import { colors } from '../../../../constants/colors'

interface stageProps {
  step: {
    title: string
    body?: string
    status: 'pending' | 'success' | 'error' | 'await'
    txLink?: string
  }
}

const renderTag = (status: string) => {
  const iconSize = 18
  const content = () => {
    switch (status) {
      case 'pending':
        return <LoadingAnimation size={iconSize} color="var(--color-text-secondary)" />
      case 'await':
        return <Ping size={24} color="var(--color-text-secondary)" />
      case 'success':
        return <Icon name="Check" size={iconSize} color={colors.green.darker} />
      case 'error':
        return <Icon name="X" size={iconSize} color={colors.red.dark} />
      default:
        return <div style={{ width: iconSize, height: iconSize }} />
    }
  }

  return <div className={`${classNames.tagContainer} ${classNames[status]}`}>{content()}</div>
}

export const TransactionStep: FC<stageProps> = ({ step }) => {
  const { title, body, status, txLink } = step

  return (
    <div className={classNames.step}>
      {renderTag(status)}
      <div className={classNames.stageText}>
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
