import { type FC } from 'react'
import classNames from './SwapButton.module.pcss'
import { type SwapButtonProps } from './types'
import { buttonStyleClass, buttonText, ButtonType, iconComponent, isButtonDisabled } from './constants'
import { getButtonType } from './getButtonType'
import { useTranslation } from 'react-i18next'
import { useGasSufficiency } from './useGasSufficiency'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { Button } from '../../../buttons/Button/Button'

export const PoolButton: FC<SwapButtonProps> = ({ swapState, isConnected, onClick }) => {
	const { isLoading } = swapState
	const { isLoading: isFetchBalancesLoading, gasSufficiency } = useGasSufficiency(swapState)
	const { open } = useWeb3Modal()
	const { t } = useTranslation()
	const buttonType = getButtonType(
		swapState,
		isConnected,
		gasSufficiency?.isInsufficient ?? false,
		isFetchBalancesLoading,
	)

	return (
		<div className={classNames.container}>
			<Button
				size="lg"
				variant="secondary"
				leftIcon={iconComponent[buttonType]}
				isDisabled={isButtonDisabled[buttonType]}
				isLoading={isLoading}
				onClick={buttonType === ButtonType.CONNECT_WALLET_BRIGHT ? open : onClick}
				className={`${classNames.swapButton} ${classNames[buttonStyleClass[buttonType]]}`}
			>
				{t(buttonText[buttonType])}
			</Button>
		</div>
	)
}
