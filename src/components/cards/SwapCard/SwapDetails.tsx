import { FC, useState } from 'react'
import classNames from './SwapCard.module.pcss'
import { Modal } from '../../modals/Modal/Modal'
import { RouteButton } from './RouteButton'
import { RateTag } from './RouteTag'
import { RouteCard } from '../RouteCard/RouteCard'

interface SwapDetailsProps {
  selection: {
    from: Selection
    to: Selection
  }
  selectedRoute: Route
  setSelectedRoute: (route: Route) => void
  routes: Route[]
}

interface Selection {
  chain: Chain
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

export const SwapDetails: FC<SwapDetailsProps> = ({
  selection,
  selectedRoute,
  setSelectedRoute,
  routes,
}) => {
  const [isSelectRouteModalVisible, setIsSelectRouteModalVisible] = useState<true | false>(false)

  const handleSelectRoute = (id: string) => {
    setSelectedRoute(routes.find((route) => route.id === id))
  }

  return (
    <div className={classNames.swapDetailsContainer}>
      <RateTag from={selection.from.token} to={selection.to.token} rate={rate} />
      <RouteButton route={selectedRoute} onClick={() => setIsSelectRouteModalVisible(true)} />
      <Modal
        title="Select route"
        show={isSelectRouteModalVisible}
        setShow={setIsSelectRouteModalVisible}
      >
        <div className={classNames.roueteCardsContainer}>
          {routes.map((route) => (
            <RouteCard
              key={route.id}
              route={route}
              isSelected={selectedRoute.id === route.id}
              onClick={handleSelectRoute}
            />
          ))}
        </div>
      </Modal>
    </div>
  )
}
