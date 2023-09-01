import { useAccount, useSwitchNetwork } from 'wagmi'
import { FC } from 'react'
import { TokenArea } from '../TokenArea/TokenArea'
import { SwapDetails } from '../SwapDetails/SwapDetails'
import classNames from './SwapInput.module.pcss'
import { SwapInputProps } from './types'
import { SwapButton } from '../../../buttons/SwapButton/SwapButton'
import { handleSwap } from '../swapExecution/handleSwap'
import { switchChain } from '../../../../web3/switchChain'

export const SwapInput: FC<SwapInputProps> = ({
  from,
  to,
  swapDispatch,
  balance,
  routes,
  isLoading,
  selectedRoute,
  transactionResponse,
}) => {
  const { switchNetwork } = useSwitchNetwork()
  const { address, isConnected } = useAccount()

  const switchChainHook = () => {
    switchChain(from.chain.id, switchNetwork)
  }

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
      <SwapButton
        onClick={() =>
          handleSwap({
            swapDispatch,
            selectedRoute,
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
  )
}
