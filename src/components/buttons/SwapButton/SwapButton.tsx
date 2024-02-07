import { type FC, useEffect, useState } from 'react'
import classNames from './SwapButton.module.pcss'
import { Button } from '../Button/Button'
import { type SwapButtonProps } from './types'
import { buttonStyleClass, buttonText, iconComponent, isButtonDisabled } from './constants'
import { getButtonType } from './getButtonType'
import { useTranslation } from 'react-i18next'
import { IconGasStation } from '@tabler/icons-react'
import { type GasSufficiency, getGasSufficiency } from './getGasSufficiency'

export const SwapButton: FC<SwapButtonProps> = ({ swapState, isConnected, onClick }) => {
	const [gasSufficiency, setGasSufficiency] = useState<GasSufficiency>(getGasSufficiency(swapState))
	const { isLoading } = swapState
	const buttonType = getButtonType(swapState, isConnected)
	const { t } = useTranslation()

	useEffect(() => {
		if (!swapState.selectedRoute?.id) return
		const res = getGasSufficiency(swapState)
		setGasSufficiency(res)
	}, [swapState.selectedRoute?.id])

	return (
		<div className={classNames.container}>
			{gasSufficiency.isInsufficient ? (
				<div className={classNames.messageContainer}>
					<div className={classNames.titleContainer}>
						<IconGasStation size={17} color="var(--color-red-450)" />
						<p className={'body1'}>{t('button.lowGas')}</p>
					</div>
					<p className={'body1'}>
						{t('swapCard.message.lowGas', {
							amount: gasSufficiency.insufficientAmount?.formatted,
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
