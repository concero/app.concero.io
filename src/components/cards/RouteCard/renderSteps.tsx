import { RouteStepTag } from './RouteStepTag'
import { Route, Step } from '../../../api/lifi/types'

export const renderSteps = (route: Route, isRoutesCollapsed: boolean, isSelected: boolean) => (
  <>
    {isRoutesCollapsed ? (
      <RouteStepTag
        step={route.steps[0]}
        isRoutesCollapsed={isRoutesCollapsed}
        length={route.steps.length}
        isSelected={isSelected}
      />
    ) : (
      route.steps.map((step: Step) => (
        <RouteStepTag key={step.id} step={step} isRoutesCollapsed={isRoutesCollapsed} isSelected={isSelected} />
      ))
    )}
  </>
)
