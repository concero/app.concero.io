import {FC, useState} from 'react'
import classNames from './SwapCard.module.pcss'
import {Modal} from '../../modals/Modal/Modal'
import {RouteButton} from './RouteButton'
import {RateTag} from './RouteTag'
import {RouteCard} from '../RouteCard/RouteCard'

interface SwapDetailsProps {
  selection: {
    from: Selection,
    to: Selection
  }
}

interface Selection {
  chain: Chain,
  token: Token
}

interface Token {
  name: string
  symbol: string
}

interface Chain {
  name: string
  symbol: string
}

const rate = {
  from: '0.15',
  to: '1',
}

const route = {
  gas_price_usd: '12',
  transaction_time_seconds: 120,
  entities: [
    {
      id: '1',
      name: 'BNB',
    }, {
      id: '2',
      name: 'USDT',
    }, {
      id: '3',
      name: 'USDT',
    }, {
      id: '4',
      name: 'USDT',
    },
  ],
}

const routes = [
  {
    id: '1',
    net_value_usd: '7453',
    net_value_token: '1.53 ETH',
    advantage: 'best',
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
      }, {
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
  }, {
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

export const SwapDetails: FC<SwapDetailsProps> = ({selection}) => {
  const [isSelectRouteModalVisible, setIsSelectRouteModalVisible] = useState<true | false>(false)

  const [selectedRouteCard, setSelectedRouteCard] = useState(routes[0])

  const handleSelectRoute = (id: string) => {
    setSelectedRouteCard(routes.find((route) => route.id === id))
  }

  return (
    <div className={classNames.swapDetailsContainer}>
      <RateTag from={selection.from.token} to={selection.to.token} rate={rate}/>
      <RouteButton route={route} onClick={() => setIsSelectRouteModalVisible(true)}/>
      <Modal
        title="Select route"
        show={isSelectRouteModalVisible}
        setShow={setIsSelectRouteModalVisible}
      >
        <div className={classNames.roueteCardsContainer}>
          {routes.map((route) => <RouteCard key={route.id} route={route}
                                            isSelected={selectedRouteCard.id === route.id}
                                            onClick={handleSelectRoute}/>)}
        </div>
      </Modal>
    </div>
  )
}
