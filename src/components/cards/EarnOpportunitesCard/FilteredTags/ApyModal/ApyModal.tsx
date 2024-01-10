import { type Dispatch, type FC } from 'react'
import { IconPercentage } from '@tabler/icons-react'
import { Modal } from '../../../../modals/Modal/Modal'
import classNames from './ApyModal.module.pcss'
import { TextInput } from '../../../../input/TextInput'
import { isFloatInput } from '../../../../../utils/validation'
import { type EarnAction, type EarnState, FilterCategory } from '../../../../screens/EarnScreen/earnReducer/types'

interface ApyModalProps {
	isOpen: boolean
	onClose: () => void
	earnState: EarnState
	earnDispatch: Dispatch<EarnAction>
}

export const ApyModal: FC<ApyModalProps> = ({ isOpen, onClose, earnState, earnDispatch }) => {
	const handleChangeText = value => {
		if (value && !isFloatInput(value)) return
		earnDispatch({ type: 'SET_FILTER', payload: { filter: FilterCategory.apy, value } })
	}

	return (
		<Modal show={isOpen} setShow={onClose} title="APY">
			<div className={classNames.container}>
				<TextInput
					placeholder="Enter APY"
					onChangeText={value => {
						handleChangeText(value)
					}}
					value={earnState.filter.apy}
					icon={<IconPercentage size={18} color="var(--color-text-secondary)" />}
				/>
			</div>
		</Modal>
	)
}
