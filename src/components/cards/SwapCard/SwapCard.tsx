import { FC, useContext, useRef } from 'react'
import { useAccount, useSwitchNetwork } from 'wagmi'
import { CardHeader } from '../CardHeader/CardHeader'
import classNames from './SwapCard.module.pcss'
import { SwapCardProps } from './types'
import { useSwapReducer } from './swapReducer/swapReducer'
import { SelectionContext } from '../../../hooks/SelectionContext'
import { SwapButton } from '../../buttons/SwapButton/SwapButton'
import { handleSwap } from './swapExecution/handleSwap'
import { InsuranceProvider } from './InsuranceContext'
import { useSwapCardEffects } from './SwapCardEffects'
import { SwapInput } from './SwapInput/SwapInput'
import { SwapProgress } from './SwapProgress/SwapProgress'
import { getCardTitleByStatus } from './handlers/getCardTitleByStatus'
import { switchChain } from '../../../web3/switchChain'

export const SwapCard: FC<SwapCardProps> = () => {
  const { address, isConnected } = useAccount()
  const [
    { from, to, balance, routes, isLoading, selectedRoute, transactionResponse, transactionStep, transactionProgress },
    swapDispatch,
  ] = useSwapReducer()
  const { dispatch } = useContext(SelectionContext)
  const { switchNetwork } = useSwitchNetwork()
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
    switchChain(from.chain.id, switchNetwork)
  }

  return (
    <InsuranceProvider toggleInsurance={toggleInsurance}>
      <div className={`card ${classNames.container}`}>
        <CardHeader title={getCardTitleByStatus(transactionStep)} isLoading={isLoading} />
        <div className={classNames.swapContainer}>
          {transactionStep === 'input' ? (
            <SwapInput
              from={from}
              to={to}
              swapDispatch={swapDispatch}
              balance={balance}
              routes={routes}
              isLoading={isLoading}
              selectedRoute={selectedRoute}
            />
          ) : (
            <SwapProgress from={from} to={to} transactionProgress={transactionProgress} />
          )}
          <SwapButton
            onClick={() =>
              handleSwap({
                swapDispatch,
                originalRoute: selectedRoute.originalRoute,
                provider: selectedRoute.provider,
                address,
                from,
                switchChainHook,
              })
            }
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
    </InsuranceProvider>
  )
}
