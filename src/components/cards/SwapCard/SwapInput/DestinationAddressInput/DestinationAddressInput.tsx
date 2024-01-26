import classNames from './DestinationAddressInput.module.pcss'
import { type Dispatch } from 'react'
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

	const checkAddress = (address: string) => {
		const regex = /^(0x)[0-9A-Fa-f]{40}$/
		return regex.test(address)
	}

	return (
		<div className={`card ${classNames.container}`}>
			<p className={`body2`}>{t('swapCard.sendToAddress')}</p>
			<div className={classNames.rowContainer}>
				<TextInput
					variant={'inline'}
					value={swapState.to.address}
					onChangeText={(address: string) => {
						swapDispatch({ type: 'SET_TO_ADDRESS', payload: address })
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
