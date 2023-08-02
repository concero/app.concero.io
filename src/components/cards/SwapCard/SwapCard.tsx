import { FC, useContext, useEffect, useRef, useState } from 'react'
import { useAccount, useSwitchNetwork } from 'wagmi'
import { providers } from 'ethers'
import { createWalletClient, custom } from 'viem'
import { CardHeader } from '../CardHeader/CardHeader'
import classNames from './SwapCard.module.pcss'
import { TokenArea } from './TokenArea/TokenArea'
import { SwapDetails } from './SwapDetails/SwapDetails'
import { executeRoute } from '../../../api/lifi/fetchRoutes'
import { SwapCardProps } from './types'
import { useSwapReducer } from './swapReducer'
import { SelectionContext } from '../../../hooks/SelectionContext'
import { setHistoryCard } from './setHistoryCard'
import { setSwapCard } from './setSwapCard'
import { viemSigner } from '../../../web3/ethers'
import { NotificationsContext } from '../../../hooks/notificationsContext'
import { SwapButton } from '../../buttons/SwapButton/SwapButton'
import { getBalance } from './getBalance'
import { getRoutes } from './getRoutes'
import { clearRoutes } from './clearRoutes'

export const SwapCard: FC<SwapCardProps> = () => {
  const { address, isConnected } = useAccount()
  const { dispatch } = useContext(SelectionContext)
  const [{ from, to, routes, isLoading, selectedRoute, originalRoutes }, swapDispatch] = useSwapReducer()
  const [response, setResponse] = useState(null)
  const [prevFromAmount, setPrevFromAmount] = useState(null)
  const [balance, setBalance] = useState<string>(`0 ${from.token.symbol}`)
  const { switchNetwork } = useSwitchNetwork()
  const typingTimeoutRef = useRef(null)

  useEffect(() => {
    if (!from.amount || prevFromAmount !== from.amount) return
    swapDispatch({
      type: 'POPULATE_ROUTES',
      payload: response,
    })
    swapDispatch({
      type: 'SET_AMOUNT',
      direction: 'to',
      payload: {
        amount: response.routes[0].to.token.amount,
        amount_usd: response.routes[0].to.token.amount_usd,
      },
    })
  }, [response])

  const handleFetchRoutes = async () => {
    try {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
      const typingTimeoutId = setTimeout(() => getRoutes(from, to, swapDispatch, setPrevFromAmount, setResponse), 700)
      typingTimeoutRef.current = typingTimeoutId
    } catch (e) {
      console.error(e)
      swapDispatch({
        type: 'SET_LOADING',
        payload: false,
      })
    }
  }

  const switchChainHook = async (requiredChainId: number) => {
    if (switchNetwork) switchNetwork(requiredChainId)
    const client0 = createWalletClient({
      transport: custom(window.ethereum),
    })

    const provider = new providers.Web3Provider(client0.transport, 'any')
    return provider.getSigner()
  }

  const handleSwap = async () => {
    swapDispatch({
      type: 'SET_LOADING',
      payload: true,
    })
    try {
      const executedRoute = await executeRoute(viemSigner, originalRoutes[0], { switchChainHook })
      console.log('executedRoute', executedRoute)
    } catch (e) {
      console.log(e)
    }
    await swapDispatch({
      type: 'SET_LOADING',
      payload: false,
    })
  }
  const { addNotification } = useContext(NotificationsContext)

  useEffect(() => {
    setHistoryCard(dispatch, from, to)
    setSwapCard(dispatch, from, to)
  }, [from.token.symbol, to.token.symbol])

  useEffect(() => {
    getBalance(address, from, setBalance)
  }, [from.token.symbol])

  useEffect(() => {
    clearRoutes(typingTimeoutRef, swapDispatch)
    handleFetchRoutes()
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
        <TokenArea direction="from" selection={from} dispatch={swapDispatch} address={address} balance={balance} />
        <TokenArea direction="to" selection={to} dispatch={swapDispatch} address={address} />
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
          onClick={() => handleSwap()}
          from={from}
          to={to}
          isLoading={isLoading}
          isConnected={isConnected}
          routes={routes}
          balance={balance}
        />
      </div>
    </div>
  )
}
