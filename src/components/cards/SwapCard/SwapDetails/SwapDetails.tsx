import { FC, useState } from 'react'
import classNames from '../SwapCard.module.pcss'
import { Modal } from '../../../modals/Modal/Modal'
import { RouteButton } from './RouteButton'
import { RateTag } from './RateTag'
import { RouteCard } from '../../RouteCard/RouteCard'
import { SwapDetailsProps } from '../types'
import { numberToFormatString } from '../../../../utils/formatting'

export const SwapDetails: FC<SwapDetailsProps> = ({ swapState, setSelectedRoute }) => {
  const { from, to, routes, isLoading, selectedRoute } = swapState
  const [isSelectRouteModalVisible, setIsSelectRouteModalVisible] = useState<true | false>(false)

  const rate = {
    from: to.amount ? 1 : 0,
    to: to.amount && from.amount ? numberToFormatString(parseFloat(to.amount / from.amount), 2, true) : 0,
  }

  const handleSelectRoute = (id: string) => {
    setSelectedRoute(routes.find((route) => route.id === id))
  }

  return (
    <div className={classNames.swapDetailsContainer}>
      <RateTag from={from.token} to={to.token} rate={rate} isLoading={isLoading} />
      <RouteButton selectedRoute={selectedRoute} onClick={() => setIsSelectRouteModalVisible(true)} />
      <Modal title="Select route" show={isSelectRouteModalVisible} setShow={setIsSelectRouteModalVisible}>
        <div className={classNames.routeCardsContainer}>
          {routes?.length
            ? routes.map((route) => (
              <div key={route.id}>
                <RouteCard route={route} isSelected={selectedRoute.id === route.id} onClick={handleSelectRoute} />
              </div>
              ))
            : null}
        </div>
      </Modal>
    </div>
  )
}
