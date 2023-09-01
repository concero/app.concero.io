import { FC } from 'react'
import { Modal } from '../../../modals/Modal/Modal'

export interface SwapSettingsModalProps {}

export const SwapSettingsModal: FC<SwapSettingsModalProps> = ({ show, setShow }) => (
  <Modal title="Swap Settings" show={show} setShow={setShow}>
    <div>Swap Settings</div>
  </Modal>
)
