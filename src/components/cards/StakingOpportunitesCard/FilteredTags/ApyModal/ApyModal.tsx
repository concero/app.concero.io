import { Dispatch, FC } from 'react'
import { IconPercentage } from '@tabler/icons-react'
import { Modal } from '../../../../modals/Modal/Modal'
import classNames from './ApyModal.module.pcss'
import { TextInput } from '../../../../input/TextInput'
import { isFloatInput } from '../../../../../utils/validation'
import { FilterCategory, StakingAction, StakingState } from '../../../../screens/StakingScreen/stakingReducer/types'

interface ApyModalProps {
  isOpen: boolean
  onClose: () => void
  stakingState: StakingState
  stakingDispatch: Dispatch<StakingAction>
}

export const ApyModal: FC<ApyModalProps> = ({ isOpen, onClose, stakingState, stakingDispatch }) => {
  const handleChangeText = (value) => {
    if (value && !isFloatInput(value)) return
    stakingDispatch({ type: 'SET_FILTER', payload: { filter: FilterCategory.apy, value } })
  }

  return (
    <Modal show={isOpen} setShow={onClose} title="APY">
      <div className={classNames.container}>
        <TextInput
          placeholder="Enter APY"
          onChangeText={(value) => handleChangeText(value)}
          value={stakingState.filter.apy}
          icon={<IconPercentage size={18} color="var(--color-text-secondary)" />}
        />
      </div>
    </Modal>
  )
}
