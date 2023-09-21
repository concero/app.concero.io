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
import { CardHeader } from '../../CardHeader/CardHeader'
import { getQuote } from './getQuote'
import { Details } from './Details/Details'
import { StakeButton } from '../StakeButton/StakeButton'
import { clearRoute } from './clearRoute'

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
    const tokens = await getTokens({ chainId: item.id, offset: 0, limit: 15 })
    manageDispatch({ type: 'SET_CHAIN', payload: item, tokens, direction: 'from' })
    manageDispatch({ type: 'SET_MODAL_TYPE', payload: ModalType.input })
  }

  function handleSelectToken(item: any) {
    manageDispatch({ type: 'SET_TOKEN', payload: item, direction: 'from' })
    manageDispatch({ type: 'SET_MODAL_TYPE', payload: ModalType.input })
  }

  function handleClose() {
    clearRoute(manageDispatch, typingTimeoutRef)
  }

  useEffect(() => {
    getQuote({ manageState, manageDispatch, typingTimeoutRef })
    // return () => clearRoute(manageDispatch, typingTimeoutRef)
  }, [manageState.from.amount])

  return (
    <Modal title={'Manage position'} show={isOpen} setShow={setIsOpen} onClose={handleClose}>
      <CardHeader>
        <Button
          size={'sm'}
          variant={swapType === SwapType.stake ? 'primary' : 'subtle'}
          onClick={() => manageDispatch({ type: 'SET_SWAP_TYPE', payload: SwapType.stake })}
        >
          Stake
        </Button>
        <Button
          size={'sm'}
          variant={swapType === SwapType.withdraw ? 'primary' : 'subtle'}
          onClick={() => manageDispatch({ type: 'SET_SWAP_TYPE', payload: SwapType.withdraw })}
        >
          Withdraw
        </Button>
      </CardHeader>
      <div className={classNames.container}>
        {modalType === ModalType.input ? (
          <div className={classNames.areaContainer}>
            <SelectArea selection={manageState.from} direction={'from'} dispatch={manageDispatch} swapType={swapType} />
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
