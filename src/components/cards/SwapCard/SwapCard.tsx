import { FC, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { CardHeader } from '../CardHeader/CardHeader'
import { Button } from '../../buttons/Button/Button'
import classNames from './SwapCard.module.pcss'
import { useSelectionState } from './useSelectionState'
import { TokenArea } from './TokenArea/TokenArea'
import { SwapDetails } from './SwapDetails'
import { getRoutes } from '../../../api/lifi/getRoutes'
import { SwapCardProps } from './types'
import { Route } from '../../../api/lifi/types'

export const SwapCard: FC<SwapCardProps> = () => {
  const { selection, dispatch } = useSelectionState()
  const { isConnected } = useAccount()
  const [routes, setRoutes] = useState<Route[]>([])
  const [selectedRoute, setSelectedRoute] = useState(routes[0])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [originalRoutes, setOriginalRoutes] = useState([])
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null)
  const { address } = useAccount()

  const setToAmount = (amount, amount_usd) => {
    dispatch({
      type: 'setToAmount',
      direction: 'to',
      payload: { amount: amount, amount_usd: amount_usd },
    })
  }

  useEffect(() => {
    if (typingTimeout) clearTimeout(typingTimeout)
    const fetchRoutes = () => {
      setIsLoading(true)
      try {
        setTypingTimeout(
          setTimeout(async () => {
            const response = await getRoutes({
              from: selection.from,
              to: selection.to,
              address: address,
            })
            if (response.routes.length > 0) {
              setRoutes(response.routes)
              setOriginalRoutes(response.originalRoutes)
              setSelectedRoute(response.routes[0])
              setToAmount(response.routes[0].to.token.amount, response.routes[0].to.token.amount_usd)
            } else {
              resetRoutes()
              console.log('No routes found')
            }
            setIsLoading(false)
          }, 1500),
        )
      } catch (e) {
        console.log(e)
        setIsLoading(false)
      }
    }

    if (selection.from.amount) {
      fetchRoutes()
    } else {
      resetRoutes()
    }

    return () => {
      clearTimeout(typingTimeout)
    }
  }, [selection.from.token, selection.from.amount, selection.from.chain, selection.to.token, selection.to.chain])

  useEffect(() => {
    selectedRoute ? setToAmount(selectedRoute.to.token.amount, selectedRoute.to.token.amount_usd) : null
  }, [selectedRoute])

  const resetRoutes = () => {
    if (typingTimeout) clearTimeout(typingTimeout)
    setRoutes([])
    setSelectedRoute(null)
    setToAmount(0, 0)
    setIsLoading(false)
  }

  const handleSwap = async () => {
    // originalRoutes.find((route) => route.id === selectedRoute.id)
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <div className={`card ${classNames.container}`}>
      <CardHeader title="Swap" />
      <div className={classNames.swapContainer}>
        <TokenArea direction="from" selection={selection.from} dispatch={dispatch} />
        <TokenArea direction="to" selection={selection.to} dispatch={dispatch} />
        <SwapDetails
          selection={selection}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
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
