import { FC } from 'react'
import classNames from './SwapProgress.module.pcss'
import { TokenInfo } from './TokenInfo'
import { TransactionStep } from './TransactionStep'
import { Button } from '../../../buttons/Button/Button'

interface SwapProgressProps {
  from: any
  to: any
  transactionProgress: any[]
  transactionStep: string
  swapDispatch: any
}

export const SwapProgress: FC<SwapProgressProps> = ({
  from,
  to,
  transactionProgress,
  transactionStep,
  swapDispatch,
}) => {
  const handleGoBack = () => {
    swapDispatch({ type: 'SET_SWAP_STEP', payload: 'input' })
  }

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
      {transactionStep !== 'progress' ? (
        <Button
          leftIcon={{ name: 'ArrowLeft', iconProps: { size: 20 } }}
          className={classNames.goBackButton}
          onClick={() => handleGoBack()}
        >
          Go back
        </Button>
      ) : null}
    </div>
  )
}
