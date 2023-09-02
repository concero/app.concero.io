import { FC, useEffect } from 'react'
import classNames from './SwapButton.module.pcss'
import { Button } from '../Button/Button'
import { useButtonReducer } from './buttonReducer'
import { SwapButtonProps } from './types'
import { setStatus } from './setStatus'

export const SwapButton: FC<SwapButtonProps> = ({ swapState, isConnected, onClick }) => {
  const { from, to, routes, balance, response, isLoading } = swapState
  const [buttonState, dispatch] = useButtonReducer()

  useEffect(() => {
    setStatus(from, to, isConnected, isLoading, dispatch, routes, balance, response)
  }, [from, to, isLoading, isConnected, routes, response])

  return (
    <Button
      size="lg"
      leftIcon={buttonState.icon ? { name: buttonState.icon, iconProps: { size: 18, color: 'white' } } : null}
      isDisabled={buttonState.isDisabled}
      isLoading={isLoading}
      onClick={onClick}
      className={`${classNames.swapButton} ${classNames[buttonState.className]}`}
    >
      {buttonState.text}
    </Button>
  )
}
