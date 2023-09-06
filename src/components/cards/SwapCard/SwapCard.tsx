import { FC, useContext, useRef } from 'react'
import { useAccount } from 'wagmi'
import { CardHeader } from '../CardHeader/CardHeader'
import classNames from './SwapCard.module.pcss'
import { SwapCardProps } from './types'
import { useSwapReducer } from './swapReducer/swapReducer'
import { SelectionContext } from '../../../hooks/SelectionContext'
import { InsuranceProvider } from './InsuranceContext'
import { useSwapCardEffects } from './SwapCardEffects'
import { SwapInput } from './SwapInput/SwapInput'
import { SwapProgress } from './SwapProgress/SwapProgress'
import { getCardTitleByStatus } from './handlers/getCardTitleByStatus'

export const SwapCard: FC<SwapCardProps> = () => {
  const { address } = useAccount()
  const [swapState, swapDispatch] = useSwapReducer()
  const { dispatch } = useContext(SelectionContext)
  const typingTimeoutRef = useRef(null)

  const toggleInsurance = (routeId) => swapDispatch({ type: 'TOGGLE_INSURANCE', payload: routeId })
  useSwapCardEffects({ swapState, swapDispatch, address, dispatch, typingTimeoutRef })

  return (
    <InsuranceProvider toggleInsurance={toggleInsurance}>
      <div className={`card ${classNames.container}`}>
        <CardHeader title={getCardTitleByStatus(swapState.status)} isLoading={swapState.isLoading} />
        <div className={classNames.swapContainer}>
          {swapState.stage === 'input' ? (
            <SwapInput swapState={swapState} swapDispatch={swapDispatch} />
          ) : (
            <SwapProgress swapState={swapState} swapDispatch={swapDispatch} />
          )}
        </div>
      </div>
      <SwapSettingsModal
        show={swapState.settingsModalOpen}
        setShow={() => swapDispatch({ type: 'TOGGLE_SETTINGS_MODAL_OPEN' })}
        swapDispatch={swapDispatch}
        settings={swapState.settings}
      />
    </InsuranceProvider>
  )
}
