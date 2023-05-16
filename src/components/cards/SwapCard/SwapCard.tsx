import { FC, useState } from 'react'
import { CardHeader } from '../CardHeader/CardHeader'
import { Button } from '../../buttons/Button/Button'
import classNames from './SwapCard.module.pcss'
import { ChainsModal } from '../../modals/ChainsModal'
import { useSelectionState } from './useSelectionState'
import { TokenArea } from './TokenArea'

interface SwapCardProps {}

export const SwapCard: FC<SwapCardProps> = () => {
  const [showChainsModal, setShowChainsModal] = useState<boolean>(false)
  const { selection, dispatch } = useSelectionState()
  return (
    <>
      <div className="card">
        <CardHeader title="Swap" />

        <div className={classNames.swapContainer}>
          <TokenArea onSelectChain={() => setShowChainsModal(true)} onSelectToken={() => {}} title="From" />
          <TokenArea onSelectChain={() => setShowChainsModal(true)} onSelectToken={() => {}} title="To" />
          <Button size="lg" leftIcon={{ name: 'ArrowsUpDown', iconProps: { size: 18 } }}>
            Swap
          </Button>
        </div>
      </div>
      <ChainsModal show={showChainsModal} setShow={setShowChainsModal} />
    </>
  )
}
