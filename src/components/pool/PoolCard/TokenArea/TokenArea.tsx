import { type FC, type ForwardedRef, useEffect, useRef, useState } from 'react'
import classNames from './TokenArea.module.pcss'
import { type TokenAreaProps } from './types'
import { handleAmountChange, handleAreaClick } from './handlers'
import { useTokenAreaReducer } from './useTokenAreaReducer/tokenAreaReducer'
import { isFloatInput } from '../../../../utils/validation'
import { useTranslation } from 'react-i18next'
import { AmountUsd } from './AmountUsd'
import { config } from '../../../../constants/config'
import { Badge } from '../../../layout/Badge/Badge'
import { SelectTokenShape } from './SelectTokenShape/SelectTokenShape'
import { InputError } from '../SwapInput/InputError/InputError'
import { ErrorCategory, errorTextMap, errorTypeMap } from '../SwapButton/constants'
import { getBalance } from '../../../../utils/getBalance'
import { useAccount } from 'wagmi'
import { TextInput } from '../../../input/TextInput'

export const TokenArea: FC<TokenAreaProps> = ({ direction, selection, swapDispatch, balance = null, stage, error }) => {
	const [loading, setLoading] = useState(false)
	const [state, tokenAreaDispatch] = useTokenAreaReducer()
	const { address } = useAccount()
	const inputRef = useRef<ForwardedRef<HTMLInputElement>>()
	const { t } = useTranslation()

	const isTransactionError = error ? errorTypeMap[error] === ErrorCategory.input : false
	const isError = error && isTransactionError

	const onChangeText = (value: string) => {
		swapDispatch({ type: 'SET_INPUT_ERROR', payload: null })

		if (value && !isFloatInput(value)) tokenAreaDispatch({ type: 'SET_SHAKE', payload: true })
		if (direction === 'from') handleAmountChange({ value, state, dispatch: swapDispatch, direction })
	}

	const handleMaxButtonClick = () => {
		if (!balance) return
		const { amount } = balance
		if (!Number(amount.formatted)) return

		handleAmountChange({ value: amount.formatted, state, dispatch: swapDispatch, direction: 'from' })
	}

	useEffect(() => {
		if (direction === 'to') return
		setLoading(true)

		getBalance({ dispatch: swapDispatch, from: selection, address }).finally(() => {
			setLoading(false)
		})
	}, [selection.token.address, selection.chain.id, selection.amount, address])

	return (
		<div
			className={classNames.tokenContainer}
			onClick={() => {
				handleAreaClick(inputRef, stage)
			}}
		>
			<p className={`body2 ${classNames.tokenRowHeader}`}>{t(`tokenArea.${direction}`)}</p>

			<div className={classNames.tokenRow}>
				<TextInput
					wrapperClassName={classNames.input}
					ref={inputRef}
					variant="inline"
					placeholder={'0'}
					value={Number(selection.amount) < 0 ? '0' : selection.amount}
					onChangeText={value => {
						onChangeText(value)
					}}
					isDisabled={direction === 'to'}
				/>

				<div className={classNames.selectTokenButton}>
					<Badge
						size="l"
						tokenLogoSrc={selection.token.logoURI}
						chainLogoSrc={`${config.CONCERO_ASSETS_URI}/icons/chains/filled/${selection.chain.id}.svg`}
					/>
					<SelectTokenShape symbol={selection.token.symbol} chainName={selection.chain.name} />
				</div>
			</div>

			<AmountUsd
				loading={loading}
				state={state}
				balance={balance}
				selection={selection}
				direction={direction}
				handleMaxButtonClick={handleMaxButtonClick}
			/>

			{isError && direction === 'from' && (
				<InputError color="var(--color-danger-700)" errorText={errorTextMap[error]} />
			)}
		</div>
	)
}
