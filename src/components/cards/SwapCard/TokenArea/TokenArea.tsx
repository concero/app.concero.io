import { type FC, useContext, useEffect, useRef } from 'react'
import { animated, useSpring } from '@react-spring/web'
import { IconChevronDown } from '@tabler/icons-react'
import classNames from '../SwapCard.module.pcss'
import { Button } from '../../../buttons/Button/Button'
import { numberToFormatString } from '../../../../utils/formatting'
import { CryptoSymbol } from '../../../tags/CryptoSymbol/CryptoSymbol'
import { TextInput } from '../../../input/TextInput'
import { type TokenAreaProps } from './types'
import { handleAmountChange, handleAreaClick } from './handlers'
import { useTokenAreaReducer } from './tokenAreaReducer'
import { isFloatInput } from '../../../../utils/validation'
import { getCurrentPriceToken } from './getCurrentPriceToken'
import { DataContext } from '../../../../hooks/DataContext/DataContext'
import { ListModal } from '../../../modals/ListModal/ListModal'
import { ListEntityButton } from '../../../buttons/ListEntityButton/ListEntityButton'
import { useTranslation } from 'react-i18next'

export const TokenArea: FC<TokenAreaProps> = ({ direction, selection, swapDispatch, balance = null, chains }) => {
	const { getTokens, getChains } = useContext(DataContext)
	const [state, tokenAreaDispatch] = useTokenAreaReducer(direction, selection)
	const inputRef = useRef()
	const { t } = useTranslation()

	const shakeProps = useSpring({
		from: { transform: 'translateX(0)' },
		to: [{ transform: 'translateX(-5px)' }, { transform: 'translateX(5px)' }, { transform: 'translateX(0px)' }],
		config: { duration: 50, mass: 1, tension: 500, friction: 10 },
		reset: false,
		onRest: () => state.shake && tokenAreaDispatch({ type: 'SET_SHAKE', payload: false }),
	})

	const onChangeText = value => {
		if (value && !isFloatInput(value)) tokenAreaDispatch({ type: 'SET_SHAKE', payload: true })
		if (direction === 'from') handleAmountChange({ value, state, dispatch: swapDispatch, direction })
	}

	const handleSelectChain = async chain => {
		const tokens = await getTokens({ chainId: chain.id, offset: 0, limit: 15 })
		swapDispatch({ type: 'SET_CHAIN', direction, payload: { chain }, tokens })
		tokenAreaDispatch({ type: 'SET_SHOW_CHAINS_MODAL', payload: false })
	}

	function handleMaxButtonClick() {
		if (!balance) return
		const { amount } = balance
		if (!Number(amount.formatted)) return
		handleAmountChange({ value: amount.formatted, state, dispatch: swapDispatch, direction: 'from' })
	}

	const handleSelectToken = token => {
		swapDispatch({ type: 'SET_TOKEN', direction, payload: { token } })
		tokenAreaDispatch({ type: 'SET_SHOW_TOKENS_MODAL', payload: false })
	}

	useEffect(() => {
		if (direction === 'from') getCurrentPriceToken(selection, tokenAreaDispatch)
	}, [selection.chain, selection.token])

	useEffect(() => {
		if (selection.amount) handleAmountChange({ value: selection.amount, state, dispatch: swapDispatch, direction })
	}, [state.currentTokenPriceUSD])

	return (
		<>
			<animated.div
				className={`${classNames.tokenContainer} ${state.isFocused ? classNames.inputFocused : ''}`}
				onClick={() => {
					handleAreaClick({ inputRef })
				}}
				style={state.shake ? shakeProps : {}}
			>
				<div className={classNames.tokenRow}>
					<div className={classNames.tokenRowHeader}>
						<p>{t(`tokenArea.${direction}`)}</p>
						<Button
							onClick={() => tokenAreaDispatch({ type: 'SET_SHOW_CHAINS_MODAL', payload: true })}
							size="sm"
							variant="black"
							rightIcon={<IconChevronDown size={16} color={'var(--color-text-secondary)'} />}
						>
							<CryptoSymbol src={selection.chain.logoURI} symbol={selection.chain.name} />
						</Button>
					</div>
					{balance !== null ? (
						<Button variant={'subtle'} size={'sm'} onClick={handleMaxButtonClick}>
							<p>{`Max: ${balance.amount.rounded} ${balance.symbol}`}</p>
						</Button>
					) : null}
				</div>
				<div className={classNames.tokenRow}>
					<div>
						<TextInput
							ref={inputRef}
							onFocus={() => tokenAreaDispatch({ type: 'SET_IS_FOCUSED', payload: true })}
							onBlur={() => tokenAreaDispatch({ type: 'SET_IS_FOCUSED', payload: false })}
							variant="inline"
							placeholder={`0.0 ${selection.token.symbol}`}
							value={selection.amount}
							onChangeText={value => {
								onChangeText(value)
							}}
							isDisabled={direction === 'to'}
						/>
						<h5>{`$${numberToFormatString(Number(selection.amount_usd), 2)}`}</h5>
					</div>
					<Button
						onClick={() => tokenAreaDispatch({ type: 'SET_SHOW_TOKENS_MODAL', payload: true })}
						size="sm"
						variant="black"
						rightIcon={<IconChevronDown size={16} color={'var(--color-text-secondary)'} />}
					>
						<CryptoSymbol src={selection.token.logoURI} symbol={selection.token.symbol} />
					</Button>
				</div>
			</animated.div>
			{/* <EntityListModal */}
			{/*  title="Select chain" */}
			{/*  data={chains} */}
			{/*  columns={ChainColumns} */}
			{/*  show={state.showChainsModal} */}
			{/*  entitiesVisible={15} */}
			{/*  setShow={(value) => tokenAreaDispatch({ type: 'SET_SHOW_CHAINS_MODAL', payload: value })} */}
			{/*  onSelect={handleSelectChain} */}
			{/* /> */}
			<ListModal
				title={t('modal.selectToken')}
				isOpen={state.showTokensModal}
				setIsOpen={value => tokenAreaDispatch({ type: 'SET_SHOW_TOKENS_MODAL', payload: value })}
				onSelect={token => {
					handleSelectToken(token)
				}}
				getItems={async ({ offset, limit, search }) => await getTokens({ chainId: selection.chain.id, offset, limit, search })}
				RenderItem={ListEntityButton}
			/>
			<ListModal
				title={t('modal.selectChain')}
				isOpen={state.showChainsModal}
				setIsOpen={value => tokenAreaDispatch({ type: 'SET_SHOW_CHAINS_MODAL', payload: value })}
				onSelect={async chain => {
					await handleSelectChain(chain)
				}}
				getItems={async ({ offset, limit, search }) => await getChains({ offset, limit, search })}
				RenderItem={ListEntityButton}
			/>
		</>
	)
}
