import { useContext, useEffect, useRef } from 'react'
import { Modal } from '../../../modals/Modal/Modal'
import { StakingState } from '../../../screens/StakingScreen/stakingReducer/types'
import classNames from './ManageModal.module.pcss'
import { SelectArea } from './SelectArea/SelectArea'
import { useManageReducer } from './useManageReducer/useManageReducer'
import { ModalType, SwapType } from './constants'
import { InnerSelectModal } from './InnerSelectModal/InnerSelectModal'
import { ListEntityButton } from '../../../buttons/ListEntityButton/ListEntityButton'
import { DataContext } from '../../../../hooks/DataContext/DataContext'
import { Button } from '../../../buttons/Button/Button'
import { Details } from './Details/Details'
import { StakeButton } from '../StakeButton/StakeButton'
import { getQuote } from './getQuote'
import { getBalance } from '../../../../utils/getBalance'

interface ManageModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  stakingState: StakingState
}

export function ManageModal({ isOpen, setIsOpen, stakingState }: ManageModalProps) {
  const { getChains, getTokens } = useContext(DataContext)
  const [manageState, manageDispatch] = useManageReducer(stakingState)
  const { modalType, swapType } = manageState
  const typingTimeoutRef = useRef(null)

  async function handleSelectChain(item: any) {
    const direction = swapType === SwapType.stake ? 'from' : 'to'
    const tokens = await getTokens({ chainId: item.id, offset: 0, limit: 15 })
    manageDispatch({ type: 'SET_CHAIN', payload: item, tokens, direction: direction })
    manageDispatch({ type: 'SET_MODAL_TYPE', payload: ModalType.input })
  }

  function handleSelectToken(item: any) {
    const direction = swapType === SwapType.stake ? 'from' : 'to'
    manageDispatch({ type: 'SET_TOKEN', payload: item, direction: direction })
    manageDispatch({ type: 'SET_MODAL_TYPE', payload: ModalType.input })
  }

  function handleSwitchSwapType() {
    manageDispatch({ type: 'SWITCH_SWAP_TYPE' })
  }

  function close() {
    manageDispatch({ type: 'RESET', payload: stakingState })
    setIsOpen(false)
  }

  useEffect(() => {
    getQuote({ manageState, manageDispatch, typingTimeoutRef })
  }, [manageState.from.amount, manageState.from.chain.id, manageState.to.chain.id, manageState.from.token.address, manageState.to.token.address])

  useEffect(() => {
    getBalance({ dispatch: manageDispatch, from: manageState.from, address: manageState.address })
  }, [manageState.from.chain.id, manageState.from.token.address, manageState.to.token.address])

  useEffect(() => {
    manageDispatch({ type: 'SET_TO_SELECTION', payload: stakingState.selectedVault })
  }, [stakingState.selectedVault])

  return (
    <Modal title={'Manage position'} show={isOpen} setShow={close}>
      <div className={classNames.container}>
        {modalType === ModalType.input ? (
          <div className={classNames.areaContainer}>
            <div className={classNames.row}>
              <Button size={'sm'} variant={swapType === SwapType.stake ? 'primary' : 'subtle'} onClick={handleSwitchSwapType}>
                Stake
              </Button>
              <Button size={'sm'} variant={swapType === SwapType.withdraw ? 'primary' : 'subtle'} onClick={handleSwitchSwapType}>
                Withdraw
              </Button>
            </div>
            <SelectArea selection={manageState.from} direction={'from'} dispatch={manageDispatch} swapType={swapType} balance={manageState.balance} />
            <SelectArea selection={manageState.to} direction={'to'} dispatch={manageDispatch} swapType={swapType} />
            <Details manageState={manageState} />
            <StakeButton manageState={manageState} manageDispatch={manageDispatch} />
          </div>
        ) : modalType === ModalType.chains ? (
          <InnerSelectModal RenderItem={ListEntityButton} getItems={getChains} onSelect={handleSelectChain} />
        ) : (
          <InnerSelectModal RenderItem={ListEntityButton} getItems={getTokens} onSelect={handleSelectToken} chainId={manageState.from.chain.id} />
        )}
      </div>
    </Modal>
  )
}
