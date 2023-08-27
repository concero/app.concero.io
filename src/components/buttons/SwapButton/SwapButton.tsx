import { FC, useEffect } from 'react'
import classNames from './SwapButton.module.pcss'
import { Button } from '../Button/Button'
import { useButtonReducer } from './buttonReducer'
import { SwapButtonProps } from './types'
import { setStatus } from './setStatus'

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
