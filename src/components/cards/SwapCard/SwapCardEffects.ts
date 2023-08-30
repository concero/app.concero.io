import { useEffect } from 'react'
import { setHistoryCard } from './handlers/setHistoryCard'
import { setSwapCard } from './handlers/setSwapCard'
import { handleBalance } from './handlers/handleBalance'
import { clearRoutes } from './handlers/handleRoutes'
import { handleFetchRoutes } from './handlers/handleFetchRoutes'

export function useSwapCardEffects({ from, to, swapDispatch, address, dispatch, selectedRoute, typingTimeoutRef }) {
  useEffect(() => {
    setHistoryCard(dispatch, from, to)
    setSwapCard(dispatch, from, to)
  }, [from.token.symbol, to.token.symbol])

  useEffect(() => {
    handleBalance({ swapDispatch, from, address })
  }, [from.token.symbol, address])

  useEffect(() => {
    clearRoutes(typingTimeoutRef, swapDispatch)
    handleFetchRoutes(from, to, swapDispatch, typingTimeoutRef)
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
}
