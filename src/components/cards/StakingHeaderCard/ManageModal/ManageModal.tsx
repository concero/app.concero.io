import { useContext } from 'react'
import { IconCornerDownRight } from '@tabler/icons-react'
import { Modal } from '../../../modals/Modal/Modal'
import { StakingState } from '../../../screens/StakingScreen/stakingReducer/types'
import classNames from './ManageModal.module.pcss'
import { SelectArea } from './SelectArea/SelectArea'
import { useManageReducer } from './useManageReducer/useManageReducer'
import { ModalType } from './constants'
import { InnerSelectModal } from './InnerSelectModal/InnerSelectModal'
import { ListEntityButton } from '../../../buttons/ListEntityButton/ListEntityButton'
import { DataContext } from '../../../../hooks/DataContext/DataContext'
import { Button } from '../../../buttons/Button/Button'

interface ManageModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  stakingState: StakingState
}

export function ManageModal({ isOpen, setIsOpen, stakingState }: ManageModalProps) {
  const { getChains, getTokens } = useContext(DataContext)
  const [manageState, manageDispatch] = useManageReducer()

  const { modalType } = manageState

  function handleSelectChain(item: any) {
    manageDispatch({ type: 'SET_CHAIN', payload: item, direction: manageState.direction })
    manageDispatch({ type: 'SET_MODAL_TYPE', payload: ModalType.input })
  }

  function handleSelectToken(item: any) {
    manageDispatch({ type: 'SET_TOKEN', payload: item, direction: manageState.direction })
    manageDispatch({ type: 'SET_MODAL_TYPE', payload: ModalType.input })
  }

  return (
    <Modal title={'Manage position'} show={isOpen} setShow={setIsOpen}>
      <div className={classNames.container}>
        {modalType === ModalType.input ? (
          <div className={classNames.areaContainer}>
            <SelectArea selection={manageState.from} direction={'from'} dispatch={manageDispatch} />
            <SelectArea selection={manageState.to} direction={'to'} dispatch={manageDispatch} />
            <Button leftIcon={<IconCornerDownRight size={18} />} size={'lg'}>
              Stake
            </Button>
          </div>
        ) : modalType === ModalType.chains ? (
          <InnerSelectModal RenderItem={ListEntityButton} getItems={getChains} onSelect={handleSelectChain} />
        ) : (
          <InnerSelectModal RenderItem={ListEntityButton} getItems={getTokens} onSelect={handleSelectToken} />
        )}
      </div>
    </Modal>
  )
}
