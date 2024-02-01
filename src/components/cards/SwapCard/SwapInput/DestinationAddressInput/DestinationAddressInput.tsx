import classNames from './DestinationAddressInput.module.pcss'
import { type ChangeEvent, type Dispatch, useRef } from 'react'
import { type SwapAction, type SwapState } from '../../swapReducer/types'
import { TextInput } from '../../../../input/TextInput'
import { useTranslation } from 'react-i18next'
import { IconCheck, IconX } from '@tabler/icons-react'

interface DestinationAddressInputProps {
	swapState: SwapState
	swapDispatch: Dispatch<SwapAction>
}

export function DestinationAddressInput({ swapState, swapDispatch }: DestinationAddressInputProps) {
	const { t } = useTranslation()
	const inputRef = useRef<HTMLInputElement | null>(null)

	const checkAddress = (address: string) => {
		const regex = /^(0x)[0-9A-Fa-f]{40}$/
		return regex.test(address)
	}

	return (
		<div
			className={`card ${classNames.container}`}
			onClick={() => {
				if (inputRef.current) inputRef.current.focus()
			}}
		>
			<p className={`body2`}>{t('swapCard.sendToAddress')}</p>
			<div className={classNames.rowContainer}>
				<TextInput
					ref={inputRef}
					variant={'inline'}
					value={swapState.to.address}
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						swapDispatch({ type: 'SET_TO_ADDRESS', payload: event.target.value })
					}}
					className={classNames.input}
				/>
				{checkAddress(swapState.to.address) ? (
					<IconCheck size={18} color={'var(--color-green-400)'} />
				) : (
					<IconX size={18} color={'var(--color-red-400)'} />
				)}
			</div>
		</div>
	)
}
