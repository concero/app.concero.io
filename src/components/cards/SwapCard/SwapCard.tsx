import { FC, useContext, useRef } from 'react'
import { useAccount } from 'wagmi'
import { CardHeader } from '../CardHeader/CardHeader'
import classNames from './SwapCard.module.pcss'
import { TokenArea } from './TokenArea/TokenArea'
import { SwapDetails } from './SwapDetails/SwapDetails'
import { SwapCardProps } from './types'
import { useSwapReducer } from './swapReducer/swapReducer'
import { SelectionContext } from '../../../hooks/SelectionContext'
import { SwapButton } from '../../buttons/SwapButton/SwapButton'
import { handleSwap } from './swapExecution/handleSwap'
import { InsuranceProvider } from './InsuranceContext'
import { useSwapCardEffects } from './SwapCardEffects'
import { switchChain } from './switchChain'
import { Button } from '../../buttons/Button/Button'
import { colors } from '../../../constants/colors'
import { SwapSettingsModal } from './SwapSettingsModal/SwapSettingsModal'

export const SwapCard: FC<SwapCardProps> = () => {
  const { address, isConnected } = useAccount()
  const [
    { from, to, balance, routes, isLoading, selectedRoute, transactionResponse, settingsModalOpen },
    swapDispatch,
  ] = useSwapReducer()
  const { dispatch } = useContext(SelectionContext)
  const typingTimeoutRef = useRef(null)

  const toggleInsurance = (routeId) => {
    swapDispatch({
      type: 'TOGGLE_INSURANCE',
      payload: routeId,
    })
  }

  useSwapCardEffects({
    from,
    to,
    swapDispatch,
    address,
    dispatch,
    selectedRoute,
    typingTimeoutRef,
  })

  const switchChainHook = () => {
    switchChain(from.chain.id)
  }

  return (
    <InsuranceProvider toggleInsurance={toggleInsurance}>
      <div className={`card ${classNames.container}`}>
        <CardHeader title="Swap">
          <div className="f1 row asb">
            <Button
              variant="black"
              size="sq-sm"
              onClick={() => swapDispatch({ type: 'TOGGLE_SETTINGS_MODAL_OPEN' })}
              leftIcon={{ name: 'Settings', iconProps: { size: 16, color: colors.grey.medium } }}
            />
          </div>
        </CardHeader>
        <div className={classNames.swapContainer}>
          <TokenArea direction="from" selection={from} dispatch={swapDispatch} balance={balance} />
          <TokenArea direction="to" selection={to} dispatch={swapDispatch} />
          <SwapDetails
            selection={{ from, to }}
            selectedRoute={selectedRoute}
            setSelectedRoute={(route) => swapDispatch({ type: 'SET_SELECTED_ROUTE', payload: route })}
            routes={routes}
            isLoading={isLoading}
          />
          <SwapButton
            onClick={() => handleSwap(
                swapDispatch,
                selectedRoute.originalRoute,
                selectedRoute.provider,
                address,
                from,
                switchChainHook,
              )}
            from={from}
            to={to}
            isLoading={isLoading}
            isConnected={isConnected}
            routes={routes}
            balance={balance}
            transactionResponse={transactionResponse}
          />
        </div>
      </div>
      <SwapSettingsModal
        show={settingsModalOpen}
        setShow={() => swapDispatch({ type: 'TOGGLE_SETTINGS_MODAL_OPEN' })}
      />
    </InsuranceProvider>
  )
}
