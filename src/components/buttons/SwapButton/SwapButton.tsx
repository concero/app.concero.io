import { FC, useEffect } from 'react'
import classNames from './SwapButton.module.pcss'
import { Button } from '../Button/Button'
import { useButtonReducer } from './buttonReducer'
import { Route } from '../../../api/lifi/types'
import { Dispatch, From, SwapButtonProps, To } from './types'

const setStatus = (
  from: From,
  to: To,
  isConnected: boolean,
  isLoading: boolean,
  dispatch: Dispatch,
  routes: Route[],
  balance: string,
  transactionResponse: any[],
) => {
  console.log(transactionResponse)
  if (isLoading) {
    dispatch({ type: 'LOADING' })
  } else if (!isConnected) {
    dispatch({ type: 'DISCONNECTED' })
  } else if (transactionResponse) {
    if (!transactionResponse.isOk) {
      if (transactionResponse.message === 'user rejected') {
        dispatch({ type: 'CANCELED' })
      } else if (transactionResponse.message === 'unknown error') {
        dispatch({ type: 'WRONG' })
      } else if (transactionResponse.message === 'No Routes found') dispatch({ type: 'NO_ROUTE' })
    } else if (transactionResponse.isOk) dispatch({ type: 'SUCCESS' })
  } else if (!from.amount || (from.amount && !routes.length)) {
    dispatch({ type: 'NO_AMOUNT' })
  } else if (balance && from.amount > parseFloat(balance)) {
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
              iconProps: {
                size: 18,
                color: 'white',
              },
            }
          : null
      }
      isDisabled={buttonState.isDisabled}
      isLoading={isLoading}
      onClick={onClick}
      className={`${classNames.swapButton} ${classNames[buttonState.className]}`}
    >
      <p className={classNames.buttonText}>{buttonState.text}</p>
    </Button>
  )
}
