import { FC } from 'react'
import classNames from './SwapButton.module.pcss'
import { Button } from '../Button/Button'
import { SwapButtonProps } from './types'
import { buttonStyleClass, buttonText, ButtonType, iconComponent, isButtonDisabled } from './constants'
import { getButtonType } from './getButtonType'
import { getInsufficientFeeChaiSymbols } from './checkInsufficientBalances'

export const SwapButton: FC<SwapButtonProps> = ({ swapState, isConnected, onClick }) => {
	const { isLoading } = swapState
	const insufficientFeeChainSymbols = getInsufficientFeeChaiSymbols(swapState)
	const buttonType = getButtonType(swapState, isConnected, insufficientFeeChainSymbols)
	const buttonTitle = buttonType === ButtonType.LOW_FEES ? buttonText[buttonType] + ' ' + insufficientFeeChainSymbols : buttonText[buttonType]

	return (
		<Button
			size="lg"
			leftIcon={iconComponent[buttonType]}
			isDisabled={isButtonDisabled[buttonType]}
			isLoading={isLoading}
			onClick={onClick}
			className={`${classNames.swapButton} ${classNames[buttonStyleClass[buttonType]]}`}
		>
			{buttonTitle}
		</Button>
	)
}
