import { FC, useContext, useEffect, useRef, useState } from 'react'
import { useAccount, useBalance, useSwitchNetwork } from 'wagmi'
import { providers } from 'ethers'
import { createWalletClient, custom } from 'viem'
import { CardHeader } from '../CardHeader/CardHeader'
import classNames from './SwapCard.module.pcss'
import { TokenArea } from './TokenArea/TokenArea'
import { SwapDetails } from './SwapDetails/SwapDetails'
import { SwapCardProps } from './types'
import { useSwapReducer } from './swapReducer'
import { SelectionContext } from '../../../hooks/SelectionContext'
import { setHistoryCard } from './handlers/setHistoryCard'
import { setSwapCard } from './handlers/setSwapCard'
import { NotificationsContext } from '../../../hooks/notificationsContext'
import { SwapButton } from '../../buttons/SwapButton/SwapButton'
import { handleBalance } from './handlers/handleBalance'
import { clearRoutes } from './handlers/clearRoutes'
import { handleSwap } from './swap/handleSwap'
import { handleFetchRoutes } from './handlers/handleFetchRoutes'

export const SwapCard: FC<SwapCardProps> = () => {
  const { address, isConnected } = useAccount()
  const { dispatch } = useContext(SelectionContext)
  const [{ from, to, routes, isLoading, selectedRoute, originalRoutes, transactionResponse }, swapDispatch] =
    useSwapReducer()
  const [response, setResponse] = useState(null) // todo move to reducer
  const [prevFromAmount, setPrevFromAmount] = useState(null) // todo move to reducer
  const [balance, setBalance] = useState<string>(`0 ${from.token.symbol}`)
  const nullAddress = '0x0000000000000000000000000000000000000000'
  const { data } = useBalance({
    address,
    chainId: from.chain.id,
    ...(from.token.address !== nullAddress ? { token: from.token.address } : {}),
  })

  const { switchNetwork } = useSwitchNetwork()
  const typingTimeoutRef = useRef(null)

  useEffect(() => {
    if (!from.amount || prevFromAmount !== from.amount || response.length <= 0) return
    swapDispatch({
      type: 'POPULATE_ROUTES',
      payload: response,
    })
    swapDispatch({
      type: 'SET_AMOUNT',
      direction: 'to',
      payload: {
        amount: response[0].to.token.amount,
        amount_usd: response[0].to.token.amount_usd,
      },
    })
  }, [response])

  const switchChainHook = async (requiredChainId: number) => {
    if (switchNetwork) switchNetwork(requiredChainId)
    const client0 = createWalletClient({
      transport: custom(window.ethereum),
    })

    const provider = new providers.Web3Provider(client0.transport, 'any')
    return provider.getSigner()
  }

  const { addNotification } = useContext(NotificationsContext)

  useEffect(() => {
    setHistoryCard(dispatch, from, to)
    setSwapCard(dispatch, from, to)
  }, [from.token.symbol, to.token.symbol])

  useEffect(() => {
    handleBalance({
      setBalance,
      data,
    })
  }, [from.token.symbol])

  useEffect(() => {
    clearRoutes(typingTimeoutRef, swapDispatch)
    handleFetchRoutes(from, to, swapDispatch, setPrevFromAmount, setResponse, typingTimeoutRef)
    return () => clearRoutes(typingTimeoutRef, swapDispatch)
  }, [from.token, from.amount, from.chain, to.token, to.chain])

  useEffect(() => {
    if (!selectedRoute) return
    swapDispatch({
      type: 'SET_AMOUNT',
      direction: 'to',
      payload: {
        amount: selectedRoute.to.token.amount,
        amount_usd: selectedRoute.to.token.amount_usd,
      },
    })
  }, [selectedRoute])

  useEffect(() => {
    swapDispatch({
      type: 'SET_ADDRESS',
      direction: 'from',
      payload: address,
    })
    swapDispatch({
      type: 'SET_ADDRESS',
      direction: 'to',
      payload: address,
    })
  }, [address])

  return (
    <div className={`card ${classNames.container}`}>
      <CardHeader title="Swap" />
      <div className={classNames.swapContainer}>
        <TokenArea direction="from" selection={from} oppositeSelection={to} dispatch={swapDispatch} balance={balance} />
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
            handleSwap(
              swapDispatch,
              selectedRoute.originalRoute,
              switchChainHook,
              selectedRoute.provider,
              address,
              from,
            )
          }
          from={from}
          to={to}
          isLoading={isLoading}
          isConnected={isConnected}
          routes={routes}
          balance={data}
          transactionResponse={transactionResponse}
        />
      </div>
    </div>
  )
}
