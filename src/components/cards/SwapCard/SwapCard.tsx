import { FC, useContext, useEffect } from 'react'
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
  const [{ from, to, routes, isLoading, typingTimeout, selectedRoute, originalRoutes }, swapDispatch] = useSwapReducer()

  useEffect(() => {
    setHistoryCard(dispatch, from, to)
  }, [from, to])

  async function getRoutes() {
    if (!from.amount) return clearRoutes()
    const response = await fetchRoutes({ from, to })
    if (!response || response.routes.length === 0) return clearRoutes()
    swapDispatch({ type: 'POPULATE_ROUTES', payload: response })
    swapDispatch({
      type: 'SET_AMOUNT',
      direction: 'to',
      payload: {
        amount: response.routes[0].to.token.amount,
        amount_usd: response.routes[0].to.token.amount_usd,
      },
    })
  }

  const handleFetchRoutes = async () => {
    try {
      swapDispatch({ type: 'SET_LOADING', payload: true })
      const typingTimeoutId = setTimeout(() => getRoutes(), 5000)
      swapDispatch({ type: 'SET_TYPING_TIMEOUT', payload: typingTimeoutId })
    } catch (e) {
      console.error(e)
      swapDispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const handleSwap = async () => {
    swapDispatch({ type: 'SET_IS_LOADING', payload: true })
    await new Promise((resolve) => setTimeout(resolve, 2000))
    swapDispatch({ type: 'SET_IS_LOADING', payload: false })
  }

  const clearRoutes = () => {
    if (typingTimeout) clearTimeout(typingTimeout)
    swapDispatch({ type: 'CLEAR_ROUTES' })
    swapDispatch({ type: 'RESET_AMOUNTS' })
  }

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
        />
        <Button
          size="lg"
          leftIcon={{
            name: 'ArrowsUpDown',
            iconProps: { size: 18 },
          }}
          isDisabled={!isConnected}
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
