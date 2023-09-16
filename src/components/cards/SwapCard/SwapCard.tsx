import { FC, useContext, useRef } from 'react'
import { useAccount } from 'wagmi'
import { IconSettings } from '@tabler/icons-react'
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
import { SwapSettingsModal } from './SwapSettingsModal/SwapSettingsModal'
import { Button } from '../../buttons/Button/Button'
import { colors } from '../../../constants/colors'

export const SwapCard: FC<SwapCardProps> = () => {
  const { selection, dispatch } = useContext(SelectionContext)

  const [swapState, swapDispatch] = useSwapReducer(selection)
  const { address } = useAccount()

  const typingTimeoutRef = useRef(null)

  const toggleInsurance = (routeId) => swapDispatch({ type: 'TOGGLE_INSURANCE', payload: routeId })
  useSwapCardEffects({ swapState, swapDispatch, address, dispatch, typingTimeoutRef })

  return (
    <InsuranceProvider toggleInsurance={toggleInsurance}>
      <div className={`card ${classNames.container}`}>
        <CardHeader title={getCardTitleByStatus(swapState.status)}>
          <div className="f1 row asb">
            <Button
              variant="black"
              size="sq-sm"
              onClick={() => swapDispatch({ type: 'TOGGLE_SETTINGS_MODAL_OPEN' })}
              leftIcon={<IconSettings size={16} color={colors.grey.medium} />}
            />
          </div>
        </CardHeader>
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
