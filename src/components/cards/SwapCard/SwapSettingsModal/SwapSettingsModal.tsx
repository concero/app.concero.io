import { FC } from 'react'
import { Modal } from '../../../modals/Modal/Modal'
import { TextInput } from '../../../input/TextInput'
import { isFloatInput } from '../../../../utils/validation'

export interface SwapSettingsModalProps {}

export const SwapSettingsModal: FC<SwapSettingsModalProps> = ({ show, setShow, settings, swapDispatch }) => {
  function handleAmountChange(value) {
    if (!isFloatInput(value)) return
    swapDispatch({
      type: 'SET_SETTINGS',
      payload: {
        slippage_percent: value,
      },
    })
  }

  return (
    <Modal title="Swap Settings" show={show} setShow={setShow}>
      <p className="body1" style={{ marginBottom: 'var(--sp-sm)' }}>
        Slippage tolerance
      </p>
      <TextInput
        placeholder="Enter slippage percent"
        onChangeText={(value) => handleAmountChange(value)}
        value={settings.slippage_percent}
        iconName="Percentage"
      />
    </Modal>
  )
}
