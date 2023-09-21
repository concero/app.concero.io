import classNames from './StakingRoute.module.pcss'
import { ManageState } from '../useManageReducer/types'
import { CardHeader } from '../../../CardHeader/CardHeader'

interface StakingRouteProps {
  manageState: ManageState
}

export function StakingRoute({ manageState }: StakingRouteProps) {
  const { route } = manageState
  return (
    <div className={`card ${classNames.container}`}>
      <CardHeader title={'Route'} />
      <div className={classNames.stepContainer}>
        {route.steps.map((step, index) => {
          return (
            <div key={index} className={classNames.step}>
              <p>{step.fromToken}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
