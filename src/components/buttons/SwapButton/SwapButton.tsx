import { FC, useEffect } from 'react'
import classNames from './SwapButton.module.pcss'
import { Button } from '../Button/Button'
import { useButtonReducer } from './buttonReducer'

interface SwapButtonProps {
  from: any
  to: any
  isConnected: boolean
  isLoading: boolean
  routes: any[]
  onClick: () => void
  balance: string
  transactionResponse: any[]
}

const setStatus = (
  from,
  to,
  isConnected: boolean,
  isLoading: boolean,
  dispatch,
  routes,
  balance,
  transactionResponse,
) => {
  if (isLoading) {
    dispatch({ type: 'LOADING' })
  } else if (!isConnected) {
    dispatch({ type: 'DISCONNECTED' })
  } else if (transactionResponse) {
    if (!transactionResponse.isOk) {
      if (transactionResponse.message === 'user rejected') dispatch({ type: 'CANCELED' })
      else if (transactionResponse.message === 'unknown error') dispatch({ type: 'WRONG' })
      else if (transactionResponse.message === 'No Routes found') dispatch({ type: 'NO_ROUTE' })
    } else if (transactionResponse.isOk) dispatch({ type: 'SUCCESS' })
  } else if (!from.amount || (from.amount && !routes.length)) {
    dispatch({ type: 'NO_AMOUNT' })
  } else if (from.amount > balance) {
    dispatch({ type: 'LOW_BALANCE' })
  } else if (from.amount && to.amount && routes.length) {
    dispatch({ type: 'SWAP' })
  }
}

export const SwapButton: FC<SwapButtonProps> = ({
  from,
  to,
  isConnected,
  isLoading,
  routes,
  onClick,
  balance,
  transactionResponse,
}) => {
  const [buttonState, dispatch] = useButtonReducer()

  useEffect(() => {
    setStatus(from, to, isConnected, isLoading, dispatch, routes, balance, transactionResponse)
  }, [from, to, isLoading, isConnected, routes, transactionResponse])

  return (
    <Button
      size="lg"
      leftIcon={
        buttonState.icon
          ? {
              name: buttonState.icon,
              iconProps: { size: 18 },
            }
          : null
      }
      isDisabled={buttonState.isDisabled}
      isLoading={isLoading}
      onClick={onClick}
      className={`${classNames.swapButton} ${classNames[buttonState.className]}`}
    >
      {buttonState.text}
    </Button>
  )
}
