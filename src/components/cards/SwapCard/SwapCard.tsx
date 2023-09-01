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
  const [
    { from, to, balance, routes, isLoading, selectedRoute, transactionResponse, transactionStep, transactionProgress },
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
              transactionResponse={transactionResponse}
            />
          ) : (
            <SwapProgress from={from} to={to} transactionProgress={transactionProgress} />
          )}
        </div>
      </div>
    </InsuranceProvider>
  )
}
