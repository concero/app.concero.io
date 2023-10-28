import { FC } from 'react'
import classNames from './SwapButton.module.pcss'
import { Button } from '../Button/Button'
import { SwapButtonProps } from './types'
import { buttonStyleClass, buttonText, ButtonType, iconComponent, isButtonDisabled } from './constants'

export const SwapButton: FC<SwapButtonProps> = ({ swapState, isConnected, onClick }) => {
	const { isLoading, from, to, buttonState } = swapState
	const fromAmount = from.amount ? Number(from.amount) : null
	const toAmount = to.amount ? Number(to.amount) : null
	const strBalance = swapState.balance?.split(' ')[0]
	const balance = strBalance ? Number(strBalance) : null
	const isLowBalance = fromAmount && toAmount && balance !== null ? Number(from.amount) > balance : false
	const leftIconComponent = isLowBalance ? iconComponent[ButtonType.LOW_BALANCE] : iconComponent[buttonState.type] ?? null
	const additionalMessage = buttonState.message ?? ''
	const isDisabled = isConnected ? (isLowBalance ? isButtonDisabled[ButtonType.LOW_BALANCE] : isButtonDisabled[buttonState.type]) : true
	const buttonTitle = isLoading
		? ''
		: isConnected
		? buttonText[buttonState.type] + additionalMessage
		: isLowBalance
		? buttonText[ButtonType.LOW_BALANCE]
		: buttonText[ButtonType.CONNECT_WALLET]
	const classes = Number(from.amount) && isLowBalance && !isLoading ? classNames[buttonStyleClass[ButtonType.LOW_BALANCE]] : classNames[buttonStyleClass[buttonState.type]]

	return (
		<Button size="lg" leftIcon={leftIconComponent} isDisabled={isDisabled} isLoading={isLoading} onClick={onClick} className={`${classNames.swapButton} ${classes}`}>
			{buttonTitle}
		</Button>
	)
}
