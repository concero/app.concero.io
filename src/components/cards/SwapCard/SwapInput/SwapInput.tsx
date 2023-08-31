import { FC } from 'react'
import { TokenArea } from '../TokenArea/TokenArea'
import { SwapDetails } from '../SwapDetails/SwapDetails'
import classNames from './SwapInput.module.pcss'
import { SwapInputProps } from './types'

export const SwapInput: FC<SwapInputProps> = ({
  from,
  to,
  swapDispatch,
  balance,
  routes,
  isLoading,
  selectedRoute,
}) => {
  return (
    <div className={classNames.container}>
      <TokenArea direction="from" selection={from} dispatch={swapDispatch} balance={balance} />
      <TokenArea direction="to" selection={to} dispatch={swapDispatch} />
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
    </div>
  )
}
