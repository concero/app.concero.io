import { FC, useState } from 'react'
import classNames from '../SwapCard.module.pcss'
import { Modal } from '../../../modals/Modal/Modal'
import { RouteButton } from './RouteButton'
import { RateTag } from './RateTag'
import { RouteCard } from '../../RouteCard/RouteCard'
import { SwapDetailsProps } from '../types'

export const SwapDetails: FC<SwapDetailsProps> = ({
  selection,
  selectedRoute,
  setSelectedRoute,
  routes,
  isLoading,
}) => {
  const [isSelectRouteModalVisible, setIsSelectRouteModalVisible] = useState<true | false>(false)

  const rate = {
    from: selection.to.amount ? 1 : 0,
    to:
      selection.to.amount && selection.from.amount
        ? parseFloat(selection.to.amount / selection.from.amount).toFixed(2)
        : 0,
  }

  const handleSelectRoute = (id: string) => {
    setSelectedRoute(routes.find((route) => route.id === id))
  }

  return (
    <div className={classNames.swapDetailsContainer}>
      <RateTag from={selection.from.token} to={selection.to.token} rate={rate} isLoading={isLoading} />
      <RouteButton selectedRoute={selectedRoute} onClick={() => setIsSelectRouteModalVisible(true)} />
      <Modal title="Select route" show={isSelectRouteModalVisible} setShow={setIsSelectRouteModalVisible}>
        <div className={classNames.roueteCardsContainer}>
          {routes?.map((route) => (
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
