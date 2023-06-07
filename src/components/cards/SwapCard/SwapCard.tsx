import { FC, useState } from 'react'
import { useAccount } from 'wagmi'
import { CardHeader } from '../CardHeader/CardHeader'
import { Button } from '../../buttons/Button/Button'
import classNames from './SwapCard.module.pcss'
import { useSelectionState } from './useSelectionState'
import { TokenArea } from './TokenArea'
import { SwapDetails } from './SwapDetails'

interface SwapCardProps {}

const route: Route = {
  gas_price_usd: '12',
  transaction_time_seconds: '120',
  entities: [
    {
      id: '1',
      name: 'BNB',
    },
    {
      id: '2',
      name: 'USDT',
    },
    {
      id: '3',
      name: 'USDT',
    },
    {
      id: '4',
      name: 'USDT',
    },
  ],
}

const routes: Route[] = [
  {
    id: '1',
    net_value_usd: '7453',
    net_value_token: '1.53 ETH',
    advantage: 'best',
    transaction_time_seconds: '120',
    gas_price_usd: '16',
    slippage_percent: '0.4',
    route_steps: [
      {
        id: '1',
        transaction_time_seconds: '120',
        gas_price_usd: '12',
        slippage_percent: '0.4',
        from: {
          token: {
            name: 'BNB',
            symbol: 'BNB',
          },
          chain: {
            name: 'Binance Smart Chain',
            symbol: 'BSC',
          },
        },
        to: {
          token: {
            name: 'ETH',
            symbol: 'ETH',
          },
          chain: {
            name: 'Ethereum',
            symbol: 'ETH',
          },
        },
        exchange: {
          name: 'PancakeSwap',
          symbol: 'PancakeSwap',
        },
        amount: {
          usd: '325',
          token: '0.0001',
        },
      },
      {
        id: '2',
        transaction_time_seconds: '120',
        gas_price_usd: '12',
        slippage_percent: '0.4',
        from: {
          token: {
            name: 'BNB',
            symbol: 'BNB',
          },
          chain: {
            name: 'Binance Smart Chain',
            symbol: 'BSC',
          },
        },
        to: {
          token: {
            name: 'ETH',
            symbol: 'ETH',
          },
          chain: {
            name: 'Ethereum',
            symbol: 'ETH',
          },
        },
        exchange: {
          name: 'PancakeSwap',
          symbol: 'PancakeSwap',
        },
        amount: {
          usd: '325',
          token: '0.0001',
        },
      },
    ],
  },
  {
    id: '2',
    net_value_usd: '7453',
    net_value_token: '1.53 ETH',
    advantage: 'fast',
    transaction_time_seconds: '120',
    gas_price_usd: '12',
    slippage_percent: '0.4',
    route_steps: [
      {
        id: '1',
        transaction_time_seconds: '120',
        gas_price_usd: '12',
        slippage_percent: '0.4',
        from: {
          token: {
            name: 'BNB',
            symbol: 'BNB',
          },
          chain: {
            name: 'Binance Smart Chain',
            symbol: 'BSC',
          },
        },
        to: {
          token: {
            name: 'ETH',
            symbol: 'ETH',
          },
          chain: {
            name: 'Ethereum',
            symbol: 'ETH',
          },
        },
        exchange: {
          name: 'PancakeSwap',
          symbol: 'PancakeSwap',
        },
        amount: {
          usd: '325',
          token: '0.0001',
        },
      },
    ],
  },
]

export interface Route {
  id: string
  net_value_usd: string
  net_value_token: string
  advantage: string
  transaction_time_seconds: string
  gas_price_usd: string
  slippage_percent: string
  route_steps: RouteStep[]
}

export interface RouteStep {
  id: string
  transaction_time_seconds: string
  gas_price_usd: string
  slippage_percent: string
  from: {
    token: {
      name: string
      symbol: string
    }
    chain: {
      name: string
      symbol: string
    }
  }
  to: {
    token: {
      name: string
      symbol: string
    }
    chain: {
      name: string
      symbol: string
    }
  }
  exchange: {
    name: string
    symbol: string
  }
  amount: {
    usd: string
    token: string
  }
}

export const SwapCard: FC<SwapCardProps> = () => {
  const { selection, dispatch } = useSelectionState()
  const { isConnected } = useAccount()
  const [selectedRoute, setSelectedRoute] = useState(routes[0])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSwap = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <div className="card">
      <CardHeader title="Swap" />
      <div className={classNames.swapContainer}>
        <TokenArea direction="from" selection={selection.from} dispatch={dispatch} />
        <TokenArea direction="to" selection={selection.to} dispatch={dispatch} />
        <SwapDetails
          selection={selection}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
          route={route}
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
