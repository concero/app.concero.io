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
	isTestnet: boolean
}

export function AmountUsd({ state, balance, selection, direction, handleMaxButtonClick }: AmountUsdProps) {
	const { t } = useTranslation()

	const maxButton = (
		<h4 className={classNames.maxButton} onMouseDown={handleMaxButtonClick}>
			Max: {balance?.amount.rounded}
		</h4>
	)

	const enterAmountField = <h4>{t('tokenArea.enterAmount')}</h4>

	const amountUsd = (
		<h4>{`$${numberToFormatString((selection.token.priceUsd ?? 0) * Number(selection.amount), 2)}`}</h4>
	)

	if (direction === 'from') {
		return (
			<div className={classNames.amountUsdContainer}>
				{state.isFocused && !selection.amount && balance
					? maxButton
					: !state.isFocused && selection.amount === ''
						? enterAmountField
						: amountUsd}
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
