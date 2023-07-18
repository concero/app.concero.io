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

  useEffect(() => {
    const fetchRoutes = async () => {
      setIsLoading(true)
      const response = await getRoutes({
        from: selection.from,
        to: selection.to,
        amount: selection.from.amount,
      })

      setRoutes(response.routes)
      setSelectedRoute(response.routes[0])

      setIsLoading(false)
    }

    fetchRoutes()
  }, [selection])

  const handleSwap = async () => {
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
