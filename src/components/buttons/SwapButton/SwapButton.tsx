import { type FC } from 'react'
import classNames from './SwapButton.module.pcss'
import { Button } from '../Button/Button'
import { type SwapButtonProps } from './types'
import { buttonStyleClass, buttonText, ButtonType, iconComponent, isButtonDisabled } from './constants'
import { getButtonType } from './getButtonType'
import { useTranslation } from 'react-i18next'
import { IconGasStation } from '@tabler/icons-react'
import { useGasSufficiency } from './useGasSufficiency'

export const SwapButton: FC<SwapButtonProps> = ({ swapState, isConnected, onClick }) => {
	const { isLoading } = swapState
	const { isLoading: isFetchBalancesLoading, gasSufficiency } = useGasSufficiency(swapState)
	const buttonType = getButtonType(swapState, isConnected, gasSufficiency?.isInsufficient ?? false)
	const { t } = useTranslation()

	return (
		<div className={classNames.container}>
			{buttonType === ButtonType.LOW_GAS && gasSufficiency ? (
				<div className={classNames.messageContainer}>
					<div className={classNames.titleContainer}>
						<IconGasStation size={17} color="var(--color-red-450)" />
						<p className={'body1'}>{t('button.lowGas')}</p>
					</div>
					<p className={'body1'}>
						{t('swapCard.message.lowGas', {
							amount: gasSufficiency.insufficientAmount,
							tokenSymbol: gasSufficiency.token?.symbol ?? '',
							chainName: gasSufficiency.chain?.name ?? '',
						})}
					</p>
				</div>
			) : (
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
			)}
		</div>
	)
}
