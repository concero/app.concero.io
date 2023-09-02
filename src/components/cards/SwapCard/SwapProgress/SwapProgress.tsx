import { FC } from 'react'
import classNames from './SwapProgress.module.pcss'
import { TokenInfo } from './TokenInfo'
import { TransactionStep } from './TransactionStep'
import { Button } from '../../../buttons/Button/Button'

interface SwapProgressProps {
  swapState: any
  swapDispatch: any
}

export const SwapProgress: FC<SwapProgressProps> = ({ swapState, swapDispatch }) => {
  const { from, to, steps, status } = swapState
  const handleGoBack = () => {
    swapDispatch({ type: 'SET_SWAP_STAGE', payload: 'input' })
    swapDispatch({ type: 'SET_SWAP_STATUS', payload: 'pending' })
  }

  return (
    <div className={classNames.container}>
      <div className={classNames.tokensInfoContainer}>
        <TokenInfo direction={from} />
        <TokenInfo direction={to} />
      </div>
      <div className={classNames.progressContainer}>
        {steps.map((step, index) => (
          <TransactionStep key={index.toString()} step={step} />
        ))}
      </div>
      {status === 'failure' || status === 'success' ? (
        <Button
          leftIcon={{ name: 'ArrowLeft', iconProps: { size: 20 } }}
          className={classNames.goBackButton}
          onClick={() => handleGoBack()}
          variant="goBack"
        >
          Go back
        </Button>
      ) : null}
    </div>
  )
}
