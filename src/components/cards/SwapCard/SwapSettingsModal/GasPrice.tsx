import classNames from './SwapSettingsModal.module.pcss'
import { type Dispatch } from 'react'
import { type Settings, type SwapAction } from '../swapReducer/types'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../buttons/Button/Button'

interface GapPriceProps {
	settings: Settings
	swapDispatch: Dispatch<SwapAction>
}

export function GasPrice({ settings, swapDispatch }: GapPriceProps) {
	const { t } = useTranslation()

	return (
		<div className={`card ${classNames.cardContainer}`}>
			<div className={classNames.rowContainer}>
				<p className={'body3'}>{t('swapCard.settings.gasPrice')}</p>
			</div>
			<div className={classNames.rowContainer}>
				<Button>{t('swapCard.settings.gas.slow')}</Button>
				<Button>{t('swapCard.settings.gas.normal')}</Button>
				<Button>{t('swapCard.settings.gas.fast')}</Button>
			</div>
		</div>
	)
}
