import { Modal } from '../../../modals/Modal/Modal'
import { StakingState } from '../../../screens/StakingScreen/stakingReducer/types'
import classNames from './ManageModal.module.pcss'
import { SelectArea } from './SelectArea/SelectArea'
import { useManageReducer } from './useManageReducer/useManageReducer'
import { ModalType } from './constants'
import { InnerSelectModal } from './InnerSelectModal'
import { ListEntityButton } from '../../../buttons/ListEntityButton/ListEntityButton'
import { useContext } from 'react'
import { DataContext } from '../../../../hooks/DataContext/DataContext'

interface ManageModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  stakingState: StakingState
}

export function ManageModal({ isOpen, setIsOpen, stakingState }: ManageModalProps) {
  const [manageState, manageDispatch] = useManageReducer()
  const { getChains, getTokens } = useContext(DataContext)
  const { modalType } = manageState

  return (
    <Modal title={'Manage position'} show={isOpen} setShow={setIsOpen}>
      <div className={classNames.container}>
        {modalType === ModalType.input ? (
          <SelectArea selection={manageState.from} direction={'from'} dispatch={manageDispatch} />
        ) : (
          <InnerSelectModal RenderItem={ListEntityButton} getItems={getChains} />
        )}
      </div>
    </Modal>
  )
}
