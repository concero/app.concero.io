import { numberToFormatString } from '../../../../utils/formatting'
import type { TokenAreaState } from './useTokenAreaReducer/types'
import { type Balance, type SwapStateDirection } from '../swapReducer/types'
import { useTranslation } from 'react-i18next'
import classNames from './TokenArea.module.pcss'

interface AmountUsdProps {
	state: TokenAreaState
	balance: Balance | null
	selection: SwapStateDirection
	direction: 'from' | 'to'
	handleMaxButtonClick: () => void
}

export function AmountUsd({ state, balance, selection, direction, handleMaxButtonClick }: AmountUsdProps) {
	const { t } = useTranslation()

	if (direction === 'from') {
		return (
			<div className={classNames.amountUsdContainer}>
				{state.isFocused && !selection.amount && balance ? (
					<h4 className={classNames.maxButton} onMouseDown={handleMaxButtonClick}>
						Max: {balance?.amount.rounded}
					</h4>
				) : !state.isFocused && selection.amount === '' ? (
					<h4>{t('tokenArea.enterAmount')}</h4>
				) : (
					<h4>{`$${numberToFormatString(Number(selection.amount_usd), 2)}`}</h4>
				)}
			</div>
		)
	} else {
		return (
			<div className={classNames.amountUsdContainer}>
				<h4>{`$${numberToFormatString(Number(selection.amount_usd), 2)}`}</h4>
			</div>
		)
	}
}
