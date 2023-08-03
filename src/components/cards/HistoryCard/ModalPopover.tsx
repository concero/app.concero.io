import { FC } from 'react'
import classNames from './HistoryCard.module.pcss'
import { truncateWallet } from '../../../utils/formatting'
import Icon from '../../Icon'

interface ModalPopoverProps {
  item: {
    id: string
    isBot: boolean
  }
}

export const ModalPopover = ({ item }): FC<ModalPopoverProps> => {
  const handleClick = () => {
    navigator.clipboard.writeText(item.transaction.hash)
  }

  return (
    <div className={classNames.modalPopoverContainer}>
      <div className={classNames.line}>
        <p className={`body1`}>Transaction ID:</p>
        <p className={classNames.id} onClick={() => handleClick()}>
          {truncateWallet(item.transaction.hash)}
        </p>
      </div>
      {item.isBot ? (
        <div className={classNames.infoContainer}>
          <Icon name={'InfoCircle'} className={'body1'} />
          <p className={'body1'}>Account with 1000 TXs in the last 30 days. Most likely a Bot.</p>
        </div>
      ) : null}
    </div>
  )
}
