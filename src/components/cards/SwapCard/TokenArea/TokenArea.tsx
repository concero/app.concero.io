import { type FC, type ForwardedRef, useRef } from 'react'
import { animated, useSpring } from '@react-spring/web'
import classNames from './TokenArea.module.pcss'
import { Button } from '../../../buttons/Button/Button'
import { TextInput } from '../../../input/TextInput'
import { type TokenAreaProps } from './types'
import { handleAmountChange, handleAreaClick } from './handlers'
import { useTokenAreaReducer } from './useTokenAreaReducer/tokenAreaReducer'
import { isFloatInput } from '../../../../utils/validation'
import { useTranslation } from 'react-i18next'
import { TokensModal } from '../../../modals/TokensModal/TokensModal'
import { TokenIcon } from '../../../layout/TokenIcon/TokenIcon'
import { AmountInputSkeleton } from './AmountInputSkleton/AmountInputSkeleton'
import { type Chain } from '../../../../api/concero/types'
import { AmountUsd } from './AmountUsd'
import { config } from '../../../../constants/config'
import { SwapCardStage } from '../swapReducer/types'
import { testnetToMainnetChainsMap } from '../../../../constants/testnetToMainnetChainsMap'

export const TokenArea: FC<TokenAreaProps> = ({
	direction,
	selection,
	swapDispatch,
	balance = null,
	isLoading = false,
	stage,
	isTestnet,
}) => {
	const [state, tokenAreaDispatch] = useTokenAreaReducer()
	const inputRef = useRef<ForwardedRef<HTMLInputElement>>()
	const { t } = useTranslation()
	const styleClass = direction === 'from' ? classNames.from : classNames.to

	const shakeProps = useSpring({
		from: { transform: 'translateX(0)' },
		to: [{ transform: 'translateX(-5px)' }, { transform: 'translateX(5px)' }, { transform: 'translateX(0px)' }],
		config: { duration: 50, mass: 1, tension: 500, friction: 10 },
		reset: false,
		onRest: () => {
			state.shake && tokenAreaDispatch({ type: 'SET_SHAKE', payload: false })
		},
	})

	const onChangeText = (value: string) => {
		if (value && !isFloatInput(value)) tokenAreaDispatch({ type: 'SET_SHAKE', payload: true })
		if (direction === 'from') handleAmountChange({ value, state, dispatch: swapDispatch, direction })
	}

	const handleMaxButtonClick = () => {
		if (!balance) return
		const { amount } = balance
		if (!Number(amount.formatted)) return
		handleAmountChange({ value: amount.formatted, state, dispatch: swapDispatch, direction: 'from' })
	}

	const handleSelectToken = (token: Token, chain: Chain) => {
		swapDispatch({ type: 'SET_CHAIN', direction, payload: { chain } })
		swapDispatch({ type: 'SET_TOKEN', direction, payload: { token } })
		tokenAreaDispatch({ type: 'SET_SHOW_TOKENS_MODAL', payload: false })
	}

	// useEffect(() => {
	// 	if (direction === 'from') void getCurrentPriceToken(selection, tokenAreaDispatch)
	// }, [selection.chain, selection.token])

	// useEffect(() => {
	// 	if (selection.amount) {
	// 		handleAmountChange({ value: selection.amount, state, dispatch: swapDispatch, direction })
	// 	}
	// }, [state.currentTokenPriceUSD])

	return (
		<>
			<animated.div
				className={`${classNames.tokenContainer} ${styleClass} ${
					stage === SwapCardStage.review ? classNames.transparentTokenArea : ''
				}`}
				onClick={() => {
					handleAreaClick(inputRef, stage)
				}}
				style={state.shake ? shakeProps : {}}
			>
				<div className={classNames.tokenRow}>
					<div className={classNames.tokenRowHeader}>
						<p className={`body2`}>{t(`tokenArea.${direction}`)}</p>
					</div>
				</div>
				<div className={classNames.tokenRow}>
					{isLoading ? (
						<AmountInputSkeleton />
					) : (
						<div>
							<TextInput
								ref={inputRef}
								onFocus={() => {
									tokenAreaDispatch({ type: 'SET_IS_FOCUSED', payload: true })
								}}
								onBlur={() => {
									tokenAreaDispatch({ type: 'SET_IS_FOCUSED', payload: false })
								}}
								variant="inline"
								placeholder={'0'}
								value={selection.amount}
								onChangeText={value => {
									onChangeText(value)
								}}
								isDisabled={direction === 'to'}
								className={classNames.input}
							/>
							<AmountUsd
								state={state}
								balance={balance}
								selection={selection}
								direction={direction}
								handleMaxButtonClick={handleMaxButtonClick}
							/>
						</div>
					)}
					<Button
						variant={'convex'}
						className={classNames.selectTokenButton}
						isDisabled={stage === SwapCardStage.review}
						onClick={e => {
							e.stopPropagation()
							tokenAreaDispatch({ type: 'SET_SHOW_TOKENS_MODAL', payload: true })
						}}
					>
						<TokenIcon
							tokenLogoSrc={selection.token.logoURI}
							chainLogoSrc={`${config.CONCERO_ASSETS_URI}/icons/chains/filled/${isTestnet ? testnetToMainnetChainsMap[selection.chain.id] : selection.chain.id}.svg`}
						/>
						<div className={classNames.selectTokenButtonTitle}>
							<h4>{selection.token.symbol}</h4>
							<p className={'body2'}>{selection.chain.name}</p>
						</div>
					</Button>
				</div>
			</animated.div>
			<TokensModal
				isOpen={state.showTokensModal}
				direction={direction}
				onClose={() => {
					tokenAreaDispatch({ type: 'SET_SHOW_TOKENS_MODAL', payload: false })
				}}
				onSelect={handleSelectToken}
				isTestnet={isTestnet}
			/>
		</>
	)
}
