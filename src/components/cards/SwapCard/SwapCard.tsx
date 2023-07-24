import { FC, useContext, useEffect, useRef, useState } from 'react'
import { useAccount } from 'wagmi'
import { CardHeader } from '../CardHeader/CardHeader'
import { Button } from '../../buttons/Button/Button'
import classNames from './SwapCard.module.pcss'
import { TokenArea } from './TokenArea/TokenArea'
import { SwapDetails } from './SwapDetails/SwapDetails'
import { fetchRoutes } from '../../../api/lifi/fetchRoutes'
import { SwapCardProps } from './types'
import { useSwapReducer } from './swapReducer'
import { SelectionContext } from '../../../hooks/SelectionContext'
import { setHistoryCard } from './setHistoryCard'

export const SwapCard: FC<SwapCardProps> = () => {
  const { address, isConnected } = useAccount()
  const { dispatch } = useContext(SelectionContext)
  const [{ from, to, routes, isLoading, selectedRoute, originalRoutes }, swapDispatch] = useSwapReducer()
  const [response, setResponse] = useState(null)
  const [prevFromAmount, setPrevFromAmount] = useState(null)
  const typingTimeoutRef = useRef(null)

  async function getRoutes() {
    if (!from.amount) return
    swapDispatch({ type: 'SET_LOADING', payload: true })
    const data = await fetchRoutes({ from, to })
    setPrevFromAmount(from.amount)
    if (!data || data.routes.length === 0) return
    setResponse(data)
  }

  useEffect(() => {
    if (!from.amount || prevFromAmount !== from.amount) return
    swapDispatch({ type: 'POPULATE_ROUTES', payload: response })
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
      const typingTimeoutId = setTimeout(() => getRoutes(), 700)
      typingTimeoutRef.current = typingTimeoutId
    } catch (e) {
      console.error(e)
      swapDispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const clearRoutes = () => {
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
    swapDispatch({ type: 'CLEAR_ROUTES' })
    swapDispatch({ type: 'RESET_AMOUNTS', direction: 'to' })
  }

  useEffect(() => {
    setHistoryCard(dispatch, from, to)
  }, [from.token, to.token])

  useEffect(() => {
    clearRoutes()
    handleFetchRoutes()
    return () => clearRoutes()
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

  const handleSwap = async () => {
    swapDispatch({ type: 'SET_LOADING', payload: true })
    await new Promise((resolve) => setTimeout(resolve, 2000))
    swapDispatch({ type: 'SET_LOADING', payload: false })
  }

  return (
    <div className={`card ${classNames.container}`}>
      <CardHeader title="Swap" />
      <div className={classNames.swapContainer}>
        <TokenArea direction="from" selection={from} dispatch={swapDispatch} />
        <TokenArea direction="to" selection={to} dispatch={swapDispatch} />
        <SwapDetails
          selection={{ from, to }}
          selectedRoute={selectedRoute}
          setSelectedRoute={(route) => swapDispatch({ type: 'SET_SELECTED_ROUTE', payload: route })}
          routes={routes}
          isLoading={isLoading}
        />
        <Button
          size="lg"
          leftIcon={{
            name: 'ArrowsUpDown',
            iconProps: { size: 18 },
          }}
          isDisabled={(isConnected && !routes.length) || !isConnected}
          isLoading={isLoading}
          onClick={() => handleSwap()}
          className={classNames.swapButton}
        >
          {!isLoading && (isConnected ? 'Swap' : 'Connect wallet to swap')}
        </Button>
      </div>
    </div>
  )
}
