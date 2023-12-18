import { Dispatch, useEffect, useRef, useState } from 'react'
import { numberToFormatString } from '../../../../../utils/formatting'
import { Button } from '../../../../buttons/Button/Button'
import { CryptoSymbol } from '../../../../tags/CryptoSymbol/CryptoSymbol'
import { TextInput } from '../../../../input/TextInput'
import classNames from './SelectArea.module.pcss'
import { ModalType, SwapType } from '../constants'
import { isFloatInput } from '../../../../../utils/validation'
import { ManageAction } from '../useEarnReducer/types'
import { getCurrentPriceToken } from './getCurrentPriceToken'
import { IconChevronDown } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

interface SelectAreaProps {
	selection: any
	direction: string
	dispatch: Dispatch<ManageAction>
	balance?: string | null
	swapType: SwapType
}

export function SelectArea({ selection, direction, dispatch, balance = null, swapType }: SelectAreaProps) {
	const inputRef = useRef()
	const [isFocused, setIsFocused] = useState(false)
	const [currentUsdPrice, setCurrentUsdPrice] = useState<number | null>(null)
	const isSelectDisabled = (swapType === SwapType.stake && direction === 'to') || (swapType === SwapType.withdraw && direction === 'from')
	const { t } = useTranslation()

	function setAmountUsd(value: string): void {
		dispatch({ type: 'SET_AMOUNT_USD', amount: currentUsdPrice ? (Number(value) * currentUsdPrice).toString() : null, direction })
	}

	function handleChangeText(value: string) {
		if (value && !isFloatInput(value)) return
		dispatch({ type: 'SET_AMOUNT', amount: value, direction })
		if (swapType === SwapType.withdraw) return
		setAmountUsd(value)
	}

	function handleChainButtonClick() {
		dispatch({ type: 'SET_MODAL_TYPE', payload: ModalType.chains })
	}

	function handleAreaClick(inputRef) {
		if (inputRef.current) inputRef.current.focus()
	}

	useEffect(() => {
		if (isSelectDisabled) {
			setCurrentUsdPrice(null)
			return
		}
		getCurrentPriceToken(selection, setCurrentUsdPrice)
	}, [selection.chain.id, selection.token.address])

	useEffect(() => {
		setAmountUsd(selection.amount)
	}, [currentUsdPrice])

	return (
		<div className={`${classNames.tokenContainer} ${isFocused ? classNames.inputFocused : ''}`} onClick={() => handleAreaClick(inputRef)}>
			<div className={classNames.tokenRow}>
				<div className={classNames.tokenRowHeader}>
					<p>{t(`tokenArea.${direction}`)}</p>
					<Button onClick={handleChainButtonClick} size="sm" variant="black" isDisabled={true}>
						<CryptoSymbol src={selection.chain.logoURI} symbol={selection.chain.name} />
					</Button>
				</div>
				{balance !== null ? <p>{`Max: ${balance}`}</p> : null}
			</div>
			<div className={classNames.tokenRow}>
				<div>
					<TextInput
						ref={inputRef}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						variant="inline"
						placeholder={`0.0 ${selection.token.symbol}`}
						value={selection.amount}
						onChangeText={handleChangeText}
						isDisabled={direction === 'to'}
					/>
					<h5 className={selection.amount_usd === null || selection.amount_usd === undefined ? classNames.invisible : ''}>{`$${numberToFormatString(
						Number(selection.amount_usd),
						2,
					)}`}</h5>
				</div>
				<Button
					onClick={() => dispatch({ type: 'SET_MODAL_TYPE', payload: ModalType.tokens })}
					size="sm"
					variant="black"
					rightIcon={!isSelectDisabled && <IconChevronDown size={16} color={'var(--color-text-secondary)'} />}
					isDisabled={isSelectDisabled}
					// isDisabled={true}
				>
					<CryptoSymbol src={selection.token.logoURI} symbol={selection.token.symbol} />
				</Button>
			</div>
		</div>
	)
}
