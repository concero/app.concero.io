import { FC } from 'react'
import classNames from './SwapButton.module.pcss'
import { Button } from '../Button/Button'
import { SwapButtonProps } from './types'
import { buttonStyleClass, buttonText, iconComponent, isButtonDisabled } from './constants'
import { getButtonType } from './getButtonType'

export const SwapButton: FC<SwapButtonProps> = ({ swapState, isConnected, onClick }) => {
	const { isLoading } = swapState
	const buttonType = getButtonType(swapState, isConnected)

	return (
		<Button
			size="lg"
			leftIcon={iconComponent[buttonType]}
			isDisabled={isButtonDisabled[buttonType]}
			isLoading={isLoading}
			onClick={onClick}
			className={`${classNames.swapButton} ${classNames[buttonStyleClass[buttonType]]}`}
		>
			{buttonText[buttonType]}
		</Button>
	)
}
