import { Dispatch } from 'react'
import { IconPercentage } from '@tabler/icons-react'
import { Modal } from '../../../../modals/Modal/Modal'
import classNames from './ApyModal.module.pcss'
import { TextInput } from '../../../../input/TextInput'
import { isFloatInput } from '../../../../../utils/validation'

interface ApyModalProps {
  isOpen: boolean
  onClose: () => void
  stakingState: {
    filter: {
      apy: string
    }
  }
  dispatch: Dispatch<any>
}

export const ApyModal: FC<ApyModalProps> = ({ isOpen, onClose, stakingState, dispatch }) => {
  const handleChangeText = (value) => {
    if (value && !isFloatInput(value)) return
    dispatch({ type: 'SET_FILTER', payload: { filter: 'apy', value } })
  }

  return (
    <Modal show={isOpen} setShow={onClose} title={'APY'}>
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
