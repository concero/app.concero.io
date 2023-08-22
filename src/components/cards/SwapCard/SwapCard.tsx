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
import { NotificationsContext } from '../../../hooks/notificationsContext'
import { useSwapCardEffects } from './SwapCardEffects'
import { switchChain } from './switchChain'

export const SwapCard: FC<SwapCardProps> = () => {
  const { address, isConnected } = useAccount()
  const [{ from, to, balance, routes, isLoading, selectedRoute, transactionResponse }, swapDispatch] = useSwapReducer()
  const { dispatch } = useContext(SelectionContext)
  const { addNotification } = useContext(NotificationsContext)

  const typingTimeoutRef = useRef(null)

  const populateRoutes = (routes) => {
    swapDispatch({
      type: 'POPULATE_ROUTES',
      payload: routes,
    })
  }

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
    setResponse: populateRoutes,
    selectedRoute,
    typingTimeoutRef,
  })

  return (
    <InsuranceProvider toggleInsurance={toggleInsurance}>
      <div className={`card ${classNames.container}`}>
        <CardHeader title="Swap" />
        <div className={classNames.swapContainer}>
          <TokenArea
            direction="from"
            selection={from}
            oppositeSelection={to}
            dispatch={swapDispatch}
            balance={balance}
          />
          <TokenArea direction="to" selection={to} oppositeSelection={from} dispatch={swapDispatch} />
          <SwapDetails
            selection={{
              from,
              to,
            }}
            selectedRoute={selectedRoute}
            setSelectedRoute={(route) =>
              swapDispatch({
                type: 'SET_SELECTED_ROUTE',
                payload: route,
              })
            }
            routes={routes}
            isLoading={isLoading}
          />
          <SwapButton
            onClick={() =>
              handleSwap(swapDispatch, selectedRoute.originalRoute, switchChain, selectedRoute.provider, address, from)
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
