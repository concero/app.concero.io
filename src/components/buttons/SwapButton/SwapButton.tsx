import { type FC } from 'react'
import classNames from './SwapButton.module.pcss'
import { Button } from '../Button/Button'
import { type SwapButtonProps } from './types'
import { buttonStyleClass, buttonText, iconComponent, isButtonDisabled } from './constants'
import { getButtonType } from './getButtonType'
import { useTranslation } from 'react-i18next'

export const SwapButton: FC<SwapButtonProps> = ({ swapState, isConnected, onClick }) => {
	const { isLoading } = swapState
	const buttonType = getButtonType(swapState, isConnected)
	const { t } = useTranslation()

	return (
		<Button
			size="lg"
			leftIcon={iconComponent[buttonType]}
			isDisabled={isButtonDisabled[buttonType]}
			isLoading={isLoading}
			onClick={onClick}
			className={`${classNames.swapButton} ${classNames[buttonStyleClass[buttonType]]}`}
		>
			{t(buttonText[buttonType])}
		</Button>
	)
}
