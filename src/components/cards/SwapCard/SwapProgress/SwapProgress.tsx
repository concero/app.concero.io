import { FC } from 'react'
import classNames from './SwapProgress.module.pcss'
import { TokenInfo } from './TokenInfo'
import { TransactionStep } from './TransactionStep'

export const SwapProgress: FC = ({ from, to, transactionProgress }) => {
  return (
    <div className={classNames.container}>
      <div className={classNames.tokensInfoContainer}>
        <TokenInfo direction={from} />
        <TokenInfo direction={to} />
      </div>
      <div className={classNames.progressContainer}>
        {transactionProgress.map((step, index) => {
          return <TransactionStep key={index.toString()} step={step} />
        })}
      </div>
    </div>
  )
}
