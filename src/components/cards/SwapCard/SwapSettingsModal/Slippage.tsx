import classNames from './SwapSettingsModal.module.pcss'
import { TextInput } from '../../../input/TextInput'
import { Button } from '../../../buttons/Button/Button'
import { isFloatInput } from '../../../../utils/validation'
import { type Settings, type SwapAction } from '../swapReducer/types'
import { type Dispatch } from 'react'
import { useTranslation } from 'react-i18next'

interface SlippageProps {
	settings: Settings
	swapDispatch: Dispatch<SwapAction>
}

const getButtonVarint = (slippage_percent: string, value: string) => {
	if (value === 'custom') {
		if (slippage_percent === '2' || slippage_percent === '3' || slippage_percent === '5') {
			return 'subtle'
		} else {
			return 'secondary'
		}
	}

	if (slippage_percent === value) {
		return 'secondary'
	} else {
		return 'subtle'
	}
}

export function Slippage({ settings, swapDispatch }: SlippageProps) {
	const { slippage_percent } = settings
	const { t } = useTranslation()

	function handleAmountChange(value: string) {
		if (value && !isFloatInput(value)) return
		swapDispatch({ type: 'SET_SETTINGS', payload: { slippage_percent: value } })
	}

	return (
		<div className={`card ${classNames.cardContainer}`}>
			<div className={classNames.inputContainer}>
				<p className="body1" style={{ marginBottom: 'var(--sp-sm)' }}>
					{t('swapCard.settings.slippage')}
				</p>
				<TextInput
					onChangeText={(value: string) => {
						handleAmountChange(value)
					}}
					value={slippage_percent}
					type="number"
					variant={'inline'}
					className={classNames.input}
				/>
			</div>
			<div className={classNames.rowContainer}>
				<Button
					size={'sm'}
					variant={getButtonVarint(slippage_percent, '2')}
					onClick={() => {
						swapDispatch({
							type: 'SET_SETTINGS',
							payload: { slippage_percent: '2' },
						})
					}}
				>
					2%
				</Button>
				<Button
					size={'sm'}
					variant={getButtonVarint(slippage_percent, '3')}
					onClick={() => {
						swapDispatch({
							type: 'SET_SETTINGS',
							payload: { slippage_percent: '3' },
						})
					}}
				>
					3%
				</Button>
				<Button
					size={'sm'}
					variant={getButtonVarint(slippage_percent, '5')}
					onClick={() => {
						swapDispatch({
							type: 'SET_SETTINGS',
							payload: { slippage_percent: '5' },
						})
					}}
				>
					5%
				</Button>
				<Button
					size={'sm'}
					variant={getButtonVarint(slippage_percent, 'custom')}
					onClick={() => {
						swapDispatch({
							type: 'SET_SETTINGS',
							payload: { slippage_percent: '' },
						})
					}}
				>
					{t('swapCard.settings.custom')}
				</Button>
			</div>
		</div>
	)
}
