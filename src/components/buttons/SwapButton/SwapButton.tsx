import { useEffect } from 'react'
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
}

const getStatus = (from, to, isConnected: boolean, isLoading: boolean, dispatch, routes, balance) => {
  if (isLoading) {
    dispatch({ type: 'LOADING_BUTTON' })
  } else if (!isConnected) {
    dispatch({ type: 'DISCONNECTED_BUTTON' })
  } else if (!from.amount) {
    dispatch({ type: 'NO_AMOUNT_BUTTON' })
  } else if (from.amount > balance) {
    dispatch({ type: 'LOW_BALANCE_BUTTON' })
  } else if (from.amount && to.amount && routes.length) {
    dispatch({ type: 'SWAP_BUTTON' })
  } else if (!routes.length) {
    dispatch({ type: 'NO_ROUTE_BUTTON' })
  }
}

export const SwapButton = ({ from, to, isConnected, isLoading, routes, onClick, balance }) => {
  const [buttonState, dispatch] = useButtonReducer()

  useEffect(() => {
    getStatus(from, to, isConnected, isLoading, dispatch, routes, balance)
  }, [from, to, isLoading, isConnected, routes])

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
